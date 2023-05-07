import React, { useState, useEffect } from "react";
import { handleLoginRequest } from "../../redux/login/slice";
import selectAuthentication from "../../redux/login/selector";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { message, Input } from "antd";
import "../style/login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectAuthentication.getAuthenticationToken);
  const [initialValues, setInitialValues] = useState({
    username: null,
    password: null,
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      username: Yup.string().required("Tên đăng nhập là bắt buộc!"),
      password: Yup.string().required("Mật khẩu là bắt buộc!"),
    }),
    onSubmit: (values) => {
      dispatch(
        handleLoginRequest({
          data: values,
          callback: handleResponse,
        })
      );
    },
  });
  const handleResponse = (status, response = null) => {
    console.log("Submitsos");
    if (status) {
      message.success("Đăng nhập thành công!");
      navigate("/staff/home");
    } else {
      message.error(response);
    }
  };

  useEffect(() => {
    if (token !== "") {
      navigate("/staff/login");
    }
  }, [navigate]);

  return (
    <>
      <div className="login-background">
        <div className="login-container">
          <form className="login-content" onSubmit={formik.handleSubmit}>
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form group">
              <label>Username:</label>
              <Input
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
                autoComplete="username"
                onChange={formik.handleChange}
              />
              {formik.errors.username && (
                <p className="pl-2 pt-1 text-danger">
                  {formik.errors.username}
                </p>
              )}
            </div>
            <div className="col-12 form group">
              <label>Password:</label>
              <Input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
              />
              {formik.errors.password && (
                <p className="pl-2 pt-1 text-danger">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
