import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './HotelDetailsPage.css';
import { useNavigate } from 'react-router-dom';

const HotelDetailsPage = () => {
  const [hotel, setHotel] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [id, navigate]);

  if (!hotel) {
    return <div>Loading...</div>;
  }


  const handleUpdateClick = () => {
    navigate(`/hotel/update/${id}`);
  };

  const handleDeleteClick = async () => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    try {
      const response = await fetch(`http://localhost:3000/api/hotel-owner/${id}`, { method: 'DELETE', headers });
      if (!response.ok) {
        throw new Error('Failed to delete the hotel');
      }
      // Redirect to dashboard on success
      navigate('/hotel/dashboard');
    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  const handleUpdateRoomPricingClick = () => {
    navigate(`/hotel/update-room-pricing/${id}`);
  };

  const handleUpdateBlackoutDatesClick = () => {
    navigate(`/hotel/update-blackout-dates/${id}`);
  };

  const handleViewPromotionsClick = () => {
    navigate(`/hotel/${id}/promotions`);
  };

  const handleViewInquiriesClick = () => {
    navigate(`/hotel/${id}/inquiries`);
  };

  return (
    <div className="hotel-details">
      <h2>{hotel.name}</h2>
      <p>Price: ${hotel.price}</p>
      <p>Rating: {hotel.rating}</p>
      <p>Location: {hotel.location}</p>
      <p>City: {hotel.city}</p>
      <p>Capacity: {hotel.capacity}</p>
      <p>Description: {hotel.description}</p>
      <p>Space Available: {hotel.spaceAvailable}</p>
      <p>Blackout Dates: {hotel.blackoutDates}</p>
      <button onClick={handleUpdateClick}>Update Hotel</button>
      <button onClick={handleDeleteClick}>Delete Hotel</button>
      <button onClick={handleUpdateRoomPricingClick}>Update Room Pricing</button>
      <button onClick={handleUpdateBlackoutDatesClick}>Update Blackout Dates</button>
      <button onClick={() => navigate(`/hotel/update-availability/${id}`)}>Update Room Availability</button>
      <button onClick={handleViewPromotionsClick}>View Promotions</button>
      <button onClick={handleViewInquiriesClick}>View Inquiries</button>
    </div>
  );
};

export default HotelDetailsPage;
