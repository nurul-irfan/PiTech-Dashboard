// src/services/chainsAPI.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

const chainsAPI = {
  // Get all chains
  getAll: async (env: 'mainnet' | 'testnet' = 'mainnet') => {
    return axios.get(`${API_URL}/chains?env=${env}`, {
      headers: getAuthHeader(),
    });
  },

  // Get chain by ID
  getById: async (id: string) => {
    return axios.get(`${API_URL}/chains/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // Create chain
  create: async (data: any) => {
    return axios.post(`${API_URL}/chains`, data, {
      headers: getAuthHeader(),
    });
  },

  // Update chain
  update: async (id: string, data: any) => {
    return axios.put(`${API_URL}/chains/${id}`, data, {
      headers: getAuthHeader(),
    });
  },

  // Delete chain
  delete: async (id: string) => {
    return axios.delete(`${API_URL}/chains/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // Get chain by name
  getByName: async (name: string) => {
    return axios.get(`${API_URL}/chains/name/${name}`, {
      headers: getAuthHeader(),
    });
  },

  // Get chain by chain ID
  getByChainId: async (chainId: string) => {
    return axios.get(`${API_URL}/chains/chain-id/${chainId}`, {
      headers: getAuthHeader(),
    });
  },

  // Get active chains
  getActive: async () => {
    return axios.get(`${API_URL}/chains/active`, {
      headers: getAuthHeader(),
    });
  },

  // Verify chain RPC
  verifyRPC: async (rpcUrl: string) => {
    return axios.post(
      `${API_URL}/chains/verify-rpc`,
      { rpc_url: rpcUrl },
      {
        headers: getAuthHeader(),
      }
    );
  },
};

export default chainsAPI;
