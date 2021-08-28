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
  onClose,
  isCheckedShortFilm,
  onCheckedShortFilm,
  onSubmit,
  isWasRequest,
  handleMovieDisLike,
  handleChangeSearchKeyword,
  keyword,
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
          isWasRequest={isWasRequest}
          handleChange={handleChangeSearchKeyword}
          keyword={keyword}
        ></SearchForm>
        {isLoading ? (
          <Preloader></Preloader>
        ) : (
          <MoviesCardList
            movies={savedMovies}
            savedMovies={savedMovies}
            onAddMovies={onAddMovies}
            isChecked={isCheckedShortFilm}
            isPlaceSavedMovies={true}
            isWasRequest={isWasRequest}
            handleMovieDisLike={handleMovieDisLike}
          ></MoviesCardList>
        )}
      </main>
      <Footer></Footer>
    </>
  );
}

export default SavedMovies;
