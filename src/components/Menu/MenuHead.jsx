import React from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/icon_page.png";

const MenuHead = () => {
  return (
    <section className="menu-head-section">
      <div className="menu-head">
        <div className="menu-icon">
          <img src={icon} alt="icon" />
        </div>
        <div className="menu-title">
          <Link to={"/"}>
            <h2>CV Panel</h2>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MenuHead;
