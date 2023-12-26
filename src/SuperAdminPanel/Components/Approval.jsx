import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // Make sure this path is correct
import './Approval.css';

const Approval = () => {
    const [pendingAgencies, setPendingAgencies] = useState([]);

    useEffect(() => {
        const fetchTravelAgencies = async () => {
            const response = await fetch('http://localhost:3000/api/super-admin/getAllTravelAgencies', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                const filteredAgencies = data.data.filter(agency => agency.approved === 'Pending');
                setPendingAgencies(filteredAgencies);
            }
        };

        fetchTravelAgencies();
    }, []);

    const handleApprove = async (agencyId) => {
        await fetch(`http://localhost:3000/api/super-admin/approve_agency/${agencyId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json'
            }
        });
        setPendingAgencies(pendingAgencies.filter(agency => agency._id !== agencyId));
    };

    const handleReject = async (agencyId) => {
        await fetch(`http://localhost:3000/api/super-admin/reject_agency/${agencyId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json'
            }
        });
        setPendingAgencies(pendingAgencies.filter(agency => agency._id !== agencyId));
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={styles.approvalContainer}>
                {pendingAgencies.length > 0 ? (
                    pendingAgencies.map(agency => (
                        <div key={agency._id} style={styles.agencyCard}>
                            <h3 style={styles.agencyName}>{agency.name}</h3>
                            <p style={styles.agencyEmail}>{agency.email}</p>
                            <div style={styles.buttons}>
                                <button onClick={() => handleApprove(agency._id)} style={styles.approveButton}>Accept</button>
                                <button onClick={() => handleReject(agency._id)} style={styles.rejectButton}>Reject</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={styles.noPending}>No pending approvals.</p>
                )}
            </div>
        </div>
    );
};

// Inline CSS Styles
const styles = {
    approvalContainer: {
        flex: 1, 
        padding: '20px',
        marginLeft: '250px', 
        backgroundColor: '#15202B', 
        color: '#FFFFFF',
    },
    agencyCard: {
        backgroundColor: '#192734', 
        padding: '15px',
        marginBottom: '10px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
    },
    agencyName: {
        fontWeight: 'bold',
        color: '#1DA1F2', 
    },
    agencyEmail: {
        color: '#8899A6', 
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '10px',
    },
    approveButton: {
        backgroundColor: '#4CAF50', 
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    rejectButton: {
        backgroundColor: '#E0245E', 
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    noPending: {
        textAlign: 'center',
        color: '#8899A6',
    }
};

export default Approval;
