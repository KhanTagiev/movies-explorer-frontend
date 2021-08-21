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
  savedMovies,
}) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isNavMenuOpen={isNavMenuOpen}
        onNavMenuOpen={onNavMenuOpen}
        onClose={onClose}
      ></Header>
      <main className="main">
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
            savedMovies={savedMovies}
            onAddMovies={onAddMovies}
            isMoviesListExcess={isMoviesListExcess}
          ></MoviesCardList>
        )}
      </main>
      <Footer></Footer>
    </>
  );
}

export default Movies;
