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
      setTimeout( () => {
        handleClosePopup()
      },5000)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  function handleClosePopup() {
    onClose();
    document.removeEventListener("click", closeClickPopup);
    document.removeEventListener("keydown", closeKeyPopup);
  }


  function closeClickPopup(evt) {
    if (
      evt.target.classList.contains("popup__btn_close") ||
      evt.target.classList.contains("popup")
    ) {
      handleClosePopup()
    }
  }

  function closeKeyPopup(evt) {
    if (evt.key === popupCloseKey) {
      handleClosePopup()
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
        <p className="popup__info-text">{status.message}</p>
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
