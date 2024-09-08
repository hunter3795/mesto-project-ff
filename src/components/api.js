const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-22',
  headers: {
    authorization: 'e256fb82-1f64-4fb8-914b-7839a976451b',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(handleResponse);
} 

export const getInitialUsersMe = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(handleResponse);
} 
export const patchUsersMe = (nameItem, jobItem) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameItem.value,
      about: jobItem.value
    })
  })
  
    .then(handleResponse);
}

export const postCards = (NameInp, UrlInp) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: NameInp.value,
      link: UrlInp.value,
    })
  })
    .then(handleResponse);
} 

export const deleteCard = (cardId ) => {
  return fetch(`${config.baseUrl}/cards/${cardId} `, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(handleResponse);
}


export const putHandleLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(handleResponse);
}

export const delHandleLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(handleResponse);
}


export const patchAvatar = (avatarInp) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarInp.value
    })
  })
    .then(handleResponse);
}