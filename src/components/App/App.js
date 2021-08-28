import "./App.css";
import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import * as mainApi from "../../utils/mainApi";
import * as moviesApi from "../../utils/moviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import InfoTooltipPopup from "../InfoTooltipPopup/InfoTooltipPopup";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
    _id: "",
  });
  const [loggedIn, setLoggedIn] = React.useState(
    JSON.parse(localStorage.getItem("loggedIn")) || false
  );

  const [moviesData, setMoviesData] = React.useState(
    JSON.parse(localStorage.getItem("moviesDB")) || []
  );
  const [moviesSearched, setMoviesSearched] = React.useState(
    JSON.parse(localStorage.getItem("isCheckedShortFilm"))
      ? JSON.parse(localStorage.getItem("moviesSearchedShorts"))
      : JSON.parse(localStorage.getItem("moviesSearched")) || []
  );
  const [savedMovies, setSavedMovies] = React.useState([]);

  const [isWasRequest, setIsWasRequest] = React.useState(
    JSON.parse(localStorage.getItem("isWasRequest")) || false
  );
  const [keyword, setKeyword] = React.useState(
    JSON.parse(localStorage.getItem("keyword")) || ""
  );
  const [isCheckedShortFilm, setCheckedShortFilm] = React.useState(
    JSON.parse(localStorage.getItem("isCheckedShortFilm")) || false
  );

  const [isLoading, setLoading] = React.useState(false);
  const [isNavMenuOpen, setNavMenuOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  const [status, setStatus] = React.useState({
    isSuccess: false,
    message: "Что-то пошло не так! Попробуйте ещё раз.",
  });

  React.useEffect(() => {
    mainApi
      .getProfile()
      .then((user) => {
        setLoggedIn(true);
        localStorage.setItem("loggedIn", JSON.stringify(true));
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("loggedIn");
      });
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      if (moviesData.length === 0) {
        moviesApi
          .getMovies()
          .then((movies) => {
            setMoviesData(movies);
            localStorage.setItem("moviesDB", JSON.stringify(movies));
          })
          .catch((err) => {
            console.log(err);
            handleCleanLocalStorageAndStates();
          });
      }
    }
  }, [loggedIn]);

  function handleCleanLocalStorageAndStates() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({
      name: "",
      email: "",
      _id: "",
    });
    setMoviesData([]);
    setMoviesSearched([]);
    setIsWasRequest(false);
    setKeyword("");
    setCheckedShortFilm(false);
    history.push("/");
  }

  function handleCheckToken() {
    mainApi
      .getProfile()
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
        localStorage.setItem("loggedIn", JSON.stringify(true));
        history.push("/movies");
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("loggedIn");
      });
  }

  function handleSignUp({ email, password, name }, resetForm) {
    mainApi
      .signUp(email, password, name)
      .then((data) => {
        handleSignIn(
          { email, password },
          resetForm,
          "Вы успешно зарегистрировались. Добро пожаловать!"
        );
      })
      .catch((err) => {
        setStatus({
          isSuccess: false,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleSignIn({ email, password }, resetForm, successCustomMessage) {
    mainApi
      .signIn(email, password)
      .then((data) => {
        resetForm();
        handleCheckToken();
        setStatus({
          isSuccess: true,
          message: successCustomMessage
            ? successCustomMessage
            : "С возвращением!",
        });
        setIsInfoTooltipPopupOpen(true);
      })
      .catch((err) => {
        setStatus({
          isSuccess: false,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleSignOut() {
    mainApi
      .signOut()
      .then((data) => {
        handleCleanLocalStorageAndStates();
      })
      .catch((err) => {
        setStatus({
          isSuccess: false,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleUpdateProfile({ name, email }) {
    mainApi
      .updateProfile(name, email)
      .then((user) => {
        setCurrentUser(user);
        setStatus({
          isSuccess: true,
          message: "Профиль успешно обновлен!",
        });
        setIsInfoTooltipPopupOpen(true);
      })
      .catch((err) => {
        setStatus({
          isSuccess: false,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleNavMenuOpen() {
    setNavMenuOpen(true);
  }

  function closeAllPopup() {
    setNavMenuOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleChangeSearchKeyword(e) {
    setKeyword(e.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const moviesSearched = moviesData.filter((movie) => {
      const nameEN = movie.nameEN ? movie.nameEN : movie.nameRU;
      return (
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
        movie.description.toLowerCase().includes(keyword.toLowerCase()) ||
        nameEN.toLowerCase().includes(keyword.toLowerCase())
      );
    });
    const moviesSearchedShorts = moviesSearched.filter(
      (movie) => movie.duration <= 40
    );
    setMoviesSearched(moviesSearched);
    setLoading(false);
    setIsWasRequest(true);
    localStorage.setItem("keyword", JSON.stringify(keyword));
    localStorage.setItem("moviesSearched", JSON.stringify(moviesSearched));
    localStorage.setItem(
      "moviesSearchedShorts",
      JSON.stringify(moviesSearchedShorts)
    );
    localStorage.setItem("isWasRequest", JSON.stringify(true));
  }

  function handleCheckedShortFilm() {
    setLoading(true);
    if (!isCheckedShortFilm) {
      setMoviesSearched(
        JSON.parse(localStorage.getItem("moviesSearchedShorts"))
      );
    } else {
      setMoviesSearched(JSON.parse(localStorage.getItem("moviesSearched")));
    }
    setCheckedShortFilm(!isCheckedShortFilm);
    localStorage.setItem(
      "isCheckedShortFilm",
      JSON.stringify(!isCheckedShortFilm)
    );
    setLoading(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main
              loggedIn={loggedIn}
              isNavMenuOpen={isNavMenuOpen}
              onNavMenuOpen={handleNavMenuOpen}
              onClose={closeAllPopup}
            ></Main>
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            isNavMenuOpen={isNavMenuOpen}
            isLoading={isLoading}
            onNavMenuOpen={handleNavMenuOpen}
            onClose={closeAllPopup}
            onSubmit={handleSearchSubmit}
            movies={moviesSearched}
            savedMovies={savedMovies}
            isCheckedShortFilm={isCheckedShortFilm}
            onCheckedShortFilm={handleCheckedShortFilm}
            isWasRequest={isWasRequest}
            handleChangeSearchKeyword={handleChangeSearchKeyword}
            keyword={keyword}
          ></ProtectedRoute>
          {/* <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            isNavMenuOpen={isNavMenuOpen}
            onNavMenuOpen={handleNavMenuOpen}
            isLoading={isLoading}
            onClose={closeAllPopup}
            savedMovies={savedMovies}
            isCheckedShortFilm={isCheckedShortFilm}
            onCheckedShortFilm={handleCheckedShortFilm}
            onSubmit={handleSearchSubmit}
            isWasRequest={isWasRequest}
            handleChangeSearchKeyword={handleChangeSearchKeyword}
            keyword={keyword}
          ></ProtectedRoute>*/}
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            isNavMenuOpen={isNavMenuOpen}
            onNavMenuOpen={handleNavMenuOpen}
            handleSignOut={handleSignOut}
            handleUpdateProfile={handleUpdateProfile}
            onClose={closeAllPopup}
          ></ProtectedRoute>
          <Route path="/signin">
            <Login handleSignIn={handleSignIn}></Login>
          </Route>
          <Route path="/signup">
            <Register handleSignUp={handleSignUp}></Register>
          </Route>
          <Route path="*">
            <PageNotFound history={history} />
          </Route>
        </Switch>
        <InfoTooltipPopup
          isOpen={isInfoTooltipPopupOpen}
          status={status}
          onClose={closeAllPopup}
        ></InfoTooltipPopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
