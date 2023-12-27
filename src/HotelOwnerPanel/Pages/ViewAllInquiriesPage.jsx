import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InquiryCard from '../Components/InquiryCard';
import './ViewAllInquiriesPage.css'; 

const ViewAllInquiriesPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const { hotelId } = useParams();

  useEffect(() => {
    const fetchInquiries = async () => {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      try {
        const response = await fetch(`http://localhost:3000/api/hotel-owner/${hotelId}/inquiries`, { headers });
        if (!response.ok) {
          throw new Error('Failed to fetch inquiries');
        }
        const data = await response.json();
        setInquiries(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchInquiries();
  }, [hotelId]);

  return (
    <div className="inquiries-page">
      <h1>Inquiries for {hotelId}</h1>
      {inquiries.map(inquiry => (
        <InquiryCard key={inquiry._id} inquiry={inquiry} />
      ))}
    </div>
  );
};

export default ViewAllInquiriesPage;
