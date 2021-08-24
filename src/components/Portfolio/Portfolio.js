import React from "react";

import "./Portfolio.css";

function Portfolio() {
  return (
    <>
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__link-container">
          <a
            href="https://khantagiev.github.io/how-to-learn/"
            className="portfolio__link"
            rel="noreferrer"
            target="_blank"
          >
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__link-container">
          <a
            href="https://khantagiev.github.io/russian-travel/"
            className="portfolio__link"
            rel="noreferrer"
            target="_blank"
          >
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__link-container">
          <a
            href="https://khantagiev.github.io/react-mesto-auth/"
            className="portfolio__link"
            rel="noreferrer"
            target="_blank"
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </>
  );
}

export default Portfolio;
