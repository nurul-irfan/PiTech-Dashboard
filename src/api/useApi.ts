// src/hooks/useApi.ts
import { useCallback, useState } from 'react';
import { useAlert } from './useAlert.ts';
import authAPI from "../services/authAPI";
import merchantsAPI from "../services/merchantsAPI";
import tokensAPI from "../services/tokensAPI";
import chainsAPI from "../services/chainsAPI";
import transactionsAPI from "../services/transactionsAPI";
import ticketsAPI from "../services/ticketsAPI";
import industriesAPI from "../services/industriesAPI";
import usersAPI from "../services/usersAPI";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Comprehensive API hook integrating ALL 60+ endpoints
 * Handles loading, error states, and automatic alerts
 */
export const useApi = () => {
  const { success, error: showError } = useAlert();

  // ==================== AUTHENTICATION ====================

  const merchantLogin = useCallback(
    async (email: string, password: string) => {
      try {
        const { data } = await authAPI.merchantLogin(email, password);
        success('Login successful!');
        return data;
      } catch (err: any) {
        const errorMsg = err.response?.data?.message || 'Login failed';
        showError(errorMsg);
        throw err;
      }
    },
    [success, showError]
  );

  const adminLogin = useCallback(
    async (email: string, password: string, ipAddress?: string) => {
      try {
        const { data } = await authAPI.adminLogin(email, password, ipAddress);
        success('Admin login successful!');
        return data;
      } catch (err: any) {
        const errorMsg = err.response?.data?.message || 'Admin login failed';
        showError(errorMsg);
        throw err;
      }
    },
    [success, showError]
  );

  const refreshToken = useCallback(
    async (token: string) => {
      try {
        const { data } = await authAPI.refreshToken(token);
        return data;
      } catch (err: any) {
        showError('Token refresh failed');
        throw err;
      }
    },
    [showError]
  );

  const enable2FA = useCallback(
    async (merchantId: string) => {
      try {
        const { data } = await authAPI.enable2FA(merchantId);
        success('2FA enabled successfully!');
        return data;
      } catch (err: any) {
        showError('Failed to enable 2FA');
        throw err;
      }
    },
    [success, showError]
  );

  const verify2FA = useCallback(
    async (merchantId: string, otp: string) => {
      try {
        const { data } = await authAPI.verify2FA(merchantId, otp);
        success('2FA verified!');
        return data;
      } catch (err: any) {
        showError('Invalid OTP');
        throw err;
      }
    },
    [success, showError]
  );

  const forgotPassword = useCallback(
    async (email: string) => {
      try {
        const { data } = await authAPI.forgotPassword(email);
        success('Password reset link sent to your email!');
        return data;
      } catch (err: any) {
        showError('Failed to send reset link');
        throw err;
      }
    },
    [success, showError]
  );

  const resetPassword = useCallback(
    async (resetHash: string, newPassword: string) => {
      try {
        const { data } = await authAPI.resetPassword(resetHash, newPassword);
        success('Password reset successful!');
        return data;
      } catch (err: any) {
        showError('Failed to reset password');
        throw err;
      }
    },
    [success, showError]
  );

  const changePassword = useCallback(
    async (oldPassword: string, newPassword: string) => {
      try {
        const { data } = await authAPI.changePassword(oldPassword, newPassword);
        success('Password changed successfully!');
        return data;
      } catch (err: any) {
        showError('Failed to change password');
        throw err;
      }
    },
    [success, showError]
  );

  // ==================== MERCHANTS ====================

  const getAllMerchants = useCallback(async () => {
    try {
      const { data } = await merchantsAPI.getAll();
      return data.data;
    } catch (err: any) {
      showError('Failed to fetch merchants');
      throw err;
    }
  }, [showError]);

  const getMerchantById = useCallback(
    async (id: string) => {
      try {
        const { data } = await merchantsAPI.getById(id);
        return data.data;
      } catch (err: any) {
        showError('Failed to fetch merchant');
        throw err;
      }
    },
    [showError]
  );

  const getCurrentMerchant = useCallback(async () => {
    try {
      const { data } = await merchantsAPI.getCurrentMerchant();
      return data.data;
    } catch (err: any) {
      showError('Failed to fetch current merchant');
      throw err;
    }
  }, [showError]);

  const createMerchant = useCallback(
    async (merchantData: any) => {
      try {
        const { data } = await merchantsAPI.create(merchantData);
        success('Merchant created successfully!');
        return data.data;
      } catch (err: any) {
        showError(err.response?.data?.message || 'Failed to create merchant');
        throw err;
      }
    },
    [success, showError]
  );

  const deleteMerchant = useCallback(
    async (id: string) => {
      try {
        await merchantsAPI.delete(id);
        success('Merchant deleted successfully!');
      } catch (err: any) {
        showError('Failed to delete merchant');
        throw err;
      }
    },
    [success, showError]
  );

  const createWallet = useCallback(
    async (merchantId: string, chainId: string, walletAddress: string) => {
      try {
        const { data } = await merchantsAPI.createWallet(merchantId, chainId, walletAddress);
        success('Wallet created successfully!');
        return data.data;
      } catch (err: any) {
        showError(err.response?.data?.message || 'Failed to create wallet');
        throw err;
      }
    },
    [success, showError]
  );

  const updateWallet = useCallback(
    async (chainId: string, walletAddress: string) => {
      try {
        const { data } = await merchantsAPI.updateWallet(chainId, walletAddress);
        success('Wallet updated successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to update wallet');
        throw err;
      }
    },
    [success, showError]
  );

  const getAllChainsByMerchant = useCallback(async () => {
    try {
      const { data } = await merchantsAPI.getAllChains();
      return data.data;
    } catch (err: any) {
      showError('Failed to fetch chains');
      throw err;
    }
  }, [showError]);

  const getWalletsByType = useCallback(
    async (merchantId: string, chainType: string) => {
      try {
        const { data } = await merchantsAPI.getWalletsByType(merchantId, chainType);
        return data.data;
      } catch (err: any) {
        showError('Failed to fetch wallets');
        throw err;
      }
    },
    [showError]
  );

  const getWalletBalance = useCallback(
    async (walletAddress: string, chainId: string) => {
      try {
        const { data } = await merchantsAPI.getWalletBalance(walletAddress, chainId);
        return data.data;
      } catch (err: any) {
        showError('Failed to fetch wallet balance');
        throw err;
      }
    },
    [showError]
  );

  // ==================== ADDRESS DETAILS ====================

  const createAddressDetail = useCallback(
    async (addressData: any) => {
      try {
        const { data } = await merchantsAPI.createAddressDetail(addressData);
        success('Address created successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to create address');
        throw err;
      }
    },
    [success, showError]
  );

  const getAddressDetails = useCallback(async () => {
    try {
      const { data } = await merchantsAPI.getAddressDetails();
      return data.data;
    } catch (err: any) {
      showError('Failed to fetch address details');
      throw err;
    }
  }, [showError]);

  const getAllAddressDetails = useCallback(async () => {
    try {
      const { data } = await merchantsAPI.getAllAddressDetails();
      return data.data;
    } catch (err: any) {
      showError('Failed to fetch all addresses');
      throw err;
    }
  }, [showError]);

  const getAddressDetailsById = useCallback(
    async (id: string) => {
      try {
        const { data } = await merchantsAPI.getAddressDetailsById(id);
        return data.data;
      } catch (err: any) {
        showError('Failed to fetch address');
        throw err;
      }
    },
    [showError]
  );

  const updateAddressDetails = useCallback(
    async (id: string, addressData: any) => {
      try {
        const { data } = await merchantsAPI.updateAddressDetails(id, addressData);
        success('Address updated successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to update address');
        throw err;
      }
    },
    [success, showError]
  );

  const deleteAddressDetails = useCallback(
    async (id: string) => {
      try {
        await merchantsAPI.deleteAddressDetails(id);
        success('Address deleted successfully!');
      } catch (err: any) {
        showError('Failed to delete address');
        throw err;
      }
    },
    [success, showError]
  );

  // ==================== BANK DETAILS ====================

  const createBankDetails = useCallback(
    async (bankData: any) => {
      try {
        const { data } = await merchantsAPI.createBankDetails(bankData);
        success('Bank details created successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to create bank details');
        throw err;
      }
    },
    [success, showError]
  );

  const getAllBankDetails = useCallback(async () => {
    try {
      const { data } = await merchantsAPI.getAllBankDetails();
      return data.data;
    } catch (err: any) {
      showError('Failed to fetch bank details');
      throw err;
    }
  }, [showError]);

  const getBankDetailsById = useCallback(
    async (id: string) => {
      try {
        const { data } = await merchantsAPI.getBankDetailsById(id);
        return data.data;
      } catch (err: any) {
        showError('Failed to fetch bank details');
        throw err;
      }
    },
    [showError]
  );

  const updateBankDetails = useCallback(
    async (id: string, bankData: any) => {
      try {
        const { data } = await merchantsAPI.updateBankDetails(id, bankData);
        success('Bank details updated successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to update bank details');
        throw err;
      }
    },
    [success, showError]
  );

  const deleteBankDetails = useCallback(
    async (id: string) => {
      try {
        await merchantsAPI.deleteBankDetails(id);
        success('Bank details deleted successfully!');
      } catch (err: any) {
        showError('Failed to delete bank details');
        throw err;
      }
    },
    [success, showError]
  );

  // ==================== BUSINESS DETAILS ====================

  const addBusinessDetail = useCallback(
    async (businessData: any) => {
      try {
        const { data } = await merchantsAPI.addBusinessDetail(businessData);
        success('Business details added successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to add business details');
        throw err;
      }
    },
    [success, showError]
  );

  const getAllBusinessDetails = useCallback(async () => {
    try {
      const { data } = await merchantsAPI.getAllBusinessDetails();
      return data.data;
    } catch (err: any) {
      showError('Failed to fetch business details');
      throw err;
    }
  }, [showError]);

  const getBusinessDetail = useCallback(async () => {
    try {
      const { data } = await merchantsAPI.getBusinessDetail();
      return data.data;
    } catch (err: any) {
      showError('Failed to fetch business detail');
      throw err;
    }
  }, [showError]);

  const getMerchantBusinessDetail = useCallback(async () => {
    try {
      const { data } = await merchantsAPI.getMerchantBusinessDetail();
      return data.data;
    } catch (err: any) {
      showError('Failed to fetch merchant business detail');
      throw err;
    }
  }, [showError]);

  const getBusinessDetailsById = useCallback(
    async (id: string) => {
      try {
        const { data } = await merchantsAPI.getBusinessDetailsById(id);
        return data.data;
      } catch (err: any) {
        showError('Failed to fetch business details');
        throw err;
      }
    },
    [showError]
  );

  const updateBusinessDetails = useCallback(
    async (id: string, businessData: any) => {
      try {
        const { data } = await merchantsAPI.updateBusinessDetails(id, businessData);
        success('Business details updated successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to update business details');
        throw err;
      }
    },
    [success, showError]
  );

  const deleteBusinessDetails = useCallback(
    async (id: string) => {
      try {
        await merchantsAPI.deleteBusinessDetails(id);
        success('Business details deleted successfully!');
      } catch (err: any) {
        showError('Failed to delete business details');
        throw err;
      }
    },
    [success, showError]
  );

  // ==================== ALLOWED TOKENS ====================

  const addAllowedToken = useCallback(
    async (chainId: string, tokenId: string) => {
      try {
        const { data } = await merchantsAPI.addAllowedToken(chainId, tokenId);
        success('Token added successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to add token');
        throw err;
      }
    },
    [success, showError]
  );

  const getAllowedTokens = useCallback(async () => {
    try {
      const { data } = await merchantsAPI.getAllowedTokens();
      return data.data;
    } catch (err: any) {
      showError('Failed to fetch allowed tokens');
      throw err;
    }
  }, [showError]);

  const getAllowedTokensByChain = useCallback(
    async (chainId: string) => {
      try {
        const { data } = await merchantsAPI.getAllowedTokensByChain(chainId);
        return data.data;
      } catch (err: any) {
        showError('Failed to fetch tokens for chain');
        throw err;
      }
    },
    [showError]
  );

  const deleteAllowedToken = useCallback(
    async (id: string) => {
      try {
        await merchantsAPI.deleteAllowedToken(id);
        success('Token removed successfully!');
      } catch (err: any) {
        showError('Failed to remove token');
        throw err;
      }
    },
    [success, showError]
  );

  // ==================== TOKENS ====================

  const getAllTokens = useCallback(
    async (env: 'mainnet' | 'testnet' = 'mainnet') => {
      try {
        const { data } = await tokensAPI.getAll(env);
        return data.data;
      } catch (err: any) {
        showError('Failed to fetch tokens');
        throw err;
      }
    },
    [showError]
  );

  const getTokenById = useCallback(
    async (id: string) => {
      try {
        const { data } = await tokensAPI.getById(id);
        return data.data;
      } catch (err: any) {
        showError('Failed to fetch token');
        throw err;
      }
    },
    [showError]
  );

  const createToken = useCallback(
    async (tokenData: any) => {
      try {
        const { data } = await tokensAPI.create(tokenData);
        success('Token created successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to create token');
        throw err;
      }
    },
    [success, showError]
  );

  const updateToken = useCallback(
    async (id: string, tokenData: any) => {
      try {
        const { data } = await tokensAPI.update(id, tokenData);
        success('Token updated successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to update token');
        throw err;
      }
    },
    [success, showError]
  );

  const deleteToken = useCallback(
    async (id: string) => {
      try {
        await tokensAPI.delete(id);
        success('Token deleted successfully!');
      } catch (err: any) {
        showError('Failed to delete token');
        throw err;
      }
    },
    [success, showError]
  );

  // ==================== CHAINS ====================

  const getAllChains = useCallback(
    async (env: 'mainnet' | 'testnet' = 'mainnet') => {
      try {
        const { data } = await chainsAPI.getAll(env);
        return data.data;
      } catch (err: any) {
        showError('Failed to fetch chains');
        throw err;
      }
    },
    [showError]
  );

  const getChainById = useCallback(
    async (id: string) => {
      try {
        const { data } = await chainsAPI.getById(id);
        return data.data;
      } catch (err: any) {
        showError('Failed to fetch chain');
        throw err;
      }
    },
    [showError]
  );

  const createChain = useCallback(
    async (chainData: any) => {
      try {
        const { data } = await chainsAPI.create(chainData);
        success('Chain created successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to create chain');
        throw err;
      }
    },
    [success, showError]
  );

  const updateChain = useCallback(
    async (id: string, chainData: any) => {
      try {
        const { data } = await chainsAPI.update(id, chainData);
        success('Chain updated successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to update chain');
        throw err;
      }
    },
    [success, showError]
  );

  const deleteChain = useCallback(
    async (id: string) => {
      try {
        await chainsAPI.delete(id);
        success('Chain deleted successfully!');
      } catch (err: any) {
        showError('Failed to delete chain');
        throw err;
      }
    },
    [success, showError]
  );

  // ==================== TRANSACTIONS ====================

  const getAllTransactions = useCallback(async () => {
    try {
      const { data } = await transactionsAPI.getAll();
      return data.data;
    } catch (err: any) {
      showError('Failed to fetch transactions');
      throw err;
    }
  }, [showError]);

  const getTransactionById = useCallback(
    async (id: string) => {
      try {
        const { data } = await transactionsAPI.getById(id);
        return data.data;
      } catch (err: any) {
        showError('Failed to fetch transaction');
        throw err;
      }
    },
    [showError]
  );

  const createTransaction = useCallback(
    async (transactionData: any) => {
      try {
        const { data } = await transactionsAPI.create(transactionData);
        success('Transaction created successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to create transaction');
        throw err;
      }
    },
    [success, showError]
  );

  const updateTransaction = useCallback(
    async (id: string, transactionData: any) => {
      try {
        const { data } = await transactionsAPI.update(id, transactionData);
        success('Transaction updated successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to update transaction');
        throw err;
      }
    },
    [success, showError]
  );

  const deleteTransaction = useCallback(
    async (id: string) => {
      try {
        await transactionsAPI.delete(id);
        success('Transaction deleted successfully!');
      } catch (err: any) {
        showError('Failed to delete transaction');
        throw err;
      }
    },
    [success, showError]
  );

  const getAllPaymentTokens = useCallback(async () => {
    try {
      const { data } = await transactionsAPI.getAllPaymentTokens();
      return data.data;
    } catch (err: any) {
      showError('Failed to fetch payment tokens');
      throw err;
    }
  }, [showError]);

  const createPaymentToken = useCallback(
    async (paymentData: any) => {
      try {
        const { data } = await transactionsAPI.createPaymentToken(paymentData);
        success('Payment token created successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to create payment token');
        throw err;
      }
    },
    [success, showError]
  );

  const getQRCode = useCallback(
    async (qrData: any) => {
      try {
        const { data } = await transactionsAPI.getQRCode(qrData);
        return data.data;
      } catch (err: any) {
        showError('Failed to generate QR code');
        throw err;
      }
    },
    [showError]
  );

  const verifyPayment = useCallback(
    async (merchantId: string, txnId: string) => {
      try {
        const { data } = await transactionsAPI.verifyPayment(merchantId, txnId);
        return data.data;
      } catch (err: any) {
        showError('Payment verification failed');
        throw err;
      }
    },
    [showError]
  );

  // ==================== TICKETS ====================

  const getAllTickets = useCallback(async () => {
    try {
      const { data } = await ticketsAPI.getAll();
      return data.data;
    } catch (err: any) {
      showError('Failed to fetch tickets');
      throw err;
    }
  }, [showError]);

  const getTicketById = useCallback(
    async (id: string) => {
      try {
        const { data } = await ticketsAPI.getById(id);
        return data.data;
      } catch (err: any) {
        showError('Failed to fetch ticket');
        throw err;
      }
    },
    [showError]
  );

  const createTicket = useCallback(
    async (ticketData: any) => {
      try {
        const { data } = await ticketsAPI.create(ticketData);
        success('Ticket created successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to create ticket');
        throw err;
      }
    },
    [success, showError]
  );

  const updateTicket = useCallback(
    async (id: string, ticketData: any) => {
      try {
        const { data } = await ticketsAPI.update(id, ticketData);
        success('Ticket updated successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to update ticket');
        throw err;
      }
    },
    [success, showError]
  );

  const deleteTicket = useCallback(
    async (id: string) => {
      try {
        await ticketsAPI.delete(id);
        success('Ticket deleted successfully!');
      } catch (err: any) {
        showError('Failed to delete ticket');
        throw err;
      }
    },
    [success, showError]
  );

  const updateTicketStatus = useCallback(
    async (id: string, status: string) => {
      try {
        const { data } = await ticketsAPI.updateStatus(id, status);
        success('Ticket status updated!');
        return data.data;
      } catch (err: any) {
        showError('Failed to update ticket status');
        throw err;
      }
    },
    [success, showError]
  );

  // ==================== INDUSTRIES ====================

  const getAllIndustries = useCallback(async () => {
    try {
      const { data } = await industriesAPI.getAll();
      return data.data;
    } catch (err: any) {
      showError('Failed to fetch industries');
      throw err;
    }
  }, [showError]);

  const getIndustryById = useCallback(
    async (id: string) => {
      try {
        const { data } = await industriesAPI.getById(id);
        return data.data;
      } catch (err: any) {
        showError('Failed to fetch industry');
        throw err;
      }
    },
    [showError]
  );

  const createIndustry = useCallback(
    async (industryData: any) => {
      try {
        const { data } = await industriesAPI.create(industryData);
        success('Industry created successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to create industry');
        throw err;
      }
    },
    [success, showError]
  );

  const updateIndustry = useCallback(
    async (id: string, industryData: any) => {
      try {
        const { data } = await industriesAPI.update(id, industryData);
        success('Industry updated successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to update industry');
        throw err;
      }
    },
    [success, showError]
  );

  const deleteIndustry = useCallback(
    async (id: string) => {
      try {
        await industriesAPI.delete(id);
        success('Industry deleted successfully!');
      } catch (err: any) {
        showError('Failed to delete industry');
        throw err;
      }
    },
    [success, showError]
  );

  // ==================== USERS ====================

  const getAllUsers = useCallback(async () => {
    try {
      const { data } = await usersAPI.getAll();
      return data.data;
    } catch (err: any) {
      showError('Failed to fetch users');
      throw err;
    }
  }, [showError]);

  const getUserById = useCallback(
    async (id: string) => {
      try {
        const { data } = await usersAPI.getById(id);
        return data.data;
      } catch (err: any) {
        showError('Failed to fetch user');
        throw err;
      }
    },
    [showError]
  );

  const createUser = useCallback(
    async (userData: any) => {
      try {
        const { data } = await usersAPI.create(userData);
        success('User created successfully!');
        return data.data;
      } catch (err: any) {
        showError('Failed to create user');
        throw err;
      }
    },
    [success, showError]
  );

  // ==================== RETURN ALL METHODS ====================

  return {
    // Auth
    merchantLogin,
    adminLogin,
    refreshToken,
    enable2FA,
    verify2FA,
    forgotPassword,
    resetPassword,
    changePassword,

    // Merchants
    getAllMerchants,
    getMerchantById,
    getCurrentMerchant,
    createMerchant,
    deleteMerchant,

    // Wallets
    createWallet,
    updateWallet,
    getAllChainsByMerchant,
    getWalletsByType,
    getWalletBalance,

    // Address Details
    createAddressDetail,
    getAddressDetails,
    getAllAddressDetails,
    getAddressDetailsById,
    updateAddressDetails,
    deleteAddressDetails,

    // Bank Details
    createBankDetails,
    getAllBankDetails,
    getBankDetailsById,
    updateBankDetails,
    deleteBankDetails,

    // Business Details
    addBusinessDetail,
    getAllBusinessDetails,
    getBusinessDetail,
    getMerchantBusinessDetail,
    getBusinessDetailsById,
    updateBusinessDetails,
    deleteBusinessDetails,

    // Allowed Tokens
    addAllowedToken,
    getAllowedTokens,
    getAllowedTokensByChain,
    deleteAllowedToken,

    // Tokens
    getAllTokens,
    getTokenById,
    createToken,
    updateToken,
    deleteToken,

    // Chains
    getAllChains,
    getChainById,
    createChain,
    updateChain,
    deleteChain,

    // Transactions
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getAllPaymentTokens,
    createPaymentToken,
    getQRCode,
    verifyPayment,

    // Tickets
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    updateTicketStatus,

    // Industries
    getAllIndustries,
    getIndustryById,
    createIndustry,
    updateIndustry,
    deleteIndustry,

    // Users
    getAllUsers,
    getUserById,
    createUser,
  };
};
