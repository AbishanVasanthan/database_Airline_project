// src/components/LoginForm.jsx
import React, { useState } from 'react';
import './LoginForm.css'; // Import the CSS file for styling

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [token, setToken] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setToken(data.token);
                // You can store the token in localStorage or state
                // localStorage.setItem('token', data.token);
                console.log('Login successful:', data);
            } else {
                const message = await response.text();
                setErrorMessage(message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Failed to log in. Please try again.');
        }
    };

    return (
        <div className="logo">
            <div className="login-container">
                <h2>Login</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleLogin}>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
