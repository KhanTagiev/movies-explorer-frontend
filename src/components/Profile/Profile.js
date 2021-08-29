import React from "react";

import "./Profile.css";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormAndValidation from "../../hooks/useFormValidation";

function Profile({
  loggedIn,
  isNavMenuOpen,
  onNavMenuOpen,
  handleSignOut,
  handleUpdateProfile,
  onClose,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, handleChangeIsValid, errors, isValid } =
    useFormAndValidation();
  const { name = currentUser.name, email = currentUser.email } = values;

  function handleSubmit(e) {
    e.preventDefault();
    isValid && handleUpdateProfile({ name, email }, handleChangeIsValid);
  }

  return (
    <>
      <Header
        loggedIn={loggedIn}
        isNavMenuOpen={isNavMenuOpen}
        onNavMenuOpen={onNavMenuOpen}
        onClose={onClose}
       />
      <main className="main">
        <section className="profile section">
          <div className="profile__container section__container">
            <h1 className="profile__title">Привет, {currentUser.name}!</h1>
            <form
              className="profile-form"
              name="profile__form"
              onSubmit={handleSubmit}
              noValidate
            >
              <fieldset className="profile-form__fieldset">
                <label className="profile-form__label">
                  <span className="profile-form__label-text">Имя</span>
                  <input
                    className="profile-form__input profile-form__input_name"
                    type="text"
                    value={name}
                    placeholder="Имя"
                    name="name"
                    minLength="2"
                    maxLength="30"
                    required
                    onChange={handleChange}
                  />
                  <span className="profile-form__input-error">
                    {errors.name}
                  </span>
                </label>
                <label className="profile-form__label">
                  <span className="profile-form__label-text">E-mail</span>
                  <input
                    className="profile-form__input profile-form__input_email"
                    type="email"
                    value={email}
                    placeholder="Email"
                    name="email"
                    minLength="2"
                    maxLength="30"
                    required
                    onChange={handleChange}
                  />
                  <span className="profile-form__input-error">
                    {errors.email}
                  </span>
                </label>
                <button
                  className="profile-form__btn"
                  type="submit"
                  aria-label="Сохранить"
                  onClick={handleSubmit}
                  disabled={!isValid}
                >
                  Редактировать
                </button>
              </fieldset>
            </form>
            <button
              className="profile__btn"
              type="button"
              aria-label="Сохранить"
              onClick={handleSignOut}
            >
              Выйти из аккаунта
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Profile;
