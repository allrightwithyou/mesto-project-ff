const cohortId = 'wff-cohort-39';
const token = '06bd89d8-4abb-48f4-bb30-bbbb63be6e07';
const baseUrl = `https://nomoreparties.co/v1/${cohortId}`;

function handleResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export function getUserInfo() {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      authorization: token
    }
  }).then(handleResponse);
}

export function getInitialCards() {
  return fetch(`${baseUrl}/cards`, {
    headers: {
      authorization: token
    }
  }).then(handleResponse);
}

export function updateUserProfile(name, about) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, about })
  }).then(handleResponse);
}

export function addNewCard(name, link) {
  return fetch(`${baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, link })
  }).then(handleResponse);
}

export function deleteCardFromServer(cardId) {
  return fetch(`${baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token
    }
  }).then(handleResponse);
}

export function likeCard(cardId) {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: token
    }
  }).then(handleResponse);
}

export function unlikeCard(cardId) {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token
    }
  }).then(handleResponse);
}

export function updateAvatar(avatarUrl) {
  return fetch(`${baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ avatar: avatarUrl })
  }).then(handleResponse);
}
