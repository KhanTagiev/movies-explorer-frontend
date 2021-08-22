import React from "react";

import "./PageNotFound.css";

function PageNotFound({ history }) {
  function handleGoBack() {
    history.goBack();
  }

  return (
    <main className="main">
      <section className="not-found">
        <p className="not-found__number">404</p>
        <p className="not-found__text">Страница не найдена</p>
        <button className="not-found__btn" onClick={handleGoBack}>
          Назад
        </button>
      </section>
    </main>
  );
}

export default PageNotFound;
