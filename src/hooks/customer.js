import {
  getCustomersAPI,
  getCustomerInfoAPI,
  getBookingInfoAPI,
} from "../services/customer";
import { useQuery } from "react-query";

export const useGetCustomers = (params) => {
  const handleGetCustomers = async () => {
    try {
      const response = await getCustomersAPI(params);
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchCustomers = useQuery(
    ["getCustomers", params],
    handleGetCustomers,
    {
      refetchOnWindowFocus: false,
    }
  );

  return useFetchCustomers;
};

export const useGetCustomerInfo = (booking_id) => {
  const handleGetCustomerInfo = async () => {
    try {
      const response = await getCustomerInfoAPI(booking_id);
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchCustomerInfo = useQuery(
    ["getCustomerInfo", booking_id],
    handleGetCustomerInfo,
    {
      refetchOnWindowFocus: false,
    }
  );

  return useFetchCustomerInfo;
};

export const useGetBookingInfo = (params) => {
  const handleGetBookingInfo = async () => {
    try {
      const response = await getBookingInfoAPI(params);
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchBookingInfo = useQuery(
    ["getBookingInfo", params],
    handleGetBookingInfo,
    {
      refetchOnWindowFocus: false,
    }
  );

  return useFetchBookingInfo;
};
