import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isNavMenuOpen, setNavMenuOpen] = React.useState(false);

  function handleNavMenuOpen() {
    setNavMenuOpen(true);
  }

  function closeAllPopup() {
    setNavMenuOpen(false);
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
            onNavMenuOpen={handleNavMenuOpen}
            onClose={closeAllPopup}
          ></Movies>
        </Route>
        <Route path="/saved-movies">
          <SavedMovies
            loggedIn={loggedIn}
            isNavMenuOpen={isNavMenuOpen}
            onNavMenuOpen={handleNavMenuOpen}
            onClose={closeAllPopup}
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
