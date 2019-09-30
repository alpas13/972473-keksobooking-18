'use strict';

(function () {
  var MAP_PIN_SIZE = {
    width: 50,
    height: 70
  };
  var MAP_PIN_POINTER = 16;
  window.mapPin = document.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin');

  window.getMapPinPosition = function () {
    var location = window.mapPin.getBoundingClientRect();
    var left = location.left + pageXOffset;
    var top = location.top + pageYOffset;
    var width = location.width;
    var height = location.height;

    if (window.adForm.classList.contains('ad-form--disabled')) {
      return Math.floor(left + width / 2) + ', ' + Math.floor(top + height / 2);
    }

    return Math.floor(left + width / 2) + ', ' + Math.floor(top + height + MAP_PIN_POINTER);
  };

  window.renderMapPin = function (arr) {
    var pinTemplateElement = pinTemplate.content.cloneNode(true);
    var avatar = pinTemplateElement.querySelector('img');
    pinTemplateElement.querySelector('.map__pin').style.left =
        arr.location.x - MAP_PIN_SIZE.width / 2 + 'px';
    pinTemplateElement.querySelector('.map__pin').style.top =
        arr.location.y - MAP_PIN_SIZE.height + 'px';
    avatar.src = arr.author.avatar;
    avatar.alt = arr.offer.title;

    return pinTemplateElement;
  };
})();
