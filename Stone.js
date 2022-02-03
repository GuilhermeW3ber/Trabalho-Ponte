class Stone {
  constructor(x, y, w, h) {
    let options ={
      restitution: 0.8
    };

    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    this.cubeImage=loadImage("cube.png");
    this.color = color;
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    strokeWeight(1);
    fill("white");
    imageMode(CENTER);
    image(this.cubeImage, 0, 0, this.w, this.h);
    noStroke();
    pop();
  }
}