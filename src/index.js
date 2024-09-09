import '../src/index.css';
import { initialCards } from "./components/cards.js";
import { createCard, removeCard, handleLikeButton, cardContainer } from './components/card.js'
import { openPopup, closePopup, handleClickMouse } from './components/modal.js'
import { enableValidation, clearValidation } from './components/validation.js'
import { getInitialCards, getInitialUsersMe, patchUsersMe, postCards, deleteCard, putHandleLike, delHandleLike, patchAvatar } from './components/api.js'
import { Promise } from 'core-js';


const profEdBut = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const profAddBut = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const profileForm = document.forms["edit-profile"]
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description')
const profName = document.querySelector('.profile__title');
const profDesc = document.querySelector('.profile__description');
const profImage = document.querySelector('.profile__image')
const cardNameInp = document.querySelector('.popup__input_type_card-name')
const cardUrlInp = document.querySelector('.popup__input_type_url')
const popImage = document.querySelector('.popup_type_image')
const imagePopup = document.querySelector('.popup__image');
const textImagePopup = document.querySelector('.popup__caption');
const formPlace = document.forms.place;
const profAvatarBut = document.querySelector('.profile__avatar-button')
const popupAvatar = document.querySelector('.popup_type_avatar')
const avatarInput = document.querySelector('.popup__input_type_url_avatar')
const formAvatar = document.forms.avatar
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
let userId;

// function renderCards() {
//   initialCards.forEach(function (elem) {
//     cardContainer.append(
//       addCards(elem, removeCard, handleLikeButton, handleImagePopup)
//     );
//   });
// }
// renderCards();

function handleImagePopup(cardEl) {
  imagePopup.src = cardEl.src;
  imagePopup.alt = cardEl.alt;
  textImagePopup.textContent = cardEl.alt;
  openPopup(popImage);
}

handleClickMouse();


profEdBut.addEventListener('click', () => {
  nameInput.value = profName.textContent;
  jobInput.value = profDesc.textContent;
  clearValidation(profileForm, validationConfig)
  openPopup(popupEdit)
});

profAddBut.addEventListener('click', function() {
  openPopup(popupAddCard)
  formPlace.reset();
  clearValidation(formPlace, validationConfig)
})

profAvatarBut.addEventListener('click', function() {
  openPopup(popupAvatar);
  formAvatar.reset();
  clearValidation(formAvatar, validationConfig);
})

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading (true, formAvatar)
  patchAvatar(avatarInput)
    .then((data) => {
    profImage.style.backgroundImage = "url('" + data.avatar + "')"
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading (false, formAvatar))
  closePopup(popupAvatar);
}
formAvatar.addEventListener('submit', handleAvatarFormSubmit)

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profName.textContent = nameInput.value;
  profDesc.textContent = jobInput.value;
  renderLoading (true, profileForm)
  patchUsersMe(nameInput, jobInput)
    .then((data) => {
      profName.textContent = data.name
      profDesc.textContent = data.about
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading (false, profileForm))
  closePopup(popupEdit);
}
profileForm.addEventListener('submit', handleProfileFormSubmit);

function handleImageFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {};
  renderLoading (true, formPlace);
  postCards(cardNameInp, cardUrlInp)
    .then((data) => {
      newCard.link = data.link;
      newCard.name = data.name;
      cardContainer.prepend(createCard(data, userId, removeCard, handleLikeButton, handleImagePopup, handleDeleteCard, handleLike));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading (false, formPlace))
  closePopup(popupAddCard);
}
formPlace.addEventListener('submit', handleImageFormSubmit);

enableValidation(validationConfig);

Promise.all([getInitialUsersMe(), getInitialCards()])
  .then(([userData, cards]) => {
    profName.textContent = userData.name;
    userId = userData._id
    profDesc.textContent = userData.about;
    profImage.style.backgroundImage = "url('" + userData.avatar + "')"
    cards.forEach((elem) => 
      cardContainer.append(
        createCard(elem, userId, removeCard, handleLikeButton, handleImagePopup, handleDeleteCard, handleLike)
      )
    );
  })
  .catch((err) => {
    console.log(err);
  });

function renderLoading (isLoading, form) {
  const button = form.querySelector('.popup__button');
  button.textContent  = isLoading ? 'Сохранение...' : 'Сохранить'
}

function handleLike (item, button, likeAmount) {
  const likeMethod = item.likes.some((elem) => elem._id === userId) ? delHandleLike : putHandleLike;
    likeMethod(item._id) 
          .then((data) => {
            handleLikeButton(button) 
            item.likes = data.likes 
            likeAmount.textContent = data.likes.length;
          })
          .catch(err => console.log(err));
}

function handleDeleteCard (item) {
  deleteCard(item._id)
  .catch((err) => {
    console.log(err)
  });
}