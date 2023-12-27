import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ReservationCard.css';

const ReservationCard = ({ reservation }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/reservations/details/${reservation._id}`);
  };

  const handleUpdateStatusClick = () => {
    navigate(`/reservations/update-status/${reservation._id}`);
  };


  return (
    <div className="reservation-card" onClick={handleClick}>
      <h2>Reservation: {reservation._id}</h2>
      <p>Hotel: {reservation.hotel.name}</p>
      <p>Guest: {reservation.guest.name}</p>
      <p>Check-in: {reservation.checkInDate}</p>
      <p>Check-out: {reservation.checkOutDate}</p>
      <p>Rooms Booked: {reservation.roomsBooked}</p>
      <button onClick={handleUpdateStatusClick}>Update Status</button>
    </div>
  );
};

export default ReservationCard;
