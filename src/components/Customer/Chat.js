import React, { useContext, useState, useMemo, useEffect } from "react";
import { AuthContext } from "../../Context/CustomerAuthProvider";
import { addDocument } from "../../firebase/service";
import useFirestore from "../../hooks/useFirestore";
import { formatRelative } from "date-fns";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Typography, Input, Form } from "antd";

function Chat() {
  const {
    user: { displayName, uid },
    isLogin,
    setIsOpenLoginModal,
    isOpenChatForm,
    setIsOpenChatForm,
    isHiddenChatIcon,
    setIsHiddenChatIcon,
  } = useContext(AuthContext);

  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();

  const handleGetFormChat = () => {
    if (!isLogin) {
      setIsOpenLoginModal(true);
      return;
    }

    setIsHiddenChatIcon(true);
    setIsOpenChatForm(true);
  };

  const closeFormChat = () => {
    setIsOpenChatForm(false);
    setIsHiddenChatIcon(false);
  };

  const roomCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "==",
      compareValue: uid,
    };
  }, [uid]);

  const room = useFirestore("rooms", roomCondition);
  const checkRoomExisted = room.length < 1 ? false : true;

  const handleSubmit = () => {
    if (inputValue !== "") {
      if (checkRoomExisted === true) {
        addDocument("messages", {
          text: inputValue,
          uid: uid,
          photoURL: "",
          roomId: room[0].id,
          displayName: displayName,
        });
      } else {
        addDocument("rooms", {
          name: displayName,
          uid: uid,
        });
      }

      form.resetFields(["message"]);
      setInputValue("");
    }
  };

  const condition = useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: !room[0] ? "" : room[0].id,
    }),
    [!room[0] ? null : room[0].id]
  );
  const messages = useFirestore("messages", condition);

  function formatDate(seconds) {
    let formatDate = "";
    if (seconds) {
      formatDate = formatRelative(new Date(seconds * 1000), new Date());
      formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
    }

    return formatDate;
  }

  function checkSenderIsMe(message) {
    if (message.uid === uid) return true;
    return false;
  }

  return (
    <>
      <MessageIcon
        onClick={handleGetFormChat}
        className={`${isHiddenChatIcon ? "visible-hidden" : ""} `}
      >
        <FontAwesomeIcon icon={faFacebookMessenger} />
      </MessageIcon>
      <ModalChat className={`${isOpenChatForm ? "" : "visible-hidden"} `}>
        <div className="header">
          <div className="userinfo">
            <Avatar>T</Avatar>
            <p>Supporter</p>
          </div>
          <button className="closebtn" onClick={closeFormChat}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="content">
          <div
            style={{
              height: "100%",
              justifyContent: "flex-end",
              overflowY: "scroll",
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${
                  checkSenderIsMe(message) ? "your-message" : "staff-mesage"
                }`}
              >
                <p className="date">{formatDate(message.createAt?.seconds)}</p>
                <p className="message">{message.text}</p>
              </div>
            ))}
          </div>
        </div>
        <Form form={form}>
          <Input
            name="message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleSubmit}
            placeholder="Nhập tin nhắn ..."
          ></Input>
          <button onClick={handleSubmit}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </Form>
      </ModalChat>
    </>
  );
}

export default Chat;

const MessageIcon = styled.div`
  position: fixed;
  right: 50px;
  bottom: 10%;
  border-radius: 50%;
  background: rgb(8, 9, 19);
  cursor: pointer;
  z-index: 20;
  transition: all 0.3s linear;

  svg {
    font-size: 50px;
    color: white;
    padding: 10px;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const ModalChat = styled.div`
  position: fixed;
  right: 10%;
  bottom: 0;
  height: 470px;
  width: 350px;
  background-color: white;
  border-radius: 8px 8px 0 0;

  button {
    cursor: pointer;
    transition: all 0.3s linear;

    &:hover {
      transform: scale(1.1);
    }
  }

  .header {
    border-radius: 8px 8px 0 0;
    height: 55px;
    background-color: #0052cc;

    .userinfo {
      display: flex;
      align-items: center;

      .ant-avatar {
        font-size: 20px;
        width: 40px;
        height: 40px;
        margin-left: 15px;
        margin-right: 10px;
      }
    }

    .closebtn {
      border: none;
      background-color: #0052cc;
      margin-right: 15px;

      svg {
        color: white;
        font-size: 22px;
      }
    }
  }

  .content {
    height: 315px;

    .your-message {
      margin-left: auto;
      width: max-content;
      max-width: 70%;
      margin-right: 15px;

      .message {
        background: #0052cc;
        color: white;
      }
    }

    .staff-mesage {
      width: max-content;
      max-width: 70%;
      margin-left: 15px;

      .message {
        background: #cccccc;
        color: black;
      }
    }

    .date {
      font-size: 12px;
      color: grey;
    }

    .message {
      border-radius: 20px;
      width: max-content;
      padding: 10px 12px;
      align-items: center;
      font-size: 15px;
      line-height: 10px;
    }
  }

  form {
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding: 15px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    button {
      border: none;
      background-color: #0066ff;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      color: white;
      margin-left: 8px;

      svg {
        font-size: 20px;
      }
    }
  }
`;
