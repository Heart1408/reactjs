import {
  getScheduleAPI,
  getFloorAPI,
  getListTableAPI,
  getCustomerInfoAPI,
  createScheduleAPI,
  getTableStatusCurrentAPI,
} from "../services/schedule";
import { useMutation, useQuery } from "react-query";
import { message } from "antd";

export const useGetSchedule = (date) => {
  const handleGetListSchedule = async () => {
    try {
      const response = await getScheduleAPI(date);
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (err) {
      throw err;
    }
  };

  const useFetchListSchedules = useQuery(
    ["getSchedule", date],
    handleGetListSchedule,
    {
      refetchOnWindowFocus: false,
    }
  );

  return useFetchListSchedules;
};

export const useGetFloor = () => {
  const handleGetFloor = async () => {
    try {
      const response = await getFloorAPI();
      if (!response?.success) {
      
        throw response?.message;
      }
      return response;
    } catch (err) {
      throw err;
    }
  };

  const useFetchFloor = useQuery(["getFloor"], handleGetFloor, {
    refetchOnWindowFocus: false,
  });

  return useFetchFloor;
};

export const useGetListTable = (floor_id) => {
  const handleGetListTable = async () => {
    try {
      const response = await getListTableAPI(floor_id);
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchListTable = useQuery(
    ["getListTable", floor_id],
    handleGetListTable,
    {
      refetchOnWindowFocus: false,
    }
  );

  return useFetchListTable;
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

export const useCreateSchedule = (callback) => {
  const handleCreateSchedule = async (params) => {
    try {
      const response = await createScheduleAPI(params);
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useMutationCreateSchedule = useMutation(
    ["createSchedule"],
    handleCreateSchedule,
    {
      onSuccess: (res) => callback(true, "Thêm mới lịch đặt bàn thành công!"),
      onError: (res) => callback(false, null, res),
    }
  );

  return useMutationCreateSchedule;
};

export const useGetTableCurrent = (table_id) => {
  const handleGetTableCurrent = async () => {
    try {
      const response = await getTableStatusCurrentAPI(table_id);
      if (!response?.success) {
        throw response?.message;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchTableCurrent = useQuery(
    ["getTableInfo", table_id],
    handleGetTableCurrent,
    {
      refetchOnWindowFocus: false,
    }
  );

  return useFetchTableCurrent;
};
