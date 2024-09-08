const cardContainer = document.querySelector(".places__list");
function createCard(item, userId, removeCard, handleLikeButton, handleImagePopup, deleteCard, handleLike) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const removeButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeAmount = cardElement.querySelector('.card__like-amount')
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  likeAmount.textContent = item.likes.length;

  if (item.owner._id !== userId) {
    removeButton.remove()
  }

  else {
    removeButton.addEventListener("click", function () {
      deleteCard(item._id)
        .catch((err) => {
          console.log(err)
        });
      removeCard(cardElement)
    })
  }

  const likeStatus = item.likes.some((elem) => elem._id === userId)
  if (likeStatus) {
    likeButton.classList.add("card__like-button_is-active")
  }

  likeButton.addEventListener("click", function () {
    handleLike (item, likeButton, likeAmount)
  })

  cardImage.addEventListener("click", () =>
    handleImagePopup(cardImage)
  );

  return cardElement;
}

function removeCard(cardElement) {
  cardElement.remove()
}

function handleLikeButton(but) {
  but.classList.toggle("card__like-button_is-active");
}

export { createCard, removeCard, handleLikeButton, cardContainer };
