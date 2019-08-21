class Bubble extends GameObject
{
    constructor (context, x, y, vx, vy, radius, fraction){
      super(
        context,
        x,                      // x
        y,                      // y
        0,                     // vx
        0,                     // vy
        0,              // mass
        9                // fraction
      );

      this.radius = 1;
      this.obsolete = false;
      this.strength = 0.1;
    }

    update(secondsPassed){

      this.radius += 0.02;
      this.strength -= 0.0001;
      if (this.radius > 50){
        this.obsolete = true;
      }

      //Apply acceleration
      //this.vy += 9.81 * secondsPassed;
      //Move with set velocity
      this.x += this.vx * secondsPassed;
      this.y += this.vy * secondsPassed;
    }

    draw(){

      var dx = this.x * Game.scale_m + Game.offset_x ;
      var dy = this.y * Game.scale_m + Game.offset_y ;
      var dradius = this.radius * Game.scale_m;

        //Draw a simple square
        this.color = 'rgba(50,100,83,'+this.strength + ')';

        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(dx, dy, dradius, 0, 2 * Game.pi);
        this.context.fill();
    }

}
