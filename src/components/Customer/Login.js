import React, { useContext } from "react";
import { Modal, Button, Space, Row } from "antd";
import { GooglePlusOutlined, FacebookOutlined } from "@ant-design/icons";
import firebase, { auth } from "../../firebase/config";
import { addDocument } from "../../firebase/service";
import { AuthContext } from "../../Context/CustomerAuthProvider";

function Login() {
  const { isOpenLoginModal, setIsOpenLoginModal, setIsLogin } =
    useContext(AuthContext);

  const closeLoginModal = () => {
    setIsOpenLoginModal(false);
  };

  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleFbLogin = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
    console.log("data", { additionalUserInfo });

    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      });
    }
  };

  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsLogin(true);
      setIsOpenLoginModal(false);
    }
  });

  return (
    <>
      <Modal
        title=""
        footer={[]}
        open={isOpenLoginModal}
        onCancel={closeLoginModal}
      >
        <Row justify="center">
          <Space direction="vertical">
            <h3 style={{ textAlign: "center" }}>LOGIN</h3>
            <Button>
              <GooglePlusOutlined />
              Đăng nhập với google
            </Button>
            <Button onClick={handleFbLogin}>
              <FacebookOutlined />
              Đăng nhập với facebook
            </Button>
          </Space>
        </Row>
      </Modal>
    </>
  );
}

export default Login;
