import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Computer from '../../../public/Computer';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [CNIC, setCNIC] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/api/super-admin/login_admin', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log('Login successful:', data);
                navigate('/admin/admin-dashboard'); // Using navigate instead of history.push
            } else {
                setError(data.message || 'Failed to login');
            }
        } catch (err) {
            setError('Server error: ' + err.message);
        }
    };



    const handleForgotPassword = async () => {
        if (!email || !CNIC) {
            setError('Please enter your email and CNIC to reset password');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/super-admin/forgot_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, CNIC }),
            });

            const data = await response.json();

            if (response.status === 200) {
                alert('Password reset instructions sent. Please check your inbox.');
                setShowModal(false);
            } else {
                setError(data.message || 'Failed to send password reset instructions');
            }
        } catch (err) {
            setError('Server error: ' + err.message);
        }
    };

    return (
        <div>
            <div className="login-container"
                 style={{
                    position: "relative",
                    left: "100px",
                    top: "140px",
                    backgroundColor: "#192734", 
                    color: "white", 
                }}
            >
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
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
                    <button type="submit">Login</button>
                    {error && <p className="error">{error}</p>}
                    <p>
                        Don't have an account? <span onClick={() => navigate('/admin/register')}>Sign Up</span>
                    </p>
                </form>

                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                            <h3>Forgot Password</h3>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="CNIC"
                                value={CNIC}
                                onChange={(e) => setCNIC(e.target.value)}
                                required
                            />
                            {error && <p className="error">{error}</p>}
                            <button onClick={handleForgotPassword}>Reset Password</button>
                        </div>
                    </div>
                )}

                <button onClick={() => setShowModal(true)}>Forgot Password?</button>
            </div>
            <div className="canvas-container"
                style={{
                    width: '100%',
                    position: "relative",
                    left: "550px",
                    top: "-230px",
                    border : "none",
                }}
            >
                <Canvas camera={{ position: [0, 2, 2], far: 1000 }}>
                    <ambientLight />
                    <Suspense fallback={null}>
                        <Computer />
                        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1} />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
};

export default Login;
