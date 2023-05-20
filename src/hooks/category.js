import {
  getCategoryAPI,
  createCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
  createProductAPI,
  listProductAPI,
  deleteProductAPI,
} from "../services/category";
import { useMutation, useQuery } from "react-query";

export const useGetCategories = () => {
  const handleGetCategories = async () => {
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

  const useFetchCategories = useQuery(
    ["getCategory"],
    handleGetCategories,
    {
      refetchOnWindowFocus: false,
    }
  );

  return useFetchCategories;
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

export const useCreateProduct = (callback) => {
  const handleCreateProduct = async (params) => {
    try {
      const response = await createProductAPI(params);
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useMutationCreateProduct = useMutation(
    ["createProduct"],
    handleCreateProduct,
    {
      onSuccess: () => callback(true, "Thêm sản phẩm thành công!"),
      onError: (res) => callback(false, null, res),
    }
  );

  return useMutationCreateProduct;
};

export const useGetListProduct = (params) => {
  const handleGetListProducts = async () => {
    try {
      const response = await listProductAPI(params);
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchListProducts = useQuery(
    ["getListProducts", params],
    handleGetListProducts,
    {
      refetchOnWindowFocus: false,
    }
  );

  return useFetchListProducts;
};

export const useDeleteProduct = (callback) => {
  const handleDelete = async (id) => {
    try {
      const response = await deleteProductAPI(id);
      if (!response.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchDeleteProduct = useMutation("deleteProduct", handleDelete, {
    onSuccess: (res) => callback(true, res.message),
    onError: (res) => callback(false, null, res),
  });

  return useFetchDeleteProduct;
};
