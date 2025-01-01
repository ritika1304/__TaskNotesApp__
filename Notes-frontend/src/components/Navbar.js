import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';

const Navbar = ({ user }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const handleEditProfile = () => {
        navigate('/profile'); // Updated route for profile editing
        closeDropdown();
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/'); // Redirect to login page
        closeDropdown();
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="text-xl font-bold">Dashboard</div>
            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 p-2 bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none"
                >
                    <AiOutlineUser className="text-white w-8 h-8" />
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10">
                        <ul>
                            <li>
                                <button
                                    onClick={handleEditProfile}
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                                >
                                    Edit Profile
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={handleSignOut}
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left flex items-center"
                                >
                                    Sign Out
                                    <AiOutlineLogout className="ml-2" />
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            {isDropdownOpen && (
                <div
                    className="fixed inset-0 bg-transparent"
                    onClick={closeDropdown}
                ></div>
            )}
        </nav>
    );
};

export default Navbar;
