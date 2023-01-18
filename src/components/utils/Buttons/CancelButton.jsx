import React from "react";
import { FaWindowClose } from "react-icons/fa";

const CancelButton = ({ size = 14, handleClick }) => {
  return (
    <button onClick={handleClick} className="action-button var(--gray-color)">
      <FaWindowClose size={size} color={"#fff"} />
    </button>
  );
};

export default CancelButton;
