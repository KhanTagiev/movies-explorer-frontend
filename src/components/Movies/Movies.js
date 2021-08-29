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
  isCheckedShortFilm,
  onCheckedShortFilm,
  savedMovies,
  isWasRequest,
  handleChangeSearchKeyword,
  keyword,
  handleMovieLike,
  handleMovieDisLike,
}) {
  React.useEffect(() => {
    document.title = "Фильмы — Movies Explorer";
  }, []);
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isNavMenuOpen={isNavMenuOpen}
        onNavMenuOpen={onNavMenuOpen}
        onClose={onClose}
      />
      <main className="main">
        <SearchForm
          isChecked={isCheckedShortFilm}
          onChangeCheckbox={onCheckedShortFilm}
          onSubmit={onSubmit}
          handleChange={handleChangeSearchKeyword}
          keyword={keyword}
          isWasRequest={isWasRequest}
        />
        {isLoading ? (
          <Preloader/>
        ) : (
          <MoviesCardList
            movies={movies}
            savedMovies={savedMovies}
            isWasRequest={isWasRequest}
            isChecked={isCheckedShortFilm}
            handleMovieLike={handleMovieLike}
            handleMovieDisLike={handleMovieDisLike}
          />
        )}
      </main>
      <Footer/>
    </>
  );
}

export default Movies;
