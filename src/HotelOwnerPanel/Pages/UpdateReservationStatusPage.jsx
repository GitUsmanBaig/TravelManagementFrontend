
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateReservationStatusPage.css';

const UpdateReservationStatusPage = () => {
  const [status, setStatus] = useState('');
  const { reservationId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    try {
      const response = await fetch(`http://localhost:3000/api/reservation/${reservationId}`, { 
        method: 'PUT', 
        headers, 
        body: JSON.stringify({ status }) 
      });
      if (!response.ok) {
        throw new Error('Failed to update reservation status');
      }
        alert('Reservation status updated successfully');
      navigate('/hotel/dashboard');
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
  };

  return (
    <div className="update-reservation-status-page">
      <h1>Update Reservation Status</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Status:
          <select value={status} onChange={e => setStatus(e.target.value)} required>
            <option value="">Select a Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="Pending">Pending</option>
          </select>
        </label>
        <button type="submit">Update Status</button>
      </form>
    </div>
  );
};

export default UpdateReservationStatusPage;
