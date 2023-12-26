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
        <div className="manage-agencies">
            <Sidebar />
            <div className="agencies-content">
                <input
                    type="text"
                    placeholder="Search Agencies"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-bar"
                />
                <div className="agency-list">
                    {filteredAgencies.map((agency) => (
                        <div key={agency._id} className={`agency-card ${agency.disabled ? 'disabled' : ''}`}>
                            <div className="agency-details">
                                <p className="agency-name">{agency.name}</p>
                                <p className="agency-email">{agency.email}</p>
                            </div>
                            <div className="agency-actions">
                                <button
                                    onClick={() => toggleAgencyStatus(agency._id, true)}
                                    disabled={agency.disabled}
                                    className="disable-btn">
                                    Disable
                                </button>
                                <button
                                    onClick={() => toggleAgencyStatus(agency._id, false)}
                                    disabled={!agency.disabled}
                                    className="enable-btn">
                                    Enable
                                </button>
                                <button
                                    onClick={() => goToAgencyDetails(agency._id)}
                                    className="view-details-btn" 
                                    style={{ backgroundColor: 'green' }}>
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
