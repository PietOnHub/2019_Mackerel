
//Set gravitational acceleration
 var g = 9.81;

class GameObject
{
    constructor (context, x, y, vx, vy){
        this.context = context;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;

        this.isColliding = false;
    }
}

class Circle extends GameObject
{
    constructor (context, x, y, vx, vy, radius){
        super(context, x, y, vx, vy);

        //Set default width and height
        this.radius = radius;
        this.mass = Math.PI*radius*radius;
    }


    draw(){
        //Draw a simple square
        this.context.fillStyle = this.isColliding?'#ff8080':'#0099b0';
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        this.context.fill();
    }

    update(secondsPassed){

      //Apply acceleration
      this.vy += g * secondsPassed;
      //Move with set velocity
      this.x += this.vx * secondsPassed;
      this.y += this.vy * secondsPassed;
    }
}
