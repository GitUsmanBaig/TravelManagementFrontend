
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateRoomPricing.css'; 

const UpdateRoomPricing = () => {
  const [roomId, setRoomId] = useState('');
  const [newPrice, setNewPrice] = useState('');
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
      const response = await fetch(`http://localhost:3000/api/hotel-owner/${id}/roomTypes/${roomId}/price`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ price: newPrice })
      });

      if (!response.ok) {
        throw new Error('Failed to update room pricing');
      }

      navigate(`/hotel/details/${id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="update-room-pricing">
      <h2>Update Room Pricing</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Room ID:
          <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
        </label>
        <label>
          New Price:
          <input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
        </label>
        <button type="submit">Update Price</button>
      </form>
    </div>
  );
};

export default UpdateRoomPricing;
