var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP_CLOUD = 10;
var GAP = 40;
var FONT_GAP = 50;
var TEXT_HEIGHT = 40;
var BAR_WIDTH = 40;
var barHeight = CLOUD_HEIGHT - GAP - TEXT_HEIGHT - GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx) {
  renderCloud(ctx, CLOUD_X + GAP_CLOUD, CLOUD_Y + GAP_CLOUD, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили !', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  ctx.fillStyle = '#000';

  var players = ['Вы', 'Иван', 'Юлия', 'Вадим'];

  for (var i = 0; i < players.lenght; i++) {
    ctx.fillText(players[i], CLOUD_X + GAP + (BAR_WIDTH + FONT_GAP) * i, CLOUD_HEIGHT - GAP_CLOUD);
    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + FONT_GAP) * i, CLOUD_Y + GAP * 2, BAR_WIDTH, barHeight);
  }
};
