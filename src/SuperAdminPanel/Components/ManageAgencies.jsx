import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './ManageAgencies.css';
import { useNavigate } from 'react-router-dom';

const ManageAgencies = () => {
    const [agencies, setAgencies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAgencies = async () => {
            const response = await fetch('http://localhost:3000/api/super-admin/getAllTravelAgencies', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setAgencies(data.data);
            }
        };
        fetchAgencies();
    }, []);


        // Inline styles
        const styles = {
            manageAgencies: {
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: '#000',
            },
            agenciesContent: {
                flexGrow: 1,
                padding: '20px',
                marginLeft: '250px',
            },
            searchBar: {
                width: '100%',
                padding: '10px',
                marginBottom: '20px',
                borderRadius: '4px',
                border: 'none',
                background: '#1f2937',
                color: 'white',
            },
            agencyList: {
                display: 'flex',
                flexDirection: 'column',
            },
            agencyCard: (disabled) => ({
                backgroundColor: disabled ? '#ff0000' : '#1f2937',
                color: 'white',
                padding: '20px',
                marginBottom: '10px',
                borderRadius: '8px',
                display: 'grid',
                gridTemplateColumns: '2fr 3fr auto',
                gap: '20px',
                alignItems: 'center',
                transition: 'background-color 0.3s ease',
            }),
            buttonGroup: {
                display: 'flex',
                gap: '10px',
            },
            button: {
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                color: 'white',
                background: '#1DA1F2',
                transition: 'background-color 0.2s',
            },
            disabledButton: {
                opacity: 0.5,
                cursor: 'not-allowed',
                background: '#555',
            },
            viewDetailsBtn: {
                backgroundColor: 'green',
            },
        };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const goToAgencyDetails = (agencyId) => {
        navigate(`/admin/agency/${agencyId}`);
    };

    const toggleAgencyStatus = async (agencyId, shouldDisable) => {
        const action = shouldDisable ? 'disable' : 'enable';
        const endpoint = `http://localhost:3000/api/super-admin/${action}_travelagency/${agencyId}`;
        
        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                },
                credentials: 'include',
            });

            if (response.ok) {
                setAgencies(agencies.map(agency => 
                    agency._id === agencyId ? { ...agency, disabled: shouldDisable } : agency
                ));
            } else {
                console.error('Failed to toggle agency status:', await response.text());
            }
        } catch (error) {
            console.error('Error toggling agency status:', error);
        }
    };

    const filteredAgencies = agencies.filter(agency =>
        agency.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={styles.manageAgencies}>
            <Sidebar />
            <div style={styles.agenciesContent}>
                <input
                    type="text"
                    placeholder="Search Agencies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchBar}
                />
                <div style={styles.agencyList}>
                    {agencies.map((agency) => (
                        <div key={agency._id} style={styles.agencyCard(agency.disabled)}>
                            <div>{agency.name}</div>
                            <div>{agency.email}</div>
                            <div style={styles.buttonGroup}>
                                <button
                                    onClick={() => toggleAgencyStatus(agency._id, true)}
                                    disabled={agency.disabled}
                                    style={agency.disabled ? { ...styles.button, ...styles.disabledButton } : styles.button}
                                >
                                    Disable
                                </button>
                                <button
                                    onClick={() => toggleAgencyStatus(agency._id, false)}
                                    disabled={!agency.disabled}
                                    style={!agency.disabled ? { ...styles.button, ...styles.disabledButton } : styles.button}
                                >
                                    Enable
                                </button>
                                <button
                                    onClick={() => goToAgencyDetails(agency._id)}
                                    style={{ ...styles.button, ...styles.viewDetailsBtn }}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageAgencies;
