import React from "react";

import "./SearchForm.css";
import searchIcon from "../../images/icons/search.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  isChecked,
  onChangeCheckbox,
  onSubmit,
  handleChange,
  keyword,
  isWasRequest,
}) {
  return (
    <section className="search section">
      <div className="search__container section__container">
        <form className="search__form" onSubmit={onSubmit} required>
          <fieldset className="search__fieldset">
            <img
              src={searchIcon}
              alt="Иконка поиска"
              className="search__icon"
            />
            <label className="search__label">
              <input
                className="search__input"
                type="text"
                placeholder="Фильм"
                name="search-keyword"
                minLength="1"
                maxLength="50"
                value={keyword}
                onChange={handleChange}
              />
              <span className="search__input-error"></span>
            </label>
            <button
              className="search__btn"
              type="submit"
              aria-label="Кнопка поиска"
            >
              <img src={searchIcon} alt="Поиск" className="search__btn-icon" />
            </button>
          </fieldset>
        </form>
        <FilterCheckbox
          isChecked={isChecked}
          onChange={onChangeCheckbox}
          isWasRequest={isWasRequest}
        ></FilterCheckbox>
      </div>
    </section>
  );
}

export default SearchForm;
