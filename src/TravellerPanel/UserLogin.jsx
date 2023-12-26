// TravellerPanel/Pages/UserLogin.jsx
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Bus from "../../public/Bus";
import './UserLogin.css'; // Make sure the CSS file is in the same directory

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/user/login_user', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                navigate('/user/dashboard');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('There was an error submitting the form', error);
        }
    };


    return (
        <div className="login-page">
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                    <p>Dont have an account?
                        <Link to="/user/signup"
                            style={{
                                textDecoration: 'none',
                                color: 'blue',
                                marginLeft: '10px'
                            }}>
                            Signup
                        </Link>
                    </p>
                    <p>Forgot Password?
                        <Link to="/user/forgotpassword"
                            style={{
                                textDecoration: 'none',
                                color: 'blue',
                                marginLeft: '10px'
                            }}>
                            Click here
                        </Link>
                    </p>
                </form>
            </div>
            <div className="canvas-container">
                <Canvas camera={{ position: [0, 0, 12], far: 10000 }}>
                    <ambientLight />
                    <Suspense fallback={null}>
                        <Bus />
                        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
};

export default UserLogin;
