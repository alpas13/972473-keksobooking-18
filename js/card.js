'use strict';
(function () {
  var mapFilterContainer = document.querySelector('.map__filters-container');
  var popupCard = null;

  var renderPinFragment = function (arr, renderPlace, callback) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.pin.mapOverlay);
    fragment.appendChild(window.pin.mapPointer);
    arr.forEach(function (value) {
      fragment.appendChild(callback(value));
    });
    renderPlace.appendChild(fragment);
  };

  var closePopup = function () {
    if (window.render.map.querySelector('.map__card.popup')) {
      window.render.map.removeChild(popupCard);
    }
  };

  var renderPopupFragment = function (adItem, callback) {
    closePopup();
    window.render.map.insertBefore(callback(adItem), mapFilterContainer);
    popupCard = window.render.map.querySelector('.map__card.popup');
    popupCard.querySelector('.popup__close').addEventListener('click', function () {
      window.render.map.removeChild(popupCard);
    });
    popupCard.querySelector('.popup__close').addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.render.KeyCode.ENTER) {
        window.render.map.removeChild(popupCard);
      }
    });
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.render.KeyCode.ESC && popupCard) {
      evt.preventDefault();
      window.render.map.removeChild(popupCard);
    }
  });

  window.card = {
    'renderPinFragment': renderPinFragment,
    'renderPopupFragment': renderPopupFragment,
    'popupCard': popupCard
  };
})();
