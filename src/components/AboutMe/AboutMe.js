import React from "react";

import "./AboutMe.css";
import profileImage from "../../images/profile_image.png";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <section className="about-me__container section__container">
      <h2 className="about-me__title section__title">Студент</h2>
      <div className="about-me__profile-container">
        <div>
          <p className="about-me__profile-name">Ханбала</p>
          <p className="about-me__profile-job">Фронтенд-разработчик, 26 лет</p>
          <p className="about-me__profile-info">
            Я родился и живу во Владимире, закончил факультет экономики ВФ
            РАНХиГС. Я люблю смотреть фильмы и сериалы по Вселенной Marvel и DC,
            а ещё увлекаюсь плаванием. Недавно начал кодить. С 2012 года работал
            в компании «Бургер Кинг». После того, как прошёл курс по
            веб-разработке, начал заниматься фриланс-заказами и ушёл с
            постоянной работы.
          </p>
          <ul className="about-me__profile-links">
            <li>
              <a
                href="https://telegram.me/Khan_Tagiev"
                className="about-me__profile-link"
                rel="noreferrer"
                target="_blank"
              >
                Telegram
              </a>
            </li>
            <li>
              <a
                href="https://github.com/KhanTagiev"
                className="about-me__profile-link"
                rel="noreferrer"
                target="_blank"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img
          src={profileImage}
          alt="Фотография фронтенд-разработчика"
          className="about-me__profile-image"
        />
      </div>
      <Portfolio></Portfolio>
    </section>
  );
}

export default AboutMe;
