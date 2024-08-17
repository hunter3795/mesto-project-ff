const cardContainer = document.querySelector(".places__list");

function addCards(item, removeCard, handleLikeButton, handleImagePopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = item.name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = item.link;
  cardImage.alt = item.name;

  const removeButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  removeButton.addEventListener("click", function () {
    removeCard(cardElement);
  });

  likeButton.addEventListener("click", function () {
    handleLikeButton(likeButton);
  });

  cardImage.addEventListener("click", function () { 
    handleImagePopup(cardImage); 
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(cardElement) {
  cardElement.remove();
}

function handleLikeButton(but) {
  but.classList.toggle("card__like-button_is-active");
}

export { addCards, removeCard, handleLikeButton, cardContainer };
