import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingHistory.css';

const BookingHistory = () => {
    const [bookingHistory, setBookingHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

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

    const handleAddRating = async (bookingId) => {
        try {
            const response = await fetch(`http://localhost:3000/user/addRating/${bookingId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            alert("Rating added successfully!")
            navigate('/user/dashboard');
        } catch (err) {
            setError(err.message);
        }
    }

    const handleAddReview = async (bookingId) => {
        try {
            const response = await fetch(`http://localhost:3000/user/addReview/${bookingId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ review }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            alert("Review added successfully!")
            navigate('/user/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSendFeedback = async (bookingId) => {
        try {
            const response = await fetch(`http://localhost:3000/user/addComplaint/${bookingId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ feedback }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            alert("Feedback sent successfully!")
            navigate('/user/dashboard');
        }
        catch (err) {
            setError(err.message);
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
                    <div className="interaction-section">
                        <select value={rating} onChange={(e) => setRating(e.target.value)}>
                            <option value="">Rate Package</option>
                            {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                        <button onClick={() => handleAddRating(booking._id)}>Add Rating</button>

                        <input
                            type="text"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Add a review"
                        />
                        <button onClick={() => handleAddReview(booking._id)}>Add Review</button>

                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Send major concerns/issues"
                        />
                        <button onClick={() => handleSendFeedback(booking._id)}>Send Feedback</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookingHistory;
