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
  React.useEffect(() => {
    document.title = "Сохраненные фильмы — Movies Explorer";
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
          isWasRequest={isWasRequest}
          handleChange={handleChangeSearchKeyword}
          keyword={keyword}
        />
        {isLoading ? (
          <Preloader/>
        ) : (
          <MoviesCardList
            movies={savedMovies}
            savedMovies={savedMovies}
            onAddMovies={onAddMovies}
            isChecked={isCheckedShortFilm}
            isPlaceSavedMovies={true}
            isWasRequest={isWasRequest}
            handleMovieDisLike={handleMovieDisLike}
          />
        )}
      </main>
      <Footer/>
    </>
  );
}

export default SavedMovies;
