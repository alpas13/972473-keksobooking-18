'use strict';

(function () {
  var MinPrice = {
    'FLAT': 1000,
    'BUNGALO': 0,
    'HOUSE': 5000,
    'PALACE': 10000
  };

  var TitleSize = {
    'MIN_SIZE': 30,
    'MAX_SIZE': 100
  };

  var ERROR_REQUIRED_MESSAGE = 'Обязательное поле для заполнения';
  var MAX_PRICE = 1000000;
  var minPriceValue = 1000;
  var adElement = document.querySelector('.ad-form');
  var adTitle = adElement.querySelector('#title');
  var adPrice = adElement.querySelector('#price');
  var adType = adElement.querySelector('#type');
  var numbersRoomsField = adElement.querySelector('#room_number');
  var numbersGuestsField = adElement.querySelector('#capacity');
  var adTimeIn = adElement.querySelector('#timein');
  var adTimeOut = adElement.querySelector('#timeout');
  var buttonSendForm = adElement.querySelector('.ad-form__submit');

  var disableElement = function (element) {
    if (element.length > 0) {
      element.forEach(function (value) {
        value.disabled = true;
      });
    } else {
      element.disabled = true;
    }
  };

  var activateElement = function (element) {
    if (element.length > 0) {
      element.forEach(function (value) {
        value.disabled = false;
      });
    } else {
      element.disabled = false;
    }
  };

  var adTitleValidity = function () {
    if (adTitle.value === '') {
      adTitle.setCustomValidity(ERROR_REQUIRED_MESSAGE);
    } else if (adTitle.value.length < TitleSize.MIN_SIZE || adTitle.value.length > TitleSize.MAX_SIZE) {
      adTitle.setCustomValidity('Заголовок должен быть не меньше 30 и не больше 100 символов');
    } else {
      adTitle.setCustomValidity('');
    }
  };

  var adPriceValidity = function () {
    if (adPrice.value.length === 0) {
      adPrice.setCustomValidity(ERROR_REQUIRED_MESSAGE);
    } else if (adPrice.value < minPriceValue || adPrice.value > MAX_PRICE) {
      adPrice.setCustomValidity('Цена не может быть меньше ' + minPriceValue + ' рублей.');
    } else if (adPrice.value > MAX_PRICE) {
      adPrice.setCustomValidity('Цена не может быть больше 1 000 000 рублей.');
    } else {
      adPrice.setCustomValidity('');
    }
  };

  var adGuestValidity = function () {
    var numberRoomSelected = numbersRoomsField.value;
    var numberGuestSelected = numbersGuestsField.value;

    if (numberRoomSelected === '100' && numberGuestSelected === '0') {
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

  adType.addEventListener('change', function () {
    minPriceValue = MinPrice[adType.value.toUpperCase()];
    adPrice.setAttribute('placeholder', minPriceValue);
  });

  adTimeIn.addEventListener('change', function () {
    adTimeOut.value = adTimeIn.value;
  });

  adTimeOut.addEventListener('change', function () {
    adTimeIn.value = adTimeOut.value;
  });

  buttonSendForm.addEventListener('click', function () {
    adTitleValidity();
    adPriceValidity();
    adGuestValidity();
  });
})();
