import React, { createContext, useState } from "react";
import { useGetStaffs } from "../../hooks/staff";
import StaffManager from "../../components/Staff/StaffManager";
import { STAFF_ROLE } from "../../constants";
import AddStaffModal from "../../components/Staff/StaffManager/StaffModal";

export const PermissionContext = createContext();

const StaffManagement = () => {
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isEditStaff, setIsEditStaff] = useState(false);
  const [initialValues, setInitialValues] = useState({
    staff_id: null,
    username: null,
    fullname: null,
    phone: null,
    email: null,
    password: null,
    password_confirmation: null,
    permission: STAFF_ROLE.STAFF,
  });
  const [searchKey, setSearchKey] = useState(null);

  const { data: dataStaffsResponse, refetch } = useGetStaffs({
    search_key: searchKey,
  });

  const showAddStaffModal = () => {
    setIsAddStaffModalOpen(true);
  };

  const hideAddStaffModal = () => {
    setIsAddStaffModalOpen(false);
  };

  return (
    <div>
      <PermissionContext.Provider
        value={{
          isAddStaffModalOpen,
          isEditStaff,
          initialValues,
          searchKey,
          dataStaffsResponse: dataStaffsResponse,
          onShowAddStaffModal: showAddStaffModal,
          onHideAddStaffModal: hideAddStaffModal,
          setIsEditStaff: setIsEditStaff,
          setInitialValues: setInitialValues,
          onRefetchListStaff: refetch,
          setIsEditStaff,
          setSearchKey,
        }}
      >
        <StaffManager />
        <AddStaffModal />
      </PermissionContext.Provider>
    </div>
  );
};

export default StaffManagement;
