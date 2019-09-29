'use strict';

var KEY_CODE_ENTER = 13;
var MAP_PIN_SIZE = {
  width: 50,
  height: 70
};
var TITLE = [
  'Сдается квартира: упади на кредит',
  'Сдается квартира: забота Гольфстрима',
  'Сдается квартира: прокричи природу гамма-всплесков',
  'Сдается квартира: обычный ребрендинг',
  'Сдается квартира: напугай метафору',
  'Сдается квартира: сбацай конфиденциальность',
  'Сдается квартира: восточно-европейское амикошонство',
  'Сдается квартира: диссонансное разнообразие'
];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var DESCRIPTION = [
  'Основная магистраль проходит с севера на юг от Шкодера через Дуррес до Влёры, после поворота глауберова соль абсурдно вызывает небольшой цикл.',
  'Закрытый аквапарк теоретически возможен. Побережье выбирает кедровый стланик.',
  'Сноудония и другие многочисленные национальные резерваты природы и парки, иллюстрирует культурный кандым.',
  'Провоз кошек и собак, в первом приближении, поднимает черный эль. Весеннее половодье иллюстрирует экскурсионный Бенгальский залив.',
  'Символический центр современного Лондона прочно применяет экскурсионный тюлень, именно здесь с 8.00 до 11.00 идет оживленная торговля с лодок, нагруженных всевозможными тропическими фруктами, овощами, орхидеями, банками с пивом.',
  'Символический центр современного Лондона непосредственно надкусывает утконос.',
  'Побережье ежегодно. Особый вид куниц просветляет холодный органический мир.',
  'География вразнобой превышает широкий особый вид куниц.'
];
var TIME = ['12:00', '13:00', '14:00'];
var COUNT = 8;
var MAP_PIN_POINTER = 16;
var pinTemplate = document.querySelector('#pin');
var map = document.querySelector('.map');
var mapPin = document.querySelector('.map__pin--main');
var mapPinsBlock = document.querySelector('.map__pins');
var mapFilter = document.querySelector('.map__filters');
var selectFieldMapFilter = mapFilter.querySelectorAll('.map__filter');
var fieldsetFieldMapFilter = mapFilter.querySelector('.map__features');
var adForm = document.querySelector('.ad-form');
var headerAdForm = adForm.querySelector('.ad-form-header');
var elementAdForm = adForm.querySelectorAll('.ad-form__element');
var addressAdForm = adForm.querySelector('#address');
var numbersRoomsField = adForm.querySelector('#room_number');
var numbersGuestsField = adForm.querySelector('#capacity');
var buttonSendForm = adForm.querySelector('.ad-form__submit');

var disableForm = function (element) {
  if (element.length > 0) {
    for (var i = 0; i < element.length; i++) {
      element[i].disabled = true;
    }
  } else {
    element.disabled = true;
  }
};

var activateForm = function (element) {
  if (element.length > 0) {
    for (var i = 0; i < element.length; i++) {
      element[i].disabled = false;
    }
  } else {
    element.disabled = false;
  }
  adForm.classList.remove('ad-form--disabled');
};

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArray = function (selectedArr) {
  return selectedArr.slice(getRandomNumber(0, selectedArr.length - 2));
};

var getRandomPhotos = function (arrlength, max) {
  var photos = [];
  var photoCount = 1;
  for (var i = 0; i < arrlength; i++) {
    if (photoCount > max) {
      photoCount = 1;
    }
    photos.push(
        'http://o0.github.io/assets/images/tokyo/hotel' + photoCount + '.jpg'
    );
    photoCount++;
  }
  return photos;
};

var generateAd = function () {
  var ads = [];
  var blockWidth = document.querySelector('.map__overlay').offsetWidth;

  for (var i = 0; i < COUNT; i++) {
    ads.push({
      author: {avatar: 'img/avatars/user0' + (i + 1) + '.png'},
      offer: {
        title: TITLE[i],
        address: getRandomNumber(400, 700) + ', ' + getRandomNumber(100, 400),
        price: getRandomNumber(5000, 50000),
        type: TYPE[getRandomNumber(0, TYPE.length - 1)],
        rooms: getRandomNumber(1, 3),
        guests: getRandomNumber(1, 5),
        checkin: TIME[getRandomNumber(0, TIME.length - 1)],
        checkout: TIME[getRandomNumber(0, TIME.length - 1)],
        features: getRandomArray(FEATURES),
        description: DESCRIPTION[i],
        photos: getRandomPhotos(getRandomNumber(2, 6), 3)
      },
      location: {
        x: getRandomNumber(30, blockWidth - 30),
        y: getRandomNumber(130, 630)
      }
    });
  }
  return ads;
};

var renderMapPin = function (arr) {
  var pinTemplateElement = pinTemplate.content.cloneNode(true);
  var avatar = pinTemplateElement.querySelector('img');
  pinTemplateElement.querySelector('.map__pin').style.left =
      arr.location.x - MAP_PIN_SIZE.width / 2 + 'px';
  pinTemplateElement.querySelector('.map__pin').style.top =
      arr.location.y - MAP_PIN_SIZE.height + 'px';
  avatar.src = arr.author.avatar;
  avatar.alt = arr.offer.title;

  return pinTemplateElement;
};

var renderFragment = function (arr, renderPlace) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderMapPin(arr[i]));
  }
  renderPlace.appendChild(fragment);
};

var getMapPinPosition = function () {
  var location = mapPin.getBoundingClientRect();
  var left = location.left + pageXOffset;
  var top = location.top + pageYOffset;
  var width = location.width;
  var height = location.height;

  if (adForm.classList.contains('ad-form--disabled')) {
    return Math.floor(left + width / 2) + ', ' + Math.floor(top + height / 2);
  }

  return Math.floor(left + width / 2) + ', ' + Math.floor(top + height + MAP_PIN_POINTER);
};

var testGuestValidity = function () {
  var numberRoomSelected = numbersRoomsField.value;
  var numberGuestSelected = numbersGuestsField.value;

  if (numberRoomSelected === '100 комнат' && numberGuestSelected === 'не для гостей') {
    numbersGuestsField.setCustomValidity('');
  } else if (numberRoomSelected !== numberGuestSelected) {
    numbersGuestsField.setCustomValidity('Количество гостей не соответствует количеству комнат');
  } else {
    numbersGuestsField.setCustomValidity('');
  }
};

var activatePage = function () {
  renderFragment(generateAd(), mapPinsBlock);
  activateForm(selectFieldMapFilter);
  activateForm(fieldsetFieldMapFilter);
  activateForm(headerAdForm);
  activateForm(elementAdForm);
  addressAdForm.value = getMapPinPosition();
  map.classList.remove('map--faded');
};

var init = function () {
  disableForm(selectFieldMapFilter);
  disableForm(fieldsetFieldMapFilter);
  disableForm(headerAdForm);
  disableForm(elementAdForm);
  addressAdForm.value = getMapPinPosition();
  mapPin.addEventListener('mousedown', function () {
    activatePage();
  });
  mapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE_ENTER) {
      activatePage();
    }
  });
  buttonSendForm.addEventListener('click', function () {
    testGuestValidity();
  });
};

init();
