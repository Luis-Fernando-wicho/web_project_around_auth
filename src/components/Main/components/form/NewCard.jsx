import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function NewCard({ onClose }) {
  const userContext = useContext(CurrentUserContext);

  const { handleAddPlaceSubmit } = userContext;

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  // Limpiar los campos cuando se abra el popup

  useEffect(() => {
    setName("");
    setLink("");
  }, []);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddPlaceSubmit({
      name: name,
      link: link,
    });

    if (onClose) {
      onClose();
    }
  };
  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-name"
          maxLength="30"
          minLength="1"
          name="card-name"
          placeholder="Title"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="card-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="card-link"
          name="link"
          placeholder="Image link"
          required
          type="url"
          value={link}
          onChange={handleLinkChange}
        />
        <span className="popup__error" id="card-link-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
