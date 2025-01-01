import React from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import AuthForm from '../components/AuthForm';

const SignupPage = () => {
    const navigate = useNavigate();

    const handleSignup = async (formData) => {
        try {
            // Attempt to register the user via the API
            await API.post('/auth/register', formData);
            alert('Sign up successful! Please log in.'); // Show success message
            navigate('/'); // Redirect to the login page
        } catch (error) {
            // Check for a detailed error message from the server
            const errorMessage = error.response?.data?.message || error.message || 'Signup failed. Please try again.';
            console.error('Signup failed:', errorMessage); // Log the error for debugging
            alert(errorMessage); // Show the error message to the user
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <AuthForm onSubmit={handleSignup} isSignup />
        </div>
    );
};

export default SignupPage;
