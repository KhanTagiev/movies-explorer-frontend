import React from "react";

import "./SearchForm.css";
import searchIcon from "../../images/icons/search_icon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ isChecked, onChangeCheckbox, onSubmit }) {
  const [searchKeyWord, setSearchKeyWord] = React.useState("");

  function handleChangeSearchKeyWord(e) {
    setSearchKeyWord(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(searchKeyWord);
  }

  return (
    <section className="search__container section__container">
      <form className="search__form" onSubmit={handleSubmit} required>
        <fieldset className="search__fieldset">
          <img src={searchIcon} alt="Иконка поиска" className="search__icon" />
          <label className="search__label">
            <input
              className="search__input"
              type="text"
              placeholder="Фильм"
              name="search-keyword"
              minLength="1"
              maxLength="50"
              value={searchKeyWord}
              onChange={handleChangeSearchKeyWord}
              required
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
      ></FilterCheckbox>
    </section>
  );
}

export default SearchForm;
