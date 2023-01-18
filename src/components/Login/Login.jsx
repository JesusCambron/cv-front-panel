import React, { useContext, useEffect } from "react";
import { Form, useActionData, useNavigate, useSubmit } from "react-router-dom";
import { toast } from "react-toastify";
import { URL_BACK } from "../../../config";
import SessionContext from "../../context/SessionContext";
import LoginButton from "../utils/Buttons/LoginButton";

const initialErrors = {
  username: "",
};

const Login = () => {
  const responseAction = useActionData();
  const { session, handleSession } = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (session?.refresh) getRefreshToken();
  }, []);

  const getRefreshToken = async () => {
    const sessionRefresh = await fetch(`${URL_BACK}/user/api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: session.refresh }),
    }).then((response) =>
      response.json().then((data) => ({ info: data, status: response.status }))
    );
    if (sessionRefresh?.status === 200) {
      handleSession(sessionRefresh.info);
    }
    if (sessionRefresh?.status === 401) {
      handleSession({});
      navigate("/login/");
    }
  };

  useEffect(() => {
    if (responseAction?.status === 200) {
      handleSession(responseAction.info);
    }
    if (responseAction?.status === 401) {
      console.error(responseAction.info.detail);
    }
    //Any response
  }, [responseAction]);

  useEffect(() => {
    if (session?.access) navigate("/");
  }, [session]);

  return (
    <section className="login-page">
      <div className="login-container">
        <div className="title-container">
          <h1>Login</h1>
        </div>
        <div className="form-login-container">
          <Form method="POST">
            <div className="form-group">
              <input
                type="text"
                name="username"
                id="username"
                placeholder=" "
                className={`form-input`}
              />
              <label className={`form-label`} htmlFor="username">
                User Name
              </label>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                id="password"
                placeholder=" "
                className={`form-input`}
              />
              <label className={`form-label`} htmlFor="password">
                Password
              </label>
            </div>
            <div className="login-buttton-container">
              <LoginButton size={17} />
            </div>
          </Form>
          <div className="recovery-password-container">
            <a href="#">Did you forget your password?</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
