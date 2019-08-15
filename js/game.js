//////////////////////////////////////////////
// GAME --------------------------------------

//globals
var Game = {};

Game.g = 9.81;
Game.gameObjects = [];
Game.oldTimeStamp = 0;
Game.secondsPassed = 0;
Game.secondsPassedTotal = 0;
Game.running = false;


Game.init = function() {

  // fitting game to device display
  Tools.resizeGame();

  // set globals to initial state
  Game.gameObjects = [];
  Game.oldTimeStamp = 0;
  Game.secondsPassed = 0;
  Game.secondsPassedTotal = 0;

  // set canvas and context element
  Game.canvas = document.getElementById('canvas');
  Game.context = Game.canvas.getContext('2d');

  // create the world with inital states
  createWorld();

  // start the gameLoop
  Game.running = true;
  window.requestAnimationFrame(gameLoop);
}
