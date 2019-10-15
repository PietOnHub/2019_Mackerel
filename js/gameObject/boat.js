
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
      this.collision = true;

      this.rho = 1000;
      this.mass = mass;
      this.cw_along = 0.03;
      this.cw_side = 0.2;
      this.cw_rear = 0.2;
      this.area_along = 1;
      this.area_side = 1;
      this.area_rear = 2;

      this.FThrottleMax = 5000;
      this.throttle = 0;
      this.vx_stw = 0;
      this.vy_stw = 0;
      this.valong_stw = 0;
      this.vside_stw = 0;
      this.stw = 0;

      this.orientation = orientation;
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

    areaEffective(maxGlideV, minArea, maxArea) {
      if (this.valong_stw <= maxGlideV) {
        return (maxArea - (this.valong_stw/25) *(maxArea-minArea))
      }
      return (minArea)
    }

    calcAcc() {



      var FW_along = 0.5 * this.cw_along *  this.areaEffective(25, 0.3, 1) * this.rho * this.valong_stw * this.valong_stw;
      var FW_rear = 0.5 * this.cw_rear *  this.area_rear * this.rho * this.valong_stw * this.valong_stw;
      var FW_side = 0.5 * this.cw_side *  this.area_side * this.rho * this.vside_stw * this.vside_stw;


      var FThrottle = this.throttle * this.FThrottleMax;

      if (this.valong_stw >= 0) {
        if (this.vside_stw <=0) {
          var Fy = (FThrottle - FW_along)  * -Math.cos(this.orientation) + FW_side * Math.sin(this.orientation);
          var Fx = (FThrottle - FW_along)  *  Math.sin(this.orientation) + FW_side * Math.cos(this.orientation);
        }
        else {
          var Fy = (FThrottle - FW_along)  * -Math.cos(this.orientation) - FW_side * Math.sin(this.orientation);
          var Fx = (FThrottle - FW_along)  *  Math.sin(this.orientation) - FW_side * Math.cos(this.orientation);
        }
      }
      else {
        if (this.vside_stw <=0) {
          var Fy = (FThrottle + FW_rear) * -Math.cos(this.orientation) + FW_side * Math.sin(this.orientation);
          var Fx = (FThrottle + FW_rear) *  Math.sin(this.orientation) + FW_side * Math.cos(this.orientation);
        }
        else {
          var Fy = (FThrottle + FW_rear) * -Math.cos(this.orientation) - FW_side * Math.sin(this.orientation);
          var Fx = (FThrottle + FW_rear) *  Math.sin(this.orientation) - FW_side * Math.cos(this.orientation);
        }
      }
      document.getElementById('boatOptional').innerHTML = "Fx:" + Fx.toFixed(2) + " Fy:" + Fy.toFixed(2);

      return {x: Fx/this.mass, y: Fy/this.mass};

    }

    calcOrientation () {
      // simple velocity independent and linear change of orientation
      return (this.orientation) + this.rudder * Game.pi / 180 * this.valong_stw * 0.1;
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

      this.vx_stw = this.vx;
      this.vy_stw = this.vy;
      this.orientation = this.calcOrientation();

      this.valong_stw = this.vy_stw * (-Math.cos(this.orientation)) + this.vx_stw * (Math.sin(this.orientation))
      this.vside_stw  = this.vx_stw * (Math.cos(this.orientation))  + this.vy_stw * (Math.sin(this.orientation))

      this.vx = this.calcAcc().x * Game.secondsPassed + this.vx;
      this.vy = this.calcAcc().y * Game.secondsPassed + this.vy;

      this.vx_stw = this.vx;
      this.vy_stw = this.vy;
      this.stw = ((this.vx_stw*this.vx_stw)+(this.vy_stw*this.vy_stw))**(0.5);

      this.x += this.vx * Game.secondsPassed;
      this.y += this.vy * Game.secondsPassed;

    }

    draw(){

      var dx = this.x * Game.scale_m + Game.offset_x;
      var dy = this.y * Game.scale_m + Game.offset_y;

      var spriteWidth = this.sprite.tgtScale * this.sprite.width * Game.scale_m;
      var spriteHeight = this.sprite.tgtScale * this.sprite.height * Game.scale_m;

      if (this.stw > 11)
        Game.scale_m = Game.scale_m * 0.995;
      else if (this.stw < 9)
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
    getX() {
      return this.x;
    }

    getY() {
      return this.y;
    }

}
