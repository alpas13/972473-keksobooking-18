'use strict';

(function () {
  var STATUS_OK = 200;
  var TIMEOUT = 10000;
  var URL = 'https://js.dump.academy/keksobooking/data';
  var SUBMIT_URL = 'https://js.dump.academy/keksobooking';

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ошибки: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open('GET', URL);
    xhr.send();
  };

  var submitForm = function (successPopup, errorPopup) {
    var formData = new FormData(window.form.adElement);
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        successPopup();
      }
    });
    xhr.addEventListener('error', function () {
      errorPopup();
    });
    xhr.open('POST', SUBMIT_URL);
    xhr.send(formData);
  };

  window.backend = {
    'load': load,
    'submitForm': submitForm
  };
})();
