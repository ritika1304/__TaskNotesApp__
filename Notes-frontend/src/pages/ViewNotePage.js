import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';

const ViewNotePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                console.log(`Fetching note with ID: ${id}`); 
                const { data } = await API.get(`/notes/${id}`);
                setNote(data);
            } catch (error) {
                console.error('Failed to fetch note:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, [id]);

    if (loading) {
        return <div className="text-center text-gray-500">Loading note...</div>;
    }

    if (!note) {
        return <div className="text-center text-red-500">Note not found!</div>;
    }

    return (
        <div className="p-6">
            <button
                onClick={() => navigate(-1)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
            >
                Back
            </button>
            <div className="bg-white p-6 rounded shadow">
                <h1 className="text-3xl font-bold text-gray-800">{note.title}</h1>
                <p className="text-gray-600 mt-4">{note.content || 'No content available.'}</p>
                <p className="text-gray-400 mt-2">Category: {note.category || 'Uncategorized'}</p>
                <p className="text-gray-400 mt-2">
                    Last Updated: {new Date(note.updatedAt).toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default ViewNotePage;
