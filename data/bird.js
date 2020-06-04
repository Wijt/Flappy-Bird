class Bird {
    constructor(x,y) {
        this.pos = {x: x, y: y};
        this.radius = BIRD_R,

        this.live = true;
        this.point = 0;
        this.velocity = 0;
    }

    show(){
        pop();
            fill(color(BIRD_COLOR));
            ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
        push();
    }

    jump(){
        this.velocity = 0;
        this.velocity -= BIRD_JUMP_POWER;
    }

    update() {
        if(this.pos.y < height - GROUND_HEIGHT){
            this.pos.y += this.velocity;
            this.velocity += 0.4;
        }else{
            bird.live = false;
            this.pos.y = height - GROUND_HEIGHT;
        }

        if (this.pos.y < 0){
            bird.live = false;
        }
    }

}