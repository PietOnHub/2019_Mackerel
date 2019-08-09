

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

class Square extends GameObject
{
    constructor (context, x, y, vx, vy){
        super(context, x, y, vx, vy);

        //Set default width and height
        this.width = 20;
        this.height = 20;
    }


    draw(){
        //Draw a simple square
        this.context.fillStyle = this.isColliding?'#ff8080':'#0099b0';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update(secondsPassed){
        //Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;
    }
}