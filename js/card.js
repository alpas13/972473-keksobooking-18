'use strict';
(function () {
  var renderPinFragment = function (arr, renderPlace, callback) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(callback(arr[i]));
    }
    renderPlace.appendChild(fragment);
  };

  var renderPopupFragment = function (arr, renderPlace, referenceElement, callback) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(callback(arr[0]));
    renderPlace.insertBefore(fragment, referenceElement);
  };

  window.card = {
    'renderPinFragment': renderPinFragment,
    'renderPopupFragment': renderPopupFragment
  };
})();
