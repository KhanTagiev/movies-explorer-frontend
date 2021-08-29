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
  const [loggedIn, setLoggedIn] = React.useState(
    JSON.parse(localStorage.getItem("loggedIn")) || false
  );

  const [moviesData, setMoviesData] = React.useState(
    JSON.parse(localStorage.getItem("moviesDB")) || []
  );
  const [moviesSearched, setMoviesSearched] = React.useState(
    JSON.parse(localStorage.getItem("moviesSearched")) || []
  );
  const [savedMovies, setSavedMovies] = React.useState(
    JSON.parse(localStorage.getItem("savedMovies")) || []
  );

  const [savedMoviesSearched, setSavedMoviesSearched] = React.useState(
    JSON.parse(localStorage.getItem("savedMoviesSearched")) || []
  );
  const [isWasRequest, setIsWasRequest] = React.useState(
    JSON.parse(localStorage.getItem("isWasRequest")) || false
  );
  const [isWasSavedRequest, setIsWasSavedRequest] = React.useState(
    JSON.parse(localStorage.getItem("isWasSavedRequest")) || false
  );
  const [keyword, setKeyword] = React.useState(
    JSON.parse(localStorage.getItem("keyword")) || ""
  );
  const [savedKeyword, setSavedKeyword] = React.useState(
    JSON.parse(localStorage.getItem("savedKeyword")) || ""
  );
  const [isCheckedShortFilm, setCheckedShortFilm] = React.useState(
    JSON.parse(localStorage.getItem("isCheckedShortFilm")) || false
  );
  const [isSavedCheckedShortFilm, setSavedCheckedShortFilm] = React.useState(
    JSON.parse(localStorage.getItem("isSavedCheckedShortFilm")) || false
  );

  const [isLoading, setIsLoading] = React.useState(false);
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
        handleCleanLocalStorageAndStates();
      });
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      if (moviesData.length === 0) {
        setIsLoading(true);
        moviesApi
          .getMovies()
          .then((movies) => {
            setMoviesData(movies);
            localStorage.setItem("moviesDB", JSON.stringify(movies));
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
      if (savedMovies.length === 0) {
        setIsLoading(true);
        mainApi
          .getMovies()
          .then((savedMovies) => {
            setSavedMovies(savedMovies);
            localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  }, [loggedIn, moviesData.length, savedMovies.length]);

  function handleCleanLocalStorageAndStates() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({
      name: "",
      email: "",
      _id: "",
    });
    setMoviesData([]);
    setSavedMovies([]);
    setMoviesSearched([]);
    setIsWasRequest(false);
    setKeyword("");
    setCheckedShortFilm(false);
    setIsWasSavedRequest(false);
    setSavedKeyword("");
    setSavedCheckedShortFilm(false);
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
        handleCleanLocalStorageAndStates();
      });
  }

  function handleSignUp({ email, password, name }, resetForm, setIsSending) {
    setIsSending(true);
    mainApi
      .signUp(email, password, name)
      .then((data) => {
        handleSignIn(
          { email, password },
          resetForm,
          setIsSending,
          "Вы успешно зарегистрировались. Добро пожаловать!"
        );
      })
      .catch((err) => {
        setIsSending(false);
        if (err === "Ошибка 409") {
          setStatus({
            isSuccess: false,
            message: "Пользователь с таким email уже существует.",
          });
        } else if (err === "Ошибка 400") {
          setStatus({
            isSuccess: false,
            message: "При регистрации пользователя произошла ошибка.",
          });
        } else {
          setStatus({
            isSuccess: false,
            message: "На сервере произошла ошибка. Попробуйте ещё раз.",
          });
        }
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleSignIn(
    { email, password },
    resetForm,
    setIsSending,
    successCustomMessage
  ) {
    setIsSending(true);
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
        setIsSending(false);
        if (err === "Ошибка 401") {
          setStatus({
            isSuccess: false,
            message: "Вы ввели неправильный логин или пароль.",
          });
        } else {
          setStatus({
            isSuccess: false,
            message: "При авторизации произошла ошибка. Попробуйте ещё раз.",
          });
        }
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

  function handleUpdateProfile({ name, email }, setIsValid, setIsSending) {
    setIsSending(true);
    mainApi
      .updateProfile(name, email)
      .then((user) => {
        setIsValid(false);
        setCurrentUser(user);
        setStatus({
          isSuccess: true,
          message: "Профиль успешно обновлен!",
        });
        setIsInfoTooltipPopupOpen(true);
      })
      .catch((err) => {
        if (err === "Ошибка 409") {
          setStatus({
            isSuccess: false,
            message: "Пользователь с таким email уже существует.",
          });
        } else if (err === "Ошибка 400") {
          setStatus({
            isSuccess: false,
            message: "При обновлении профиля произошла ошибка.",
          });
        } else {
          setStatus({
            isSuccess: false,
            message: "500 На сервере произошла ошибка. Попробуйте ещё раз.",
          });
        }
        setIsInfoTooltipPopupOpen(true);
      })
      .finally(() => {
        setIsSending(false);
      });
  }

  function handleMovieLike(movie) {
    mainApi
      .movieLike({
        country: movie.country ? movie.country : "Нет данных",
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailer: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN ? movie.nameEN : movie.nameRU,
      })
      .then((newMovie) => {
        const newSavedMovies = [...savedMovies, newMovie];
        const newSavedMoviesSearched = handleMoviesKeywordFilter(
          newSavedMovies,
          savedKeyword
        );
        setSavedMovies(newSavedMovies);
        setSavedMoviesSearched(newSavedMoviesSearched);
        localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
        localStorage.setItem(
          "savedMoviesSearched",
          JSON.stringify(newSavedMoviesSearched)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleMovieDisLike(movie) {
    const deleteMovie = movie._id
      ? movie
      : savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
    mainApi
      .movieDisLike(deleteMovie._id)
      .then((deleteMovie) => {
        const newSavedMovies = savedMovies.filter(
          (movie) => movie._id !== deleteMovie._id
        );
        const newSavedMoviesSearched = savedMoviesSearched.filter(
          (movie) => movie._id !== deleteMovie._id
        );
        setSavedMovies(newSavedMovies);
        setSavedMoviesSearched(newSavedMoviesSearched);
        localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
        localStorage.setItem(
          "savedMoviesSearched",
          JSON.stringify(newSavedMoviesSearched)
        );
      })
      .catch((err) => {
        console.log(err);
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

  function handleChangeSavedSearchKeyword(e) {
    setSavedKeyword(e.target.value);
    console.log(e.target.value);
  }

  function handleMoviesKeywordFilter(data, key) {
    return data.filter((item) => {
      const nameEN = item.nameEN ? item.nameEN : item.nameRU;
      return (
        item.nameRU.toLowerCase().includes(key.toLowerCase()) ||
        item.description.toLowerCase().includes(key.toLowerCase()) ||
        nameEN.toLowerCase().includes(key.toLowerCase())
      );
    });
  }
  function handleSearchSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const moviesSearched = handleMoviesKeywordFilter(moviesData, keyword);
    setMoviesSearched(moviesSearched);
    setIsWasRequest(true);
    localStorage.setItem("keyword", JSON.stringify(keyword));
    localStorage.setItem("moviesSearched", JSON.stringify(moviesSearched));
    localStorage.setItem("isWasRequest", JSON.stringify(true));
    setIsLoading(false);
  }

  function handleSavedSearchSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const savedMoviesSearched = handleMoviesKeywordFilter(
      savedMovies,
      savedKeyword
    );
    setSavedMoviesSearched(savedMoviesSearched);
    setIsWasSavedRequest(true);
    localStorage.setItem("savedKeyword", JSON.stringify(savedKeyword));
    localStorage.setItem(
      "savedMoviesSearched",
      JSON.stringify(savedMoviesSearched)
    );
    localStorage.setItem("isWasSavedRequest", JSON.stringify(true));
    setIsLoading(false);
  }

  function handleCheckedShortFilm() {
    setCheckedShortFilm(!isCheckedShortFilm);
    localStorage.setItem(
      "isCheckedShortFilm",
      JSON.stringify(!isCheckedShortFilm)
    );
  }

  function handleSavedCheckedShortFilm() {
    setSavedCheckedShortFilm(!isSavedCheckedShortFilm);
    localStorage.setItem(
      "isSavedCheckedShortFilm",
      JSON.stringify(!isSavedCheckedShortFilm)
    );
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
            />
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
            handleMovieLike={handleMovieLike}
            handleMovieDisLike={handleMovieDisLike}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            isNavMenuOpen={isNavMenuOpen}
            onNavMenuOpen={handleNavMenuOpen}
            isLoading={isLoading}
            onClose={closeAllPopup}
            savedMovies={savedMoviesSearched}
            isCheckedShortFilm={isSavedCheckedShortFilm}
            onCheckedShortFilm={handleSavedCheckedShortFilm}
            onSubmit={handleSavedSearchSubmit}
            isWasRequest={isWasSavedRequest}
            handleChangeSearchKeyword={handleChangeSavedSearchKeyword}
            keyword={savedKeyword}
            handleMovieDisLike={handleMovieDisLike}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            isNavMenuOpen={isNavMenuOpen}
            onNavMenuOpen={handleNavMenuOpen}
            handleSignOut={handleSignOut}
            handleUpdateProfile={handleUpdateProfile}
            onClose={closeAllPopup}
          />
          <Route path="/signin">
            <Login handleSignIn={handleSignIn}/>
          </Route>
          <Route path="/signup">
            <Register handleSignUp={handleSignUp}/>
          </Route>
          <Route path="*">
            <PageNotFound history={history} />
          </Route>
        </Switch>
        <InfoTooltipPopup
          isOpen={isInfoTooltipPopupOpen}
          status={status}
          onClose={closeAllPopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
