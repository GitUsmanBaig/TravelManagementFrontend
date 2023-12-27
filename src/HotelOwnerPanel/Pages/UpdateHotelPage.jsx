
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateHotelPage = () => {
  const [hotel, setHotel] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotelData = async () => {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      try {
        const response = await fetch(`http://localhost:3000/api/hotel-owner/${id}`, { headers });
        if (!response.ok) {
          throw new Error('Failed to fetch hotel details');
        }
        const data = await response.json();
        setHotel(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchHotelData();
  }, [id]);

  const handleInputChange = (e) => {
    setUpdatedFields({ ...updatedFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    try {
      const response = await fetch(`http://localhost:3000/api/hotel-owner/${id}`, { 
        method: 'PUT', 
        headers, 
        body: JSON.stringify(updatedFields) 
      });
      if (!response.ok) {
        throw new Error('Failed to update the hotel');
      }
      navigate(`/hotel/details/${id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Update Hotel Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for hotel details */}
        <label>
          Hotel Name:
          <input type="text" name="name" defaultValue={hotel.name} onChange={handleInputChange} />
        </label><br/>
        <label>
            Price:
            <input type="number" name="price" defaultValue={hotel.price} onChange={handleInputChange} />
        </label><br/>
        <label>
            City:
            <input type="text" name="city" defaultValue={hotel.city} onChange={handleInputChange} />
        </label><br/>
        <label>
            Location:
            <input type="text" name="location" defaultValue={hotel.location} onChange={handleInputChange} />
        </label><br/>
        <label>
            Capacity:
            <input type="number" name="capacity" defaultValue={hotel.capacity} onChange={handleInputChange} />
        </label><br/>
        <label>
            Space Available:
            <input type="number" name="spaceAvailable" defaultValue={hotel.spaceAvailable} onChange={handleInputChange} />
        </label><br/>
        <label>
            Description:
            <input type="text" name="description" defaultValue={hotel.description} onChange={handleInputChange} />
        </label><br/>

        <button type="submit">Update Hotel</button>
      </form>
    </div>
  );
};

export default UpdateHotelPage;
