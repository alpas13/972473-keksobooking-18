'use strict';
(function () {
  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };
  var map = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters');
  var selectFieldMapFilter = mapFilter.querySelectorAll('.map__filter');
  var fieldsetFieldMapFilter = mapFilter.querySelector('.map__features');
  var headerAdForm = window.form.adElement.querySelector('.ad-form-header');
  var elementAdForm = window.form.adElement.querySelectorAll('.ad-form__element');
  var addressAdForm = window.form.adElement.querySelector('#address');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainContent = document.querySelector('main');
  var sendSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
  var sendErrorTemplate = document.querySelector('#error').content.querySelector('.error');

  var disabledFormPage = function () {
    window.form.disableElement(selectFieldMapFilter);
    window.form.disableElement(fieldsetFieldMapFilter);
    window.form.disableElement(headerAdForm);
    window.form.disableElement(elementAdForm);
    window.form.adElement.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
  };

  var onSuccess = function (adsData) {
    window.filter.housingSearch(adsData);
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
      window.form.adGuestValidity();
    });
    window.pin.mapPointer.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KeyCode.ENTER) {
        activatePage();
      }
    });
  };

  var sendSuccessFormData = function () {
    var popupSuccessFormSend = sendSuccessTemplate.cloneNode(true);
    mainContent.appendChild(popupSuccessFormSend);
    popupSuccessFormSend.addEventListener('click', function () {
      if (mainContent.querySelector('.success')) {
        mainContent.removeChild(popupSuccessFormSend);
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KeyCode.ESC && mainContent.querySelector('.success')) {
        evt.preventDefault();
        mainContent.removeChild(popupSuccessFormSend);
      }
    });
  };

  var sendErrorFormData = function () {
    var popupErrorFormSend = sendErrorTemplate.cloneNode(true);
    mainContent.appendChild(popupErrorFormSend);
    popupErrorFormSend.addEventListener('click', function () {
      if (mainContent.querySelector('.error')) {
        mainContent.removeChild(popupErrorFormSend);
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KeyCode.ESC && mainContent.querySelector('.error')) {
        evt.preventDefault();
        mainContent.removeChild(popupErrorFormSend);
      }
    });
  };

  init();

  window.render = {
    'map': map,
    'KeyCode': KeyCode,
    'addressAdForm': addressAdForm,
    'disabledFormPage': disabledFormPage,
    'init': init,
    'sendSuccessFormData': sendSuccessFormData,
    'sendErrorFormData': sendErrorFormData
  };
})();
