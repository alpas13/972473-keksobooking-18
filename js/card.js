'use strict';
(function () {
  var mapFilterContainer = document.querySelector('.map__filters-container');
  var popupCard = null;

  var renderPinFragment = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.pin.mapOverlay);
    fragment.appendChild(window.pin.mapPointer);
    if (arguments.length > 1) {
      var callback = arguments[2];
      arguments[0].forEach(function (value) {
        fragment.appendChild(callback(value));
      });
      arguments[1].appendChild(fragment);
    } else {
      arguments[0].appendChild(fragment);
    }
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
    'closePopup': closePopup,
    'renderPinFragment': renderPinFragment,
    'renderPopupFragment': renderPopupFragment,
    'popupCard': popupCard
  };
})();
