import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FeedbackReceived.css';

const FeedbackReceived = () => {
    const [feedbacksReceived, setFeedbacksReceived] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { feedbackId } = useParams();
    console.log(feedbackId);

    useEffect(() => {
        const fetchFeedbacksReceived = async () => {
            if (!feedbackId) {
                setError("Feedback ID is undefined.");
                return;
            }
            // setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/user/getFeedbacksReceived/${feedbackId}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Error fetching feedback received: ${response.statusText}`);
                }

                const feedbacks = await response.json();
                setFeedbacksReceived(feedbacks);
            } catch (err) {
                setError(err.message);
            } finally {
                // setIsLoading(false);
            }
        };

        fetchFeedbacksReceived();
    }, [feedbackId]);

    // if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="feedbacks-received-container">
            <h1>Feedback Received</h1>
            {feedbacksReceived.map((feedback, index) => (
                <div key={index} className="feedback-received-card">
                    <p><strong>Feedback:</strong> {feedback.feedback}</p>
                </div>
            ))}
        </div>
    );
};

export default FeedbackReceived;
