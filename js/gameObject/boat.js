
class BoatClass extends GameObject
{
    constructor (context, x, y, orientation){

      var radius = 40;

      super(
        context,
        x,                      // x
        y,                      // y
        0,                      // vx
        0,                      // vy
        1000,  // mass
        2                       // fraction
      );

      this.radius = radius;
      this.orientation = orientation;

      this.throttle = 0;
      this.stw = 0;
      this.rudder = 0;

      this.sprite = new Image();
      this.sprite.src = 'media/boat.png';
      this.sprite.tgtHeight = 7.5;

      this.strength = 0.2;

      this.sprite.scale =  this.sprite.tgtHeight / this.sprite.height;
      this.sprite.gameWidth = this.sprite.scale * this.sprite.width * Unit.scale_m;
      this.sprite.gameHeight = this.sprite.scale * this.sprite.height * Unit.scale_m;
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

      var rho = 1000;
      var cw = 0.03;
      var F_throttleMax = 5000;

      var A = function (stw) {
        if (stw <= 25) {
          return (1 - (stw/25) *0.7)
        }
        return (0.3)
      }

      var F_w = 0.5 * cw *  A(this.stw) * rho * this.stw * this.stw;
      var F_throttle = this.throttle * F_throttleMax;

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


    draw(){

        this.color = 'rgba(100,100,255,'+ this.strength +')';
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        this.context.fill();

        this.context.translate(+this.x, +this.y);
        this.context.rotate(+this.orientation);
        this.context.translate(-this.x, -this.y);
        this.context.drawImage(this.sprite, this.x-this.sprite.gameWidth/2, this.y-this.sprite.gameHeight/2, this.sprite.gameWidth, this.sprite.gameHeight);
        this.context.translate(+this.x, +this.y);
        this.context.rotate(-this.orientation);
        this.context.translate(-this.x, -this.y);
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

      if (Key.isDown(Key.t))
        this.throttle = 0;

      if (Key.isDown(Key.r))
          this.rudder = 0;



      this.stw = -this.vy;


      this.stw = this.calcSTW();
      this.orientation = this.calcOrientation();

      this.vy = -this.stw;


      //Move with set velocity

      this.x += this.vx * Game.secondsPassed * Unit.scale_m;
      this.y += this.vy * Game.secondsPassed * Unit.scale_m;



      document.getElementById('boatThrottle').innerHTML = "Throttle:" + this.throttle.toFixed(2);
      document.getElementById('boatSTW').innerHTML = "STW:" + this.stw.toFixed(2);
      document.getElementById('boatRudder').innerHTML = "Rudder:" + this.rudder.toFixed(2);
      document.getElementById('boatOrientation').innerHTML = "Orientation:" + ((this.orientation*180/Game.pi)%360).toFixed(2);
    }
}
