var gameObjects = [];

function createWorld(){

    for (var i = 0; i <= 1000; i++) {
      gameObjects.push(new Circle(
        context,
        Math.random()*canvas.width,
        Math.random()*100,
        Math.random()*100-50,
        Math.random()*100-50,
        Math.random()*10+1)
        );
    }
}
