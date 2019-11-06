'use strict';

(function () {
  var Constraints = {
    'TOP': 130,
    'BOTTOM': 630
  };

  var mapSize = window.pin.mapOverlay.getBoundingClientRect();
  var leftShift = mapSize.x;
  var mapSizeLeft = mapSize.left + pageXOffset;
  var mapSizeTop = mapSize.top + pageYOffset;
  var mapSizeWidth = mapSize.width;
  var horizonShift = null;
  var verticalShift = null;
  var topConstraint = null;
  var bottomConstraint = null;
  var leftConstraint = null;
  var rightConstraint = null;

  var onMouseMove = function (evt) {
    evt.preventDefault();

    if (evt.clientX >= leftConstraint && evt.clientX <= rightConstraint) {
      window.pin.mapPointer.style.left = (evt.clientX - leftShift - horizonShift) + 'px';
    }

    if (evt.clientY >= topConstraint && evt.clientY <= bottomConstraint) {
      window.pin.mapPointer.style.top = (evt.clientY - verticalShift) + 'px';
    }
  };

  var onMouseUp = function (evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    window.render.addressAdForm.value = window.pin.getMapPointerPosition();
  };

  window.pin.mapPointer.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var pinSize = window.pin.mapPointer.getBoundingClientRect();
    var pinSizeWidth = pinSize.width;
    var pinSizeHeight = pinSize.height;

    horizonShift = evt.clientX - window.pin.mapPointer.offsetLeft - leftShift;
    verticalShift = evt.clientY - window.pin.mapPointer.offsetTop;
    topConstraint = mapSizeTop + Constraints.TOP + verticalShift - pinSizeHeight - window.pin.MAP_PIN_POINTER;
    bottomConstraint = mapSizeTop + Constraints.BOTTOM + verticalShift - pinSizeHeight - window.pin.MAP_PIN_POINTER;
    leftConstraint = mapSizeLeft - pinSizeWidth / 2 + horizonShift;
    rightConstraint = mapSizeWidth + leftShift + horizonShift - pinSizeWidth / 2;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.address = {
    'leftShift': leftShift
  };
})();
