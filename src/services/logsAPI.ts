// src/services/tokensAPI.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
});

const logsAPI = {

    getAll: async () => {
        return axios.get(`${API_URL}/logs/`, {
            headers: getAuthHeader(),
        });
    },


};

export default logsAPI;
