
const cardContainer = document.querySelector(".places__list");
function addCards(item, removeCard, handleLikeButton, handleImagePopup, deleteCard, putHandleLike, delHandleLike) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const removeButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeAmount = cardElement.querySelector('.card__like-amount')
  const cardImage = cardElement.querySelector(".card__image");
  const usedID = 'd548e16a0e411b39334bcb5c'

  cardElement.querySelector(".card__title").textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  likeAmount.textContent = item.likes.length;

  if (item.owner._id !== usedID) {
    removeButton.remove()
  }



  removeButton.addEventListener("click", function () {
    deleteCard(item._id)
      .catch((err) => {
        console.log(err)
      });
    removeCard(cardElement)

  })

  const likeStatus = item.likes.find((elem) => elem._id === usedID) 

  if (likeStatus) {
    likeButton.classList.add("card__like-button_is-active")
  }

  likeButton.addEventListener("click", function () {
    if (!likeStatus) {
      putHandleLike(item._id)
        .then((data) => {
          handleLikeButton(likeButton)
          likeAmount.textContent = data.likes.length
        })
        .catch((err) => {
          console.log(err)
        })
    }

    else {
      delHandleLike(item._id)
        .then((data) => {
          handleLikeButton(likeButton)
          likeAmount.textContent = data.likes.length
        })
        .catch((err) => {
          console.log(err)
        });
    }
  });




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

export { addCards, removeCard, handleLikeButton, cardContainer };
