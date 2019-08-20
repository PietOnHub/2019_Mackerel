//////////////////////////////////////////////
// CONTROLS ----------------------------------

var Controls = {};

var Key = {

  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  R: 82,
  T: 84,
  PGUP: 33,
  PGDWN: 34,

  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};


Controls.listenToKeyboard = function(){
  window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
  window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
};
