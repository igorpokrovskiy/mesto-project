const url = 'https://mesto.nomoreparties.co/v1/plus-cohort-16';
const headers = {
    'Authorization': '9fa4e769-1ae3-4e20-a9e0-1854bd9d5234',
    'Content-Type': 'application/json'
};

export function getInitialCards() {
    return fetch(`${url}//cards`, {
        headers
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошибка: ${err}`);
    })
  };

export function fetchUser() {
    return fetch(`${url}/users/me`, {
        headers
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошибка: ${err}`);
    })
  };

  export function patchProfile(name, about) {
    return fetch(`${url}/users/me`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошибка: ${err}`);
    })
  };

export function deleteCard(cardId){
    return fetch(`${url}/cards/${cardId}`, {
        method: 'DELETE',
        headers,
          })
          .then((res) => {
            return Promise.reject(res.status)
          })
};

export function postCard(name, link) {
    return fetch(`${url}/cards/`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status)
    })
  };

  export function putLike(cardId) {
    return fetch(`${url}/cards/likes/${cardId}`, {
        method: "PUT",
        headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status)
      })
  };

  export function deleteLike(cardId){
    return fetch(`${url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status)
      })
  };

  export function patchAvatar(avatarLink){
    return fetch(`${url}/users/me/avatar`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        avatar: `${avatarLink}`
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status)
      })
  }
