import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { createNote, updateNote, fetchNotes } from '../api/api';

const NoteEditorPage = () => {
    const { id} = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState({ title: '', content: '', category: '' });
    const location = useLocation()
    const state = location.state || {}; // Access the state passed from navigate
    const { title, content, category, isEditable } = state;
    const [isEdit, setIsEdit] = useState(isEditable);


    // useEffect(() => {
    //     if (id) {
    //         const fetchNote = async () => {
    //             try {
    //                 const { data } = await fetchNotes();
    //                 const existingNote = data.find((note) => note._id === id);
    //                 if (existingNote) {
    //                     setNote(existingNote);
    //                     setIsEdit(true);
    //                 }
    //             } catch (error) {
    //                 console.error('Failed to fetch note:', error.response?.data || error.message);
    //             }
    //         };
    //         fetchNote();
    //     }
    // }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await updateNote(id, note);
                alert('Note updated successfully!');
            } else {
                await createNote(note);
                alert('Note created successfully!');
            }
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to save note:', error.response?.data || error.message);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Note' : 'Create nnn'}</h2>
           {console.log(title)}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Title</label>
                    <input
                        type="text"
                        value={note.title}
                        onChange={(e) => setNote({ ...note, title: e.target.value })}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Content</label>
                    <textarea
                        value={note.content}
                        onChange={(e) => setNote({ ...note, content: e.target.value })}
                        className="w-full border p-2 rounded"
                        rows="5"
                    />
                </div>
                <div>
                    <label className="block font-medium">Category</label>
                    <input
                        type="text"
                        value={note.category}
                        onChange={(e) => setNote({ ...note, category: e.target.value })}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    {isEdit ? 'Update Note' : 'Save Note'}
                </button>
            </form>
        </div>
    );
};

export default NoteEditorPage;
