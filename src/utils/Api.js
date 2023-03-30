class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
        .then(this._handleResponse);
    }
  
    _handleResponse(res) {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
        .then(this._handleResponse);
    }
  
    editUserInfo({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ name, about })
      })
        .then(this._handleResponse);
    }
  
    addCard({ name, link }) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ name, link })
      })
      .then(this._handleResponse);
    }
  
    putLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(this._handleResponse);
    }
  
    deleteLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._handleResponse);
    }
  
    deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._handleResponse);
    }
  
    updateProfileAvatar(avatarUrl) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({avatar: avatarUrl})
      })
      .then(this._handleResponse);
      }
    }

    const api = new Api({
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
        headers: {
          authorization: '52fc6959-8692-45e7-a047-982dcb1b275b',
          'Content-Type': 'application/json'
        }
    })

  export default api;