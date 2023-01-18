import React, { useContext } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import SessionContext from "../../context/SessionContext";

const MenuFooter = () => {
  const { logout } = useContext(SessionContext);
  const onClick = (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <div className="menu-footer-container">
      <button onClick={(e) => onClick(e)}>
        <FaSignOutAlt size={32} />
      </button>
    </div>
  );
};

export default MenuFooter;
