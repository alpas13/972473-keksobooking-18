'use strict';

(function () {
  var adElement = document.querySelector('.ad-form');
  var numbersRoomsField = adElement.querySelector('#room_number');
  var numbersGuestsField = adElement.querySelector('#capacity');
  var buttonSendForm = adElement.querySelector('.ad-form__submit');

  var disableElement = function (element) {
    if (element.length > 0) {
      for (var i = 0; i < element.length; i++) {
        element[i].disabled = true;
      }
    } else {
      element.disabled = true;
    }
  };

  var activateElement = function (element) {
    if (element.length > 0) {
      for (var i = 0; i < element.length; i++) {
        element[i].disabled = false;
      }
    } else {
      element.disabled = false;
    }
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
    'adElement': adElement,
    'disableElement': disableElement,
    'activateElement': activateElement
  };

  buttonSendForm.addEventListener('click', function () {
    testGuestValidity();
  });
})();
