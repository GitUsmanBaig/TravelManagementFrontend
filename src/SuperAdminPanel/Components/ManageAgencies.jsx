import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './ManageAgencies.css';

const ManageAgencies = () => {
    const [agencies, setAgencies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    const toggleAgencyStatus = async (agencyId, disable) => {
        try {
            // Set the appropriate endpoint based on whether you want to disable or enable the agency
            const endpoint = disable ? 'disable_travelagency' : 'enable_travelagency'; // Adjust these endpoints based on your actual API routes
            const response = await fetch(`http://localhost:3000/api/super-admin/${endpoint}/${agencyId}`, {
                method: 'PUT', // Assuming you use PUT method for enabling/disabling
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                },
                credentials: 'include',
            });
    
            if (response.ok) {
                // On success, update the local state to reflect the new status of the agency
                setAgencies(agencies.map(agency => 
                    agency._id === agencyId ? { ...agency, disabled: disable } : agency
                ));
            } else {
                // Handle any errors, such as showing a notification to the user
                console.error('Failed to update agency status:', await response.text());
            }
        } catch (error) {
            console.error('Error updating agency status:', error);
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
                            <div>{agency.name}</div>
                            <div>{agency.email}</div>
                            <div>{agency.noOfPackages}</div>
                            <div className="button-group">
                                <button
                                    onClick={() => toggleAgencyStatus(agency._id, true)}
                                    disabled={agency.disabled}>
                                    Disable
                                </button>
                                <button
                                    onClick={() => toggleAgencyStatus(agency._id, false)}
                                    disabled={!agency.disabled}>
                                    Enable
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
