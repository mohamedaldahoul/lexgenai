import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api', // Change as needed
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers here
  },
});

export default api; 