import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './ManageHotelOwners.css';

const ManageHotelOwners = () => {
    const [hotelOwners, setHotelOwners] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchHotelOwners = async () => {
            const response = await fetch('http://localhost:3000/api/super-admin/getAllHotelOwners', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setHotelOwners(data.data);
            }
        };

        fetchHotelOwners();
    }, []);

    const styles = {
        manageHotelOwners: {
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: '#000',
        },
        hotelOwnersContent: {
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
        hotelOwnerList: {
            display: 'flex',
            flexDirection: 'column',
        },
        hotelOwnerCard: (disabled) => ({
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
        button: (disabled) => ({
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            color: 'white',
            background: disabled ? '#e0245e' : '#1da1f2', // Red for disable, Blue for enable
            transition: 'background-color 0.2s',
        }),
        disabledButton: {
            opacity: 0.5,
            cursor: 'not-allowed',
            background: '#555',
        },
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleHotelOwnerStatus = async (ownerId, disable) => {
        const endpoint = disable ? 'disable_hotelowner' : 'enable_hotelowner';
        const response = await fetch(`http://localhost:3000/api/super-admin/${endpoint}/${ownerId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        });

        if (response.ok) {
            const updatedOwners = hotelOwners.map(owner =>
                owner._id === ownerId ? { ...owner, disabled: disable } : owner
            );
            setHotelOwners(updatedOwners);
        }
    };


    

    const filteredHotelOwners = searchTerm
        ? hotelOwners.filter(owner => owner.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : hotelOwners;

        return (
            <div style={styles.manageHotelOwners}>
                <Sidebar />
                <div style={styles.hotelOwnersContent}>
                    <input
                        type="text"
                        placeholder="Search Hotel Owners"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchBar}
                    />
                    <div style={styles.hotelOwnerList}>
                        {hotelOwners.map((owner) => (
                            <div key={owner._id} style={styles.hotelOwnerCard(owner.disabled)}>
                                <div>{owner.name}</div>
                                <div>{owner.email}</div>
                                <div style={styles.buttonGroup}>
                                    <button
                                        onClick={() => toggleHotelOwnerStatus(owner._id, true)}
                                        disabled={owner.disabled}
                                        style={styles.button(true)}
                                    >
                                        Disable
                                    </button>
                                    <button
                                        onClick={() => toggleHotelOwnerStatus(owner._id, false)}
                                        disabled={!owner.disabled}
                                        style={styles.button(false)}
                                    >
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
    

export default ManageHotelOwners;
