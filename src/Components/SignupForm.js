import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './SignupForm.css';

function SignupForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        birthDate: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle the signup logic, like sending a request to your server
        console.log('Form Data:', formData);

        // For now, just navigate to the home page after form submission
        navigate('/');
    };

    return (
        <div className="signup-form-container">
            <div className="signup-form">
                <h2 className="signup-title">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <FontAwesomeIcon icon={faUser} className="form-icon" />
                        <input
                            type="text"
                            id="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <FontAwesomeIcon icon={faUser} className="form-icon" />
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <FontAwesomeIcon icon={faEnvelope} className="form-icon" />
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <FontAwesomeIcon icon={faLock} className="form-icon" />
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <FontAwesomeIcon icon={faLock} className="form-icon" />
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <FontAwesomeIcon icon={faPhone} className="form-icon" />
                        <input
                            type="tel"
                            id="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                   
                    <button type="submit" className="signup-btn">Sign Up</button>
                </form>
                <div className="form-links">
                    <Link to="/login" className="form-link">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;
