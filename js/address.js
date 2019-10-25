'use strict';

(function () {
  var Constraints = {
    'TOP': 130,
    'BOTTOM': 630
  };

  var Coordinates = function () {
    this.x = null;
    this.y = null;
  };
  Coordinates.prototype.setX = function (x) {
    this.x = x;
  };
  Coordinates.prototype.setY = function (y) {
    this.y = y;
  };

  var startCoords = new Coordinates();

  var onMouseMove = function (evt) {
    evt.preventDefault();

    var mapSize = window.pin.mapOverlay.getBoundingClientRect();
    var mapSizeLeft = (mapSize.left + pageXOffset) - mapSize.x;
    var mapSizeTop = mapSize.top + pageYOffset;
    var mapSizeWidth = mapSize.width;

    var pinSize = window.pin.mapPointer.getBoundingClientRect();
    var pinSizeWidth = pinSize.width;
    var pinSizeHeight = pinSize.height;

    var shift = new Coordinates();
    shift.setX(startCoords.x - evt.clientX);
    shift.setY(startCoords.y - evt.clientY);

    startCoords.setX(evt.clientX);
    startCoords.setY(evt.clientY);

    if ((window.pin.mapPointer.offsetLeft - shift.x) >= (mapSizeLeft - pinSizeWidth / 2) &&
        (window.pin.mapPointer.offsetLeft - shift.x) <= (mapSizeWidth - pinSizeWidth / 2)) {
      window.pin.mapPointer.style.left = (window.pin.mapPointer.offsetLeft - shift.x) + 'px';
    }

    if (((window.pin.mapPointer.offsetTop - shift.y) >= (mapSizeTop + Constraints.TOP - pinSizeHeight - window.pin.MAP_PIN_POINTER)) &&
        (window.pin.mapPointer.offsetTop - shift.y) <= (mapSizeTop + Constraints.BOTTOM - pinSizeHeight - window.pin.MAP_PIN_POINTER)) {
      window.pin.mapPointer.style.top = (window.pin.mapPointer.offsetTop - shift.y) + 'px';
    }
  };

  var onMouseUp = function (evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    window.render.addressAdForm.value = window.pin.getMapPointerPosition();
  };

  window.pin.mapPointer.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    startCoords.setX(evt.clientX);
    startCoords.setY(evt.clientY);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
