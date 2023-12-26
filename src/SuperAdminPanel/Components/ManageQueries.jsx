import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './ManageQueries.css';

const ResponseModal = ({ feedbackId, feedbackText, onSubmit, onClose }) => {
  const [response, setResponse] = useState('');

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Respond to Query</h2>
        <p>{feedbackText}</p>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Write your response"
        />
        <div className="modal-actions">
          <button onClick={() => onSubmit(feedbackId, response)}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const ManageQueries = () => {
  const [queries, setQueries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentFeedbackId, setCurrentFeedbackId] = useState(null);
  const [currentFeedbackText, setCurrentFeedbackText] = useState('');

  useEffect(() => {
    const fetchQueries = async () => {
      const response = await fetch('http://localhost:3000/api/super-admin/getAllFeedbacks', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setQueries(data.data);
      }
    };
    fetchQueries();
  }, []);

  const openResponseModal = (feedback) => {
    setCurrentFeedbackId(feedback.feedbackId); // Ensure this ID is the feedback ID
    setCurrentFeedbackText(feedback.feedback);
    setShowModal(true);
  };

  const closeResponseModal = () => {
    setShowModal(false);
    setCurrentFeedbackId(null);
    setCurrentFeedbackText('');
  };

  const handleResponseSubmit = async (feedbackId, responseText) => {
    const feedbackStatus = await fetch(`http://localhost:3000/api/super-admin/reply-feedback/${feedbackId}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify({ response: responseText }),
    });

    if (feedbackStatus.ok) {
      // Handle successful submission
      closeResponseModal();
      // Optionally, update the queries list to reflect the response
      setQueries(queries.filter(q => q.feedbackId !== feedbackId));
    } else {
      // Handle error in submission
      console.error('Failed to submit response:', await feedbackStatus.text());
    }
  };

  return (
    <div className="manage-queries">
      <Sidebar />
      <div className="queries-content">
        {queries.map((feedback) => (
          <div key={feedback.feedbackId} className="query-card" onClick={() => openResponseModal(feedback)}>
            <p>{feedback.feedback}</p>
          </div>
        ))}
      </div>
      {showModal && (
        <ResponseModal
          feedbackId={currentFeedbackId}
          feedbackText={currentFeedbackText}
          onSubmit={handleResponseSubmit}
          onClose={closeResponseModal}
        />
      )}
    </div>
  );
};

export default ManageQueries;
