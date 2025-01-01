import axios from 'axios';

// Set up the base URL for the API
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Add an interceptor to attach the token to each request
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Attach the token to the request header
        }
        return config;
    },
    (error) => {
        // Handle request errors
        console.error('Error in request interceptor:', error);
        return Promise.reject(error);
    }
);

// Notes API
export const fetchNotes = async () => {
    try {
        const response = await API.get('/notes');
        return response.data;
    } catch (error) {
        console.error('Error fetching notes:', error.response?.data || error.message);
        throw error;
    }
};

export const createNote = async (noteData) => {
    try {
        const response = await API.post('/notes', noteData);
        return response.data;
    } catch (error) {
        console.error('Error creating note:', error.response?.data || error.message);
        throw error;
    }
};

export const updateNote = async (id, noteData) => {
    try {
        const response = await API.put(`/notes/${id}`, noteData);
        return response.data;
    } catch (error) {
        console.error('Error updating note:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteNote = async (id) => {
    try {
        const response = await API.delete(`/notes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting note:', error.response?.data || error.message);
        throw error;
    }
};

// User Authentication API (Add as needed)
export const registerUser = async (userData) => {
    try {
        const response = await API.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error.response?.data || error.message);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await API.post('/auth/login', userData);
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error.response?.data || error.message);
        throw error;
    }
};

export default API;
