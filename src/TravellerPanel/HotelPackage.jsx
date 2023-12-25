// TravellerPanel/Pages/HotelPackage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './HotelPackage.css'; // CSS file for styling

const HotelPackage = () => {
    const { packageId } = useParams(); // Get the `packageId` from the URL
    const [hotel, setHotel] = useState(null);
    const [packageInfo, setPackageInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noOfPersons, setNoOfPersons] = useState(1);
    const [confirmationCode, setConfirmationCode] = useState(''); // State for the confirmation code
    const [isBookingSuccessful, setIsBookingSuccessful] = useState(false); // New state for tracking booking success

    useEffect(() => {
        const fetchPackageAndHotel = async () => {
            setIsLoading(true);
            try {
                // Fetch package details
                const packageResponse = await fetch(`http://localhost:3000/user/getPackageById/${packageId}`, {
                    method: 'GET',
                    credentials: 'include', // Ensure credentials are included
                });

                if (!packageResponse.ok) {
                    throw new Error('Failed to fetch package details. Status: ' + packageResponse.status);
                }

                const packageData = await packageResponse.json();
                setPackageInfo(packageData);

                // Fetch hotel details using the hotel ID from the package data
                const hotelResponse = await fetch(`http://localhost:3000/user/getHotelofPackage/${packageData.hotel}`, {
                    method: 'GET',
                    credentials: 'include', // Ensure credentials are included
                });

                if (!hotelResponse.ok) {
                    throw new Error('Failed to fetch hotel details. Status: ' + hotelResponse.status);
                }

                const hotelData = await hotelResponse.json();
                setHotel(hotelData);

            } catch (err) {
                console.error('Error fetching package/hotel details:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPackageAndHotel();
    }, [packageId]);

    const handleBooking = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user/bookPackage/${packageId}`, {
                method: 'PUT',
                credentials: 'include', // To include cookies (auth token)
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ noOfPersons }),
            });

            if (!response.ok) {
                throw new Error(`Failed to book package. Status: ${response.status}`);
            }

            const result = await response.text();
            alert(result); // Display the result message from server
            setIsBookingSuccessful(true); // Set the booking success state to true
        } catch (err) {
            console.error('Error booking package:', err);
            setError(err.message);
        }
    };

    const handleConfirmBooking = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user/confirmationPackage/${packageId}`, {
                method: 'PUT',
                credentials: 'include', // To include cookies (auth token)
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: confirmationCode }),
            });

            if (!response.ok) {
                throw new Error(`Failed to confirm booking. Status: ${response.status}`);
            }

            const result = await response.text();
            alert(result); // Display the result message from server
        } catch (err) {
            console.error('Error confirming booking:', err);
            setError(err.message);
        }
    };

    if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="hotel-package-container">
            <div className="hotel-package-content">
                {packageInfo && (
                    <div className="package-info-section">
                        <h2 className="package-title">{packageInfo.name}</h2>
                        <p className="package-description">{packageInfo.description}</p>
                        {/* Additional package details here */}
                    </div>
                )}

                {hotel && (
                    <div className="hotel-info-section">
                        <h3 className="hotel-name">Hotel: {hotel.name}</h3>
                        <div className="hotel-images">
                            {hotel.imagePaths.map((path, index) => (
                                <img key={index} src={path} alt={`Hotel ${hotel.name}`} className="hotel-image" />
                            ))}
                        </div>
                        <p className="hotel-description">{hotel.description}</p>
                        {/* Additional hotel details here */}
                    </div>
                )}

                <div className="booking-controls">
                    <div className="booking-section">
                        <label htmlFor="noOfPersons" className="booking-label">
                            Number of Persons:
                            <input
                                type="number"
                                id="noOfPersons"
                                className="booking-input"
                                value={noOfPersons}
                                onChange={(e) => setNoOfPersons(e.target.value)}
                                min="1"
                            />
                        </label>
                        <button className="booking-button" onClick={handleBooking}>Book Package</button>
                    </div>

                    {isBookingSuccessful && (
                        <div className="confirmation-section">
                            <label htmlFor="confirmationCode" className="confirmation-label">
                                Confirmation Code:
                                <input
                                    type="text"
                                    id="confirmationCode"
                                    className="confirmation-input"
                                    value={confirmationCode}
                                    onChange={(e) => setConfirmationCode(e.target.value)}
                                />
                            </label>
                            <button className="confirmation-button" onClick={handleConfirmBooking}>Confirm Booking</button>
                        </div>
                    )}
                </div>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );

};

export default HotelPackage;
