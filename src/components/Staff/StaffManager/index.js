import React, { useState, useRef, useContext } from "react";
import { useDeleteStaff } from "../../../hooks/staff";
import { STAFF_ROLE } from "../../../constants";
import {
  SearchOutlined,
  FormOutlined,
  ExclamationCircleFilled,
  DeleteOutlined,
  PlusOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, Col, Row, Modal, message } from "antd";
import Highlighter from "react-highlight-words";
import { PermissionContext } from "../../../pages/Staff/StaffManagement";

const { confirm } = Modal;

const Permission = () => {
  const {
    onShowAddStaffModal,
    setIsEditStaff,
    setInitialValues,
    searchKey,
    setSearchKey,
    dataStaffsResponse,
    onRefetchListStaff,
  } = useContext(PermissionContext);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleResponse = (isSuccess, success = null, error = null) => {
    if (isSuccess) {
      message.success(success);
      // handleCloseModal();
      onRefetchListStaff();
      return;
    }
    message.error(error || "Có lỗi xảy ra");
  };
  const deleteStaff = useDeleteStaff(handleResponse);

  const staffs = dataStaffsResponse?.data;
  const totalRecords = dataStaffsResponse?.total_records;
  const currentStaffId = dataStaffsResponse?.current_staff_id;

  // ------------------
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const showDeleteStaffConfirm = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa ?",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        deleteStaff.mutate(id);
      },
    });
  };

  // -------------------
  const handleUpdateStaff = (item) => {
    setIsEditStaff(true);
    onShowAddStaffModal();
    setInitialValues({
      staff_id: item.id,
      username: item.username,
      fullname: item.fullname,
      phone: item.phone,
      email: item.email,
      password: null,
      permission: item.permission,
    });
  };

  const data = [];
  let number = 1;

  staffs?.map((item) => {
    data.push({
      key: item.id,
      number: number++,
      username: item.username,
      name: item.fullname,
      phone: item.phone,
      email: item.gmail,
      position: item.permission === STAFF_ROLE.ADMIN ? "Admin" : "Nhân viên",
      edit: (
        <>
          <Button
            type="primary"
            icon={<FormOutlined />}
            size="small"
            ghost
            onClick={() => handleUpdateStaff(item)}
            disabled={
              item.permission === STAFF_ROLE.ADMIN &&
              item.id != currentStaffId &&
              true
            }
          />
          <Button
            onClick={() => showDeleteStaffConfirm(item.id)}
            icon={<DeleteOutlined />}
            size="small"
            danger
            disabled={item.permission === STAFF_ROLE.ADMIN && true}
          />
        </>
      ),
    });
  });

  const columns = [
    {
      title: "",
      dataIndex: "number",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Vị trí",
      dataIndex: "position",
      ...getColumnSearchProps("position"),
    },
    {
      title: "",
      dataIndex: "edit",
    },
  ];

  return (
    <div className="staff-list">
      <p className="title">Danh sách nhân viên</p>
      <Row className="form-search" justify="space-between">
        <Col>
          <Space>
            <Input
              placeholder="Nhập ..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            ></Input>
            <Button
              type="primary"
              icon={<UndoOutlined />}
              onClick={() => setSearchKey(null)}
            ></Button>
          </Space>
        </Col>
        <Col>
          <Button
            onClick={(e) => {
              setIsEditStaff(false);
              onShowAddStaffModal();
            }}
            type="primary"
            icon={<PlusOutlined />}
          >
            Thêm nhân viên
          </Button>
        </Col>
      </Row>
      <div style={{ color: "grey" }}>
        Tổng: {staffs?.length}/{totalRecords}
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 6,
        }}
      />
    </div>
  );
};

export default Permission;
