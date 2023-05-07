import {
  addDishToMenuAPI,
  getOrderedDishesAPI,
  deleteDishAPI,
  confirmOrderAPI,
  sendFeedbackAPI,
} from "../../services/customer/booking";
import { useMutation, useQuery } from "react-query";

export const useAddDishToMenu = (callback) => {
  const handleAddDish = async (id) => {
    try {
      const response = await addDishToMenuAPI(id);
      if (!response.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchAddDish = useMutation("addDish", handleAddDish, {
    onSuccess: (res) => callback(true, res.message),
    onError: (res) => callback(false, null, res),
  });

  return useFetchAddDish;
};

export const useGetOrderedDishes = () => {
  const handleGetOrderedDishes = async () => {
    try {
      const response = await getOrderedDishesAPI();
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (err) {
      throw err;
    }
  };

  const useFetchListOrderedDishes = useQuery(
    ["getListOrderedDishes"],
    handleGetOrderedDishes,
    {
      refetchOnWindowFocus: false,
    }
  );

  return useFetchListOrderedDishes;
};

export const useDeleteDish = (callback) => {
  const handleDeleteDish = async (id) => {
    try {
      const response = await deleteDishAPI(id);
      if (!response.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchDeleteDish = useMutation("deleteDish", handleDeleteDish, {
    onSuccess: (res) => callback(true, res.message),
    onError: (res) => callback(false, null, res),
  });

  return useFetchDeleteDish;
};

export const useConfirmOrder = (callback) => {
  const handleConfirmOrder = async (params) => {
    try {
      const response = await confirmOrderAPI(params);
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const confirmOrder = useMutation("confirmOrder", handleConfirmOrder, {
    onSuccess: (res) => callback(true, res.message),
    onError: (res) => callback(false, null, res),
  });

  return confirmOrder;
};

export const useSendFeedback = (callback) => {
  const handleSendFeedback = async (params) => {
    try {
      const response = await sendFeedbackAPI(params);
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const sendFeedback = useMutation("sendFeedback", handleSendFeedback, {
    onSuccess: (res) => callback(true, res.message),
    onError: (res) => callback(false, null, res),
  });

  return sendFeedback;
};
