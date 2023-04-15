import { getCurrentStaffAPI } from "../services/auth";
import { useQuery } from "react-query";

export const useGetCurrentStaff = () => {
  const handleGetCurrentStaff = async () => {
    try {
      const response = await getCurrentStaffAPI();
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (err) {
      throw err;
    }
  };

  const useFetchData = useQuery(["getCurrentStaff"], handleGetCurrentStaff, {
    refetchOnWindowFocus: false,
  });

  return useFetchData;
};
