import React, { useState, useEffect } from 'react';
import API from '../api/api';

const ProfilePage = () => {
    const [userData, setUserData] = useState({ username: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await API.get('/auth/profile'); // Fetch user profile
                setUserData(data);
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch profile.');
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await API.put('/auth/profile', userData); // Update user profile
            alert('Profile updated successfully!');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to update profile. Please try again.');
            console.error('Error updating profile:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <p className="text-gray-500 text-xl">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <p className="text-red-500 text-xl">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 mb-4 border rounded"
                    value={userData.username}
                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 border rounded"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
                <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default ProfilePage;
