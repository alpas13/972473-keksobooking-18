'use strict';
(function () {
  var KEY_CODE_ENTER = 13;
  var map = document.querySelector('.map');
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapFilter = document.querySelector('.map__filters');
  var selectFieldMapFilter = mapFilter.querySelectorAll('.map__filter');
  var fieldsetFieldMapFilter = mapFilter.querySelector('.map__features');
  var headerAdForm = window.form.adElement.querySelector('.ad-form-header');
  var elementAdForm = window.form.adElement.querySelectorAll('.ad-form__element');
  var addressAdForm = window.form.adElement.querySelector('#address');

  var disabledFormPage = function () {
    window.form.disableElement(selectFieldMapFilter);
    window.form.disableElement(fieldsetFieldMapFilter);
    window.form.disableElement(headerAdForm);
    window.form.disableElement(elementAdForm);
  };

  var activatePage = function () {
    window.card.renderFragment(window.data.generateAd(), mapPinsBlock);
    window.form.activateElement(selectFieldMapFilter);
    window.form.activateElement(fieldsetFieldMapFilter);
    window.form.activateElement(headerAdForm);
    window.form.activateElement(elementAdForm);
    addressAdForm.value = window.pin.getMapPointerPosition();
    map.classList.remove('map--faded');
  };

  var init = function () {
    disabledFormPage();
    addressAdForm.value = window.pin.getMapPointerPosition();
    window.pin.mapPointer.addEventListener('mousedown', function () {
      activatePage();
    });
    window.pin.mapPointer.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEY_CODE_ENTER) {
        activatePage();
      }
    });
  };

  init();
})();
