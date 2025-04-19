import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'; // Reuse the login CSS
import { authAPI } from '../../../api'; // Import the authAPI for making API calls

export default function Signup() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData({
            ...data,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Validate first name
        if (!data.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        
        // Validate last name
        if (!data.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        
        // Validate email
        if (!data.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        // Validate password
        if (!data.password) {
            newErrors.password = 'Password is required';
        } else if (data.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        
        // Validate confirm password
        if (data.password !== data.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        // Validate terms agreement
        if (!data.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setProcessing(true);
        
        try {
            // Make the registration API call using the authAPI
            const response = await authAPI.register({
                firstName: data.firstName,
                lastName: data.lastName,
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                password: data.password
            });

            console.log('Registration successful:', response);

            // If registration is successful, store the token in localStorage
            localStorage.setItem('token', response.data.token);
            
            // Set authentication status to true in localStorage
            localStorage.setItem('isAuthenticated', 'true');

            setProcessing(false);

            // Redirect to My Trips page on successful registration
            navigate('/my-trips');
        } catch (error) {
            setProcessing(false);
            console.error('Registration error details:', error);
            
            // More detailed error logging
            if (error.response) {
                console.error('Server response data:', error.response.data);
                console.error('Server response status:', error.response.status);
                console.error('Server response headers:', error.response.headers);
                
                // Handle error if registration failed with specific error messages
                if (error.response.status === 409) {
                    setErrors({ signup: 'Email already exists. Please use a different email or login.' });
                } else if (error.response.data && error.response.data.message) {
                    // Show the actual error message from the server
                    setErrors({ signup: error.response.data.message });
                } else {
                    setErrors({ signup: 'An error occurred. Please try again later.' });
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                setErrors({ signup: 'No response from server. Please check your connection.' });
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up request:', error.message);
                setErrors({ signup: 'An error occurred. Please try again later.' });
            }
        }
    };

    return (
        <div>
            <div className="login-container">
                <div className="login-card">
                    {/* Image Section */}
                    <div
                        className="login-image"
                        style={{
                            backgroundImage: `url('/images/Rectangle 1434 (1).png')`,
                        }}
                    ></div>

                    {/* Signup Form Section */}
                    <div className="login-content">
                        <h2 className="login-title">Sign Up</h2>
                        <form className="login-form" onSubmit={submit}>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    value={data.firstName}
                                    type="text"
                                    name="firstName"
                                    onChange={handleChange}
                                    id="firstName"
                                    placeholder="First Name"
                                    className="form-input"
                                />
                                {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    value={data.lastName}
                                    type="text"
                                    name="lastName"
                                    onChange={handleChange}
                                    id="lastName"
                                    placeholder="Last Name"
                                    className="form-input"
                                />
                                {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    value={data.email}
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    id="email"
                                    placeholder="username@gmail.com"
                                    className="form-input"
                                />
                                {errors.email && <div className="error-message">{errors.email}</div>}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    id="password"
                                    placeholder="Password"
                                    className="form-input"
                                />
                                {errors.password && <div className="error-message">{errors.password}</div>}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    className="form-input"
                                />
                                {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                            </div>
                            
                            <div className="form-options">
                                <label className="remember-me">
                                    <input 
                                        type="checkbox" 
                                        name="agreeToTerms"
                                        checked={data.agreeToTerms}
                                        onChange={handleChange}
                                    />
                                    I agree to the <Link to="/terms" className="text-link">Terms of Service</Link> and <Link to="/privacy" className="text-link">Privacy Policy</Link>
                                </label>
                            </div>
                            {errors.agreeToTerms && <div className="error-message">{errors.agreeToTerms}</div>}
                            
                            <button 
                                className="login-button" 
                                disabled={processing}
                            >
                                {processing ? 'Creating Account...' : 'Create Account'}
                            </button>
                            {errors.signup && <div className="error-message">{errors.signup}</div>}
                            
                            <div className="login-divider">or continue with</div>
                            <div className="social-login">
                                <button type="button" className="social-button">
                                    <img
                                        src="/images/login/google-logo.svg"
                                        alt="Google"
                                        width="24"
                                        height="24"
                                    />
                                </button>
                                <button type="button" className="social-button">
                                    <img
                                        src="/images/login/facebook-logo.svg"
                                        alt="Facebook"
                                        width="24"
                                        height="24"
                                    />
                                </button>
                                <button type="button" className="social-button">
                                    <img
                                        src="/images/login/email-icon.svg"
                                        alt="Email"
                                        width="24"
                                        height="24"
                                    />
                                </button>
                            </div>
                            
                            <div className="signup-link">
                                Already have an account? <Link to="/login" className="text-link">Login</Link>
                            </div>
                        </form>
                        <p className="login-footer">
                            By proceeding, you agree to our <Link to="/privacy" className="text-link">Privacy Policy</Link> and <Link to="/terms" className="text-link">Terms of Service</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 