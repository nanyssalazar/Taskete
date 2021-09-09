import axios from 'axios';

//Initialize our API to request the info
const api = axios.create({
  baseURL: 'http://localhost:8080/',
});

export default api;
