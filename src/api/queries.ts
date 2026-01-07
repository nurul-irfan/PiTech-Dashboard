import { useQuery } from "@tanstack/react-query";
import { paymentApi } from "./useApi";

const { getRequests } = paymentApi;

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
