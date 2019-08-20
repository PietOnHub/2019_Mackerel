

function createWorld(){
  var spawning;
  startSpawning();
  createBoat();
}


function startSpawning(){

  spawning = setInterval(function(){

      var radius = (Math.random()**2)*17+3;

      Game.gameObjects.push(new Circle(
        Game.context,
        // xpos init
        Math.random()*200+(Game.canvas.width/2)-100,
        // ypos init
        -radius,
        // xvel init
        Math.random()*20-10,
        // yvel init
        Math.random()*0,
        // diameter init
        radius,
        // fraction
        Math.round(Math.random()+0.0))
        );
      if (Game.gameObjects.length >= 100)
        clearInterval(spawning)
  }, 200);
}

function createBoat() {
  Boat = new BoatClass(
    Game.context,           // ctx
    Game.canvas.width/2,    // x
    Game.canvas.height/2,   // y
    0                       // angle
  )
  Game.gameObjects.push(Boat)
}
