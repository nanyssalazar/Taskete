import axios from 'axios';

//Initialize our API to request the info
const api = axios.create({
  baseURL: "https://taskete-isnd.herokuapp.com/",
});

export default api;
