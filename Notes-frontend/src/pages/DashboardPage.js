import React, { useEffect, useState } from 'react';
import API from '../api/api'; // Import API to make requests
import Navbar from '../components/Navbar'; // Import the Navbar component
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { FaEdit, FaTrashAlt } from 'react-icons/fa';


const DashboardPage = () => {
    const [notes, setNotes] = useState([]); // Store the fetched notes
    const [user, setUser] = useState(null); // Store user information
    const navigate = useNavigate(); // Initialize useNavigate for routing

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const { data } = await API.get('/notes'); // Get notes from API
                setNotes(data); // Store notes in state
            } catch (error) {
                console.error('Failed to fetch notes:', error.response?.data || error.message);
            }
        };

        const fetchUserProfile = async () => {
            try {
                const { data } = await API.get('/profile'); // Fetch user profile
                setUser(data); // Set user data to state
            } catch (error) {
                console.error('Failed to fetch user profile:', error.response?.data || error.message);
            }
        };

        fetchNotes(); // Fetch notes when the page loads
        fetchUserProfile(); // Fetch user data when the page loads
    }, []);

    
    const handleNote = (noteId, title, content, category, isEditable) => {
        console.log(title);
        navigate(`/note/edit/${noteId}`, {
            state: { title, content, category, isEditable } // Pass the state object
        }); // Redirect to Edit Note page
    };
    
    const handleDeleteNote = async (noteId) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                await API.delete(`/notes/${noteId}`); // Call API to delete the note
                setNotes(notes.filter((note) => note._id !== noteId)); // Remove the deleted note from state
                alert('Note deleted successfully!');
            } catch (error) {
                console.error('Failed to delete note:', error.response?.data || error.message);
                alert('Failed to delete note. Please try again.');
            }
        }
    };

    return (
        <div>
            <Navbar user={user} />

            <div className="p-6">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Notes</h2>

                <button
                    onClick={handleNote}
                    className="bg-blue-600 text-white py-3 px-5 rounded mb-6 hover:bg-blue-700"
                >
                    + Create New Note
                </button>
{console.log(JSON.stringify(notes))}
                {notes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <div
                                key={note._id}
                                className="bg-white p-4 rounded shadow hover:shadow-lg transition"
                            >
                                <h3 className="font-bold text-xl text-gray-700">{note.title}</h3>
                                <p className="text-gray-600 mt-2">{note.content}</p>
                                <div className="mt-4 flex justify-between">
                                <button
    onClick={() => handleNote(note._id, note.title, note.content, note.category, true)}
    className="text-green-500 hover:text-green-700"
>
    <FaEdit className="inline-block text-xl" /> {/* Edit Icon */}
</button>

<button
    onClick={() => handleDeleteNote(note._id)}
    className="text-red-500 hover:text-red-700"
>
    <FaTrashAlt className="inline-block text-xl" /> {/* Delete Icon */}
</button>

                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 mt-4">No notes found. Create your first note!</p>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
