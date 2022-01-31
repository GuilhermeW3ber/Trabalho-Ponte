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
var jointGround;
var jointPixel1, jointPixel2;

var stones = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  jointPixel1=new Base(width - 300, height / 2 + 50, 600, 100, "#8d6e63", true);

  ground = new Base(0, height - 10, width * 2, 20, "#795548", true);
  leftWall = new Base(200, height / 2 + 50, 600, 100, "#8d6e63", true);
  rightWall = new Base(width - 200, height / 2 + 50, 600, 100, "#8d6e63", true);

  bridge = new Bridge(20, { x: width- 470, y: height / 2 + 10});
  jointPoint = new Base(width=480, height / 2 + 10, 40, 20, "#8d6e63", true);
  
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
  }
}
function keyPressed(){
  if(keyCode===32){
    bridge.break();
  }
}