import React, { useRef } from "react";
import MenuSubOption from "./MenuSuboption";

const MenuOption = () => {
  const subOptionsRef = useRef(null);

  const showSubOptions = (e) => {
    e.preventDefault();
    let maxHeight = subOptionsRef.current.style.maxHeight;
    if (maxHeight === "0px") maxHeight = "";
    let sectionheight = maxHeight ? 0 : subOptionsRef.current.scrollHeight;
    subOptionsRef.current.style.maxHeight = `${sectionheight}px`;
  };

  return (
    <li className="menu-option">
      <div>
        <a
          className="menu-option-title"
          href=""
          onClick={(e) => showSubOptions(e)}
        >
          <h3>Sections</h3>
        </a>
        <div ref={subOptionsRef} className="suboptions-section">
          <ul className={`suboptions`}>
            <MenuSubOption />
          </ul>
        </div>
      </div>
    </li>
  );
};

export default MenuOption;
