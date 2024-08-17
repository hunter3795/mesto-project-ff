import '../src/index.css';
import { initialCards } from "./components/cards.js";
import { addCards, removeCard, handleLikeButton, cardContainer, cardImage } from './components/card.js'
import { openPopup, closePopup } from './components/modal.js'

const profEdBut = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const profAddBut = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const profileForm = document.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description')
const profName = document.querySelector('.profile__title');
const profDesc = document.querySelector('.profile__description');
const cardNameInp = document.querySelector('.popup__input_type_card-name')
const cardUrlInp = document.querySelector('.popup__input_type_url')
const popImage = document.querySelector('.popup_type_image')
const imagePopup = document.querySelector('.popup__image');
const textImagePopup = document.querySelector('.popup__caption');
const formPlace = document.forms.place;

function renderCards() {
  initialCards.forEach(function (elem) {
    cardContainer.append(
      addCards(elem, removeCard, handleLikeButton, handleImagePopup)
    );
  });
}
renderCards();

function handleImagePopup(cardEl) {
  imagePopup.src = cardEl.src;
  imagePopup.alt = cardEl.alt;
  textImagePopup.textContent = cardEl.alt;
  openPopup(popImage);
}

nameInput.value = profName.textContent;
jobInput.value = profDesc.textContent;
profEdBut.addEventListener('click', () => openPopup(popupEdit));
profAddBut.addEventListener('click', () => openPopup(popupAddCard));

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profName.textContent = nameInput.value;
  profDesc.textContent = jobInput.value;
  evt.target.addEventListener('submit', () => closePopup(popupEdit));
}
profileForm.addEventListener('submit', handleProfileFormSubmit);

function handleImageFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.link = cardUrlInp.value;
  newCard.name = cardNameInp.value;
  cardContainer.prepend(addCards(newCard, removeCard, handleLikeButton, handleImagePopup));
  evt.target.reset();
  evt.target.addEventListener('submit', () => closePopup(popupEdit))
}
formPlace.addEventListener('submit', handleImageFormSubmit);
formPlace.addEventListener('submit', () => closePopup(popupAddCard))