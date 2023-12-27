// ReviewCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/review/respond/${review._id}`); // Navigate to response page
    };
    return (
        <div className="review-card" onClick={handleClick}>
            <h3>Hotel: {review.hotel.name}</h3>
            <p>Guest: {review.guest.name}</p>
            <p>Rating: {review.rating}</p>
            <p>Review: {review.comment}</p>
            <p>Response: {review.response}</p>
        </div>
    );
};

export default ReviewCard;
