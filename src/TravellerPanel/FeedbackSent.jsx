import { useEffect, useState } from 'react';
import './FeedbackSent.css';

const FeedbackSent = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFeedbacksSent = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/getFeedbacksSent', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setFeedbacks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbacksSent();
    }, []);

    if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="feedbacks-sent-container">
            <h1>Feedback Sent</h1>
            {feedbacks.map((feedback, index) => (
                <div key={index} className="feedback-card">
                    <p><strong>Feedback:</strong> {feedback.feedback}</p>
                    {/* Add more details here if necessary */}
                </div>
            ))}
        </div>
    );
};

export default FeedbackSent;
