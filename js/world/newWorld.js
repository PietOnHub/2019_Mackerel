

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
        Math.random()*100-50,
        // ypos init
        Math.random()*(-30)-20,
        // xvel init
        Math.random()*1,
        // yvel init
        Math.random()*4+1,
        // diameter init
        Math.random()*5,
        // fraction
        Math.round(Math.random()+0.0))
        );
      if (Game.gameObjectsCollision.length >= 100)
        clearInterval(spawning)
  }, 1000);
}

function createBoat() {
  Boat = new BoatClass(
    Game.context,           // ctx
    0,                      // x
    0,                      // y
    0                       // angle
  )
  Game.gameObjects.push(Boat)

  setInterval(function(){
    Game.gameObjects.push(new Bubble(
      Game.context,           // ctx
      Boat.x,                 // x
      Boat.y,                 // y
      0,
      0
    ));},200);

}
