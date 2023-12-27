import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the stored token
    navigate('/hotel/login'); // Navigate to the login page
  };

  const handleViewReservations = () => {
    navigate('/hotel/reservations'); 
  };

  return (
    <nav>
      <h1>Hotel Dashboard</h1>
      <button onClick={handleViewReservations}>View Reservations</button>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
