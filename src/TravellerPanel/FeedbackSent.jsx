import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedbackSent.css';

const FeedbackSent = () => {
    const [feedbacksSent, setFeedbacksSent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [responseCount, setResponseCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeedbacksSent = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:3000/user/getFeedbacksSent', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Error fetching feedbacks sent: ${response.statusText}`);
                }

                const feedbacks = await response.json();
                setFeedbacksSent(feedbacks);
                // Assuming each feedback item has a `responses` array
                const count = feedbacks.reduce((acc, feedback) => acc + (feedback.responses ? feedback.responses.length : 0), 0);
                setResponseCount(count);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeedbacksSent();
    }, []);

    const navigateToFeedbacksReceived = () => {
        navigate('/user/feedbacksReceived');
    };

    return (
        <>
            <div className="notification-bell-container">
                <img
                    src="../../public/notification.png"
                    alt="Notifications"
                    className="notification-bell"
                    onClick={navigateToFeedbacksReceived}
                />
                {responseCount > 0 && <span className="response-count">{responseCount}</span>}
            </div>
            <div className="feedbacks-sent-container">
                <h1>Feedback Sent</h1>
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    feedbacksSent.map((feedback, index) => (
                        <div key={index} className="feedback-sent-card">
                            <p><strong>Feedback:</strong> {feedback.feedback}</p>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default FeedbackSent;
