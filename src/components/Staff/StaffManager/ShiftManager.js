import React, { useState } from "react";
import { SearchOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import {
  Button,
  Select,
  Space,
  DatePicker,
  Table,
  Modal,
  Form,
} from "antd";
import dayjs from "dayjs";
import "./ShiftManager.scss";

function ShiftManager() {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const dateFormat = "DD/MM/YYYY";

  const dataSource = [];

  for (let i = 1; i < 20; i++) {
    dataSource.push({
      key: i,
      name: `Name name ${i}`,
      date: "1/1/2023",
      shift: "Ca sáng",
      edit: <Button type="primary" icon={<FormOutlined />} ghost />,
    });
  }

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày làm",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Ca làm",
      dataIndex: "shift",
      key: "shift",
    },
    {
      title: "Thao tác",
      dataIndex: "edit",
      key: "edit",
    },
  ];

  const shiftname = [
    {
      label: "Ca sáng",
      value: "1",
    },
    {
      label: "Ca chiều",
      value: "2",
    },
    {
      label: "Ca tối",
      value: "3",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    console.log("showModal");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmitShift = (values) => {
    console.log("Success:", values);
    setIsModalOpen(false);
  };

  const onSubmitShiftFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Space wrap>
        <Select
          showSearch
          placeholder="Họ và tên"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: 1,
              label: "Nguyễn Văn A",
            },
            {
              value: 2,
              label: "Trần Văn B",
            },
          ]}
        />

        <DatePicker
          defaultValue={dayjs("01/01/2015", dateFormat)}
          format={dateFormat}
        />

        <Select
          showSearch
          placeholder="Ca làm"
          optionFilterProp="children"
          onChange={onChange}
          options={[
            {
              value: 1,
              label: "Ca sáng",
            },
            {
              value: 2,
              label: "Ca chiều",
            },
            {
              value: 3,
              label: "Ca tối",
            },
            {
              value: 4,
              label: "Ca đêm",
            },
          ]}
        />

        <Button type="primary" icon={<SearchOutlined />}>
          Tìm kiếm
        </Button>
      </Space>
      <div className="add-shift">
        <Button onClick={showModal} type="primary" icon={<PlusOutlined />}>
          Thêm mới ca làm việc
        </Button>
        <Modal
          title="Thêm mới ca làm việc"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[]}
        >
          <Form
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onSubmitShift}
            onFinishFailed={onSubmitShiftFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Space>
              <Form.Item
                label="Tên nhân viên"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Họ và tên"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  style={{
                    width: 200,
                  }}
                  options={[
                    {
                      value: 1,
                      label: "Nguyễn Văn A",
                    },
                    {
                      value: 2,
                      label: "Trần Văn B",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label="Bộ phận"
                name="position"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống!",
                  },
                ]}
              >
                <Select
                  defaultValue="2"
                  style={{
                    width: 150,
                  }}
                  options={[
                    {
                      value: "1",
                      label: "Tiếp tân",
                    },
                    {
                      value: "2",
                      label: "Phục vụ",
                    },
                    {
                      value: "3",
                      label: "Thu ngân",
                    },
                    {
                      value: "4",
                      label: "Trưởng ca",
                    },
                  ]}
                />
              </Form.Item>
            </Space>

            <Space>
              <Form.Item
                label="Ngày làm việc"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống!",
                  },
                ]}
              >
                <DatePicker
                  style={{
                    width: 120,
                  }}
                  format={dateFormat}
                />
              </Form.Item>

              <Form.Item
                label="Tên ca"
                name="shiftname"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống!",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: 270,
                  }}
                  placeholder="Please select"
                  defaultValue={["1", "2"]}
                  // onChange={handleChange}
                  options={shiftname}
                />
              </Form.Item>
            </Space>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </>
  );
}

export default ShiftManager;
