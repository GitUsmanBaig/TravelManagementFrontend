import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Address, setAddress] = useState('');
    const [CNIC, setCNIC] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/api/super-admin/signup_admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, CNIC, Address }),
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log('Signup successful:', data);
                navigate('/admin/login'); // Redirect to login page
            } else {
                setError(data.message || 'Failed to sign up');
            }
        } catch (err) {
            setError('Server error: ' + err.message);
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Address" 
                    value={Address} 
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="CNIC" 
                    value={CNIC} 
                    onChange={(e) => setCNIC(e.target.value)}
                />
                <button type="submit">Sign Up</button>
                {error && <p className="error">{error}</p>}
                <p>
                    Already have an account? <span onClick={() => navigate('/admin/login')}>Login</span>
                </p>
            </form>
        </div>
    );
};

export default Signup;
