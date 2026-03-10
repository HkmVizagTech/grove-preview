import axios from 'axios';
import { io } from 'socket.io-client';

// Use the env var so both local dev (localhost:5000) and production (Cloud Run) work
const BASE_URL = import.meta.env.VITE_API_URL || 'https://folkvizag-882278565284.europe-west1.run.app';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://folkvizag-882278565284.europe-west1.run.app';

// Set global axios base URL — all relative /api/* calls expand to BASE_URL/api/*
axios.defaults.baseURL = BASE_URL;

// Helper to get auth headers
export const authHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('folk_token')}` }
});

// Create a connected socket instance
export const createSocket = () => io(SOCKET_URL, { transports: ['websocket', 'polling'] });

export default axios;
