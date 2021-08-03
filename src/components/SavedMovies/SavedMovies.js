import React from "react";

import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

function SavedMovies() {

  return (
    <div>
      <MoviesCardList></MoviesCardList>
      <MoviesCard></MoviesCard>
    </div>
  );
}

export default SavedMovies;
