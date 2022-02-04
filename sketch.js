const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var winston;
var loranjaImg

var stones = [];

function preload(){
  loranjaImg=loadImage("laranja.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  winston=createSprite(100, windowHeight-50,50,50);
  winston.velocityX=10;
  winston.addImage(loranjaImg);
  winston.scale=0.15
  winston.rotationSpeed=10

  ground = new Base(0, height - 10, width * 2, 20, "#D3D3D3", true);
  leftWall = new Base(300, height / 2 + 50, 600, 100, "#D3D3D3", true);
  rightWall = new Base(width - 300, height / 2 + 50, 600, 100, "#D3D3D3", true);

  bridge = new Bridge(15, { x: width / 2 - 400, y: height / 2 });
  jointPoint = new Base(width - 600, height / 2 + 10, 40, 20, "#0000FF", true);

  Matter.Composite.add(bridge.body, jointPoint);

  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 140);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }

}

function draw() {
  background(51);
  Engine.update(engine);

  ground.show();
  bridge.show();
  leftWall.show();
  rightWall.show();

  for (var stone of stones) {
    stone.show();
    var pos = stone.body.position;
    
    var distance = dist(winston.position.x, winston.position.y, pos.x, pos.y);

    if (distance <= 50) {
      winston.velocityX = 0;
      winston.rotationSpeed=0;
      Matter.Body.setVelocity(stone.body, { x: 10, y: -10 });
      winston.changeImage("sad");
      collided = true;
    }
  }

  if(winston.x>windowWidth-100){
    winston.velocityX=-10;
    winston.rotationSpeed=-10
  }

  if(winston.x<100){
    winston.velocityX=10;
    winston.rotationSpeed=10
  }

  drawSprites();
}

function keyPressed(){
  if(keyCode===32){
    jointLink.detach();

  }
}
