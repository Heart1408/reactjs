import React, { useState, useRef, useContext } from "react";
import {
  SearchOutlined,
  FormOutlined,
  ExclamationCircleFilled,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Col,
  Row,
  Modal,
} from "antd";
import Highlighter from "react-highlight-words";
import { PermissionContext } from "../../../pages/Staff/StaffManagement";

const { confirm } = Modal;

const Permission = () => {
  const { onShowAddStaffModal } = useContext(PermissionContext);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
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

  const showDeleteStaffConfirm = () => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa ?",
      icon: <ExclamationCircleFilled />,
      content: "nội dung ...",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const data = [];
  for (let i = 1; i < 30; i++) {
    data.push({
      key: i,
      username: `username ${i}`,
      name: `name ${i}`,
      phone: `phone ${i}`,
      email: `gmail${i}@gmail.com`,
      status: "Admin",
      edit: (
        <>
          <Button type="primary" icon={<FormOutlined />} size="small" ghost />
          <Button
            onClick={showDeleteStaffConfirm}
            icon={<DeleteOutlined />}
            size="small"
            danger
          />
        </>
      ),
    });
  }

  const columns = [
    {
      title: "",
      dataIndex: "key",
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
      dataIndex: "status",
      ...getColumnSearchProps("status"),
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
            <Input placeholder="Nhập ..."></Input>
            <Button type="primary" icon={<SearchOutlined />}></Button>
          </Space>
        </Col>
        <Col>
          <Button onClick={(e) => onShowAddStaffModal()} type="primary" icon={<PlusOutlined />}>Thêm nhân viên</Button>
        </Col>
      </Row>
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
