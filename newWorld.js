var gameObjects = [];

function createWorld(){

    for (var i = 0; i <= 100; i++) {
      gameObjects.push(new Square(context, Math.random()*300, Math.random()*300, Math.random()*50, Math.random()*50));
    }
}
