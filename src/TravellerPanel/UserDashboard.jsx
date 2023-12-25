// TravellerPanel/Pages/UserDashboard.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserDashboard.css'; // Make sure the CSS file is in the same directory

const UserDashboard = () => {
    const [packages, setPackages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3000/user/logout', {
                method: 'GET',
                credentials: 'include', // Necessary to include the cookie
            });
            navigate('/user/login'); // Navigate to login after successful logout
        } catch (error) {
            console.error('Logout failed:', error);
        }// Adjust according to your login route
    };

    useEffect(() => {
        const fetchPackages = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:3000/user/getAllPackages', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                const text = await response.text(); // First get the text

                try {
                    const data = JSON.parse(text); // Then parse it as JSON
                    setPackages(data.data);
                } catch (e) {
                    // If JSON.parse() fails, it means it wasn't JSON (likely an HTML response)
                    console.error("The response is not valid JSON:", text);
                    setError("The server did not return a JSON response.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPackages();
    }, []);

    const handlePackageClick = (packageId) => {
        navigate(`/user/hotelofpackage/${packageId}`);

    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <nav className="navbar">
                <Link to="/profile">Profile</Link>
                <Link to="/bookings">Bookings</Link>
                <Link to="/booking-history">Booking History</Link>
                <Link to="/feedbacks">Feedbacks</Link>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <div className="dashboard-container">
                <h1>Package Dashboard</h1>
                <div className="packages-list">
                    {packages.map((pkg) => (
                        <div key={pkg._id} className="package-card" onClick={() => handlePackageClick(pkg._id)}>
                            <img src={pkg.imageUrl} alt={pkg.name} className="package-image" />
                            <div className="package-info">
                                <h2>{pkg.name}</h2>
                                <p>{pkg.description}</p>
                                <p>City: {pkg.city}</p>
                                <p>Start Date: {new Date(pkg.startDate).toLocaleDateString()}</p>
                                <p>End Date: {new Date(pkg.endDate).toLocaleDateString()}</p>
                                <p>Total Amount: ${pkg.totalAmount}</p>
                                {/* Additional package details can be added here */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default UserDashboard;
