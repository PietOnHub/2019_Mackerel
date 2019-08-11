var gameObjects = [];
var plasticity = 0.8;



function createWorld(){

  var spawning;
  startSpawning();

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

function stopSpawning() {
  clearInterval(spawning)
}
