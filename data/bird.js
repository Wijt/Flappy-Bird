class Bird {
    constructor(x,y) {
        this.pos = {x: x, y: y};
        this.live = true;
        this.radius = 25,
        this.point=0;

        this.velocity=0;
    }

    show(){
        pop();
            fill(color('#e43f5a'));
            ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
        push();
    }

    jump(){
        this.velocity = 0;
        this.velocity -= 5;
    }

    update() {
        /*if(this.pos.y < height){
            this.pos.y += this.velocity;
            this.velocity += 0.4;
        }else{
            bird.live=false;
            this.pos.y = height;
        }

        if (this.pos.y < 0){
            bird.live = false;
        }
        console.log(this.point);*/
        this.pos.x = mouseX;
        this.pos.y = mouseY;
    }

}