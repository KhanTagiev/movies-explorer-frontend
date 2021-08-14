import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./Navigation.css";
import profileIcon from "../../images/icons/profile.svg";

function Navigation({ isOpen, onOpen, onClose }) {
  function openNavMenu() {
    onOpen();
  }

  return (
    <>
      <div
        className={`navigation__container ${
          isOpen ? "navigation__container_active" : ""
        }`}
      >
        <nav className="navigation__menu">
          <ul className="navigation__links">
            <li className="navigation__link-container navigation__link-container_main">
              <NavLink
                exact
                to="/"
                className="navigation__link"
                activeClassName="navigation__link_active"
                onClick={onClose}
              >
                Главная
              </NavLink>
            </li>
            <li className="navigation__link-container">
              <NavLink
                to="/movies"
                className="navigation__link"
                activeClassName="navigation__link_active"
                onClick={onClose}
              >
                Фильмы
              </NavLink>
            </li>
            <li className="navigation__link-container">
              <NavLink
                to="/saved-movies"
                className="navigation__link"
                activeClassName="navigation__link_active"
                onClick={onClose}
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <li className="navigation__link-container">
            <Link
              to="/profile"
              className="navigation__link navigation__link_profile"
              onClick={onClose}
            >
              Аккаунт
              <div className="navigation__avatar-container">
                <img src={profileIcon} alt="Иконка профиля" />
              </div>
            </Link>
          </li>
        </nav>
      </div>
      <button
        className={`navigation__btn ${isOpen ? "navigation__btn_active" : ""}`}
        type="button"
        aria-label="Открыть меню"
        onClick={isOpen ? onClose : openNavMenu}
      >
        <span
          className={`navigation__btn-icon ${
            isOpen ? "navigation__btn-icon_active" : ""
          }`}
        >
          {" "}
        </span>
      </button>
    </>
  );
}

export default Navigation;
