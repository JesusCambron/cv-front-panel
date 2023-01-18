import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import SessionContext from "../../context/SessionContext";

const ProtectedRoute = ({ children }) => {
  const { session } = useContext(SessionContext);
  if (Object.entries(session).length) {
    return children;
  }
  return <Navigate to={"/login/"} />;
};

export default ProtectedRoute;
