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

    return (
        <div style={containerStyle}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }}>{agency.name}</h1>
            <img src={agency.logoUrl} alt={`${agency.name} Logo`} style={logoStyle} />
            <p style={textStyle}>Email: {agency.email}</p>
            <p style={textStyle}>Helpline: {agency.helplineNumber}</p>
            <p style={textStyle}>Number of Packages: {agency.noOfPackages}</p>
        </div>
    );
};

export default IndividualTravelAgency;
