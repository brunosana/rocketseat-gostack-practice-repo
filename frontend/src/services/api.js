import axios from 'axios';

//criando instância axios
const api = axios.create({
    baseURL: "http://localhost:3333"
});

export default api;