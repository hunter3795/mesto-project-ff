import '../src/index.css';
import { addCards, cards, removeCard, handleLikeButton, cardContainer } from './components/card.js'
import { openPopup } from './components/modal.js'

const profEdBut = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const profAddBut = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const formElement = document.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description')
const ProfName = document.querySelector('.profile__title');
const ProfDesc = document.querySelector('.profile__description');
const cardNameInp = document.querySelector('.popup__input_type_card-name')
const cardUrlInp = document.querySelector('.popup__input_type_url')

cards();

export function handleImagePopup(cardEl) {
  const popImage = document.querySelector('.popup_type_image')
  const imagePopup = document.querySelector('.popup__image');
  const textImagePopup = document.querySelector('.popup__caption')
  imagePopup.src = cardEl.src;
  textImagePopup.textContent = cardEl.alt;
  openPopup(popImage);
}

profEdBut.addEventListener('click', () => openPopup(popupEdit))
profAddBut.addEventListener('click', () => openPopup(popupAddCard))

nameInput.value = ProfName.textContent;
jobInput.value = ProfDesc.textContent

function handleFormSubmit(evt) {
  evt.preventDefault();
  ProfName.textContent = nameInput.value;
  ProfDesc.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);

function ImageFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.link = cardUrlInp.value;
  newCard.name = cardNameInp.value;

  cardContainer.prepend(addCards(newCard, removeCard, handleLikeButton, handleImagePopup));
  evt.target.reset();
}

const formPlace = document.forms.place;
formPlace.addEventListener('submit', ImageFormSubmit); 
