const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var balloon;
var position;

function preload() {
      bg = loadImage("bg.png"); 
      //balloonImage = loadAnimation("balloon1.png , balloon2.png , balloon3.png");
      balloonImage = loadAnimation("Ballon1.png" , "Ballon2.png" , "Ballon3.png"); 
}

function setup(){
    database = firebase.database();
    var balloonPosition = database.ref("ball/position");
    balloonPosition.on("value",readPosition,showError);
    createCanvas(1300,600);
    //engine = Engine.create();
    //world = engine.world;
   
    balloon = createSprite(100,450);
    balloon.addAnimation("balloonImage",balloonImage);
    balloon.scale = 0.5;

}

function draw(){
  
    background(bg);
    if(position){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
    }
   // Engine.update(engine);
    drawSprites();
    
}
function writePosition(x,y){
    database.ref("balloon/position").set({
     "x": position.x+x,
     "y": position.y+y
    })
    
}
function readPosition(data){
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
}
function showError(){
    console.log("error in database");
}