import React, { createContext, useState } from "react";
import StaffManager from "../../components/Staff/StaffManager";
import AddStaffModal from "../../components/Staff/StaffManager/AddStaffModal";

export const PermissionContext = createContext();

const StaffManagement = () => {
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);

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
          onShowAddStaffModal: showAddStaffModal,
          onHideAddStaffModal: hideAddStaffModal,
        }}
      >
        <StaffManager />
        <AddStaffModal />
      </PermissionContext.Provider>
    </div>
  );
};

export default StaffManagement;
