'use strict';

(function () {
  var MAX_PINS = 5;
  var housingType = document.querySelector('#housing-type');
  var mapPinsBlock = document.querySelector('.map__pins');
  var adsData = [];

  housingType.addEventListener('change', function () {
    var housingTypeData = adsData.filter(function (value) {
      if (housingType.value !== 'any') {
        return value.offer.type === housingType.value;
      }
      return value;
    });

    window.filter(housingTypeData);
  });

  window.filter = function (data) {
    var currentData = data;

    if (adsData.length === 0) {
      adsData = data;
    }

    if (data.length > MAX_PINS) {
      currentData = data.slice(0, MAX_PINS);
    }

    mapPinsBlock.innerHTML = '';
    window.card.renderPinFragment(currentData, mapPinsBlock, window.pin.renderMapPointer);
  };

})();
