import React, { useState, useEffect } from "react";
import { useGetCustomerInfo } from "../../../../hooks/schedule";
import { getListTableAPI } from "../../../../services/schedule";
import styled from "styled-components";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Input, Select, DatePicker, Form } from "antd";
const { TextArea } = Input;

function Item(props) {
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const { data: dataResponse } = useGetCustomerInfo(props.data.id);
  const customerInfo = dataResponse?.data;

  const [floorId, setFloorId] = useState();
  const [listTable, setListTable] = useState(null);

  useEffect(() => {
    const handleGetListTable = async () => {
      try {
        const response = await getListTableAPI(floorId);
        if (!response?.success) {
          throw response?.message;
        }
        setListTable(response.data);
      } catch (error) {
        throw error;
      }
    };
    handleGetListTable();
  }, [floorId]);

  const time = props.data.time;
  console.log("test", props.data);

  const getTime = (datetime) => {
    return datetime.substring(11, 16);
  };

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };
  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  });

  return (
    <>
      <ScheduleItem
        onClick={() => {
          setOpenModalDetail(true);
        }}
      >
        {getTime(props.data.time)}
        <FontAwesomeIcon icon={faCircleInfo} />
      </ScheduleItem>

      <Modal
        title="Chi tiết lịch đặt bàn"
        open={openModalDetail}
        onCancel={() => {
          setOpenModalDetail(false);
        }}
        footer={[]}
        width={450}
      >
        <UpdateStatus>
          <form>
            <Select
              defaultValue="1"
              options={[
                { value: "1", label: "Khách chưa đến" },
                { value: "2", label: "Khách đã đến" },
                { value: "3", label: "Khách hủy đặt bàn" },
              ]}
              onChange={(value) => {}}
            />

            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </form>
        </UpdateStatus>

        <FormStyle>
          <Form
            autoComplete="off"
            layout="horizontal"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 17 }}
            style={{ maxWidth: 450 }}
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="Khách hàng: "
              name="customername"
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
              ]}
            >
              <Input
                defaultValue={customerInfo && customerInfo.fullname}
                disabled
              />
            </Form.Item>
            <Form.Item
              label="Số điện thoại: "
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
              ]}
            >
              <Input
                defaultValue={customerInfo && customerInfo.phone}
                disabled
              />
            </Form.Item>

            <Form.Item
              label="Thời gian: "
              name="date"
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
              ]}
            >
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={disabledDate}
                disabledTime={disabledDateTime}
                // showTime={{
                //   defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
                // }}
                defaultValue={dayjs(time)}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="Tầng, bàn: "
              name="floor"
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
              ]}
            >
              <Select
                defaultValue={customerInfo && customerInfo.floor_id}
                options={props.listFloor?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                onChange={(value) => {
                  setFloorId(value);
                }}
              />
              <Select
                style={{
                  paddingLeft: "15px",
                }}
                defaultValue={props.data.table_detail_id}
                options={listTable?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
            </Form.Item>

            <Form.Item
              label="Ghi chú:"
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
              ]}
            >
              <TextArea
                rows={3}
                defaultValue={props.data.note}
                // placeholder="maxLength is 6"
                // maxLength={6}
              />
            </Form.Item>

            <Form.Item label=" " colon={false}>
              <Button type="primary" htmlType="submit">
                Chỉnh sửa
              </Button>
            </Form.Item>
          </Form>
        </FormStyle>
      </Modal>
    </>
  );
}

export default Item;

const ScheduleItem = styled.div`
  background-color: #003d99;
  color: white;
  position: relative;
  display: flex;
  width: 60px;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;

  svg {
    width: 13px;
  }

  &:hover {
    transform: scale(1.01);
    background-color: #0052cc;
  }
`;

const FormStyle = styled.div`
  input {
    width: 100%;
  }

  .ant-select.ant-select-in-form-item {
    width: 50%;
  }
`;

const UpdateStatus = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  width: 92%;
  padding: 5px 0;
  margin: auto;
  margin-bottom: 35px;
  margin-top: 20px;

  form {
    display: flex;
    justify-content: center;

    .ant-select {
      width: 250px;
      margin-right: 10px;
    }
  }
`;
