import React, { createContext, useState } from "react";
import ShiftManager from "../../components/Staff/StaffManager/ShiftManager";
import Permission from "../../components/Staff/StaffManager/Permission";
import PermissionModal from "../../components/Staff/StaffManager/PermissionModal";
import { Tabs } from "antd";

export const PermissionContext = createContext();

const StaffManagement = () => {

  const onChangeTab = (key) => {
    console.log(key);
  };

  const tabs = [
    {
      key: "1",
      label: `Danh sách`,
      children: <Permission />,
    },
    {
      key: "2",
      label: `Lịch làm việc`,
      children: <ShiftManager />,
    },
  ];

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
        <Tabs defaultActiveKey="1" items={tabs} onChange={onChangeTab} />;
        <PermissionModal />
      </PermissionContext.Provider>
    </div>
  );
};

export default StaffManagement;
