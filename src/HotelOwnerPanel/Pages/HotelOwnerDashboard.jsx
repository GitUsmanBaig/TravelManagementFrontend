import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import PropertyCard from '../Components/PropertyCard';

const HotelOwnerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/hotel/login');
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      try {
        const response = await fetch('http://localhost:3000/api/hotel-owner/', { headers });
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }

        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
        
      }
    };

    fetchData();
  }, [navigate]);

    const handleAddNewProperty = () => {
    navigate('/hotel/add-property');
    };

    const handleViewAllReviews = () => {
    navigate('/hotel/reviews');
    };

  return (
    <div>
      <Navbar />
      <button onClick={handleAddNewProperty} className="add-new-property-button">Add New Property</button>
      <button onClick={handleViewAllReviews} className="view-all-reviews-button">Customer Reviews</button>
      <div className="properties-container">
        {properties.map(property => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default HotelOwnerDashboard;
