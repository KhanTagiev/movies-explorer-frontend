import React from "react";

import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";

function SavedMovies({
  loggedIn,
  isNavMenuOpen,
  onNavMenuOpen,
  isLoading,
  savedMovies,
  onAddMovies,
  isMoviesListExcess,
  onClose,
  isCheckedShortFilm,
  onCheckedShortFilm,
  onSubmit,
}) {
  isMoviesListExcess = true;

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
            movies={savedMovies}
            savedMovies={savedMovies}
            onAddMovies={onAddMovies}
            isMoviesListExcess={isMoviesListExcess}
            isPlaceSavedMovies={true}
          ></MoviesCardList>
        )}
      </main>
      <Footer></Footer>
    </>
  );
}

export default SavedMovies;
