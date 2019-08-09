
var canvas;
var context;

var oldTimeStamp = 0;
var secondsPassed = 0;

function init() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');

  createWorld();

  window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {

  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  for (var i = 0; i < gameObjects.length; i++) {
    gameObjects[i].update(secondsPassed);
  }

  clearCanvas();

  for (var i = 0; i < gameObjects.length; i++) {
    gameObjects[i].draw();
  }

  fps(secondsPassed);

  window.requestAnimationFrame(gameLoop);
}


function clearCanvas(){
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function fps(secondsPassed) {
  context.fillStyle = '#000000';
  context.fillText("FPS: " + Math.round(1/secondsPassed), 10, 20)
}
