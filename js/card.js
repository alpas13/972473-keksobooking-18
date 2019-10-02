'use strict';
(function () {
  var renderFragment = function (arr, renderPlace) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(window.pin.renderMapPin(arr[i]));
    }
    renderPlace.appendChild(fragment);
  };

  window.card = {
    'renderFragment': renderFragment
  };
})();
