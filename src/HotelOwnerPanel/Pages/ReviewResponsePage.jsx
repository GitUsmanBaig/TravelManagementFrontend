import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ReviewResponsePage.css';

const ReviewResponsePage = () => {
    const [review, setReview] = useState({ comment: '', guest: { name: '' }, hotel: { name: '' } }); 
    const [response, setResponse] = useState('');
    const { reviewId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviewDetails = async () => {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
    
            try {
                
                const response = await fetch(`http://localhost:3000/api/review/${reviewId}`, { headers });
                if (!response.ok) {
                    throw new Error('Failed to fetch review details');
                }
                const data = await response.json();
                setReview(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        fetchReviewDetails();
    }, [reviewId]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    
        try {
            const submitResponse = await fetch(`http://localhost:3000/api/review/${reviewId}/respond`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ response }) 
            });
    
            if (!submitResponse.ok) {
                throw new Error('Failed to submit response');
            }
            navigate('/hotel/reviews');
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (
        <div className="review-response-page">
            <h1>Respond to Review</h1>
            <p>Review: {review.comment}</p>
            <form onSubmit={handleSubmit}>
                <textarea 
                    value={response} 
                    onChange={(e) => setResponse(e.target.value)} 
                    placeholder="Your response"
                    className="response-textarea">
                </textarea>
                <button type="submit" className="submit-response-button">Submit Response</button>
            </form>
        </div>
    );
};

export default ReviewResponsePage;
