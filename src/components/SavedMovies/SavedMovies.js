import React from "react";

import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import Header from "../Header/Header";

function SavedMovies({ loggedIn, isNavMenuOpen, onNavMenuOpen, onClose }) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isNavMenuOpen={isNavMenuOpen}
        onNavMenuOpen={onNavMenuOpen}
        onClose={onClose}
        isMainPlace={true}
      ></Header>
      {/*<MoviesCardList></MoviesCardList>
      <MoviesCard></MoviesCard>*/}
    </>
  );
}

export default SavedMovies;
