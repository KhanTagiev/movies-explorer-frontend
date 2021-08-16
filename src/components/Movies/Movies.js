import React from "react";

import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies({
  loggedIn,
  isNavMenuOpen,
  isLoading,
  onNavMenuOpen,
  onClose,
  onSubmit,
  movies,
  onAddMovies,
  isMoviesListExcess,
  isCheckedShortFilm,
  onCheckedShortFilm,
}) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isNavMenuOpen={isNavMenuOpen}
        onNavMenuOpen={onNavMenuOpen}
        onClose={onClose}
      ></Header>
      <SearchForm
        isChecked={isCheckedShortFilm}
        onChangeCheckbox={onCheckedShortFilm}
        onSubmit={onSubmit}
      ></SearchForm>
      {isLoading ? (
        <Preloader></Preloader>
      ) : (
        <MoviesCardList
          movies={movies}
          onAddMovies={onAddMovies}
          isMoviesListExcess={isMoviesListExcess}
        ></MoviesCardList>
      )}
      <Footer></Footer>
    </>
  );
}

export default Movies;
