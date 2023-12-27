import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ViewReservationDetailsPage.css';

const ViewReservationDetailsPage = () => {
  const [reservation, setReservation] = useState(null);
  const { reservationId } = useParams();

  useEffect(() => {
    const fetchReservationDetails = async () => {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      try {
        const response = await fetch(`http://localhost:3000/api/reservation/${reservationId}`, { headers });
        if (!response.ok) {
          throw new Error('Failed to fetch reservation details');
        }
        const data = await response.json();
        setReservation(data);
      } catch (error) {
        console.error('Error:', error);
        
      }
    };

    fetchReservationDetails();
  }, [reservationId]);

  if (!reservation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="reservation-details-page">
      <h1>Reservation Details</h1>
      <div>
        <p>Hotel: {reservation.hotel.name}</p>
        <p>Guest: {reservation.guest.name}</p>
        <p>Check-in: {reservation.checkInDate}</p>
        <p>Check-out: {reservation.checkOutDate}</p>
        <p>Rooms Booked: {reservation.roomsBooked}</p>
        <p>Number of Guests: {reservation.numberOfGuests}</p>
        <p>Total Amount: {reservation.totalAmount}</p>
        <p>Status: {reservation.status}</p>
        <p>Booking Date: {reservation.bookingDate}</p>
      </div>
    </div>
  );
};

export default ViewReservationDetailsPage;
