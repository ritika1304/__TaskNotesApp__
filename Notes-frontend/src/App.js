import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import NoteEditorPage from './pages/NoteEditorPage'; // Handles both Create and Edit Notes
import ProfilePage from './pages/ProfilePage';

const App = () => {
    return (
        <Router>
        
            <Routes>
                {/* Authentication Routes */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Dashboard Route */}
                <Route path="/dashboard" element={<DashboardPage />} />

                {/* Notes Routes */}
                <Route path="/note/create" element={<NoteEditorPage />} /> {/* Create Note */}
                <Route path="/note/edit/:id" element={<NoteEditorPage />} /> {/* Edit Note */}
                

                {/* Profile Route */}
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
};

export default App;
