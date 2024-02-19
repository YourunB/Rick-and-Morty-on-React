import React from "react";
import { NavLink } from "react-router-dom";

import "./PagesLinks.scss";

export const PagesLinks = () => {
  function getLinkClass(obj) {
    let className = "PageLink";
    if (obj.isActive) className += " ActivePageLink";
    return className;
  }

  return (
    <header>
      <NavLink to="/main" className={getLinkClass}>
        Main
      </NavLink>
      <NavLink to="/about" className={getLinkClass}>
        About
      </NavLink>
    </header>
  );
};
