// @todo: Темплейт карточки
const cardContainer = document.querySelector(".places__list");
// @todo: DOM узлы
const city = initialCards.map(function (item) {
  return {
    nameValue: item.name,
    linkValue: item.link,
  };
});

// @todo: Функция создания карточки
function addCards({ nameValue, linkValue }) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = nameValue;
  cardElement.querySelector(".card__image").src = linkValue;

  cardContainer.append(cardElement);

  const removeButton = cardElement.querySelector(".card__delete-button");
  removeButton.addEventListener("click", function () {
    const card = document.querySelector(".card");
    card.remove();
  });
}

// @todo: Вывести карточки на страницу

function cards() {
  city.forEach(addCards);
}

cards();

// @todo: Функция удаления карточки
