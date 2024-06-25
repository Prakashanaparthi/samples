import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './LoginForm.css';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle the login logic, like sending a request to your server
        console.log('Email:', email);
        console.log('Password:', password);

        // For now, just navigate to the home page after form submission
        navigate('/');
    };

    return (
        <div className="login-form-container">
            <div className="login-form">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <FontAwesomeIcon icon={faEnvelope} className="form-icon" />
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <FontAwesomeIcon icon={faLock} className="form-icon" />
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <div className="form-links">
                    <Link to="/forgot-password" className="form-link">Forgot Password?</Link>
                    <Link to="/signup" className="form-link">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
