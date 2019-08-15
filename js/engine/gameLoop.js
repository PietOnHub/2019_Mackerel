//////////////////////////////////////////////
// GAMELOOP ----------------------------------

function gameLoop(timeStamp) {

  // time related variables
  Game.secondsPassed = (timeStamp - Game.oldTimeStamp) / 1000;
  Game.secondsPassedTotal += Game.secondsPassed;
  Game.oldTimeStamp = timeStamp;

  // listen to keyboard input
  Controls.listenToKeyboard();

  // sorting out obsolete contents before next loop
  Game.gameObjects = Game.gameObjects.filter(function(value, index, arr){
    return value.obsolete == false;
  });

  // updating the objects
  for (var i = 0; i < Game.gameObjects.length; i++) {
    Game.gameObjects[i].update(Game.secondsPassed);
  }

  // check for collisions
  Collision.checkCollisions();

  window.addEventListener('resize', Tools.resizeGame, false);
  window.addEventListener('orientationchange', Tools.resizeGame, false);

  // clear the view from last state
  clearCanvas();

  // draw the current state
  for (var i = 0; i < Game.gameObjects.length; i++) {
    Game.gameObjects[i].draw();
  }

  // draw the engine info
  drawInfo(Game.secondsPassed, Game.secondsPassedTotal);

  // gameRunning is currently set to be always true
  if (gameRunning)
    window.requestAnimationFrame(gameLoop);
}


function clearCanvas(){
  Game.context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawInfo(secondsPassed, secondsPassedTotal) {
  document.getElementById('mainFPS').innerHTML = "FPS:" + Math.round(1/Game.secondsPassed)
  document.getElementById('mainObjCount').innerHTML = "Objects:" + Game.gameObjects.length;
  document.getElementById('mainTimer').innerHTML = "Time:" + Math.round(Game.secondsPassedTotal) + 's';
}
