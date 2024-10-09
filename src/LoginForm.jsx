import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'; // Import the CSS file for styling

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Send login request to backend API
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password
            });

            // Handle success or failure
            if (response.data.success) {
                alert('Login successful!');
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Error logging in. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
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
    );
};

export default LoginForm;
