import { useState } from 'react';
import './UpdateCredentials.css';

const UpdateCredentials = () => {
    const [contact, setContact] = useState('');
    const [preferences, setPreferences] = useState([]);
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/user/customize_profile', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contact, preferences, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to update credentials');
            }

            setMessage('Credentials updated successfully');
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handlePreferenceChange = (event) => {
        const value = event.target.value;
        setPreferences(
            preferences.includes(value)
                ? preferences.filter(p => p !== value)
                : [...preferences, value]
        );
    };

    return (
        <div className="update-credentials-container">
            <h1>Update Credentials</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Contact:
                    <input type="text" value={contact} onChange={e => setContact(e.target.value)} />
                </label>
                <label>
                    Preferences:
                    <select multiple value={preferences} onChange={handlePreferenceChange} className="preferences-select">
                        <option value="Adventure">Adventure</option>
                        <option value="Family">Family</option>
                        <option value="Honeymoon">Honeymoon</option>
                        <option value="Religious">Religious</option>
                        <option value="Wildlife">Wildlife</option>
                        <option value="Group">Group</option>
                        <option value="Solo">Solo</option>
                        <option value="Friends">Friends</option>
                        <option value="Summer">Summer</option>
                        <option value="Winter">Winter</option>
                        <option value="Spring">Spring</option>
                        <option value="Autumn">Autumn</option>
                    </select>

                </label>
                <label>
                    New Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button type="submit">Update Credentials</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default UpdateCredentials;
