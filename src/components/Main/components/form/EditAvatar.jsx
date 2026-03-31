import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";
export default function EditAvatar({ onClose }) {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateAvatar } = userContext;

  const [avatar, setAvatar] = useState(currentUser.avatar);

  useEffect(() => {
    setAvatar("");
  }, []);

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateAvatar({
      avatar: avatar,
    });

    if (onClose) {
      onClose();
    }
  };
  return (
    <form
      method="dialog"
      className="popup__form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__form__label">
        <input
          className="popup__input popup__input_avatar"
          type="url"
          name="link"
          placeholder="Enlace de la imagen"
          required
          value={avatar} // Vincula name con la entrada
          onChange={handleAvatarChange}
        />
        <span id="error-title" className="popup__error"></span>
      </label>
      <button id="SaveButton" className="popup__button popup__button_places">
        Guardar
      </button>
    </form>
  );
}
