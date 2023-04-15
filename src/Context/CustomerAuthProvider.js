import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { Spin } from "antd";

export const AuthContext = createContext();

function CustomerAuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenChatForm, setIsOpenChatForm] = useState(false);
  const [isHiddenChatIcon, setIsHiddenChatIcon] = useState(false);

  useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });
        setIsLoading(false);
        setIsLogin(true);
        return;
      }

      setIsLoading(false);
      setIsLogin(false);
    });

    return () => {
      unsubscibed();
    };
  }, [isLogin]);
  return (
    <AuthContext.Provider
      value={{
        user,
        isLogin,
        setIsLogin,
        isOpenLoginModal,
        setIsOpenLoginModal,
        isOpenChatForm,
        setIsOpenChatForm,
        isHiddenChatIcon,
        setIsHiddenChatIcon,
      }}
    >
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
}

export default CustomerAuthProvider;
