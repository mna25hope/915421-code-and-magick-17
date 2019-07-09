'use strict';

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристов',
  'Виктор',
  'Юлия',
  'Лолита',
  'Вашингтон'
];
var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var WIZARD_COATS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

var WIZARD_COUNT = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var randomFullName = function () {
  var firstName = WIZARD_NAMES[randomNumber(0, WIZARD_NAMES.length)];
  var lastName = WIZARD_SURNAMES[randomNumber(0, WIZARD_SURNAMES.length)];

  return firstName + ' ' + lastName;
};

var randomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randomArrayElement = function (array) {
  return array[randomNumber(0, array.length)];
};
// функция случайных чисел
var randomWizards = function () {
  var wizards = [];
  for (var i = 0; i < WIZARD_COUNT; i++) {
    var wizard = {
      name: randomFullName(),
      coatColor: randomArrayElement(WIZARD_COATS),
      eyesColor: randomArrayElement(WIZARD_EYES)
    };
    wizards.push(wizard);
  }
  return wizards;
};

// функция создания DOM элементов
var renderWizard = function (wizard) {
  var similarWizardTemplate = document
    .querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// отрисовкa DOM элементов
var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};
userDialog.querySelector('.setup-similar').classList.remove('hidden');
renderWizards(randomWizards());
