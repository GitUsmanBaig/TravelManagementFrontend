
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hotel/details/${property._id}`);
  };

  return (
    <div className="property-card" onClick={handleClick}>
      <h3>{property.name}</h3>
      <p>Price: ${property.price}</p>
      <p>Rating: {property.rating}</p>
      <p>City: {property.city}</p>
    </div>
  );
};

export default PropertyCard;
