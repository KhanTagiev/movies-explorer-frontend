import React from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import useResizeWindow from "../../hooks/useResizeWindow";
import {
  SCREEN_LARGE,
  SCREEN_LARGE_MOVIES_ADD,
  SCREEN_LARGE_MOVIES_COUNT,
  SCREEN_MEDIUM_MOVIES_ADD,
  SCREEN_MEDIUM_MOVIES_COUNT,
  SCREEN_SMALL,
  SCREEN_SMALL_MOVIES_ADD,
  SCREEN_SMALL_MOVIES_COUNT,
} from "../../utils/constants";

function MoviesCardList({
  movies,
  savedMovies,
  isPlaceSavedMovies,
  isWasRequest,
}) {
  const size = useResizeWindow();
  const [moviesCount, setMoviesCount] = React.useState(0);
  const [moviesAdd, setMoviesAdd] = React.useState(0);

  React.useEffect(() => {
    if (size >= SCREEN_LARGE) {
      setMoviesCount(SCREEN_LARGE_MOVIES_COUNT);
      setMoviesAdd(SCREEN_LARGE_MOVIES_ADD);
    }
    if (size < SCREEN_LARGE && size > SCREEN_SMALL) {
      setMoviesCount(SCREEN_MEDIUM_MOVIES_COUNT);
      setMoviesAdd(SCREEN_MEDIUM_MOVIES_ADD);
    }
    if (size <= SCREEN_SMALL) {
      setMoviesCount(SCREEN_SMALL_MOVIES_COUNT);
      setMoviesAdd(SCREEN_SMALL_MOVIES_ADD);
    }
  }, [size]);

  function onAddMovies() {
    setMoviesCount(moviesCount + moviesAdd);
  }

  return (
    <section className={`movies section ${isWasRequest ? "" : "movies_hide"}`}>
      <div className="movies__container section__container">
        {movies.length > 0 ? (
          <ul className="movies__list-container">
            {movies.slice(0, moviesCount).map((movie) => (
              <MoviesCard
                key={movie.id}
                movie={movie}
                isPlaceSavedMovies={isPlaceSavedMovies}
                savedMovies={savedMovies}
              />
            ))}
          </ul>
        ) : (
          <p className="movies__not-found-text">Ничего не найдено</p>
        )}
        <button
          className={`movies__btn ${
            moviesCount >= movies.length ? "movies__btn_hide" : ""
          }`}
          type="button"
          onClick={onAddMovies}
        >
          Ещё
        </button>
      </div>
    </section>
  );
}

export default MoviesCardList;
