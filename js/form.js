'use strict';

(function () {
  window.adForm = document.querySelector('.ad-form');
  var numbersRoomsField = window.adForm.querySelector('#room_number');
  var numbersGuestsField = window.adForm.querySelector('#capacity');
  var buttonSendForm = window.adForm.querySelector('.ad-form__submit');

  window.disableForm = function (element) {
    if (element.length > 0) {
      for (var i = 0; i < element.length; i++) {
        element[i].disabled = true;
      }
    } else {
      element.disabled = true;
    }
  };

  window.activateForm = function (element) {
    if (element.length > 0) {
      for (var i = 0; i < element.length; i++) {
        element[i].disabled = false;
      }
    } else {
      element.disabled = false;
    }
    window.adForm.classList.remove('ad-form--disabled');
  };

  var testGuestValidity = function () {
    var numberRoomSelected = numbersRoomsField.value;
    var numberGuestSelected = numbersGuestsField.value;

    if (numberRoomSelected === '100 комнат' && numberGuestSelected === 'не для гостей') {
      numbersGuestsField.setCustomValidity('');
    } else if (numberRoomSelected !== numberGuestSelected) {
      numbersGuestsField.setCustomValidity('Количество гостей не соответствует количеству комнат');
    } else {
      numbersGuestsField.setCustomValidity('');
    }
  };

  buttonSendForm.addEventListener('click', function () {
    testGuestValidity();
  });
})();
