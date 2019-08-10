function detectCollisions(){
  var obj1;
  var obj2;

  // Reset collision state of all objects
  for (var i = 0; i < this.gameObjects.length; i++) {
    this.gameObjects[i].isColliding = false;
  }

  // Start checking for collisions
  for (var i = 0; i < gameObjects.length; i++)
  {
    obj1 = gameObjects[i];
    for (var j = i + 1; j < gameObjects.length; j++)
    {

      obj2 = gameObjects[j];

      // Compare object1 with object2
      if (circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)){
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
          var plasticity = 0.8;
          var impulse = (2 * speed / (obj1.mass + obj2.mass) * plasticity);
          obj1.vx -= (impulse * obj2.mass * vCollisionNorm.x);
          obj1.vy -= (impulse * obj2.mass * vCollisionNorm.y);
          obj2.vx += (impulse * obj1.mass * vCollisionNorm.x);
          obj2.vy += (impulse * obj1.mass * vCollisionNorm.y);
        }
      }
    }
  }
}

function circleIntersect(x1, y1, r1, x2, y2, r2){

  var squareDistance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);

  return squareDistance <= ((r1 + r2) * (r1 + r2))
}
