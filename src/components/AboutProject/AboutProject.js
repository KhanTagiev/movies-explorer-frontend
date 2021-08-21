import React from "react";

import "./AboutProject.css";

function AboutProject() {
  return (
    <section id="about-project" className="about-project section">
      <div className="about-project__container section__container">
        <h2 className="about-project__title section__title">О проекте</h2>
        <ul className="about-project__list">
          <li>
            <p className="about-project__list-title">
              Дипломный проект включал 5 этапов
            </p>
            <p className="about-project__list-description">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li>
            <p className="about-project__list-title">
              На выполнение диплома ушло 5 недель
            </p>
            <p className="about-project__list-description">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <ul className="about-project__progress-line">
          <li>
            <p className="about-project__progress-line-week about-project__progress-line-week_work_backend">
              1 неделя
            </p>
            <p className="about-project__progress-line-description">Back-end</p>
          </li>
          <li>
            <p className="about-project__progress-line-week about-project__progress-line-week_work_frontend">
              4 недели
            </p>
            <p className="about-project__progress-line-description">
              Front-end
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutProject;
