import React, { useContext } from "react";
import { MenuContext } from "../../context/MenuContext";
import MenuBody from "./MenuBody";
import MenuButton from "./MenuButton";
import MenuFooter from "./MenuFooter";
import MenuHead from "./MenuHead";

const Menu = () => {
  const { clickMenu, isMenuOpen } = useContext(MenuContext);

  return (
    <>
      <aside
        className={`menu ${
          isMenuOpen
            ? "visibility-visible opacity-1"
            : "visibility-hidden opacity-0"
        }`}
      >
        <MenuHead />
        <MenuBody />
        <MenuFooter />
      </aside>
      <MenuButton handleClick={clickMenu} isMenuOpen={isMenuOpen} />
    </>
  );
};

export default Menu;
