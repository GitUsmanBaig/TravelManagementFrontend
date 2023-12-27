import React, { useState, useEffect } from 'react';
import ReservationCard from '../Components/ReservationCard';
import './ViewAllReservationsPage.css';

const ViewAllReservationsPage = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };
      
        try {
          const response = await fetch('http://localhost:3000/api/reservation', { headers });
      
         
          if (!response.ok) {
            const errorText = await response.text(); // or response.json() if the server sends JSON
            throw new Error(`Failed to fetch reservations: ${errorText}`);
          }
      
          const data = await response.json();
          setReservations(data);
        } catch (error) {
          console.error('Error:', error);

        }
      };

    fetchReservations();
  }, []);

  return (
    <div className="reservations-page">
      <h1>All Reservations</h1>
      <div className="reservations-container">
        {reservations.map(reservation => (
          <ReservationCard key={reservation._id} reservation={reservation} />
        ))}
      </div>
    </div>
  );
};

export default ViewAllReservationsPage;
