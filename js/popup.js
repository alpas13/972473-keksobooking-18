'use strict';

(function () {
  var adTemplate = document.querySelector('#card');

  var gerType = function (type) {
    var housingType;
    switch (type) {
      case 'flat':
        housingType = 'Квартира';
        break;
      case 'bungalo':
        housingType = 'Бунгало';
        break;
      case 'house':
        housingType = 'Дом';
        break;
      case 'palace':
        housingType = 'Дворец';
        break;
      default:
        housingType = '';
    }
    return housingType;
  };

  var renderFeatures = function (features) {
    var featuresTemplate = adTemplate.content.querySelector('.popup__features');
    var featuresTemplateList = featuresTemplate.querySelectorAll('.popup__feature');

    for (var i = 0; i < featuresTemplateList.length; i++) {
      featuresTemplate.removeChild(featuresTemplateList[i]);
    }

    for (var j = 0; j < features.length; j++) {
      featuresTemplate.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--' + features[j] + '"></li>');
    }

    return featuresTemplate;
  };

  var renderPhotos = function (photos) {
    var photosTemplate = adTemplate.content.querySelector('.popup__photos');
    var photoTemplateElements = photosTemplate.querySelectorAll('.popup__photo');

    for (var i = 0; i < photoTemplateElements.length; i++) {
      photosTemplate.removeChild(photoTemplateElements[i]);
    }

    for (var j = 0; j < photos.length; j++) {
      photosTemplate.insertAdjacentHTML('beforeend', '<img alt="Фотография жилья" class="popup__photo" height="40" src="' + photos[j] + '" width="45">');
    }

    return photosTemplate;
  };

  var renderAd = function (arr) {
    var adTemplateElement = adTemplate.content.cloneNode(true);

    adTemplateElement.querySelector('.popup__title').textContent = arr.offer.title;
    adTemplateElement.querySelector('.popup__text--address').textContent = arr.offer.address;
    adTemplateElement.querySelector('.popup__text--price').textContent = arr.offer.price + '₽/ночь';
    adTemplateElement.querySelector('.popup__type').textContent = gerType(arr.offer.type);
    adTemplateElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + 'комнаты для ' + arr.offer.guests + ' гостей';
    adTemplateElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
    renderFeatures(arr.offer.features);
    adTemplateElement.querySelector('.popup__description').textContent = arr.offer.description;
    renderPhotos(arr.offer.photos);

    return adTemplateElement;
  };

  window.popup = {
    renderAd: renderAd
  };
})();
