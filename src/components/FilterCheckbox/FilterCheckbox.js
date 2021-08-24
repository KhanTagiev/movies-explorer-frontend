import React from "react";

import "./FilterCheckbox.css";

function FilterCheckbox({ isChecked, onChange }) {
  return (
    <>
      <label className="filter__label">
        <input
          type="checkbox"
          className="filter__checkbox"
          checked={isChecked}
          onChange={onChange}
        />
        <p className="filter__text">Короткометражки</p>
      </label>
    </>
  );
}

export default FilterCheckbox;
