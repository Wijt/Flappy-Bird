class Bird {
    constructor(x,y) {
        this.pos = {x: x, y: y};
        this.live = true;
        this.radius = BIRD_R,
        this.point = 0;

        this.velocity = 0;
    }

    show(){
        pop();
            fill(BIRD_COLOR);
            ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
        push();
    }

    jump(){
        this.velocity = 0;
        this.velocity -= 6;
    }

    update() {
        if(this.pos.y < height-25){
            this.pos.y += this.velocity;
            this.velocity += 0.4;
        }else{
            bird.live=false;
            this.pos.y = height-25;
        }

        if (this.pos.y < 0){
            bird.live = false;
        }
    }

}