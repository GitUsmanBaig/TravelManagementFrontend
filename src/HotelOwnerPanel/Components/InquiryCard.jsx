
import React from 'react';
import './InquiryCard.css'; 

const InquiryCard = ({ inquiry }) => {
  return (
    <div className="inquiry-card">
      <h3>Guest: {inquiry.guest.name}</h3>
      <p>Email: {inquiry.guest.email}</p>
      <p>Inquiry: {inquiry.message}</p>

    </div>
  );
};

export default InquiryCard;
