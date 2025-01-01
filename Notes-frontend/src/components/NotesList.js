import React from 'react';
import NoteCard from './NoteCard'; // Import the NoteCard component

const NotesList = ({ notes, onDelete }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
                <div key={note._id} className="relative">
                    <NoteCard note={note} />
                    {/* Delete Button */}
                    <button
                        onClick={() => onDelete(note._id)} // Pass the note ID to delete handler
                        className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default NotesList;
