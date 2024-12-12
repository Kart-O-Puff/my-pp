import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URI || 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// request inteceptor
// api.interceptors.request.use(
//     (config) => {
//         // Add authorization token to headers if available
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// response interceptor
// api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             localStorage.removeItem('authToken');
//             window.location.href = '/sign-in';
//         }
//         return Promise.reject(error);
//     }
// );

export default api;