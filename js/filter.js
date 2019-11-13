'use strict';

(function () {
  var MAX_PINS = 5;
  var VALUE_ANY = 'any';
  var PriceLevel = {
    MIN: 10000,
    MAX: 50000
  };
  var PriceType = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var mapPinsBlock = document.querySelector('.map__pins');
  var adsData = [];

  var housingTypeFilter = function (value) {
    return value.offer.type === housingType.value || housingType.value === VALUE_ANY;
  };

  var housingRoomsFilter = function (value) {
    return value.offer.rooms === +housingRooms.value || housingRooms.value === VALUE_ANY;
  };

  var housingGuestsFilter = function (value) {
    return value.offer.guests === +housingGuests.value || housingGuests.value === VALUE_ANY;
  };

  var housingPriceFilter = function (value) {
    if (housingPrice.value === PriceType.MIDDLE) {
      return value.offer.price >= PriceLevel.MIN && value.offer.price < PriceLevel.MAX;
    } else if (housingPrice.value === PriceType.LOW) {
      return value.offer.price < PriceLevel.MIN;
    } else if (housingPrice.value === PriceType.HIGH) {
      return value.offer.price >= PriceLevel.MAX;
    } else {
      return true;
    }
  };

  var housingFeaturesFilter = function (data) {
    var housingFeaturesList = housingFeatures.querySelectorAll('.map__checkbox:checked');
    return Array.from(housingFeaturesList).every(function (value) {
      return data.offer.features.some(function (item) {
        return value.value === item;
      });
    });
  };

  var housingSearch = function (data) {
    adsData = data;
    var currentData = data.filter(function (value) {
      return housingTypeFilter(value) && housingPriceFilter(value) && housingRoomsFilter(value) && housingGuestsFilter(value) && housingFeaturesFilter(value);
    }).slice(0, MAX_PINS);
    mapPinsBlock.innerHTML = '';
    window.card.renderPinFragment(currentData, mapPinsBlock, window.pin.renderMapPointer);
  };

  var filterHousing = window.debounce.delayExecute(function (data) {
    housingSearch(data);
  });

  mapFilters.addEventListener('change', function () {
    filterHousing(adsData);
  });

  window.filter = {
    'mapPinsBlock': mapPinsBlock,
    'housingSearch': housingSearch
  };
})();
