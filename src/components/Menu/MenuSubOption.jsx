import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuContext } from "../../context/MenuContext";

const MenuSubOption = () => {
  const navigate = useNavigate();
  const { clickMenu } = useContext(MenuContext);

  const handleClick = (e, url) => {
    e.preventDefault();
    clickMenu();
    navigate(url);
  };

  return (
    <>
      <li className="suboption">
        <a href="" onClick={(e) => handleClick(e, "sections/")}>
          Sections
        </a>
      </li>
      <li className="suboption">
        <a href="" onClick={(e) => handleClick(e, "section-details/")}>
          Section Details
        </a>
      </li>
      <li className="suboption">
        <a href="" onClick={(e) => handleClick(e, "section-details-item/")}>
          Section Detail Items
        </a>
      </li>
    </>
  );
};

export default MenuSubOption;
