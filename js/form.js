'use strict';

(function () {
  var MinPrice = {
    'FLAT': 1000,
    'BUNGALO': 0,
    'HOUSE': 5000,
    'PALACE': 10000
  };

  var minPriceValue = 1000;
  var adElement = document.querySelector('.ad-form');
  var adPrice = adElement.querySelector('#price');
  var adType = adElement.querySelector('#type');
  var numbersRoomsField = adElement.querySelector('#room_number');
  var numbersGuestsField = adElement.querySelector('#capacity');
  var adTimeIn = adElement.querySelector('#timein');
  var adTimeOut = adElement.querySelector('#timeout');
  var numbersGuestsList = numbersGuestsField.querySelectorAll('option');
  var buttonReset = document.querySelector('.ad-form__reset');

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

  var adGuestValidity = function () {
    numbersGuestsList.forEach(function (value) {
      value.setAttribute('disabled', 'disabled');
      value.removeAttribute('selected');
    });
    numbersGuestsList.forEach(function (value) {
      if (numbersRoomsField.value === value.value || (numbersRoomsField.value === '100' && value.value === '0')) {
        value.removeAttribute('disabled');
        value.setAttribute('selected', 'selected');
      }
    });
  };

  var resetPinFragment = function (renderPlace) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.pin.mapOverlay);
    fragment.appendChild(window.pin.mapPointer);
    renderPlace.appendChild(fragment);
  };

  var resetForm = function () {
    adElement.reset();
    adGuestValidity();
    window.card.closePopup();
    window.filter.mapPinsBlock.innerHTML = '';
    resetPinFragment(window.filter.mapPinsBlock);
    window.pin.mapPointer.style.left = window.pin.mapPointerLeft + 'px';
    window.pin.mapPointer.style.top = window.pin.mapPointerTop + 'px';
    changePrice();
    window.render.addressAdForm.value = window.pin.getMapPointerPosition();
    window.render.disabledFormPage();
  };

  var changePrice = function () {
    minPriceValue = MinPrice[adType.value.toUpperCase()];
    adPrice.setAttribute('min', minPriceValue);
    adPrice.setAttribute('placeholder', minPriceValue);
  };

  window.form = {
    'adElement': adElement,
    'disableElement': disableElement,
    'activateElement': activateElement,
    'adGuestValidity': adGuestValidity
  };

  adType.addEventListener('change', function () {
    changePrice();
  });

  adTimeIn.addEventListener('change', function () {
    adTimeOut.value = adTimeIn.value;
  });

  adTimeOut.addEventListener('change', function () {
    adTimeIn.value = adTimeOut.value;
  });

  numbersRoomsField.addEventListener('change', function () {
    adGuestValidity();
  });

  adElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.submitForm(window.render.sendSuccessFormData, window.render.sendErrorFormData);
    resetForm();
  });

  buttonReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });
  buttonReset.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.render.KeyCode.ENTER) {
      evt.preventDefault();
      resetForm();
    }
  });
})();
