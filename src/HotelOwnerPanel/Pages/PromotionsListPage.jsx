import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PromotionCard from '../Components/PromotionCard';
import './PromotionsListPage.css';

const PromotionsListPage = () => {
  const [promotions, setPromotions] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPromotions = async () => {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      try {
        const response = await fetch(`http://localhost:3000/api/hotel-owner/${id}/promotions`, { headers });
        if (!response.ok) {
          throw new Error('Failed to fetch promotions');
        }
        const data = await response.json();
        setPromotions(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPromotions();
  }, [id]);

  const handleAddNewPromotion = () => {
    navigate(`/hotel/add-promotion/${id}`);
  };

  const handlePromotionDelete = async (promotionId) => {
    // Delete promotion logic
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    try {
      const response = await fetch(`http://localhost:3000/api/hotel-owner/${id}/promotions/${promotionId}`, { method: 'DELETE', headers });
      if (!response.ok) {
        throw new Error('Failed to delete the promotion');
      }
      // Removes the deleted promotion from the state
      setPromotions(promotions.filter(promotion => promotion._id !== promotionId));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="promotions-list">
      <h1>Promotions</h1>
      <button onClick={handleAddNewPromotion} className="add-new-promotion-button">Add New Promotion</button>
      {promotions.map(promotion => (
        <PromotionCard 
          key={promotion._id} 
          promotion={promotion} 
          hotelId={id}
          onPromotionDelete={handlePromotionDelete} 
        />
      ))}
    </div>
  );
};

export default PromotionsListPage;
