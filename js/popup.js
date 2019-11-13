'use strict';

(function () {
  var HousingType = {
    'FLAT': 'Квартира',
    'BUNGALO': 'Бунгало',
    'HOUSE': 'Дом',
    'PALACE': 'Дворец'
  };

  var adTemplate = document.querySelector('#card');

  var renderFeatures = function (features) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < features.length; i++) {
      var featureTemplateElement = document.createElement('li');
      featureTemplateElement.classList.add('popup__feature');
      featureTemplateElement.classList.add('popup__feature--' + features[i]);

      fragment.appendChild(featureTemplateElement);
    }

    return fragment;
  };

  var renderPhotos = function (photos) {
    var photosTemplate = adTemplate.content.querySelector('.popup__photos');
    var photoTemplate = photosTemplate.querySelector('.popup__photo');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var photoTemplateElement = document.createElement('img');
      photoTemplateElement.alt = photoTemplate.alt;
      photoTemplateElement.class = photoTemplate.class;
      photoTemplateElement.height = photoTemplate.height;
      photoTemplateElement.src = photos[i];
      photoTemplateElement.width = photoTemplate.width;

      fragment.appendChild(photoTemplateElement);
    }

    return fragment;
  };

  var renderAd = function (arr) {
    var adTemplateElement = adTemplate.content.cloneNode(true);

    adTemplateElement.querySelector('.popup__avatar').src = arr.author.avatar;
    adTemplateElement.querySelector('.popup__title').textContent = arr.offer.title;
    adTemplateElement.querySelector('.popup__text--address').textContent = arr.offer.address;
    adTemplateElement.querySelector('.popup__text--price').textContent = arr.offer.price + '₽/ночь';
    adTemplateElement.querySelector('.popup__type').textContent = HousingType[arr.offer.type.toUpperCase()];
    adTemplateElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + 'комнаты для ' + arr.offer.guests + ' гостей';
    adTemplateElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
    adTemplateElement.querySelector('.popup__features').innerHTML = '';
    adTemplateElement.querySelector('.popup__features').appendChild(renderFeatures(arr.offer.features));
    adTemplateElement.querySelector('.popup__description').textContent = arr.offer.description;
    adTemplateElement.querySelector('.popup__photos').innerHTML = '';
    adTemplateElement.querySelector('.popup__photos').appendChild(renderPhotos(arr.offer.photos));

    return adTemplateElement;
  };

  window.popup = {
    renderAd: renderAd
  };
})();
