import React from "react";
import { FaPlusCircle } from "react-icons/fa";

const AddButton = ({ size = 14, handleClick }) => {
  return (
    <button onClick={handleClick} className="action-button add-button">
      <FaPlusCircle size={size} color={"#fff"} />
    </button>
  );
};

export default AddButton;
