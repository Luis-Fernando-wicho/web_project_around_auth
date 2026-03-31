import lapiz from "../../assets/lapiz.svg";
import editarName from "../../assets/changename.svg";

import { useState, useEffect, useContext } from "react";

import Card from "./components/Card/Card";
import Popup from "./components/Popup/Popup";

import NewCard from "./components/form/NewCard";
import EditProfile from "./components/form/EditProfile.JSX";
import EditAvatar from "./components/form/EditAvatar.JSX";

import api from "../../utils/api";

import CurrentUserContext from "../../../src/contexts/CurrentUserContext";

export default function Main({ cards, setCards }) {
  const { currentUser } = useContext(CurrentUserContext);

  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
      })
      .catch((error) => console.error(error));
  }

  const [popup, setPopup] = useState(null);

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onClose={handleClosePopup} />,
  };
  const editAvatar = {
    title: "Editar Avatar",
    children: <EditAvatar onClose={handleClosePopup} />,
  };
  const editProfile = {
    title: "Editar Perfil",
    children: <EditProfile onClose={handleClosePopup} />,
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <>
      <main className="main">
        <div className="profile">
          <div
            className="profile__avatar"
            onClick={() => handleOpenPopup(editAvatar)}
          >
            <img className="profile__img" src={currentUser.avatar} alt="" />
            <div className="profile__hover">
              <img className="profile__svg" src={lapiz} alt="svg de un lapiz" />
            </div>
          </div>

          <div className="profile__info">
            <h2 className="profile__info profile__info_name">
              {currentUser.name}
            </h2>
            <button
              id="infoedit"
              className="profile__info profile__info_edit"
              onClick={() => handleOpenPopup(editProfile)}
            ></button>
            <h2 className="profile__info profile__info_ocupation">
              {currentUser.about}
            </h2>
          </div>
          <button
            className="profile__add-button"
            onClick={() => handleOpenPopup(newCardPopup)}
          >
            <img
              className="profile__add-button profile__add-button_image"
              src={editarName}
              aria-label="Add card"
              alt="cambiar nimbre"
              type="button"
            />
          </button>
        </div>

        <ul className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleOpenPopup}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
        {popup && (
          <Popup onClose={handleClosePopup} title={popup.title}>
            {popup.children}
          </Popup>
        )}
      </main>
    </>
  );
}
