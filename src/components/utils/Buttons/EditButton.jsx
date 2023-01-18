import React from "react";
import { FaRegEdit, FaEdit } from "react-icons/fa";

const EditButton = ({ size = 14, handleClick }) => {
  return (
    <button onClick={handleClick} className="action-button edit-button">
      <FaRegEdit size={size} color={"#fff"} />
    </button>
  );
};

export default EditButton;
