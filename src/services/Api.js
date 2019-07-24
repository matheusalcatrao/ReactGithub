import axios from 'axios';

const service = axios.create({
    baseURL: 'http://api.github.com/',
});

export default service;
