import React from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import AuthForm from '../components/AuthForm';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = async (formData) => {
        if (!formData.email || !formData.password) {
            alert('Please fill in both email and password.');
            return;
        }

        try {
            const { data } = await API.post('/auth/login', formData); // API call to backend
            localStorage.setItem('token', data.token); // Save token in localStorage
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            if (error.response?.status === 404) {
                alert('Email not registered. Redirecting to the signup page...');
                navigate('/signup');
            } else if (error.response?.status === 400) {
                alert('Invalid credentials. Please try again.');
            } else {
                console.error('Login failed:', error.response?.data || error.message);
                alert('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <AuthForm onSubmit={handleLogin} isSignup={false} />
        </div>
    );
};

export default LoginPage;
