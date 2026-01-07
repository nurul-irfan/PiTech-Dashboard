import { useQuery } from "@tanstack/react-query";
import { paymentApi, transactionApi } from "./useApi";

const { getRequests } = paymentApi;
const { getTransactions } = transactionApi;

export const useGetRequests = () => {
  return useQuery({
    queryFn: () => {
      return getRequests();
    },
    queryKey: ["getRequests"],
    select(data: any) {
      return data?.data?.data || [];
    },
  });
};

export const useGetTransactions = () => {
  return useQuery({
    queryFn: () => {
      return getTransactions();
    },
    queryKey: ["getTransactions"],
    select(data: any) {
      return data?.data?.data || [];
    },
  });
};
