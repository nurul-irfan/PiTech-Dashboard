// src/services/tokensAPI.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

const tokensAPI = {
  // Get all tokens
  getAll: async (env: 'mainnet' | 'testnet' = 'mainnet') => {
    return axios.get(`${API_URL}/tokens?env=${env}`, {
      headers: getAuthHeader(),
    });
  },

  // Get token by ID
  getById: async (id: string) => {
    return axios.get(`${API_URL}/tokens/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // Create token
  create: async (data: any) => {
    return axios.post(`${API_URL}/tokens`, data, {
      headers: getAuthHeader(),
    });
  },

  // Update token
  update: async (id: string, data: any) => {
    return axios.put(`${API_URL}/tokens/${id}`, data, {
      headers: getAuthHeader(),
    });
  },

  // Delete token
  delete: async (id: string) => {
    return axios.delete(`${API_URL}/tokens/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // Get tokens by chain
  getByChain: async (chainId: string) => {
    return axios.get(`${API_URL}/tokens/chain/${chainId}`, {
      headers: getAuthHeader(),
    });
  },

  // Search tokens
  search: async (query: string) => {
    return axios.get(`${API_URL}/tokens/search?q=${query}`, {
      headers: getAuthHeader(),
    });
  },

  // Get token price
  getPrice: async (tokenId: string) => {
    return axios.get(`${API_URL}/tokens/${tokenId}/price`, {
      headers: getAuthHeader(),
    });
  },
};

export default tokensAPI;
