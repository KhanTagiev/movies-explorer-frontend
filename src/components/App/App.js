import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import moviesDataBase from "../../utils/movies_data";

function App() {
  const [moviesData, setMoviesData] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isNavMenuOpen, setNavMenuOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [moviesCount, setMoviesCount] = React.useState(0);
  const [moviesLength, setMoviesLength] = React.useState(0);
  const [isMoviesListExcess, setMoviesListExcess] = React.useState(false);
  const [isCheckedShortFilm, setCheckedShortFilm] = React.useState(false);

  React.useEffect(() => {
    setMoviesData(moviesDataBase);
    setMoviesCount(8);
    setMoviesLength(5);
  }, []);

  React.useEffect(() => {
    setMovies(moviesData.slice(0, moviesLength));
  }, [moviesData, moviesLength]);

  React.useEffect(() => {
    setMoviesListExcess(checkMoviesListExcess);
  }, [movies]);

  function handleNavMenuOpen() {
    setNavMenuOpen(true);
  }

  function closeAllPopup() {
    setNavMenuOpen(false);
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

  function checkMoviesListExcess() {
    if (movies.length < moviesData.length) {
      return false;
    } else {
      return true;
    }
  }

  function handleCheckedShortFilm() {
    if (!isCheckedShortFilm) {
      const moviesShorts = moviesData.filter((movie) => movie.duration <= 40);
      setMoviesData(moviesShorts);
    } else {
      setMoviesData(moviesDataBase);
    }
    setCheckedShortFilm(!isCheckedShortFilm);
  }

  return (
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
        <Route path="/movies">
          <Movies
            loggedIn={loggedIn}
            isNavMenuOpen={isNavMenuOpen}
            isLoading={isLoading}
            onNavMenuOpen={handleNavMenuOpen}
            onClose={closeAllPopup}
            onSubmit={handleSearchSubmit}
            movies={movies}
            onAddMovies={handleAddMovies}
            isMoviesListExcess={isMoviesListExcess}
            isCheckedShortFilm={isCheckedShortFilm}
            onCheckedShortFilm={handleCheckedShortFilm}
          ></Movies>
        </Route>
        <Route path="/saved-movies">
          <SavedMovies
            loggedIn={loggedIn}
            isNavMenuOpen={isNavMenuOpen}
            onNavMenuOpen={handleNavMenuOpen}
            onClose={closeAllPopup}
            movies={movies}
            onAddMovies={handleAddMovies}
            isMoviesListExcess={isMoviesListExcess}
          ></SavedMovies>
        </Route>
        <Route path="/profile">
          <Profile
            loggedIn={loggedIn}
            isNavMenuOpen={isNavMenuOpen}
            onNavMenuOpen={handleNavMenuOpen}
            onClose={closeAllPopup}
          ></Profile>
        </Route>
        <Route path="/signin">
          <Login></Login>
        </Route>
        <Route path="/signup">
          <Register></Register>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
