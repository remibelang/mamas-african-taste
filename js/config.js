// API Configuration - prevent redeclaration
if (typeof API_BASE_URL === 'undefined') {
    var API_BASE_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://localhost:5000"
        : "https://mamas-african-taste-api.onrender.com";

    // Helper function for API calls
    async function apiCall(endpoint, options) {
        options = options || {};
        var url = API_BASE_URL + endpoint;
        var defaultOptions = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        
        var token = localStorage.getItem("adminToken");
        if (token) {
            defaultOptions.headers["Authorization"] = "Bearer " + token;
        }
        
        var response = await fetch(url, Object.assign({}, defaultOptions, options));
        return response;
    }

    async function apiCallJson(endpoint, options) {
        var response = await apiCall(endpoint, options);
        return response.json();
    }
}
