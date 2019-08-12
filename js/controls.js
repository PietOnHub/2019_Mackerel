///////////////////////////////////////////////////////////////////////////////
// Controls
var Controls = {};

Controls.ListenToKeyboard = function(){

  window.addEventListener("keydown", Event.keyDownHandler);

  Controls.keyDownHandler = function(e) {
      if(e.keyCode == 40) {
          Boat.setThrottle(0.0001);
      }
      if(e.keyCode == 38) {
          Boat.setThrottle(-0.0001);
      }
      if(e.keyCode == 37) {
          Boat.setSteer(+0.001);
      }
      if(e.keyCode == 39) {
          Boat.setSteer(-0.001);
      }
  }
};
