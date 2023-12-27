
import React, { useState, useEffect } from 'react';
import ReviewCard from '../Components/ReviewCard';
import './ViewAllReviews.css';

const ViewAllReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            try {
                const response = await fetch('http://localhost:3000/api/review', { headers });
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error:', error);

            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="reviews-page">
            <h1>All Customer Reviews</h1>
            <div className="reviews-container">
                {reviews.map(review => (
                    <ReviewCard key={review._id} review={review} />
                ))}
            </div>
        </div>
    );
};

export default ViewAllReviews;
