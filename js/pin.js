'use strict';

(function () {
  var MAP_PIN_SIZE = {
    width: 50,
    height: 70
  };
  var MAP_PIN_POINTER = 17;
  var mapPointer = document.querySelector('.map__pin--main');
  var mapOverlay = document.querySelector('.map__overlay');
  var pinTemplate = document.querySelector('#pin');

  var getMapPointerPosition = function () {
    var location = mapPointer.getBoundingClientRect();
    var left = location.left + pageXOffset;
    var top = location.top + pageYOffset;
    var width = location.width;
    var height = location.height;

    if (window.form.adElement.classList.contains('ad-form--disabled')) {
      return Math.floor(left + width / 2) + ', ' + Math.floor(top + height / 2);
    }

    return Math.floor(left + width / 2) + ', ' + Math.floor(top + height + MAP_PIN_POINTER);
  };

  var renderMapPointer = function (arr) {
    var pinTemplateElement = pinTemplate.content.cloneNode(true);
    var pin = pinTemplateElement.querySelector('.map__pin');
    var avatar = pinTemplateElement.querySelector('img');
    pin.style.left = arr.location.x - MAP_PIN_SIZE.width / 2 + 'px';
    pin.style.top = arr.location.y - MAP_PIN_SIZE.height + 'px';
    avatar.src = arr.author.avatar;
    avatar.alt = arr.offer.title;

    pin.addEventListener('click', function () {
      window.card.renderPopupFragment(arr, window.popup.renderAd);
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.render.KeyCode.ENTER) {
        window.card.renderPopupFragment(arr, window.popup.renderAd);
      }
    });

    return pinTemplateElement;
  };

  window.pin = {
    'MAP_PIN_POINTER': MAP_PIN_POINTER,
    'mapPointer': mapPointer,
    'mapOverlay': mapOverlay,
    'getMapPointerPosition': getMapPointerPosition,
    'renderMapPointer': renderMapPointer
  };
})();
