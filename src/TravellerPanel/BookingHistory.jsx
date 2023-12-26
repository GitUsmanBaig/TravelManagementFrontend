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

    const FeedbackType = {
        PACKAGE_OWNER: 'Package Owner',
        HOTEL: 'Hotel',
    };

    const [feedbackType, setFeedbackType] = useState(FeedbackType.PACKAGE_OWNER);

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
                method: 'POST',
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

    const handleAddHotelReview = async (hotelId) => {
        try {
            const response = await fetch(`http://localhost:3000/user/addHotelReview/${hotelId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating, review }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            alert("Hotel feedback sent successfully!")
            navigate('/user/dashboard');
        } catch (err) {
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
                    <p><strong>Package Name: </strong> {booking.name}</p>
                    <p><strong>Place:</strong> {booking.city}</p>
                    <p><strong>Description:</strong> {booking.description}</p>
                    <p><strong>Hotel:</strong> {booking.hotel}</p>
                    <p><strong>Total Amount:</strong> ${booking.totalAmount}</p>
                    <p><strong>No of Persons:</strong> {booking.noOfPersons}</p>
                    <p><strong>Travel Agency:</strong> {booking.travelAgency}</p>
                    <p><strong>Solo Price:</strong> ${booking.price}</p>
                    <div className="interaction-section">
                        <label>
                            Feedback Type:
                            <select value={feedbackType} onChange={(e) => setFeedbackType(e.target.value)}>
                                <option value={FeedbackType.PACKAGE_OWNER}>Send Feedback to Package Owner</option>
                                <option value={FeedbackType.HOTEL}>Send Feedback to Hotel</option>
                            </select>
                        </label>

                        {feedbackType === FeedbackType.PACKAGE_OWNER && (
                            <>
                                {/* Package owner feedback form fields */}
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
                            </>
                        )}
                        {feedbackType === FeedbackType.HOTEL && (
                            <>
                                <input
                                    type="text"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    placeholder="Add a rating"
                                />
                                <input
                                    type="text"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    placeholder="Add a review"
                                />
                                <button onClick={() => handleAddHotelReview(booking.travelAgencyId)}>Send Feedback</button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookingHistory;
