//////////////////////////////////////////////
// COLISSION ---------------------------------

var Collision = {};

Collision.checkCollisions = function(){

  // left kinematic energy after contact
  var plasticity = 0.8;

  // Reset collision state of all objects
  for (var i = 0; i < Game.gameObjects.length; i++) {
    Game.gameObjects[i].isColliding = false;
  }

  Collision.detectCollisionsObjects(plasticity);
  Collision.detectColissionsGround(plasticity);
  Collision.detectColissionsSide(plasticity);
}

Collision.detectCollisionsObjects = function(plasticity){

  var obj1;
  var obj2;

  // Start checking for collisions
  for (var i = 0; i < Game.gameObjects.length; i++)
  {
    obj1 = Game.gameObjects[i];
    for (var j = i + 1; j < Game.gameObjects.length; j++)
    {

      obj2 = Game.gameObjects[j];

      // Compare object1 with object2
      if (Collision.circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)){
        obj1.isColliding = true;
        obj2.isColliding = true;

        var vCollision = {x: obj2.x - obj1.x, y: obj2.y - obj1.y};
        var distance = ((obj2.x-obj1.x)*(obj2.x-obj1.x) + (obj2.y-obj1.y)*(obj2.y-obj1.y))**0.5;
        var vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
        var vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};
        var speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

        if (speed < 0){
            break;
        }
        else {
          var impulse = (2 * speed / (obj1.mass + obj2.mass) * plasticity);
          obj1.vx -= (impulse * obj2.mass * vCollisionNorm.x);
          obj1.vy -= (impulse * obj2.mass * vCollisionNorm.y);
          obj2.vx += (impulse * obj1.mass * vCollisionNorm.x);
          obj2.vy += (impulse * obj1.mass * vCollisionNorm.y);
        }
        if (obj1.fraction != obj2.fraction){
          if (obj1.mass < obj2.mass)
          {
            obj1.radius = obj1.radius - 0.01 * obj2.radius**0.5;
            obj2.mass = obj2.mass + 0.05 * Math.PI * obj2.radius**2;
            obj2.strength += 0.05;

          }
          else if (obj1.mass >= obj2.mass)
          {
            obj2.radius = obj2.radius - 0.01 * obj1.radius**0.5;
            obj1.mass = obj1.mass + 0.05 * Math.PI* obj1.radius**2;
            obj1.strength += 0.05;
          }
        }
      }
    }
  }
}

Collision.detectColissionsGround = function(plasticity){
  var obj1;
  for (var i=0; i< Game.gameObjects.length; i++) {
    obj1 = Game.gameObjects[i];
    if (obj1.y + obj1.radius >= canvas.height) {
      obj1.vy = (-plasticity) * obj1.vy;
    };
  }
}

Collision.detectColissionsSide = function(plasticity){
  var obj1;
  for (var i=0; i< Game.gameObjects.length; i++) {
    obj1 = Game.gameObjects[i];
    if (obj1.x + obj1.radius >= canvas.width || obj1.x - obj1.radius <= 0) {
      obj1.vx = (-plasticity) * obj1.vx;
    }
  }
}

Collision.circleIntersect = function(x1, y1, r1, x2, y2, r2){
  var squareDistance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);
  return squareDistance <= ((r1 + r2) * (r1 + r2))
}
