import { useState } from 'react';
import './UserSignup.css';

const UserSignup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        CNIC: '',
        contact: '',
        preferences: []
    });
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handlePreferenceChange = (event) => {
        const value = event.target.value;
        setFormData(prevFormData => ({
            ...prevFormData,
            preferences: prevFormData.preferences.includes(value)
                ? prevFormData.preferences.filter(p => p !== value)
                : [...prevFormData.preferences, value]
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const result = await response.text();
            setMessage(result);
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="user-signup-container">
            <h1>User Signup</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                <input type="text" name="CNIC" value={formData.CNIC} onChange={handleChange} placeholder="CNIC" />
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" />

                <label>
                    Preferences:
                    <select multiple value={formData.preferences} onChange={handlePreferenceChange}>
                        {/* Add your preference options here */}
                    </select>
                </label>

                <button type="submit">Signup</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default UserSignup;
