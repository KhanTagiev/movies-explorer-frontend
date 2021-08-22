import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./Header.css";
import logoIcon from "../../images/icons/logo.svg";
import Navigation from "../Navigation/Navigation";

function Header({
  loggedIn,
  isNavMenuOpen,
  onNavMenuOpen,
  onClose,
  isMainPlace,
}) {
  return (
    <header className={`header ${isMainPlace ? "header_place_main" : ""}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img className="header__image" src={logoIcon} alt="Логотип" />
        </Link>
        {loggedIn ? (
          <Navigation
            isOpen={isNavMenuOpen}
            onOpen={onNavMenuOpen}
            onClose={onClose}
          ></Navigation>
        ) : (
          <nav className="header__menu">
            <li className="header__link-container">
              <Link to="/signup" className="header__link">
                Регистрация
              </Link>
            </li>
            <li className="header__link-container">
              <NavLink
                to="/signin"
                className="header__link header__link__login"
              >
                Войти
              </NavLink>
            </li>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
