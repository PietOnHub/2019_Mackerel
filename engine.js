
var canvas;
var context;

var oldTimeStamp = 0;
var secondsPassed = 0;
var secondsPassedTotal = 0;

function init() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');

  createWorld();

  window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {

  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  secondsPassedTotal += secondsPassed;
  oldTimeStamp = timeStamp;

  for (var i = 0; i < gameObjects.length; i++) {
    gameObjects[i].update(secondsPassed);
  }

  gameObjects = gameObjects.filter(function(value, index, arr){
    return value.obsolete == false;
  });

  if (gameObjects.length >= 1000)
    stopSpawning();

  detectCollisions();
  detectColissionsGround();
  detectColissionsSide();

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
  context.fillText("FPS: " + Math.round(1/secondsPassed), 10, 20);
  context.fillText("Obj#: " + gameObjects.length, 10, 40);
  context.fillText("time: " + Math.round(secondsPassedTotal), 10, 60);
}
