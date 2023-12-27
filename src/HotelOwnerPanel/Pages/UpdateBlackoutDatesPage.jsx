
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateBlackoutDatesPage.css';

const UpdateBlackoutDatesPage = () => {
  const [blackoutDates, setBlackoutDates] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlackoutDates = async () => {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      try {
        const response = await fetch(`http://localhost:3000/api/hotel-owner/${id}`, { headers });
        if (!response.ok) {
          throw new Error('Failed to fetch hotel details');
        }
        const hotelData = await response.json();
        setBlackoutDates(hotelData.blackoutDates.join(', '));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBlackoutDates();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const updatedBlackoutDates = blackoutDates.split(',').map(date => date.trim());

    try {
      const response = await fetch(`http://localhost:3000/api/hotel-owner/${id}/blackoutDates`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ blackoutDates: updatedBlackoutDates })
      });
      if (!response.ok) {
        throw new Error('Failed to update blackout dates');
      }
      navigate(`/hotel/details/${id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="update-blackout-dates">
      <h2>Update Blackout Dates</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="blackoutDates">Blackout Dates:</label>
        <textarea 
          id="blackoutDates" 
          value={blackoutDates}
          onChange={(e) => setBlackoutDates(e.target.value)}
          placeholder="Enter dates separated by commas (e.g., 2023-01-01, 2023-01-02)"
        />
        <button type="submit">Update Blackout Dates</button>
      </form>
    </div>
  );
};

export default UpdateBlackoutDatesPage;
