class BoatClass extends GameObject
{
    constructor (context, x, y, vx, vy, radius, fraction){
        super(context, x, y, vx, vy, fraction);

        //Set default width and height
        this.radius = radius;
        this.mass = Math.PI*radius*radius;
        this.throttle = 0;
        this.angle = 0;
    }


    setThrottle(val){
      this.throttle += val;
      this.vx +=  this.throttle*Math.sin(2*this.angle/Math.PI);
      this.vy +=  this.throttle*Math.cos(2*this.angle/Math.PI);
    }

    getThrottle (){
      return this.throttle;
    }

    setSteer(val){
      this.angle += val;
    }



    draw(){

        this.color = 'rgba(100,100,100,0.5)';

        //Draw a simple square
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        this.context.fill();
    }

    update(secondsPassed){

      //Move with set velocity
      this.x += this.vx * secondsPassed;
      this.y += this.vy * secondsPassed;

    }
}
