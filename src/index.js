import '../src/index.css';
import { initialCards } from "./components/cards.js";
import { addCards, removeCard, handleLikeButton, cardContainer } from './components/card.js'
import { openPopup, closePopup, handleClickMouse } from './components/modal.js'
import { enableValidation, clearValidation } from './components/validation.js'
import { getInitialCards, getInitialUsersMe, patchUsersMe, postCards, deleteCard, putHandleLike, delHandleLike } from './components/api.js'
import { Promise } from 'core-js';


const profEdBut = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const profAddBut = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const profileForm = document.querySelector('.popup__form')
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
profAddBut.addEventListener('click', () => openPopup(popupAddCard));

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profName.textContent = nameInput.value;
  profDesc.textContent = jobInput.value;
  patchUsersMe(nameInput, jobInput)
    .then((data) => {
      profName.textContent = data.name
      profDesc.textContent = data.about
    })
    .catch((err) => {
      console.log(err);
    })
  closePopup(popupEdit);
}
profileForm.addEventListener('submit', handleProfileFormSubmit);

function handleImageFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {};
  postCards(cardNameInp, cardUrlInp)
    .then((data) => {
      newCard.link = data.link;
      newCard.name = data.name;
      cardContainer.prepend(addCards(data, removeCard, handleLikeButton, handleImagePopup, deleteCard, putHandleLike, delHandleLike));
    })
    .catch((err) => {
      console.log(err);
    })
  evt.target.reset();
  closePopup(popupAddCard);
  clearValidation(formPlace, validationConfig)
}
formPlace.addEventListener('submit', handleImageFormSubmit);

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
enableValidation(validationConfig);

Promise.all([getInitialUsersMe(), getInitialCards()])
  .then((data) => {
    console.log(data[1])
    profName.textContent = data[0].name;
    profDesc.textContent = data[0].about;
    profImage.style.backgroundImage = "url('" + data[0].avatar + "')"
    data[1].forEach((elem) => 
      cardContainer.append(
        addCards(elem, removeCard, handleLikeButton, handleImagePopup, deleteCard, putHandleLike, delHandleLike)
      )
    );
  })
  .catch((err) => {
    console.log(err);
  });







