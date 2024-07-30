// @todo: Темплейт карточки
const cardContainer = document.querySelector(".places__list");
// @todo: DOM узлы

// @todo: Функция создания карточки
function addCards(item, remove) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = item.name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = item.link;
  cardImage.alt = item.name;

  const removeButton = cardElement.querySelector(".card__delete-button");
  
  function remove () {
    removeButton.addEventListener("click", removeCard);
  }
  remove();
  
  return cardElement;
}

// @todo: Вывести карточки на страницу
function cards() {
  initialCards.forEach(function (elem) {
    cardContainer.append(addCards(elem));
  });
}

cards();

// @todo: Функция удаления карточки
function removeCard(event) {
  event.target.closest(".card").remove();
}
