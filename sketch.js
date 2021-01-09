
var monkey , monkey_running,monkeyImage,monkey_collied;
var banana ,bananaImage, obstacle,obstacleImage,obstacleSpawn;
var FoodGroup, obstacleGroup
var score
var ground,groundImage;
var survivalTime = 0
var gameState = PLAY;
var PLAY = 1;
var END;

function preload(){
  
  
  monkey_running= loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
    
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 monkeyImage = loadImage("monkey_0.png")
}



function setup() {

createCanvas(500,500);
  
monkey=createSprite(80,315,20,20)  
monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;

  
ground=createSprite(400,350,900,10);
ground.x=ground.width/2;
ground.velocityX = -4;
console.log(ground.x);
  
 SurvivalTime= 0;
score= 0

//creating groups
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  
  monkey.debug = false
  

}


function draw() {

 background("white")

  
if(ground.x<0) {
  ground.x = ground.width /2;

}

  if(keyDown("space")&& monkey.y >= 100){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  stroke("black");
  textSize(10);
  fill("black");
  text("Score: "+ score, 400,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100,50);
  
 spawnbanana();
spawnObstacle();
  
 if (monkey.isTouching(bananaGroup)){
   score=score +1;
   
 }
 if (monkey.isTouching(obstacleGroup)){
   score = 0;
   SurvivalTime= 0;
   obstacleGroup.destroyEach();
   bananaGroup.destroyEach();
   monkey.velocityY = 0;
   ground.velocityX = 0;
 } 
  if (monkey.isTouching(obstacleGroup)){
    monkey.velocityY= 0;
    ground.velocityX= 0;
    survivalTime= 0;
  }
  
  
  
drawSprites();
}

function spawnbanana(){  
  if (frameCount % 80 === 0){
  banana=createSprite(400,200,20,20);
    banana.y = Math.round(random(120,200));
  banana.velocityX = -5
  banana.addImage(bananaImage) 
  banana.scale=0.1
  banana.lifetime = 150;
  bananaGroup.add(banana);
  }
}
function spawnObstacle(){
  if (frameCount % 200 === 0){
  obstacle=createSprite(400,330,20,20)
  obstacle.velocityX = -3;
  obstacle.addImage("obstacle",obstacleImage);
  obstacle.scale= 0.1;
  obstacle.lifetime = 150;
  obstacleGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  score= 0;
  SurvivalTime= 0;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  
}

  

  







