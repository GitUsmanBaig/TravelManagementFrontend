import React from 'react';
import './PromotionCard.css';
import { useNavigate } from 'react-router-dom';

const PromotionCard = ({ promotion, hotelId, onPromotionDelete }) => {
    const navigate = useNavigate();
  
    const handleUpdateClick = () => {
      navigate(`/hotel/${hotelId}/promotions/update/${promotion._id}`);
    };
  
    const handleDeleteClick = async () => {
      try {
        await onPromotionDelete(promotion._id);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  return (
    <div className="promotion-card">
      <h3>{promotion.title}</h3>
      <p>{promotion.description}</p>
      <p>Discount Rate: {promotion.discountRate}%</p>
      <p>Valid From: {new Date(promotion.validFrom).toLocaleDateString()}</p>
      <p>Valid Until: {new Date(promotion.validUntil).toLocaleDateString()}</p>
      <button onClick={handleUpdateClick}>Update Promotion</button>
      <button onClick={handleDeleteClick}>Delete Promotion</button>
    </div>
  );
};

export default PromotionCard;
