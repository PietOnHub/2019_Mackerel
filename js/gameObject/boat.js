
var Images = {};
Images.Boat = new Image();
Images.Boat.src = 'media/boat.png';

class BoatClass extends GameObject
{
    constructor (context, x, y, orientation){

      var mass = 1000;

      super(
        context,
        x,                      // x
        y,                      // y
        0,                      // vx
        0,                      // vy
        mass,  // mass
        2                       // fraction
      );

      this.radius = 3;
      this.cw = 0.03;
      this.rho = 1000;
      this.mass = mass;

      this.F_throttleMax = 5000;
      this.throttle = 0;

      this.orientation = orientation;
      this.stw = 0;
      this.rudder = 0;

      this.sprite = Images.Boat;
      this.sprite.tgtHeight = 7.5;

      this.strength = 0.2;

      this.sprite.tgtScale =  this.sprite.tgtHeight / this.sprite.height;
    }

    setThrottle(val){
      this.throttle += val;
      this.throttle >= 1 ? this.throttle=1 :this.throttle;
      this.throttle <= -1 ? this.throttle=-1 :this.throttle;
      //console.log(this.throttle);
    }

    setRudder(val){
      this.rudder += val
      this.rudder >= 1 ? this.rudder=1 :this.rudder;
      this.rudder <= -1 ? this.rudder=-1 :this.rudder;
    }

    calcSTW() {

      var A = function (stw) {
        if (stw <= 25) {
          return (1 - (stw/25) *0.7)
        }
        return (0.3)
      }

      var F_w = 0.5 * this.cw *  A(this.stw) * this.rho * this.stw * this.stw;
      var F_throttle = this.throttle * this.F_throttleMax;

      if (this.stw >= 0) {
        var a_res = (F_throttle - F_w) / this.mass;
      }
      else {
        var a_res = (F_throttle + F_w) / this.mass;
      }
      document.getElementById('boatFW').innerHTML = "FW:" + F_w.toFixed(2);
      document.getElementById('boatFTh').innerHTML = "F_throttle:" + F_throttle.toFixed(2);
      document.getElementById('boatA').innerHTML = "a_res:" + a_res.toFixed(2);
      return a_res * Game.secondsPassed + this.stw;

    }

    calcOrientation () {
      // simple velocity independent and linear change of orientation
      return (this.orientation) + this.rudder * Game.pi / 180;
    }

    update(secondsPassed){

      if (Key.isDown(Key.UP))
        this.setThrottle(0.02);

      if (Key.isDown(Key.DOWN))
        this.setThrottle(-0.02);

      if (Key.isDown(Key.LEFT))
        this.setRudder(-0.02);

      if (Key.isDown(Key.RIGHT))
        this.setRudder(0.02);

      if (Key.isDown(Key.T))
        this.throttle = 0;

      if (Key.isDown(Key.R))
          this.rudder = 0;

      if (Key.isDown(Key.PGUP))
        Game.scale_m = Game.scale_m * 1.1;

      if (Key.isDown(Key.PGDWN))
        Game.scale_m = Game.scale_m * 1/1.1;


      this.stw = -this.vy;
      this.stw = this.calcSTW();
      this.orientation = this.calcOrientation();

      this.vy = -this.stw;

      this.x += this.vx * Game.secondsPassed;
      this.y += this.vy * Game.secondsPassed;

    }

    draw(){

      var dx = this.x * Game.scale_m + Game.offset_x;
      var dy = this.y * Game.scale_m + Game.offset_y;

      var spriteWidth = this.sprite.tgtScale * this.sprite.width * Game.scale_m;
      var spriteHeight = this.sprite.tgtScale * this.sprite.height * Game.scale_m;

      if (dy+spriteHeight/2>=0.75*Game.canvas.height || dy-spriteHeight/2<=0.25*Game.canvas.height)
        Game.scale_m = Game.scale_m * 0.995;
      else if (dy+spriteHeight/2<=0.6*Game.canvas.height || dy-spriteHeight/2>=0.40*Game.canvas.height)
        Game.scale_m = Game.scale_m * 1.005;

      if (Game.scale_m >= Game.scale_m_max)
        Game.scale_m = Game.scale_m_max;
      if (Game.scale_m <= Game.scale_m_min)
        Game.scale_m = Game.scale_m_min;

      dx = this.x * Game.scale_m + Game.offset_x;
      dy = this.y * Game.scale_m + Game.offset_y;
      var dradius = this.radius * Game.scale_m;

      spriteWidth = this.sprite.tgtScale * this.sprite.width * Game.scale_m;
      spriteHeight = this.sprite.tgtScale * this.sprite.height * Game.scale_m;


      this.color = 'rgba(100,100,255,'+ this.strength +')';
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.arc(dx, dy, dradius, 0, 2*Game.pi);
      this.context.rect(-Game.bordersize* Game.scale_m + Game.offset_x, -Game.bordersize* Game.scale_m + Game.offset_y, 2*Game.bordersize* Game.scale_m, 2*Game.bordersize* Game.scale_m);
      this.context.fill();

      this.context.translate(dx, dy);
      this.context.rotate(+this.orientation);
      this.context.translate(-dx, -dy);
      this.context.drawImage(this.sprite, dx-spriteWidth/2, dy-spriteHeight/2, spriteWidth, spriteHeight);
      this.context.translate(dx, dy);
      this.context.rotate(-this.orientation);
      this.context.translate(-dx, -dy);

      document.getElementById('boatThrottle').innerHTML = "Throttle:" + this.throttle.toFixed(2);
      document.getElementById('boatSTW').innerHTML = "STW:" + this.stw.toFixed(2);
      document.getElementById('boatRudder').innerHTML = "Rudder:" + this.rudder.toFixed(2);
      document.getElementById('boatOrientation').innerHTML = "Orientation:" + ((this.orientation*180/Game.pi)%360).toFixed(2);

    }

}
