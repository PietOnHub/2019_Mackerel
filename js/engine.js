

function init() {

  // set globals to initial state
  gameObjects = [];
  oldTimeStamp = 0;
  secondsPassed = 0;
  secondsPassedTotal = 0;

  // set canvas and context element
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');

  // create the world with inital states
  createWorld();

  // start the gameLoop
  gameRunning = true;
  window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {

  // time related variables
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  secondsPassedTotal += secondsPassed;
  oldTimeStamp = timeStamp;

  // check for eventes
  Controls.ListenToKeyboard();

  // sorting out obsolete contents before next loop
  gameObjects = gameObjects.filter(function(value, index, arr){
    return value.obsolete == false;
  });

  // UPDATE ------------------------------------
  // updating the objects
  for (var i = 0; i < gameObjects.length; i++) {
    gameObjects[i].update(secondsPassed);
  }

  // CHECKS ------------------------------------
  // check for end of spawning
  checkSpawnEnd();

  // check for collisions
  checkCollisions();

  // VIEW --------------------------------------
  // clear the view from last state
  clearCanvas();

  // draw the current state
  for (var i = 0; i < gameObjects.length; i++) {
    gameObjects[i].draw();
  }

  // draw the engine info
  drawEngineInfo(secondsPassed, secondsPassedTotal);

  // LOOP AND STOP CONDITION ---------------------
  // gameRunning is currently set to be always true
  if (gameRunning)
    window.requestAnimationFrame(gameLoop);
}


function clearCanvas(){
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawEngineInfo(secondsPassed, secondsPassedTotal) {
  document.getElementById('mainFPS').innerHTML = "FPS: " + Math.round(1/secondsPassed)
  document.getElementById('mainObjCount').innerHTML = "Obj#: " + gameObjects.length;
  document.getElementById('mainTimer').innerHTML = "time: " + Math.round(secondsPassedTotal);
}
