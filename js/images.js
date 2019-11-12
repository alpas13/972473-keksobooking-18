'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileAvatarChooser = document.querySelector('#avatar');
  var imagesChooser = document.querySelector('#images');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var imagesPreview = document.querySelector('.ad-form__photo');

  var getActualImages = function (evt) {
    var numberOfElements = evt.srcElement.files.length;

    for (var i = 0; i < numberOfElements; i++) {
      var imageElement = document.createElement('img');
      imageElement.alt = 'Фотографии жилья';
      imageElement.height = '70';
      imageElement.width = '70';
      imagesPreview.appendChild(imageElement);
    }

    return Array.from(imagesPreview.querySelectorAll('img')).slice(-numberOfElements);
  };

  var changeStyle = function () {
    imagesPreview.style.display = 'flex';
    imagesPreview.style.flexWrap = 'wrap';
    imagesPreview.style.flexGrow = '1';
    imagesPreview.style.backgroundColor = 'transparent';
  };

  var photoPreview = function (chooser, previewPosition) {
    var files = chooser.files;

    if (!files) {
      return;
    }

    Array.from(files).forEach(function (value, index) {
      var fileName = value.name.toLowerCase();
      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          if (previewPosition.tagName === 'IMG') {
            previewPosition.src = reader.result;
          } else {
            previewPosition[index].src = reader.result;
          }
        });

        reader.readAsDataURL(value);
      }
    });
  };

  fileAvatarChooser.addEventListener('change', function () {
    photoPreview(fileAvatarChooser, avatarPreview);
  });
  imagesChooser.addEventListener('change', function (evt) {
    if (imagesPreview.style.display !== 'flex') {
      changeStyle();
    }
    photoPreview(imagesChooser, getActualImages(evt));
  });
})();
