import React from "react";
import { FaSignInAlt } from "react-icons/fa";

const LoginButton = ({ size }) => {
  return (
    <button className="login-button">
      Login <FaSignInAlt size={size} />
    </button>
  );
};

export default LoginButton;
