'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileAvatarChooser = document.querySelector('#avatar');
  var imagesChooser = document.querySelector('#images');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var imagesPreview = document.querySelector('.ad-form__photo');

  var photoPreview = function (chooser, previewPosition) {
    var file = chooser.files[chooser.files.length - 1];

    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (value) {
        return fileName.endsWith(value);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          previewPosition.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };

  fileAvatarChooser.addEventListener('change', function () {
    photoPreview(fileAvatarChooser, avatarPreview);
  });
  imagesChooser.addEventListener('change', function () {
    var imageElement = document.createElement('img');
    imageElement.alt = 'Фотографии жилья';
    imageElement.height = '70';
    imageElement.width = '70';
    imagesPreview.appendChild(imageElement);

    var actualImage = imagesPreview.querySelector('img:last-of-type');
    photoPreview(imagesChooser, actualImage);
  });
})();
