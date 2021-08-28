import React from "react";

import "./MoviesCard.css";

function MoviesCard({
  movie,
  isPlaceSavedMovies,
  savedMovies,
  onLike,
  onDisLike,
}) {
  const { nameRU, duration, image, trailerLink, trailer } = movie;
  const isSaved = savedMovies.some(
    (i) => i.movieId === movie.id || i.movieId === movie.movieId
  );

  function handleMoviesLiked() {
    isSaved ? onDisLike(movie) : onLike(movie);
  }

  return (
    <article className="movies-card__container">
      <div className="movies-card__header">
        <h3 className="movies-card__title">{nameRU}</h3>
        <p className="movies-card__duration">{duration} минут</p>
      </div>
      <a
        className="movies-card__trailer-link"
        href={trailerLink ? trailerLink : trailer}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="movies-card__image"
          src={image.url ? `https://api.nomoreparties.co${image.url}` : image}
          alt={nameRU}
        />
      </a>
      <button
        className={`movies-card__btn ${
          isSaved ? "movies-card__btn_active" : ""
        } ${isPlaceSavedMovies ? "movies-card__btn_place_saved-movies" : ""}`}
        type="button"
        onClick={handleMoviesLiked}
      >
        {isSaved ? "" : "Сохранить"}
      </button>
    </article>
  );
}

export default MoviesCard;
