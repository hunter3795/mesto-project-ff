// @todo: Темплейт карточки
const cardContainer = document.querySelector(".places__list");
// @todo: DOM узлы

// @todo: Функция создания карточки
function addCards(item) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = item.name;
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;

  const removeButton = cardElement.querySelector(".card__delete-button");
  removeButton.addEventListener("click", removeCard);

  return cardContainer.append(cardElement);
}

// @todo: Вывести карточки на страницу
function cards() {
  initialCards.forEach(addCards);
}

cards();

// @todo: Функция удаления карточки
function removeCard() {
  const revDiv = this.parentElement;
  revDiv.remove();
}
