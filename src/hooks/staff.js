import {
  getStaffsAPI,
  createStaffAPI,
  updateStaffAPI,
  deleteStaffAPI,
} from "../services/staff";
import { useMutation, useQuery } from "react-query";

export const useGetStaffs = (params) => {
  const handleGetStaffs = async () => {
    try {
      const response = await getStaffsAPI(params);
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (err) {
      throw err;
    }
  };

  const useFetchStaffs = useQuery(["getStaffs", params], handleGetStaffs, {
    refetchOnWindowFocus: false,
  });

  return useFetchStaffs;
};

export const useCreateStaff = (callback) => {
  const handleCreateStaff = async (params) => {
    try {
      const response = await createStaffAPI(params);
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useMutationCreateStaff = useMutation(
    ["createStaff"],
    handleCreateStaff,
    {
      onSuccess: (res) => callback(true, res.message),
      onError: (res) => callback(false, null, res),
    }
  );

  return useMutationCreateStaff;
};

export const useUpdateStaff = (callback) => {
  const handleUpdateStaff = async (params) => {
    try {
      const response = await updateStaffAPI(params);
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useMutationUpdateStaff = useMutation(
    ["updateStaff"],
    handleUpdateStaff,
    {
      onSuccess: (res) => callback(true, res.message),
      onError: (res) => callback(false, null, res),
    }
  );

  return useMutationUpdateStaff;
};

export const useDeleteStaff = (callback) => {
  const handleDelete = async (id) => {
    try {
      const response = await deleteStaffAPI(id);
      if (!response.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchDeleteStaff = useMutation("deleteStaff", handleDelete, {
    onSuccess: (res) => callback(true, res.message),
    onError: (res) => callback(false, null, res),
  });

  return useFetchDeleteStaff;
};
