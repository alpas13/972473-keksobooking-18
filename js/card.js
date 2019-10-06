'use strict';
(function () {
  var renderFragment = function (arr, callback, renderPlace, referenceElement) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(callback(arr[i]));
    }
    renderPlace.insertBefore(fragment, referenceElement);
  };

  window.card = {
    'renderFragment': renderFragment
  };
})();
