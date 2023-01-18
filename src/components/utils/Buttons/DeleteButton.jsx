import React from "react";
import { FaTrash } from "react-icons/fa";

const DeleteButton = ({ size = 14, handleClick }) => {
  return (
    <button onClick={handleClick} className="action-button delete-button">
      <FaTrash size={size} color={"#fff"} />
    </button>
  );
};

export default DeleteButton;
