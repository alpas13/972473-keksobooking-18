'use strict';
(function () {
  var KEY_CODE_ENTER = 13;
  var map = document.querySelector('.map');
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapFilter = document.querySelector('.map__filters');
  var selectFieldMapFilter = mapFilter.querySelectorAll('.map__filter');
  var fieldsetFieldMapFilter = mapFilter.querySelector('.map__features');
  var headerAdForm = window.form.adForm.querySelector('.ad-form-header');
  var elementAdForm = window.form.adForm.querySelectorAll('.ad-form__element');
  var addressAdForm = window.form.adForm.querySelector('#address');

  var disabledFormPage = function () {
    window.form.disableForm(selectFieldMapFilter);
    window.form.disableForm(fieldsetFieldMapFilter);
    window.form.disableForm(headerAdForm);
    window.form.disableForm(elementAdForm);
  };

  var activatePage = function () {
    window.card.renderFragment(window.data.generateAd(), mapPinsBlock);
    window.form.activateForm(selectFieldMapFilter);
    window.form.activateForm(fieldsetFieldMapFilter);
    window.form.activateForm(headerAdForm);
    window.form.activateForm(elementAdForm);
    addressAdForm.value = window.pin.getMapPinPosition();
    map.classList.remove('map--faded');
  };

  var init = function () {
    disabledFormPage();
    addressAdForm.value = window.pin.getMapPinPosition();
    window.pin.mapPin.addEventListener('mousedown', function () {
      activatePage();
    });
    window.pin.mapPin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEY_CODE_ENTER) {
        activatePage();
      }
    });
  };

  init();
})();
