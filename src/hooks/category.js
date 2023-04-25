import {
  getCategoryAPI,
  createCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
} from "../services/category";
import { useMutation, useQuery } from "react-query";

export const useGetListCategory = () => {
  const handleGetListCategory = async () => {
    try {
      const response = await getCategoryAPI();
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (err) {
      throw err;
    }
  };

  const useFetchListCategory = useQuery(
    ["getCategory"],
    handleGetListCategory,
    {
      refetchOnWindowFocus: false,
    }
  );

  return useFetchListCategory;
};

export const useCreateCategory = (callback) => {
  const handleCreateCategory = async (params) => {
    try {
      const response = await createCategoryAPI(params);
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useMutationCreateCategory = useMutation(
    ["createCategory"],
    handleCreateCategory,
    {
      onSuccess: () => callback(true, "Thêm danh mục sản phẩm thành công!"),
      onError: (res) => callback(false, null, res),
    }
  );

  return useMutationCreateCategory;
};

export const useUpdateCategory = (callback) => {
  const handleUpdateCategory = async (params) => {
    try {
      const response = await updateCategoryAPI(params);
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const updateCategory = useMutation("updateCategory", handleUpdateCategory, {
    onSuccess: () => callback(true, "Cập nhật danh mục sản phẩm thành công!"),
    onError: (res) => callback(false, null, res),
  });

  return updateCategory;
};

export const useDeleteCategory = (callback) => {
  const handleDelete = async (id) => {
    try {
      const response = await deleteCategoryAPI(id);
      if (!response.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchDeleteCategory = useMutation("deleteCategory", handleDelete, {
    onSuccess: () => callback(true, "Xóa danh mục sản phẩm thành công!"),
    onError: (res) => callback(false, null, res),
  });

  return useFetchDeleteCategory;
};
