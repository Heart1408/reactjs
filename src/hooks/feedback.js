import { getFeedbackListAPI, changeStatusAPI } from "../services/feedback";
import { useMutation, useQuery } from "react-query";

export const useGetFeedbackList = (params) => {
  const handleGetFeedbackList = async () => {
    try {
      const response = await getFeedbackListAPI(params);
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchFeedbackList = useQuery(
    ["getFeedbackList", params],
    handleGetFeedbackList,
    {
      refetchOnWindowFocus: false,
    }
  );

  return useFetchFeedbackList;
};

export const useChangeStatus = (callback) => {
  const handleChangeStatus = async (id) => {
    try {
      const response = await changeStatusAPI(id);
      if (!response.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchChangeStatus = useMutation("changeStatus", handleChangeStatus, {
    onSuccess: (res) => callback(true, res.message),
    onError: (res) => callback(false, null, res),
  });

  return useFetchChangeStatus;
};
