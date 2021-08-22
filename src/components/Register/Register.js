import React from "react";

import "./Register.css";
import logoIcon from "../../images/icons/logo.svg";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <main className="main">
      <section className="register">
        <div className="register__container">
          <Link to="/" className="header__logo">
            <img className="header__image" src={logoIcon} alt="Логотип" />
          </Link>
          <h2 className="register__title">Добро пожаловать!</h2>
          <form className="register__form">
            <fieldset className="register__fieldset">
              <label className="register__label">
                <span className="register__label-text">Имя</span>
                <input
                  className="register__input register__input_name"
                  type="text"
                  value={name}
                  placeholder=""
                  name="register-name"
                  minLength="2"
                  maxLength="40"
                  required
                  onChange={handleChangeName}
                />
                <span className="register__input-error profile-name-error"></span>
              </label>
              <label className="register__label">
                <span className="register__label-text">E-mail</span>
                <input
                  className="register__input register__input_email"
                  type="email"
                  value={email}
                  placeholder=""
                  name="register-email"
                  minLength="2"
                  maxLength="40"
                  required
                  onChange={handleChangeEmail}
                />
                <span className="register__input-error profile-email-error"></span>
              </label>
              <label className="register__label">
                <span className="register__label-text">Пароль</span>
                <input
                  className="register__input register__input_password register__input_invalid"
                  type="password"
                  value={password}
                  placeholder=""
                  name="register-password"
                  minLength="2"
                  maxLength="40"
                  required
                  onChange={handleChangePassword}
                />
                <span className="register__input-error profile-email-error">
                  Что-то пошло не так...
                </span>
              </label>
              <div className="register__btn-container">
                <button
                  className="register__btn"
                  type="submit"
                  aria-label="Кнопка"
                >
                  Зарегистрироваться
                </button>
              </div>
            </fieldset>
          </form>
          <div className="register__link-container">
            <p className="register__link-text">Уже зарегистрированы?</p>
            <Link className="register__link" to="/signin">
              Войти
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;
