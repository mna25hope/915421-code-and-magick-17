'use strict';

// Константы окна (облака)
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_PADDING = 30; // Отступ внутри окна
var CLOUD_SHADOW_OFFSET = 10; // Отступ тени окна

// Константы текста
var FONT_SIZE = 16;
var FONT_GAP = 10;

// Константы колонок
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_PADDING = 50;

// Рисует окно с тенью (облако) в заданных координатах
var drawWindow = function (ctx, x, y) {
  drawRectangle(ctx, x + CLOUD_SHADOW_OFFSET, y + CLOUD_SHADOW_OFFSET, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  drawRectangle(ctx, x, y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');
};

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
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement; // TODO
};

// Возвращает цвет колонки гистограммы в зависимости
// от имени игрока playerName. Если оно равно 'Вы', возвращает
// красный rgba(255, 0, 0, 1). Если другое — случайный оттенок синего.
var getBarColor = function (playerName) {
  if (playerName ='Вы') {getBarColor = rgba(255, 0, 0, 1);
  } // TODO
};

// Рисует статистику игроков
window.renderStatistics = function (ctx, names, times) {
  // Рисуем окно
  drawWindow(ctx, CLOUD_X, CLOUD_Y);

  // Рисуем текст поздравления с победой
  drawText(ctx, 'Ура вы победили!\nСписок результатов:', CLOUD_X + CLOUD_PADDING, CLOUD_Y + CLOUD_PADDING);

  // Находим максимальное значение времени
  var maxTime = getMaxElement(times);

  // Рисуем гистограмму
  for (var i = 0; i < names.lenght; i++) {
    var playerName = names[i];
    var playerTime = times[i];

    // Расчитываем цвет, положение и размеры колонки
    var barColor = getBarColor(playerName);
    var barHeight = (BAR_MAX_HEIGHT * playerTime) / maxTime;
    var barX = CLOUD_X + BAR_PADDING + (BAR_WIDTH + BAR_PADDING) * i;
    var barY = (CLOUD_Y * 2 + CLOUD_PADDING * 2 + FONT_SIZE * 3 + FONT_GAP * 2 + BAR_MAX_HEIGHT) - barHeight; // TODO

    // Рисуем время игрока, колонку и имя игрока
    drawText(ctx, playerTime, barX, barY - (FONT_GAP + FONT_SIZE), 'black');
    drawRectangle(ctx, barX, barY, BAR_WIDTH, barHeight, barColor);
    drawText(ctx, playerName, barX, barY + barHeight + FONT_GAP, 'black');
  }
};
