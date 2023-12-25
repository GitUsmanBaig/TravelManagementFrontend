import { useEffect, useState } from 'react';
import './UserBookings.css';

const UserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingBookingId, setEditingBookingId] = useState(null);
    const [updatedNoOfPersons, setUpdatedNoOfPersons] = useState(0);
    const [confirmationCode, setConfirmationCode] = useState('');

    
    const fetchBookings = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3000/user/getBookings', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setBookings(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        const confirmation = window.confirm("Are you sure you want to cancel this booking?");
        if (confirmation) {
            try {
                const response = await fetch(`http://localhost:3000/user/cancelBooking/${bookingId}`, {
                    method: 'PUT',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Failed to cancel booking. Status: ${response.status}`);
                }

                const updatedUser = await response.json();
                alert(`Booking cancelled successfully. Amount returned: ${updatedUser.bookingamount} is sent to your account`);

                // Refetch the bookings to get the updated list
                await fetchBookings();

                // Optionally, update additional user state here if needed
                // For example: setUser(updatedUser);
            } catch (err) {
                console.error('Error cancelling booking:', err);
                setError(err.message);
            }
        }
    };


    useEffect(() => {
        fetchBookings();
    }, []);

    const handleEditClick = (bookingId, noOfPersons) => {
        setEditingBookingId(bookingId);
        setUpdatedNoOfPersons(noOfPersons);
    };

    const handleUpdateBooking = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user/updateBooking/${editingBookingId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ noOfPersons: updatedNoOfPersons, token: confirmationCode }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update booking. Status: ${response.status}`);
            }

            const result = await response.text();
            alert(result);

            // Refetch the bookings to get the updated data
            await fetchBookings();

            // Reset editing state
            setEditingBookingId(null);
            setConfirmationCode('');
        } catch (err) {
            console.error('Error updating booking:', err);
            setError(err.message);
        }
    };

    if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="user-bookings-container">
            <h1>User Bookings</h1>
            {bookings.map((booking) => (
                <div key={booking._id} className="booking-card">
                    <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {booking.status}</p>
                    <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
                    <p><strong>Total Amount:</strong> ${booking.totalAmount}</p>

                    {editingBookingId === booking._id ? (
                        <>
                            <label htmlFor="noOfPersons">
                                Number of Persons:
                                <input
                                    type="number"
                                    id="noOfPersons"
                                    value={updatedNoOfPersons}
                                    onChange={(e) => setUpdatedNoOfPersons(e.target.value)}
                                    min="1"
                                />
                            </label>
                            <br />
                            <label htmlFor="confirmationCode">
                                Confirmation Code:
                                <input
                                    type="text"
                                    id="confirmationCode"
                                    value={confirmationCode}
                                    onChange={(e) => setConfirmationCode(e.target.value)}
                                />
                            </label>
                            <br />
                            <button onClick={handleUpdateBooking}>Confirm Update</button>
                        </>
                    ) : (
                        <>
                            <p><strong>Number of Persons:</strong> {booking.noOfPersons}</p>
                            <button onClick={() => handleEditClick(booking._id, booking.noOfPersons)}>Update Booking</button>
                            <button onClick={() => handleCancelBooking(booking._id)}>Cancel Booking</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default UserBookings;
