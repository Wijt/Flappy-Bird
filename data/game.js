let bird;
let gravity = 1;

let pipes = [];

function setup(){
    //createCanvas(288,512);
    createCanvas(windowWidth,windowHeight)
    bird = new Bird(100,250);
    pipeCount = windowWidth/150;
    for (let i = 1; i <= pipeCount+1; i++) {
        new Pipe(width + i*200, random(150, height-150));
    }
    /*new Pipe(width + 100, 250);
    new Pipe(width + 300, random(150, height-150));*/
}

function draw(){
    pop();
        background(color("#1b1b2f"));
    push();
    pipes.forEach(element => {
        element.show();
    });
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
        });
    }
    pipes.forEach(element => {
        if (element.isCollide(bird)){
            bird.live = false;
            console.log("ÇARPTI");
        }
        if (element.pos.x <= bird.pos.x && element.hasPoint){
            element.hasPoint = false;
            bird.point++;
        }
    });
    if (mouseIsPressed)
        bird.jump();
}


function isInside(pos, rect){
    return pos.x >= rect.x1 && pos.x <= rect.x2  &&  pos.y >= rect.y1 && pos.y <= rect.y2;
}

function circleRect(bird, rect) {
    // temporary variables to set edges for testing
    let testX = bird.pos.x;
    let testY = bird.pos.y;
  
    // which edge is closest?
    if      (bird.pos.x < rect.x1)           testX = rect.x1;      // test left edge
    else if (bird.pos.x > rect.x2)          testX = rect.x2;   // right edge
    if      (bird.pos.y < rect.y1)           testY = rect.y1;      // top edge
    else if (bird.pos.y > rect.y2)          testY = rect.y2;   // bottom edge
  
    // get distance from closest edges
    let distX = bird.pos.x - testX;
    let distY = bird.pos.y - testY;
    let distance = sqrt((distX*distX) + (distY*distY));
    console.log(distance, bird.radius);
    // if the distance is less than the bird.radius, collision!
    if (distance <= bird.radius-5) {
      return true;
    }
    return false;
}