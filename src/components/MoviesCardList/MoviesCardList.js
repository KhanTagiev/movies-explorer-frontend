import React from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, onAddMovies, isMoviesListExcess }) {
  return (
    <section className="movies__container section__container">
      {movies.length > 0 ? (
        <ul className="movies__list-container">
          {movies.map((movie) => (
            <MoviesCard key={movie.id} movie={movie} />
          ))}
        </ul>
      ) : (
        <p className="movies__not-found-text">Ничего не найдено</p>
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
    </section>
  );
}

export default MoviesCardList;
