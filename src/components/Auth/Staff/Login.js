import React from "react";
import "./Login.scss";
import {
  handleLoginApi,
  getCurrentStaff,
} from "../../../services/staffService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as action from "../../../store/actions";
import cookies from "react-cookies";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errMessage, setErrMessage] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrMessage("");

    try {
      let data = await handleLoginApi(username, password);
      // console.log(data.token);
      cookies.save("token", data.token);
      let staff = await getCurrentStaff({
        Authorization: `Bearer ${cookies.load("token")}`,
      });
      // console.info(staff);
      cookies.save("staff", staff.staff);
      dispatch(action.staffLoginSuccess(staff.staff));
      navigate("/staff/home", { replace: true });
    } catch (err) {
      console.error(err);
      if (err.response) {
        if (err.response.data) {
          setErrMessage(err.response.data.message);
        }
      }
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <form className="login-content" onSubmit={handleLogin}>
          <div className="col-12 text-login">Login</div>
          <div className="col-12 form group">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="col-12 form group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="col-12" style={{ color: "red" }}>
            {errMessage}
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
