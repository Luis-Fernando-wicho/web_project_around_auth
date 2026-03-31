class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  setUserAvatar(url) {
    // 'url' es el string que recibes del componente
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers, // Asegúrate de que aquí esté 'Content-Type': 'application/json'
      body: JSON.stringify({
        avatar: url, // LA CLAVE DEBE SER "avatar"
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  setUserInfo(newName, newAbout) {
    console.log(newName, newAbout, "en api");
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getCardList() {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers, // Asegúrate de que incluya Content-Type: application/json
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  //??????????????????????????????????????????????????????????
  changeLikeCardStatus(cardId, likestate) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: !likestate ? "DELETE" : "PUT",
      headers: this._headers,
      body: !likestate ? null : JSON.stringify({ _id: cardId }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  //??????????????????????????????????????????????????????????
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "c3ef818e-6c57-4ba3-a2dc-d495a06f400e",
    "Content-Type": "application/json",
  },
});

export default api;
