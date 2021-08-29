import React from "react";

import { Link } from "react-router-dom";
import logoIcon from "../../images/icons/logo.svg";
import useFormAndValidation from "../../hooks/useFormValidation";

function Login({ handleSignIn }) {
  React.useEffect(() => {
    document.title = "Авторизация — Movies Explorer";
  }, []);
  const {
    values,
    handleChange,
    resetForm,
    errors,
    isValid,
    isSending,
    setIsSending,
  } = useFormAndValidation();
  const { email, password } = values;

  function handleSubmit(e) {
    e.preventDefault();
    isValid && handleSignIn({ email, password }, resetForm, setIsSending);
  }

  return (
    <main className="main">
      <section className="register">
        <div className="register__container">
          <Link to="/" className="header__logo">
            <img className="header__image" src={logoIcon} alt="Логотип" />
          </Link>
          <h2 className="register__title">Рады видеть!</h2>
          <form className="register__form" onSubmit={handleSubmit} noValidate>
            <fieldset className="register__fieldset">
              <label className="register__label">
                <span className="register__label-text">E-mail</span>
                <input
                  className={`register__input ${
                    errors.email ? "register__input_invalid" : ""
                  }`}
                  type="email"
                  value={email}
                  placeholder=""
                  name="email"
                  minLength="2"
                  maxLength="40"
                  required
                  onChange={handleChange}
                  disabled={isSending}
                />
                <span className="register__input-error profile-email-error">
                  {errors.email}
                </span>
              </label>
              <label className="register__label">
                <span className="register__label-text">Пароль</span>
                <input
                  className={`register__input ${
                    errors.password ? "register__input_invalid" : ""
                  }`}
                  type="password"
                  value={password}
                  placeholder=""
                  name="password"
                  minLength="8"
                  maxLength="40"
                  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
                  title="Используйте большие и маленькие буквы, добавьте цифры."
                  required
                  onChange={handleChange}
                  disabled={isSending}
                />
                <span className="register__input-error profile-email-error">
                  {errors.password}
                </span>
              </label>
              <div className="register__btn-container">
                <button
                  className="register__btn"
                  type="submit"
                  aria-label="Кнопка"
                  disabled={!(isValid && !isSending)}
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
