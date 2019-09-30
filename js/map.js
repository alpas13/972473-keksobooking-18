'use strict';
(function () {
  var KEY_CODE_ENTER = 13;
  var map = document.querySelector('.map');
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapFilter = document.querySelector('.map__filters');
  var selectFieldMapFilter = mapFilter.querySelectorAll('.map__filter');
  var fieldsetFieldMapFilter = mapFilter.querySelector('.map__features');
  var headerAdForm = window.adForm.querySelector('.ad-form-header');
  var elementAdForm = window.adForm.querySelectorAll('.ad-form__element');
  var addressAdForm = window.adForm.querySelector('#address');

  var disabledFormPage = function () {
    window.disableForm(selectFieldMapFilter);
    window.disableForm(fieldsetFieldMapFilter);
    window.disableForm(headerAdForm);
    window.disableForm(elementAdForm);
  };

  var activatePage = function () {
    window.renderFragment(window.generateAd(), mapPinsBlock);
    window.activateForm(selectFieldMapFilter);
    window.activateForm(fieldsetFieldMapFilter);
    window.activateForm(headerAdForm);
    window.activateForm(elementAdForm);
    addressAdForm.value = window.getMapPinPosition();
    map.classList.remove('map--faded');
  };

  var init = function () {
    disabledFormPage();
    addressAdForm.value = window.getMapPinPosition();
    window.mapPin.addEventListener('mousedown', function () {
      activatePage();
    });
    window.mapPin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEY_CODE_ENTER) {
        activatePage();
      }
    });
  };

  init();
})();
