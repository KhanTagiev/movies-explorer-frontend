import React from "react";

import "./Promo.css";
import NavTab from "../NavTab/NavTab";

function Promo() {
  return (
    <section className="promo section">
      <div className="promo__container section__container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <NavTab></NavTab>
      </div>
    </section>
  );
}

export default Promo;
