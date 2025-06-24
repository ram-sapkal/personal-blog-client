import axios from 'axios';

const api = axios.create({
  baseURL: 'https://personal-blog-mu3a.onrender.com/api',
});

export default api;