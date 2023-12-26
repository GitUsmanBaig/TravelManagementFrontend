import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
    const [packages, setPackages] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showComments, setShowComments] = useState({});
    const navigate = useNavigate();

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

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setPackages(data.data);
            setFilteredPackages(data.data); // Initialize filtered packages
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    useEffect(() => {
        setFilteredPackages(
            packages.filter(pkg =>
                pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, packages]);

    const toggleComments = (packageId) => {
        setShowComments(prevState => ({
            ...prevState,
            [packageId]: !prevState[packageId]
        }));
    };


    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3000/user/logout', {
                method: 'GET',
                credentials: 'include',
            });
            navigate('/user/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handlePackageClick = (packageId) => {
        navigate(`/user/hotelofpackage/${packageId}`);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <>
            <nav className="navbar">
                <Link to="/user/profile">Profile</Link>
                <Link to="/user/bookings">Bookings</Link>
                <Link to="/user/booking-history">Booking History</Link>
                <Link to="/user/feedbacksSent">Feedbacks</Link>
                <button onClick={handleLogout}
                    style={{
                        width: "8%"
                    }}
                >Logout</button>
            </nav>
            <div className="dashboard-container">
                <h1>Package Dashboard</h1>
                <input
                    type="text"
                    placeholder="Search Packages"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-bar"
                    style={{
                        width: "98%"
                    }}
                />
                <div className="packages-list">
                    {filteredPackages.map(pkg => (
                        <div key={pkg._id} className="package-card">
                            <img src={pkg.imageUrl} alt={pkg.name} className="package-image" />
                            <div className="package-info" onClick={() => handlePackageClick(pkg._id)}>
                                <h2>{pkg.name}</h2>
                                <p>{pkg.description}</p>
                                <p>City: {pkg.city}</p>
                                <p>Start Date: {new Date(pkg.startDate).toLocaleDateString()}</p>
                                <p>End Date: {new Date(pkg.endDate).toLocaleDateString()}</p>
                                <p>Total Amount: ${pkg.totalAmount}</p>
                            </div>
                            <div className="rating-and-comments">
                                <b
                                    style={{
                                        fontSize: "18px"
                                    }}> <p
                                        className='rating'>Average Rating: {pkg.avgRating || 'Not Rated'}</p></b>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    toggleComments(pkg._id);
                                }}>
                                    {showComments[pkg._id] ? 'Hide Comments' : 'Show Comments'}
                                </button>
                                {showComments[pkg._id] && (
                                    <div className="comments-section">
                                        {pkg.reviews.length > 0 ? (
                                            pkg.reviews.map((review, index) => <p key={index}>{review}</p>)
                                        ) : (
                                            <p>No comments available</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

};

export default UserDashboard;
