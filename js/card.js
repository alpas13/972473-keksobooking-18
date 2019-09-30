'use strict';
(function () {
  window.renderFragment = function (arr, renderPlace) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(window.renderMapPin(arr[i]));
    }
    renderPlace.appendChild(fragment);
  };
})();
