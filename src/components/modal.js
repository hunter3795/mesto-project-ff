const closeBut = document.querySelectorAll('.popup__close')
const ButSave = document.querySelectorAll('.popup__button')
const popup = document.querySelectorAll('.popup');

popup.forEach(function (evt) {
  evt.classList.add('popup_is-animated')
})

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('click', closePopupOverlay)
  document.addEventListener('keydown', closePopupEsc)

  closeBut.forEach(function (but) {
    but.addEventListener('click', () => closePopup(popup))
  })

  ButSave.forEach(function (but) {
    but.addEventListener('click', () => closePopup(popup))
  })
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

// function closePopupFromBut (but) { 
//   but.forEach(function(evt) {
//     evt.addEventListener('click', function() {
//       closePopup (document.querySelector('.popup_is-opened'))
//       console.log('click')
//       })
//   })
// }    работает один раз????

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

function closePopupOverlay(evt) {
  if (evt.target == (document.querySelector('.popup_is-opened'))) {
    closePopup(document.querySelector('.popup_is-opened'))
  }
}