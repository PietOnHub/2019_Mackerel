

function createWorld(){
  var spawning;
  startSpawning();
  createBoat();
}


function startSpawning(){

  spawning = setInterval(function(){


      Game.gameObjects.push(new Circle(
        Game.context,
        // xpos init
        Math.random()*20-10,
        // ypos init
        -20,
        // xvel init
        Math.random()*1,
        // yvel init
        Math.random()*4+1,
        // diameter init
        Math.random()*1,
        // fraction
        Math.round(Math.random()+0.0))
        );
      if (Game.gameObjects.length >= 100)
        clearInterval(spawning)
  }, 500);
}

function createBoat() {
  Boat = new BoatClass(
    Game.context,           // ctx
    0,                      // x
    0,                      // y
    0                       // angle
  )
  Game.gameObjects.push(Boat)
}
