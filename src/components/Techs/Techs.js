import React from "react";

import "./Techs.css";

function Techs() {
  return (
    <section className="techs section">
      <div className="techs__container section__container">
        <h2 className="techs__title section__title">Технологии</h2>
        <p className="techs__subtitle">7 технологий</p>
        <p className="techs__description">
          На курсе веб-разработки мы освоили технологии, которые применили
          в&nbsp;дипломном проекте.
        </p>
        <ul className="techs__links">
          <li>
            <a
              className="techs__link"
              href="https://developer.mozilla.org/ru/docs/Web/HTML"
              rel="noreferrer"
              target="_blank"
            >
              HTML
            </a>
          </li>
          <li>
            <a
              className="techs__link"
              href="https://developer.mozilla.org/ru/docs/Web/CSS"
              rel="noreferrer"
              target="_blank"
            >
              CSS
            </a>
          </li>
          <li>
            <a
              className="techs__link"
              href="https://developer.mozilla.org/ru/docs/Web/JavaScript"
              rel="noreferrer"
              target="_blank"
            >
              JS
            </a>
          </li>
          <li>
            <a
              className="techs__link"
              href="https://ru.reactjs.org/"
              rel="noreferrer"
              target="_blank"
            >
              React
            </a>
          </li>
          <li>
            <a
              className="techs__link"
              href="https://git-scm.com/"
              rel="noreferrer"
              target="_blank"
            >
              Git
            </a>
          </li>
          <li>
            <a
              className="techs__link"
              href="https://expressjs.com/ru"
              rel="noreferrer"
              target="_blank"
            >
              Express.js
            </a>
          </li>
          <li>
            <a
              className="techs__link"
              href="https://www.mongodb.com/"
              rel="noreferrer"
              target="_blank"
            >
              mongoDB
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
