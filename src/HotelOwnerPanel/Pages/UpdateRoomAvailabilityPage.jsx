import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateRoomAvailabilityPage.css';

const UpdateRoomAvailabilityPage = () => {
  const [hotel, setHotel] = useState(null);
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState('');
  const [newAvailability, setNewAvailability] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch hotel details including room types
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      try {
        const response = await fetch(`http://localhost:3000/api/hotel-owner/${id}`, { headers });
        if (!response.ok) {
          throw new Error('Hotel not found');
        }
        const data = await response.json();
        setHotel(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    try {
      const response = await fetch(`http://localhost:3000/api/hotel-owner/${id}/roomTypes/${selectedRoomTypeId}/availability`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ newAvailability })
      });

      if (!response.ok) {
        throw new Error('Failed to update room availability');
      }

      alert('Room availability updated successfully');
      navigate(`/hotel/details/${id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-room-availability">
      <h2>Update Room Availability</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="roomType">Select Room Type:</label>
        <select id="roomType" value={selectedRoomTypeId} onChange={e => setSelectedRoomTypeId(e.target.value)} required>
          <option value="">Select a Room Type</option>
          {hotel.roomTypes.map(roomType => (
            <option key={roomType._id} value={roomType._id}>
              {roomType.type}
            </option>
          ))}
        </select>

        <label htmlFor="availability">New Availability:</label>
        <input
          type="number"
          id="availability"
          value={newAvailability}
          onChange={e => setNewAvailability(e.target.value)}
          required
        />

        <button type="submit">Update Availability</button>
      </form>
    </div>
  );
};

export default UpdateRoomAvailabilityPage;
