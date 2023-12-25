import { useEffect, useState } from 'react';
import './BookingHistory.css';

const BookingHistory = () => {
    const [bookingHistory, setBookingHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookingHistory = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/getAllBookingHistory', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setBookingHistory(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBookingHistory();
    }, []);

    if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="booking-history-container">
            <h1>Booking History</h1>
            {bookingHistory.map((booking, index) => (
                <div key={index} className="booking-history-card">
                    <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                    <p><strong>Category:</strong> {booking.category}</p>
                    <p><strong>Hotel:</strong> {booking.hotel}</p>
                    <p><strong>Total Amount:</strong> ${booking.totalAmount}</p>
                    {/* Additional booking details can be added here */}
                </div>
            ))}
        </div>
    );
};

export default BookingHistory;
