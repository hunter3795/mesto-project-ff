const popups = document.querySelectorAll('.popup')

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

function handleClickMouse() {
  popups.forEach((popup) => {
    popup.classList.add('popup_is-animated');
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_is-opened')) {
        closePopup(popup)
      }
      else if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
    })
  })
}

export { openPopup, closePopup, handleClickMouse }