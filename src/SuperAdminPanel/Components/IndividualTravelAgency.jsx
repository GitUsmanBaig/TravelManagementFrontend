// IndividualTravelAgency.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const IndividualTravelAgency = () => {
    const { agencyId } = useParams();
    const [agency, setAgency] = useState(null);

    useEffect(() => {
        const fetchAgency = async () => {
            const response = await fetch(`http://localhost:3000/api/super-admin/getTravelAgencyById/${agencyId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setAgency(data.data);
            }
        };

        fetchAgency();
    }, [agencyId]);

    if (!agency) {
        return <div>Loading...</div>;
    }

    // Inline styles
    const containerStyle = {
        backgroundColor: '#15202b',
        color: '#fff',
        padding: '20px',
        borderRadius: '8px',
        margin: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
    };


    const logoStyle = {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '3px solid #1da1f2',
        margin: '0 auto',
        display: 'block',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
    };

    const textStyle = {
        fontSize: '18px',
        margin: '5px 0',
    };



    const feedbackSectionStyle = {
        backgroundColor: '#10171e',
        padding: '10px',
        borderRadius: '8px',
        margin: '20px 0',
    };


    const feedbackStyle = {
        backgroundColor: '#192734', 
        padding: '15px',
        borderRadius: '8px',
        margin: '20px 0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
    };

    const feedbackItemStyle = {
        backgroundColor: '#10171e', 
        color: '#fff',
        padding: '10px',
        borderRadius: '4px',
        margin: '10px 0',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.25)',
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }}>{agency.name}</h1>
            <img src={agency.logoUrl} alt={`${agency.name} Logo`} style={logoStyle} />
            <p style={textStyle}>Email: {agency.email}</p>
            <p style={textStyle}>Helpline: {agency.helplineNumber}</p>
            <p style={textStyle}>Number of Packages: {agency.noOfPackages}</p>
            <div style={feedbackSectionStyle}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1da1f2', marginBottom: '20px' }}>User Feedback</h2>
            <div style={feedbackStyle}>
                {agency.userFeedback && agency.userFeedback.length > 0 ? (
                    agency.userFeedback.map(fb => (
                        <div key={fb._id} style={feedbackItemStyle}>
                            <p>{fb.feedback}</p>
                        </div>
                    ))
                ) : (
                    <p>No feedback available.</p>
                )}
            </div>
            </div>
        </div>
    );
};

export default IndividualTravelAgency;
