import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import './AdminDashboard.css';
import Sidebar from './Sidebar';
import Weather from './Weather';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [travelAgencyCount, setTravelAgencyCount] = useState(0);
    const [packageData, setPackageData] = useState([]);
    const [userTrends, setUserTrends] = useState([]);
    const [topPackages, setTopPackages] = useState([]);
    const [selectedCity, setSelectedCity] = useState('Islamabad'); // Default city

    useEffect(() => {
        // Fetch user count
        const fetchUserCount = async () => {
            try {
                const userResponse = await fetch('http://localhost:3000/api/super-admin/countUsers', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
                    }
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setUserCount(userData.count);
                }
            } catch (error) {
                console.error('Error fetching user count:', error);
            }
        };

        // Fetch travel agency count
        const fetchTravelAgencyCount = async () => {
            try {
                const agencyResponse = await fetch('http://localhost:3000/api/super-admin/countTravelAgencies', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
                    }
                });

                if (agencyResponse.ok) {
                    const agencyData = await agencyResponse.json();
                    setTravelAgencyCount(agencyData.count);
                }
            } catch (error) {
                console.error('Error fetching travel agency count:', error);
            }
        };

        // Fetch package data
        const fetchPackageData = async () => {
            try {
                const packageResponse = await fetch('http://localhost:3000/api/super-admin/getAllRatings', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
                    }
                });

                if (packageResponse.ok) {
                    const packageData = await packageResponse.json();
                    setPackageData(packageData.data);
                }
            } catch (error) {
                console.error('Error fetching package data:', error);
            }
        };

                // Fetch user trends
                const fetchUserTrends = async () => {
                    const response = await fetch('http://localhost:3000/api/super-admin/view_user_trend', {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
                        }
                    });
                
                    if (response.ok) {
                        const data = await response.json();
                        setUserTrends(data.data);
                    }
                };

                const fetchTopBookedPackages = async () => {
                    try {
                        const response = await fetch('http://localhost:3000/api/super-admin/view_trend', {
                            method: 'GET',
                            credentials: 'include',
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
                            }
                        });
        
                        if (response.ok) {
                            const data = await response.json();
                            setTopPackages(data.data);
                        }
                    } catch (error) {
                        console.error('Error fetching top booked packages:', error);
                    }
                };
        
                fetchTopBookedPackages();
        
                fetchUserTrends();

        // Fetch data
        fetchUserCount();
        fetchTravelAgencyCount();
        fetchPackageData();
    }, []);

    // Dashboard header style
const dashboardHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
};

    const data = {
        labels: packageData.map(pkg => pkg.name),
        datasets: [
            {
                label: 'Average Rating',
                data: packageData.map(pkg => pkg.avgRating),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    };
    // User Trends chart data
    const userTrendsData = {
        labels: userTrends.map(trend => trend._id),
        datasets: [
            {
                label: 'Total Bookings',
                data: userTrends.map(trend => trend.totalBookings),
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }
        ]
    };


    const topPackagesData = {
        labels: topPackages.map(pkg => `${pkg.name} - ${pkg.travelAgency.name}`),
        datasets: [
            {
                label: 'Total Bookings',
                data: topPackages.map(pkg => pkg.counttotalbookings),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    // Options for horizontal bar chart
    const options = {
        indexAxis: 'y', // This will make the chart horizontal
        responsive: true,
        scales: {
            x: {
                beginAtZero: true
            }
        }
    };

            // Dashboard main style
    const dashboardStyle = {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#000', // Black background for the entire dashboard
    };

    // Content container style
    const contentContainerStyle = {
        flex: 1,
        padding: '20px',
        marginLeft: '250px', // Assuming the sidebar width is 250px
    };

    // Chart container style
    const chartContainerStyle = {
        backgroundColor: '#1f2937', // Dark grey background
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };
    
        const cardStyle = {
            backgroundColor: '#1f2937', // Dark grey background
            borderRadius: '0.5rem',
            padding: '1rem',
            color: '#9ca3af', // Light grey text
            marginBottom: '1rem',
        };
    
        const counterCardStyle = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem',
            borderLeft: '4px solid #1DA1F2', // Twitter blue border
            color: '#fff',
        };
    
        

    return (
        <div style={dashboardStyle}>
        <Sidebar />
        <div style={contentContainerStyle}>
            <div style={dashboardHeaderStyle}>
                    <h1>Admin Dashboard</h1>
                    <Weather city={selectedCity} />
                </div>
            <div className="counters" style={cardStyle}>
                <div className="user-count" style={counterCardStyle}>
                    <h3>Total Users</h3>
                    <p>{userCount}</p>
                </div>
                <div className="travel-agency-count" style={counterCardStyle}>
                    <h3>Total Travel Agencies</h3>
                    <p>{travelAgencyCount}</p>
                </div>
            </div>
            <div className="chart" style={chartContainerStyle}>
                <Bar data={data} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
            </div>
            <div className="chart" style={chartContainerStyle}>
                <h2>User Trends</h2>
                <Bar data={userTrendsData} options={options} />
            </div>
            <div className="chart" style={chartContainerStyle}>
                <h2>Top 5 Booked Packages</h2>
                <Bar data={topPackagesData} options={options} />
            </div>
        </div>
        </div>
    );
};

export default AdminDashboard;
