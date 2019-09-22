'use strict';

var pinTemplate = document.querySelector('#pin');
var map = document.querySelector('.map');
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;
var mapPinsBlock = document.querySelector('.map__pins');
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

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateAd = function () {
  var ads = [];
  var count = 8;
  var blockWidth = document.querySelector('.map__overlay').offsetWidth;

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

  for (var i = 0; i < count; i++) {
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
  pinTemplateElement.querySelector('.map__pin').style.left =
      arr.location.x - MAP_PIN_WIDTH / 2 + 'px';
  pinTemplateElement.querySelector('.map__pin').style.top =
      arr.location.y - MAP_PIN_HEIGHT + 'px';
  pinTemplateElement.querySelector('img').src = arr.author.avatar;
  pinTemplateElement.querySelector('img').alt = arr.offer.title;

  return pinTemplateElement;
};

var renderFragment = function (arr, renderPlace) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderMapPin(arr[i]));
  }
  renderPlace.appendChild(fragment);
};

var init = function () {
  renderFragment(generateAd(), mapPinsBlock);
  map.classList.remove('map--faded');
};

init();
