import Axios from 'axios';

const baseURL = process.env.API_BASE_URL;

const api = Axios.create({
  baseURL,
});

export default api;
