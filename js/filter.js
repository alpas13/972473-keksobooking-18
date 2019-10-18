'use strict';

(function () {
  var MAX_PINS = 5;
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var mapPinsBlock = document.querySelector('.map__pins');
  var adsData = [];

  var housingFilter = function (data, offerType, filterSource) {
    return data.filter(function (value) {
      return value.offer[offerType].toString() === filterSource.value || filterSource.value === 'any';
    });
  };

  var housingPriceFilter = function (data) {
    return data.filter(function (value) {
      if (housingPrice.value === 'middle') {
        return value.offer.price >= 10000 && value.offer.price < 50000;
      } else if (housingPrice.value === 'low') {
        return value.offer.price < 10000;
      } else if (housingPrice.value === 'high') {
        return value.offer.price >= 50000;
      } else {
        return value;
      }
    });
  };

  var housingFeaturesFilter = function (data) {
    var housingFeaturesList = Array.from(housingFeatures.querySelectorAll('.map__checkbox:checked'));
    var arrayData = data;
    if (housingFeaturesList.length > 0) {
      housingFeaturesList.forEach(function (value) {
        arrayData = arrayData.filter(function (item) {
          return item.offer.features.filter(function (element) {
            return element === value.value;
          }).length > 0;
        });
      });
      return arrayData;
    } else {
      return data;
    }
  };

  var housingSearch = function (data) {
    var currentData = data;

    if (adsData.length === 0) {
      adsData = data;
    } else {
      currentData = housingFilter(currentData, 'type', housingType);
      currentData = housingPriceFilter(currentData);
      currentData = housingFilter(currentData, 'rooms', housingRooms);
      currentData = housingFilter(currentData, 'guests', housingGuests);
      currentData = housingFeaturesFilter(currentData);
      mapPinsBlock.innerHTML = '';
    }

    currentData = currentData.length > MAX_PINS ? currentData.slice(0, MAX_PINS) : currentData;
    window.card.renderPinFragment(currentData, mapPinsBlock, window.pin.renderMapPointer);
  };

  var filterHousing = window.debounce.delayExecute(function (data) {
    housingSearch(data);
  });

  mapFilters.addEventListener('change', function () {
    filterHousing(adsData);
  });

  window.filter = {
    'housingSearch': housingSearch
  };
})();
