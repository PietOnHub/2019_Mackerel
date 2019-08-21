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

  // sorting out obsolete contents before next loop
  Game.gameObjectsCollision = Game.gameObjects.filter(function(value, index, arr){
    return value.obsolete == false && value.collision == true;
  });

  // updating the objects
  for (var i = 0; i < Game.gameObjects.length; i++) {
    Game.gameObjects[i].update(Game.secondsPassed);
  }

  // checking for collisions
  Collision.checkCollisions();

  // checking for window proportions
  Tools.checkWindowResize();

  // clear the view from last state
  Tools.clearCanvas(Game.context, Game.canvas);

  // draw the current state
  for (var i = 0; i < Game.gameObjects.length; i++) {
    Game.gameObjects[i].draw();
  }

  // draw boat
  Boat.draw();

  // draw the engine info
  Tools.drawInfo(Game.secondsPassed, Game.secondsPassedTotal);

  // gameRunning is currently set to be always true
  if (Game.running)
    window.requestAnimationFrame(gameLoop);
};
