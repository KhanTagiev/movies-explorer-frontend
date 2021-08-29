import React from "react";

import "./FilterCheckbox.css";

function FilterCheckbox({ isChecked, onChange, isWasRequest }) {
  return (
    <label className="filter__label">
      <input
        type="checkbox"
        className="filter__checkbox"
        checked={isChecked}
        onChange={onChange}
        disabled={!isWasRequest}
      />
      <p
        className={`filter__text ${
          isWasRequest ? "" : "filter__text_disabled"
        }`}
      >
        Короткометражки
      </p>
    </label>
  );
}

export default FilterCheckbox;
