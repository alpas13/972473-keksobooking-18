'use strict';
(function () {
  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };
  var map = document.querySelector('.map');
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapFilterContainer = document.querySelector('.map__filters-container');
  var mapFilter = document.querySelector('.map__filters');
  var selectFieldMapFilter = mapFilter.querySelectorAll('.map__filter');
  var fieldsetFieldMapFilter = mapFilter.querySelector('.map__features');
  var headerAdForm = window.form.adElement.querySelector('.ad-form-header');
  var elementAdForm = window.form.adElement.querySelectorAll('.ad-form__element');
  var addressAdForm = window.form.adElement.querySelector('#address');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainContent = document.querySelector('main');

  var disabledFormPage = function () {
    window.form.disableElement(selectFieldMapFilter);
    window.form.disableElement(fieldsetFieldMapFilter);
    window.form.disableElement(headerAdForm);
    window.form.disableElement(elementAdForm);
    window.form.adElement.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
  };

  var onSuccess = function (adsData) {
    window.card.renderPinFragment(adsData, mapPinsBlock, window.pin.renderMapPointer);
    window.card.renderPopupFragment(adsData, map, mapFilterContainer, window.popup.renderAd);
  };

  var onError = function (message) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = message;
    mainContent.appendChild(errorElement);
    errorElement.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.className !== 'error__button') {
        mainContent.removeChild(errorElement);
        disabledFormPage();
      }
    });
    errorElement.querySelector('.error__button').addEventListener('click', function () {
      mainContent.removeChild(errorElement);
      window.load(onSuccess, onError);
    });
    window.addEventListener('keydown', function (evt) {
      evt.preventDefault();
      if (evt.keyCode === KeyCode.ESC && mainContent.lastChild === errorElement) {
        mainContent.removeChild(errorElement);
        disabledFormPage();
      }
    });
  };

  var activatePage = function () {
    window.load(onSuccess, onError);
    window.form.activateElement(selectFieldMapFilter);
    window.form.activateElement(fieldsetFieldMapFilter);
    window.form.activateElement(headerAdForm);
    window.form.activateElement(elementAdForm);
    window.form.adElement.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
  };

  var init = function () {
    disabledFormPage();
    addressAdForm.value = window.pin.getMapPointerPosition();
    window.pin.mapPointer.addEventListener('mousedown', function () {
      activatePage();
    });
    window.pin.mapPointer.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KeyCode.ENTER) {
        activatePage();
      }
    });
  };

  init();
})();
