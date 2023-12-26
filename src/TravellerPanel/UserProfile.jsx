import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('http://localhost:3000/user/getProfile', {
                    method: 'GET',
                    credentials: 'include', // Necessary to include the cookie
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setUserProfile(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleUpdateClick = () => {
        navigate('/user/update_profile');
    };

    if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (<>
        <div className="user-profile-container">
            <h1>User Profile</h1>
            {userProfile && (
                <div className="user-profile">
                    <p><strong>Name:</strong> {userProfile.name}</p>
                    <p><strong>Email:</strong> {userProfile.email}</p>
                    <p><strong>CNIC:</strong> {userProfile.CNIC}</p>
                    <p><strong>Contact:</strong> {userProfile.contact}</p>
                    <p><strong>Preferences:</strong> {userProfile.preferences.join(', ')}</p>
                    <button onClick={handleUpdateClick}>Update Credentials</button>
                    {/* Additional user info can be added here */}
                </div>
            )}

        </div>
    </>
    );
};

export default UserProfile;
