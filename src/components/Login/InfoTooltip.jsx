import React from "react";

function InfoTooltip({ isOpen, onClose, status }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content popup__content_content_tooltip">
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose}
        />

        <div className="popup__icon">
          {status === "success" ? (
            <img
              src="/images/success-icon.svg"
              alt="Success"
              className="popup__status-image"
            />
          ) : (
            <img
              src="/images/error-icon.svg"
              alt="Error"
              className="popup__status-image"
            />
          )}
        </div>

        <h3 className="popup__title popup__title_tooltip">
          {status === "success"
            ? "¡Te has registrado con éxito!"
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
