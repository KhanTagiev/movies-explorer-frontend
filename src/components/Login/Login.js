import React from "react";

import "./Login.css";
import { Link } from "react-router-dom";
import logoIcon from "../../images/icons/logo.svg";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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
          <h2 className="register__title">Рады видеть!</h2>
          <form className="register__form">
            <fieldset className="register__fieldset">
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
                <span className="register__input-error profile-email-error"></span>
              </label>
              <div className="register__btn-container">
                <button
                  className="register__btn"
                  type="submit"
                  aria-label="Кнопка"
                >
                  Войти
                </button>
              </div>
            </fieldset>
          </form>
          <div className="register__link-container">
            <p className="register__link-text">Ещё не зарегистрированы?</p>
            <Link className="register__link" to="/signup">
              Регистрация
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
