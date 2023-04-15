import React, { useState, useRef, useContext } from "react";
import {
  SearchOutlined,
  FormOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Input,
  Space,
  Table,
  Select,
  Col,
  Row,
  Divider,
  Modal,
} from "antd";
import Highlighter from "react-highlight-words";
import "./permission.scss";
import { PermissionContext } from "../../../pages/Staff/StaffManagement";

const { confirm } = Modal;

const Permission = () => {
  const { onShowAddStaffModal } = useContext(PermissionContext);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

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
      close,
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
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
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

  const data = [];
  for (let i = 1; i < 30; i++) {
    data.push({
      key: i,
      username: `username ${i}`,
      name: `name ${i}`,
      email: `gmail${i}@gmail.com`,
      role: "chỉnh sửa ...",
      status: "Admin",
      edit: (
        <Button type="primary" icon={<FormOutlined />} size="small" ghost />
      ),
    });
  }

  const columns = [
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
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Hành động",
      dataIndex: "role",
      ...getColumnSearchProps("role"),
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

  return (
    <>
      <Row justify="space-between">
        <Col flex={5}>
          <Space
            style={{
              marginBottom: 16,
            }}
          >
            <Button onClick={(e) => onShowAddStaffModal()}>Thêm</Button>
            <Button onClick={showDeleteStaffConfirm}>Xóa</Button>
            <Select
              placeholder="Vai trò"
              style={{
                width: 120,
              }}
              options={[
                {
                  value: "1",
                  label: "Amin",
                },
                {
                  value: "2",
                  label: "Phục vụ",
                },
                {
                  value: "3",
                  label: "...",
                },
              ]}
            />
            <Button type="primary">Áp dụng</Button>
          </Space>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            pagination={{
              pageSize: 6,
            }}
          />
        </Col>
        <Col flex={3}>
          <div className="note">
            <Divider orientation="center">
              <FontAwesomeIcon icon={faPen} size="sm" /> Các hành động
            </Divider>
            <Row>
              <p className="action">1</p>
              <p>Chỉnh sửa sơ đồ nhà hàng</p>
            </Row>
            <Row>
              <p className="action">1</p>
              <p>Chỉnh sửa s...</p>
            </Row>
            <Row>
              <p className="action">1</p>
              <p>Chỉnh sử...</p>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Permission;
