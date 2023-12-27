import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddNewPropertyPage.css';

const AddNewPropertyPage = () => {
  const [propertyData, setPropertyData] = useState({
    name: '',
    price: 0,
    city: '',
    location: '',
    capacity: 0,
    spaceAvailable: 0,
    description: '',
    roomTypes: { type: '', price: 0, availability: 0 },
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('roomTypes')) {
      // for nested objects, we need to use the spread operator to copy the existing state
      const field = name.split('.')[1];
      setPropertyData(prevState => ({
        ...prevState,
        roomTypes: { ...prevState.roomTypes, [field]: value }
      }));
    } else {
      setPropertyData({ ...propertyData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    try {
      const response = await fetch('http://localhost:3000/api/hotel-owner/', { 
        method: 'POST', 
        headers, 
        body: JSON.stringify(propertyData) 
      });
      if (!response.ok) {
        throw new Error('Failed to create property');
      }
      navigate('/hotel/dashboard');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
<div className="add-new-property-page">
  <form onSubmit={handleSubmit}>
    <label htmlFor="name">Name:</label>
    <input type="text" id="name" name="name" value={propertyData.name} onChange={handleChange} placeholder="Name" required />
    <br />
    <label htmlFor="price">Price:</label>
    <input type="number" id="price" name="price" value={propertyData.price} onChange={handleChange} placeholder="Price" required min="0" />
    <br />
    <label htmlFor="city">City:</label>
    <input type="text" id="city" name="city" value={propertyData.city} onChange={handleChange} placeholder="City" required />
    <br />
    <label htmlFor="location">Location:</label>
    <input type="text" id="location" name="location" value={propertyData.location} onChange={handleChange} placeholder="Location" required />
    <br />
    <label htmlFor="capacity">Capacity:</label>
    <input type="number" id="capacity" name="capacity" value={propertyData.capacity} onChange={handleChange} placeholder="Capacity" required min="0" />
    <br />
    <label htmlFor="spaceAvailable">Space Available:</label>
    <input type="number" id="spaceAvailable" name="spaceAvailable" value={propertyData.spaceAvailable} onChange={handleChange} placeholder="Space Available" required min="0" />
    <br />
    <label htmlFor="description">Description:</label>
    <textarea id="description" name="description" value={propertyData.description} onChange={handleChange} placeholder="Description" required />
    <br />
    <label htmlFor="roomType">Room Type:</label>
    <input type="text" id="roomType" name="roomTypes.type" value={propertyData.roomTypes.type} onChange={handleChange} placeholder="Room Type" required />
    <br />
    <label htmlFor="roomPrice">Room Price:</label>
    <input type="number" id="roomPrice" name="roomTypes.price" value={propertyData.roomTypes.price} onChange={handleChange} placeholder="Room Price" required min="0" />
    <br />
    <label htmlFor="roomAvailability">Room Availability:</label>
    <input type="number" id="roomAvailability" name="roomTypes.availability" value={propertyData.roomTypes.availability} onChange={handleChange} placeholder="Room Availability" required min="0" />
    <br />
    <button type="submit">Add Property</button>
  </form>
</div>

  );
};

export default AddNewPropertyPage;
