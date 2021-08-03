import './App.css';
import React from "react";

import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";

function App() {

  return (
    <div className="page">
      <Header></Header>
      <Navigation></Navigation>
      <Main></Main>
      <Movies></Movies>
      <SavedMovies></SavedMovies>
      <Register></Register>
      <Login></Login>
      <Profile></Profile>
      <Footer></Footer>
    </div>
  );
}

export default App;
