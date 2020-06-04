let bird;
let gravity = 1;

let pipes = [];

let soundEffects = [];

function preload() {
    LoadSounds();
}

function setup(){
    //createCanvas(288,512);
    createCanvas(windowWidth, windowHeight)
    bird = new Bird(100,250);

    pipeCount = width / (PIPE_BETWEEN + PIPE_WIDTH);
    for (let i = 1; i <= pipeCount + 3; i++) {
        new Pipe(width + i * PIPE_BETWEEN + PIPE_WIDTH, random(150, height-150));
    }
}

function LoadSounds(){
    soundEffects.push(loadSound('data/sound/sfx_point.wav'));
    soundEffects.push(loadSound('data/sound/sfx_die.wav'));
    soundEffects.push(loadSound('data/sound/sfx_hit.wav'));
    soundEffects.push(loadSound('data/sound/sfx_swooshing.wav'));
    soundEffects.push(loadSound('data/sound/sfx_wing.wav'));
}







function draw(){
    pop();
        background(color(BG_COLOR));
    push();

    pipes.forEach(element => {
        element.show();
    });

    pop();
        fill(color(GROUND_COLOR));
        rect(0, height - GROUND_HEIGHT, width, GROUND_HEIGHT);
    push();

    bird.show();


    pop();
        textAlign(CENTER);
        fill(255);
        textSize(30);
        text(bird.point, width/2,40);
    push();

    update();
}

function update() {
    bird.update();
    if(bird.live){
        pipes.forEach(element => {
            element.update();
            if (element.isCollide(bird)){
                bird.live = false;
                try { soundEffects[2].play(); } catch(e) {}
                console.warn("ÇARPTI");
                try { soundEffects[1].play(); } catch(e) {}
            }
            if (element.pos.x <= bird.pos.x && element.hasPoint){
                element.hasPoint = false;
                try { soundEffects[0].play(); } catch(e) {}
                bird.point++;
            }
        });
    }
}

function mouseReleased(){
    if (bird.live){
        bird.jump();
        try { soundEffects[4].play(); } catch(e) {}
    }
}





function isInside(pos, rect){
    return pos.x >= rect.x1 && pos.x <= rect.x2  &&  pos.y >= rect.y1 && pos.y <= rect.y2;
}

function circleRect(bird, rect) {
    // temporary variables to set edges for testing
    let testX = bird.pos.x;
    let testY = bird.pos.y;
  
    // which edge is closest?
    if (bird.pos.x < rect.x1)       testX = rect.x1;      // test left edge
    else if (bird.pos.x > rect.x2)  testX = rect.x2;   // right edge
    if (bird.pos.y < rect.y1)       testY = rect.y1;      // top edge
    else if (bird.pos.y > rect.y2)  testY = rect.y2;   // bottom edge
  
    // get distance from closest edges
    let distX = bird.pos.x - testX;
    let distY = bird.pos.y - testY;
    let distance = sqrt((distX*distX) + (distY*distY));
    // if the distance is less than the bird.radius, collision!
    if (distance <= bird.radius-5) {
      return true;
    }
    return false;
}