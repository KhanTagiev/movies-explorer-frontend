import React from "react";
import success from "../../images/icons/success.svg";
import error from "../../images/icons/error.svg";
import { popupCloseKey } from "../../utils/constants";
import "./InfoTooltipPopup.css";

function InfoTooltipPopup({ isOpen, onClose, status }) {
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", closeClickPopup);
      document.addEventListener("keydown", closeKeyPopup);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  function closeClickPopup(evt) {
    if (
      evt.target.classList.contains("popup__btn_close") ||
      evt.target.classList.contains("popup")
    ) {
      onClose();
      document.removeEventListener("click", closeClickPopup);
      document.removeEventListener("keydown", closeKeyPopup);
    }
  }

  function closeKeyPopup(evt) {
    if (evt.key === popupCloseKey) {
      onClose();
      document.removeEventListener("click", closeClickPopup);
      document.removeEventListener("keydown", closeKeyPopup);
    }
  }

  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <img
          className="popup__info-image"
          src={status.isSuccess ? success : error}
          alt={status.isSuccess ? "Успешно" : "Ошибка"}
        />
        <p className="popup__info-text">
          {status.message}
          {status.message
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
        <button
          className="popup__btn popup__btn_close"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default InfoTooltipPopup;
