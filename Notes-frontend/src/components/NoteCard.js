import React from 'react';

const NoteCard = ({ note }) => {
    return (
        <div className="p-4">
            <h3 className="text-lg font-bold">{note.title}</h3>
            <p className="text-gray-600 text-sm">{note.content}</p>
            <span className="text-blue-500 text-xs">{note.category}</span>
        </div>
    );
};

export default NoteCard;
