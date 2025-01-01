import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const AuthForm = ({ onSubmit, isSignup }) => {
    const [formData, setFormData] = useState({ email: '', password: '', username: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
            {/* Logo Section */}
            <div className="text-center mb-6">
                <img
                    src="/CollegeDunia-Logo.webp" // Ensure this file exists in the public folder
                    alt="Logo"
                    className="mx-auto w-24 h-24"
                />
            </div>

            {/* Form Fields */}
            {isSignup && (
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
            )}
            <input
                type="email"
                placeholder="Email"
                className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
            />
            <button
                type="submit"
                className="bg-blue-500 text-white w-full py-3 rounded hover:bg-blue-600 transition"
            >
                {isSignup ? 'Sign Up' : 'Login'}
            </button>

            {/* Navigation Link */}
            {!isSignup && (
                <p className="text-center mt-4 text-sm">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign up here
                    </Link>
                </p>
            )}
        </form>
    );
};

export default AuthForm;
