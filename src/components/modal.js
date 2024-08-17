const popups = document.querySelectorAll('.popup');

popups.forEach(function (evt) {
  evt.classList.add('popup_is-animated');
})

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc);
  document.addEventListener('mousedown', handleClickMouse);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc);
  document.removeEventListener('mousedown', handleClickMouse);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

function handleClickMouse() {
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_is-opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
    })
  })
}

export { openPopup, closePopup }