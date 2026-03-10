import axios from 'axios';
import { io } from 'socket.io-client';

// Use the env var so both local dev (localhost:5000) and production (Cloud Run) work
const BASE_URL = import.meta.env.VITE_API_URL || 'https://hk-youth-backend-2i2kffc22iq-ew.a.run.app';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://hk-youth-backend-2i2kffc22iq-ew.a.run.app';

// Set global axios base URL — all relative /api/* calls expand to BASE_URL/api/*
axios.defaults.baseURL = BASE_URL;

// Helper to get auth headers
export const authHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('folk_token')}` }
});

// Create a connected socket instance
export const createSocket = () => io(SOCKET_URL, { transports: ['websocket', 'polling'] });

export default axios;
