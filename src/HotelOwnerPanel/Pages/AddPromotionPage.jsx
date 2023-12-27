import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AddPromotionPage.css';

const AddPromotionPage = () => {
  const [promotionData, setPromotionData] = useState({
    title: '',
    description: '',
    discountRate: 0,
    validFrom: '',
    validUntil: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    try {
      const response = await fetch(`http://localhost:3000/api/hotel-owner/${id}/promotions`, {
        method: 'POST',
        headers,
        body: JSON.stringify(promotionData)
      });
      if (!response.ok) {
        throw new Error('Failed to add the promotion');
      }
      navigate(`/hotel/${id}/promotions`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setPromotionData({ ...promotionData, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-promotion-form-container">
      <form onSubmit={handleSubmit} className="add-promotion-form">
        <input type="text" name="title" value={promotionData.title} onChange={handleChange} placeholder="Title" required />
        <textarea name="description" value={promotionData.description} onChange={handleChange} placeholder="Description" required />
        <input type="number" name="discountRate" value={promotionData.discountRate} onChange={handleChange} placeholder="Discount Rate (%)" required min="0" />
        <input type="date" name="validFrom" value={promotionData.validFrom} onChange={handleChange} required />
        <input type="date" name="validUntil" value={promotionData.validUntil} onChange={handleChange} required />
        <button type="submit" className="submit-button">Add Promotion</button>
      </form>
    </div>
  );
};

export default AddPromotionPage;
