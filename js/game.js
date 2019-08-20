//////////////////////////////////////////////
// GAME --------------------------------------

//globals
var Game = {};

Game.g = 9.81;
Game.pi = Math.PI;
Game.gameObjects = [];
Game.oldTimeStamp = 0;
Game.secondsPassed = 0;
Game.secondsPassedTotal = 0;
Game.running = false;
Game.bordersize = 50;

Game.scale_m = 20;


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

  Game.offset_x = Game.canvas.width/2;
  Game.offset_y = Game.canvas.height/2;

  // create the world with inital states
  createWorld();

  // start the gameLoop
  Game.running = true;
  window.requestAnimationFrame(gameLoop);
}
