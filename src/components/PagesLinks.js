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
        ФОРМУЛА НАТЯЖЕНИЯ
      </NavLink>
      <NavLink to="/products" className={getLinkClass}>
        Продукты
      </NavLink>
      <NavLink to="/works" className={getLinkClass}>
        Работы
      </NavLink>
      <NavLink to="/contacts" className={getLinkClass}>
        Контакты
      </NavLink>
      <NavLink to="/company" className={getLinkClass}>
        Компания
      </NavLink>
    </header>
  );
};
