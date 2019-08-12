
var Boat = {};

function createWorld(){
  var spawning;
  startSpawning();
  createBoat();
}

function checkSpawnEnd(){
  if (gameObjects.length >= 1000)
    stopSpawning();
}

function startSpawning(){

  spawning = setInterval(function(){

      var radius = (Math.random()**2)*17+3;

      gameObjects.push(new Circle(
        context,
        // xpos init
        Math.random()*200+(canvas.width/2)-100,
        // ypos init
        -radius,
        // xvel init
        Math.random()*20-10,
        // yvel init
        Math.random()*0,
        // diameter init
        radius,
        // fraction
        Math.round(Math.random()+0.1))
        );
  }, 100);
}

function createBoat() {
  Boat = new BoatClass(
    context,
    // xpos init
    canvas.width/2,
    // ypos init
    canvas.height/2,
    // xvel init
    0,
    // yvel init
    0,
    // diameter init
    40,
    // fraction
    2
  )
  gameObjects.push(Boat)
}


function stopSpawning() {
  clearInterval(spawning)
}
