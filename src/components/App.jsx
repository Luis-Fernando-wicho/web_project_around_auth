import { useState, useEffect } from "react";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";

import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(`Error al cargar usuario: ${err}`));
  }, []);

  const handleUpdateUser = (data) => {
    (async () => {
      await api.setUserInfo(data.name, data.about).then((newData) => {
        setCurrentUser(newData);
      });
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.setUserAvatar(data.avatar).then((newUserData) => {
        setCurrentUser(newUserData);
      });
    })();
  };

  const handleAddPlaceSubmit = (newCardData) => {
    (async () => {
      await api.addCard(newCardData).then((newCard) => {
        setCards([newCard, ...cards]);
      });
    })();
  };

  useEffect(() => {
    api
      .getCardList()
      .then((data) => setCards(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
          handleAddPlaceSubmit,
        }}
      >
        <div className="page">
          <Header />
          <Main
            cards={cards}
            setCards={setCards} // Opcional, si Main aún maneja likes/delete internamente
          />
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
