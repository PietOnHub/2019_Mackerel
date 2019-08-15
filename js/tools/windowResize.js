//////////////////////////////////////////////
// GETTING width/height OF WINDOW ------------

Tools.checkWindowResize = function () {
  window.addEventListener('resize', Tools.resizeGame, false);
  window.addEventListener('orientationchange', Tools.resizeGame, false);
};

Tools.resizeGame = function () {

  var gameArea = document.getElementById('wrapper');
  var widthToHeight = ratio;
  var newWidth = window.innerWidth;
  var newHeight = window.innerHeight;
  var newWidthToHeight = newWidth / newHeight;

  if (newWidthToHeight > widthToHeight) {
      newWidth = newHeight * widthToHeight;
      gameArea.style.height = newHeight + 'px';
      gameArea.style.width = newWidth + 'px';
  } else {
      newHeight = newWidth / widthToHeight;
      gameArea.style.width = newWidth + 'px';
      gameArea.style.height = newHeight + 'px';
  }

  gameArea.style.marginBottom = (0) + 'px';
  gameArea.style.marginLeft = (-newWidth / 2) + 'px';

  var viewGame = document.getElementById('viewGame');
  viewGame.width = newWidth;
  viewGame.height = newHeight;
};
