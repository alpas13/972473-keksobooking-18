'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var numbersRoomsField = adForm.querySelector('#room_number');
  var numbersGuestsField = adForm.querySelector('#capacity');
  var buttonSendForm = adForm.querySelector('.ad-form__submit');

  var disableForm = function (element) {
    if (element.length > 0) {
      for (var i = 0; i < element.length; i++) {
        element[i].disabled = true;
      }
    } else {
      element.disabled = true;
    }
  };

  var activateForm = function (element) {
    if (element.length > 0) {
      for (var i = 0; i < element.length; i++) {
        element[i].disabled = false;
      }
    } else {
      element.disabled = false;
    }
    adForm.classList.remove('ad-form--disabled');
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

  window.form = {
    'adForm': adForm,
    'disableForm': disableForm,
    'activateForm': activateForm
  };

  buttonSendForm.addEventListener('click', function () {
    testGuestValidity();
  });
})();
