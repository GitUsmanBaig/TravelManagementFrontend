import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedbackSent.css';

const FeedbackSent = () => {
    const [feedbacksSent, setFeedbacksSent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
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
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeedbacksSent();
    }, []);

    const handleFeedbackClick = async (feedbackId) => {
        console.log(feedbackId);
        // Navigate to FeedbackReceived component with the feedbackId
        navigate(`/user/feedbacksReceived/${feedbackId}`);

    };

    if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="feedbacks-sent-container">
            <h1>Feedback Sent</h1>
            {feedbacksSent.map((feedback, index) => (
                <div key={index} className="feedback-sent-card" onClick={() => handleFeedbackClick(feedback._id)}>
                    <p><strong>Feedback:</strong> {feedback.feedback}</p>
                </div>
            ))}
        </div>
    );
};

export default FeedbackSent;
