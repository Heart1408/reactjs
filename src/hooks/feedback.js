import { getFeedbackListAPI } from "../services/feedback";
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
