// API Configuration - switches between local and production
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000'
    : 'https://mamas-african-taste-api.onrender.com';

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
    const url = API_BASE_URL + endpoint;
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const token = localStorage.getItem('adminToken');
    if (token) {
        defaultOptions.headers['Authorization'] = 'Bearer ' + token;
    }
    
    const response = await fetch(url, { ...defaultOptions, ...options });
    return response;
}

async function apiCallJson(endpoint, options = {}) {
    const response = await apiCall(endpoint, options);
    return response.json();
}
