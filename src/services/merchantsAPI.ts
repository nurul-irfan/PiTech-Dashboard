// src/services/merchantsAPI.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

const merchantsAPI = {
  // ==================== MERCHANTS ====================

  // Get all merchants
  getAll: async () => {
    return axios.get(`${API_URL}/merchants`, {
      headers: getAuthHeader(),
    });
  },

  // Get merchant by ID
  getById: async (id: string) => {
    return axios.get(`${API_URL}/merchants/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // Get current merchant
  getCurrentMerchant: async () => {
    return axios.get(`${API_URL}/merchants/me`, {
      headers: getAuthHeader(),
    });
  },

  // Create merchant
  create: async (data: any) => {
    return axios.post(`${API_URL}/merchants`, data, {
      headers: getAuthHeader(),
    });
  },

  // Update merchant
  update: async (id: string, data: any) => {
    return axios.put(`${API_URL}/merchants/${id}`, data, {
      headers: getAuthHeader(),
    });
  },

  // Delete merchant
  delete: async (id: string) => {
    return axios.delete(`${API_URL}/merchants/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // ==================== WALLETS ====================

  // Create wallet
  createWallet: async (merchantId: string, chainId: string, walletAddress: string) => {
    return axios.post(
      `${API_URL}/merchants/${merchantId}/wallets`,
      {
        chain_id: chainId,
        wallet_address: walletAddress,
      },
      {
        headers: getAuthHeader(),
      }
    );
  },

  // Update wallet
  updateWallet: async (chainId: string, walletAddress: string) => {
    return axios.put(
      `${API_URL}/merchants/wallets`,
      {
        chain_id: chainId,
        wallet_address: walletAddress,
      },
      {
        headers: getAuthHeader(),
      }
    );
  },

  // Get all chains by merchant
  getAllChains: async () => {
    return axios.get(`${API_URL}/merchants/chains/all`, {
      headers: getAuthHeader(),
    });
  },

  // Get wallets by type
  getWalletsByType: async (merchantId: string, chainType: string) => {
    return axios.get(`${API_URL}/merchants/${merchantId}/wallets?type=${chainType}`, {
      headers: getAuthHeader(),
    });
  },

  // Get wallet balance
  getWalletBalance: async (walletAddress: string, chainId: string) => {
    return axios.get(
      `${API_URL}/merchants/wallets/${walletAddress}/balance?chain_id=${chainId}`,
      {
        headers: getAuthHeader(),
      }
    );
  },

  // ==================== ADDRESS DETAILS ====================

  // Create address detail
  createAddressDetail: async (data: any) => {
    return axios.post(`${API_URL}/merchants/address-details`, data, {
      headers: getAuthHeader(),
    });
  },

  // Get address details
  getAddressDetails: async () => {
    return axios.get(`${API_URL}/merchants/address-details/me`, {
      headers: getAuthHeader(),
    });
  },

  // Get all address details
  getAllAddressDetails: async () => {
    return axios.get(`${API_URL}/merchants/address-details`, {
      headers: getAuthHeader(),
    });
  },

  // Get address details by ID
  getAddressDetailsById: async (id: string) => {
    return axios.get(`${API_URL}/merchants/address-details/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // Update address details
  updateAddressDetails: async (id: string, data: any) => {
    return axios.put(`${API_URL}/merchants/address-details/${id}`, data, {
      headers: getAuthHeader(),
    });
  },

  // Delete address details
  deleteAddressDetails: async (id: string) => {
    return axios.delete(`${API_URL}/merchants/address-details/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // ==================== BANK DETAILS ====================

  // Create bank details
  createBankDetails: async (data: any) => {
    return axios.post(`${API_URL}/merchants/bank-details`, data, {
      headers: getAuthHeader(),
    });
  },

  // Get all bank details
  getAllBankDetails: async () => {
    return axios.get(`${API_URL}/merchants/bank-details`, {
      headers: getAuthHeader(),
    });
  },

  // Get bank details by ID
  getBankDetailsById: async (id: string) => {
    return axios.get(`${API_URL}/merchants/bank-details/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // Update bank details
  updateBankDetails: async (id: string, data: any) => {
    return axios.put(`${API_URL}/merchants/bank-details/${id}`, data, {
      headers: getAuthHeader(),
    });
  },

  // Delete bank details
  deleteBankDetails: async (id: string) => {
    return axios.delete(`${API_URL}/merchants/bank-details/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // ==================== BUSINESS DETAILS ====================

  // Add business detail
  addBusinessDetail: async (data: any) => {
    return axios.post(`${API_URL}/merchants/business-details`, data, {
      headers: getAuthHeader(),
    });
  },

  // Get all business details
  getAllBusinessDetails: async () => {
    return axios.get(`${API_URL}/merchants/business-details`, {
      headers: getAuthHeader(),
    });
  },

  // Get business detail
  getBusinessDetail: async () => {
    return axios.get(`${API_URL}/merchants/business-details/detail`, {
      headers: getAuthHeader(),
    });
  },

  // Get merchant business detail
  getMerchantBusinessDetail: async () => {
    return axios.get(`${API_URL}/merchants/business-details/merchant`, {
      headers: getAuthHeader(),
    });
  },

  // Get business details by ID
  getBusinessDetailsById: async (id: string) => {
    return axios.get(`${API_URL}/merchants/business-details/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // Update business details
  updateBusinessDetails: async (id: string, data: any) => {
    return axios.put(`${API_URL}/merchants/business-details/${id}`, data, {
      headers: getAuthHeader(),
    });
  },

  // Delete business details
  deleteBusinessDetails: async (id: string) => {
    return axios.delete(`${API_URL}/merchants/business-details/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // ==================== ALLOWED TOKENS ====================

  // Add allowed token
  addAllowedToken: async (chainId: string, tokenId: string) => {
    return axios.post(
      `${API_URL}/merchants/allowed-tokens`,
      {
        chain_id: chainId,
        token_id: tokenId,
      },
      {
        headers: getAuthHeader(),
      }
    );
  },

  // Get allowed tokens
  getAllowedTokens: async () => {
    return axios.get(`${API_URL}/merchants/allowed-tokens`, {
      headers: getAuthHeader(),
    });
  },

  // Get allowed tokens by chain
  getAllowedTokensByChain: async (chainId: string) => {
    return axios.get(`${API_URL}/merchants/allowed-tokens/chain/${chainId}`, {
      headers: getAuthHeader(),
    });
  },

  // Delete allowed token
  deleteAllowedToken: async (id: string) => {
    return axios.delete(`${API_URL}/merchants/allowed-tokens/${id}`, {
      headers: getAuthHeader(),
    });
  },
};

export default merchantsAPI;
