import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000', // Changed from 3000/api to 5000
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers here
  },
});

export default api; 