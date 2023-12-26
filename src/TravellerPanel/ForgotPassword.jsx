import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [CNIC, setCNIC] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/user/forgot_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, CNIC }),
            });

            if (!response.ok) {
                throw new Error('Failed to recover password');
            }
            
            setMessage(`Email with your password has been sent`);
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="forgot-password-container">
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    value={CNIC}
                    onChange={(e) => setCNIC(e.target.value)}
                    placeholder="CNIC"
                    required
                />
                <button type="submit">Recover Email</button>
                <p>
                    Back to
                    <Link to="/user/login"
                        style={{
                            textDecoration: 'none',
                            color: 'blue',
                            marginLeft: '5px'
                        }}>
                    Login Page
                    </Link>
                </p>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ForgotPassword;
