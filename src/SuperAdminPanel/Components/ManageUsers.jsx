import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from './Sidebar';
import './ManageUsers.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:3000/api/super-admin/getAllUsers', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data.data);
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleUserStatus = async (userId, disable) => {
        const endpoint = disable ? 'disable_user' : 'enable_user';
        const response = await fetch(`http://localhost:3000/api/super-admin/${endpoint}/${userId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        });

        if (response.ok) {
            const updatedUsers = users.map(user =>
                user._id === userId ? { ...user, disabled: disable } : user
            );
            setUsers(updatedUsers);
        }
    };

    const filteredUsers = searchTerm
        ? users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : users;

    return (
        <div className="manage-users">
            <Sidebar />
            <div className="users-content">
                <input
                    type="text"
                    placeholder="Search Users"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-bar"
                />
                <div className="user-list">
                    {filteredUsers.map((user) => (
                        <div key={user._id} className={`user-card ${user.disabled ? 'disabled' : ''}`}>
                            <div>{user.name}</div>
                            <div>{user.email}</div>
                            <div className="button-group">
                                <button
                                    onClick={() => toggleUserStatus(user._id, true)}
                                    disabled={user.disabled}
                                >
                                    Disable
                                </button>
                                <button
                                    onClick={() => toggleUserStatus(user._id, false)}
                                    disabled={!user.disabled}
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

export default ManageUsers;
