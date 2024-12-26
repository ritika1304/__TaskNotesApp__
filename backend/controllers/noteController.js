const Note = require('../models/noteModel');

const getNotes = async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
};

const createNote = async (req, res) => {
    const { title, content, category } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const note = await Note.create({
        user: req.user.id,
        title,
        content,
        category,
    });

    res.status(201).json(note);
};

const updateNote = async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.json(updatedNote);
};

const deleteNote = async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    await note.remove();

    res.json({ message: 'Note removed' });
};

module.exports = { getNotes, createNote, updateNote, deleteNote };