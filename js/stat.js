'use strict';

// Константы окна (облака)
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_PADDING = 20; // Отступ внутри окна
var CLOUD_SHADOW_OFFSET = 10; // Отступ тени окна

// Константы текста
var FONT_SIZE = 16;
var FONT_GAP = 5;

// Константы колонок
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_PADDING = 50;

// Рисует текст заданного цвета в заданных координатах
var drawText = function (ctx, text, x, y, color) {
  ctx.font = FONT_SIZE + 'px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

// Рисует прямоугольник заданного цвета в заданных координатах
var drawRectangle = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

// Возвращает максимальный элемент в массиве
var getMaxElement = function (arr) {
  if (!arr || !arr.length) {
    return null;
  }

  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

// Возвращает цвет колонки игрока
var getBarColor = function (playerName) {
  if (playerName === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  } else {
    var saturation = Math.floor(Math.random() * 100);
    return 'hsl(230, ' + saturation + '%, 50%)';
  }
};

// Отображает окно статистики игрока
window.renderStatistics = function (ctx, names, times) {
  // Рисуем окно с тенью
  drawRectangle(
      ctx,
      CLOUD_X + CLOUD_SHADOW_OFFSET,
      CLOUD_Y + CLOUD_SHADOW_OFFSET,
      CLOUD_WIDTH,
      CLOUD_HEIGHT,
      'rgba(0, 0, 0, 0.7)'
  );
  drawRectangle(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');

  // Рисуем текст поздравления с победой
  drawText(ctx, 'Ура вы победили!', CLOUD_X + CLOUD_PADDING, CLOUD_Y + CLOUD_PADDING, 'black');
  drawText(
      ctx,
      'Список результатов:',
      CLOUD_X + CLOUD_PADDING,
      CLOUD_Y + CLOUD_PADDING + FONT_SIZE + FONT_GAP,
      'black'
  );

  // Находим максимальное значение времени
  var maxTime = getMaxElement(times);

  // Рисуем гистограмму
  for (var i = 0; i < names.length; i++) {
    var playerName = names[i];
    var playerTime = Math.floor(times[i]);

    // Расчитываем цвет, положение и размеры колонки
    var barColor = getBarColor(playerName);
    var barHeight = (BAR_MAX_HEIGHT * playerTime) / maxTime;
    var barX = CLOUD_X + BAR_PADDING + (BAR_WIDTH + BAR_PADDING) * i;
    var barY = CLOUD_Y + CLOUD_PADDING * 3 + FONT_SIZE * 2 + BAR_MAX_HEIGHT - barHeight;

    // Рисуем время игрока, колонку и имя игрока
    drawText(ctx, playerTime, barX, barY - FONT_SIZE, 'black');
    drawRectangle(ctx, barX, barY, BAR_WIDTH, barHeight, barColor);
    drawText(ctx, playerName, barX, barY + barHeight + FONT_GAP, 'black');
  }
};
