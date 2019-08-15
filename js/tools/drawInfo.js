//////////////////////////////////////////////
// UPDATING THE INFO HEADER WITH STATS -------

Tools.drawInfo = function (secondsPassed, secondsPassedTotal) {
  document.getElementById('mainFPS').innerHTML = "FPS:" + Math.round(1/Game.secondsPassed)
  document.getElementById('mainObjCount').innerHTML = "Objects:" + Game.gameObjects.length;
  document.getElementById('mainTimer').innerHTML = "Time:" + Math.round(Game.secondsPassedTotal) + 's';
}
