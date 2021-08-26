import "./App.css";
import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
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
  const [moviesData, setMoviesData] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isNavMenuOpen, setNavMenuOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [moviesCount, setMoviesCount] = React.useState(0);
  const [moviesLength, setMoviesLength] = React.useState(0);
  const [isMoviesListExcess, setMoviesListExcess] = React.useState(false);
  const [isCheckedShortFilm, setCheckedShortFilm] = React.useState(false);
  const [status, setStatus] = React.useState({
    isSuccess: false,
    message: "Что-то пошло не так! Попробуйте ещё раз.",
  });
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);

  React.useEffect(() => {
    mainApi
      .getProfile()
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      setMoviesCount(3);
      setMoviesLength(12);
      moviesApi
        .getMovies()
        .then((movies) => {
          setMoviesData(movies);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    setMovies(moviesData.slice(0, moviesLength));
  }, [moviesData, moviesLength]);

  React.useEffect(() => {
    function checkMoviesListExcess() {
      if (movies.length < moviesData.length) {
        return false;
      } else {
        return true;
      }
    }

    setMoviesListExcess(checkMoviesListExcess);
  }, [movies, moviesData]);

  function handleCheckToken() {
    mainApi
      .getProfile()
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSignUp(email, password, name) {
    mainApi
      .signUp(email, password, name)
      .then((data) => {
        setStatus({
          isSuccess: true,
          message: "Вы успешно зарегистрировались!",
        });
        setIsInfoTooltipPopupOpen(true);
        history.push("/signin");
      })
      .catch((err) => {
        setStatus({
          isSuccess: false,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleSignIn(email, password) {
    mainApi
      .signIn(email, password)
      .then((data) => {
        handleCheckToken();
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
        handleCheckToken();
      })
      .catch((err) => {
        setStatus({
          isSuccess: false,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleUpdateProfile(name, email) {
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

  function handleSearchSubmit(keyword) {
    setLoading(true);
    const moviesSearch = moviesData.filter((movie) =>
      movie.nameRU.includes(keyword)
    );
    setMoviesData(moviesSearch);
    setLoading(false);
  }

  function handleAddMovies() {
    setMoviesLength(moviesLength + moviesCount);
  }

  function handleCheckedShortFilm() {
    if (!isCheckedShortFilm) {
      const moviesShorts = moviesData.filter((movie) => movie.duration <= 40);
      setMoviesData(moviesShorts);
    } else {
      setMoviesData(moviesData);
    }
    setCheckedShortFilm(!isCheckedShortFilm);
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
            movies={movies}
            savedMovies={savedMovies}
            onAddMovies={handleAddMovies}
            isMoviesListExcess={isMoviesListExcess}
            isCheckedShortFilm={isCheckedShortFilm}
            onCheckedShortFilm={handleCheckedShortFilm}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            isNavMenuOpen={isNavMenuOpen}
            onNavMenuOpen={handleNavMenuOpen}
            isLoading={isLoading}
            onClose={closeAllPopup}
            savedMovies={savedMovies}
            onAddMovies={handleAddMovies}
            isMoviesListExcess={isMoviesListExcess}
            isCheckedShortFilm={isCheckedShortFilm}
            onCheckedShortFilm={handleCheckedShortFilm}
            onSubmit={handleSearchSubmit}
          ></ProtectedRoute>
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
