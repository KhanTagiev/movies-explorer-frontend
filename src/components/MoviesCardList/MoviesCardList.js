import React from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  onAddMovies,
  savedMovies,
  isMoviesListExcess,
  isPlaceSavedMovies,
}) {
  return (
    <section className="movies section">
      <div className="movies__container section__container">
        {movies.length > 0 ? (
          <ul className="movies__list-container">
            {movies.map((movie) => (
              <MoviesCard
                key={movie.id}
                movie={movie}
                isPlaceSavedMovies={isPlaceSavedMovies}
                savedMovies={savedMovies}
              />
            ))}
          </ul>
        ) : (
          <p className="movies__not-found-text">Фильмы не найдены</p>
        )}
        <button
          className={`movies__btn ${
            isMoviesListExcess ? "movies__btn_hide" : ""
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
