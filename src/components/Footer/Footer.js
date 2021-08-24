import React from "react";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__info-container">
        <p className="footer__info-copyright">© 2021</p>
        <ul className="footer__info-links">
          <li>
            <a
              href="https://practicum.yandex.ru/"
              className="footer__info-link"
              rel="noreferrer"
              target="_blank"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              href="https://github.com/KhanTagiev"
              className="footer__info-link"
              rel="noreferrer"
              target="_blank"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://telegram.me/Khan_Tagiev"
              className="footer__info-link"
              rel="noreferrer"
              target="_blank"
            >
              Telegram
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
