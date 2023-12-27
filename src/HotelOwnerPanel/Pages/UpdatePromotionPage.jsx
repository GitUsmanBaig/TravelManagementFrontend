import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdatePromotionPage.css';

const UpdatePromotionPage = () => {
  const [promotionData, setPromotionData] = useState({
    title: '',
    description: '',
    discountRate: 0,
    validFrom: '',
    validUntil: ''
  });
  const { hotelId, promotionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPromotionData = async () => {
      const token = localStorage.getItem('token');
      // Fetch existing promotion data from the server and update state wit hthe fetched data
    };

    fetchPromotionData();
  }, [hotelId, promotionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    try {
      const response = await fetch(`http://localhost:3000/api/hotel-owner/${hotelId}/promotions/${promotionId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(promotionData)
      });
      if (!response.ok) {
        throw new Error('Failed to update the promotion');
      }
      navigate(`/hotel/details/${hotelId}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setPromotionData({ ...promotionData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="update-promotion-form">
      <input type="text" name="title" value={promotionData.title} onChange={handleChange} placeholder="Title" />
      <textarea name="description" value={promotionData.description} onChange={handleChange} placeholder="Description" />
      <input type="number" name="discountRate" value={promotionData.discountRate} onChange={handleChange} placeholder="Discount Rate (%)" />
      <input type="date" name="validFrom" value={promotionData.validFrom} onChange={handleChange} />
      <input type="date" name="validUntil" value={promotionData.validUntil} onChange={handleChange} />
      <button type="submit">Update Promotion</button>
    </form>
  );
};

export default UpdatePromotionPage;
