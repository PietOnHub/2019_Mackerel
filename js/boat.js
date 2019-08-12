class BoatClass extends GameObject
{
    constructor (context, x, y, vx, vy, radius, fraction){
        super(context, x, y, vx, vy, fraction);

        //Set default width and height

        this.radius = radius;
        this.mass = Math.PI*radius*radius;
        this.throttle = 0;
        this.angle = 0;
        this.strength = 0.2;
    }


    setThrottle(val){
      this.vy += val
    }

    getThrottle (){
      return this.throttle;
    }

    setSteer(val){
      this.vx += val
    }


    draw(){



        this.color = 'rgba(100,100,255,'+ this.strength +')';

        //Draw a simple square
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        this.context.fill();
    }

    update(secondsPassed){

      if (Key.isDown(Key.UP))
        this.setThrottle(-5);
      else if (Key.isDown(Key.DOWN))
        this.setThrottle(5);

      if (Key.isDown(Key.LEFT))
        this.setSteer(-5);
      else if (Key.isDown(Key.RIGHT))
        this.setSteer(5);

      //Move with set velocity
      this.x += this.vx * secondsPassed;
      this.y += this.vy * secondsPassed;
      console.log(this.strength)
      console.log(this.mass)

    }
}
