const mongoose = require('mongoose');
const Note = require('../models/noteModel');

// Fetch all notes for the authenticated user
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });

        if (!notes.length) {
            return res.status(404).json({ message: 'No notes found.' });
        }

        res.status(200).json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error.message);
        res.status(500).json({ message: 'Unable to fetch notes. Please try again later.' });
    }
};

// Create a new note
const createNote = async (req, res) => {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
        return res.status(400).json({ message: 'Title, content, and category are required.' });
    }

    try {
        const existingNote = await Note.findOne({ title, user: req.user.id });
        if (existingNote) {
            return res.status(400).json({ message: 'A note with this title already exists.' });
        }

        const note = await Note.create({
            user: req.user.id,
            title,
            content,
            category,
        });

        res.status(201).json(note);
    } catch (error) {
        console.error('Error creating note:', error.message);
        res.status(500).json({ message: 'Unable to create note. Please try again later.' });
    }
};

// Update an existing note
const updateNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid note ID.' });
    }

    try {
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found.' });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to update this note.' });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error('Error updating note:', error.message);
        res.status(500).json({ message: 'Unable to update note. Please try again later.' });
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid note ID.' });
    }

    try {
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found.' });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this note.' });
        }

        await Note.deleteOne({ _id: id });

        res.status(200).json({ message: 'Note deleted successfully.' });
    } catch (error) {
        console.error('Error deleting note:', error.message);
        res.status(500).json({ message: 'Unable to delete note. Please try again later.' });
    }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
