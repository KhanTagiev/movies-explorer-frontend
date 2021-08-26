import React from "react";

import "./Profile.css";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({
  loggedIn,
  isNavMenuOpen,
  onNavMenuOpen,
  handleSignOut,
  onClose,
}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  return (
    <>
      <Header
        loggedIn={loggedIn}
        isNavMenuOpen={isNavMenuOpen}
        onNavMenuOpen={onNavMenuOpen}
        onClose={onClose}
      ></Header>
      <main className="main">
        <section className="profile section">
          <div className="profile__container section__container">
            <h1 className="profile__title">Привет, {currentUser.name}!</h1>
            <form className="profile-form">
              <fieldset className="profile-form__fieldset">
                <label className="profile-form__label">
                  <span className="profile-form__label-text">Имя</span>
                  <input
                    className="profile-form__input profile-form__input_name"
                    type="text"
                    value={name}
                    placeholder=""
                    name="profile-name"
                    minLength="2"
                    maxLength="40"
                    required
                    onChange={handleChangeName}
                  />
                  <span className="profile-form__input-error profile-name-error"></span>
                </label>
                <label className="profile-form__label">
                  <span className="profile-form__label-text">E-mail</span>
                  <input
                    className="profile-form__input profile-form__input_email"
                    type="email"
                    value={email}
                    placeholder=""
                    name="profile-email"
                    minLength="2"
                    maxLength="40"
                    required
                    onChange={handleChangeEmail}
                  />
                  <span className="profile-form__input-error profile-email-error"></span>
                </label>
                <button
                  className="profile-form__btn"
                  type="submit"
                  aria-label="Сохранить"
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
