var railway, railwayimg;
var boy, boyImg;
var ob1img, ob2img, ob3img;
var obstacle;
var coin,coinimg;
var obstacleG;
var END = 0;
var PLAY = 1;
var gameState = 1;
 var treasureCollection=0;
 var coinG;
var end, endimg;
var gameSound;

function preload() {
  railwayimg = loadImage("railway - Copy.png");
  boyImg = loadAnimation("Runner-1.png", "Runner-2.png");
  ob1img = loadImage("cactus.png");
  ob2img = loadImage("obstacle1.png");
  ob3img = loadImage("obstacle2.png");
  coinimg=loadImage("diamonds.png");
  endimg=loadImage("over.png");
  gameSound=loadSound("play_hard_remix.mp3");
}

function setup() {
  createCanvas(400, 500);
  railway = createSprite(202, 250, 10, 10);
  railway.addImage("railway", railwayimg);
  railway.velocityY = 3;
  railway.scale = 0.9;

  //creating boy running
  boy = createSprite(70, 330, 20, 20);
  boy.addAnimation("Running", boyImg);
  boy.scale = 0.08;
 obstacleG= new Group();
  coinG=new Group();
  boy.setCollider("rectangle", 0, 0, 900, 1000);
  boy.debug=true;
  gameSound.loop();
  
 
}

function draw() {
  background("grey");
   boy.x = World.mouseX;
 
  if (railway.y > 500) {
    railway.y = 400;
  }
   if (gameState === PLAY) {
    
  spawncoin();
  spawnObstacle();
  }
     
  
  if (gameState === END) {
   
    end=createSprite(250,250,10,10);
    end.addImage("end",endimg);
   railway.VelocityY = 0;
    boy.VelocityY = 0;
    coinG.setVelocityYEach(0);
    obstacleG.setVelocityYEach(0);
    gameSound.pause();
     
     
  }
 
 
  if (obstacleG.isTouching(boy)) {
    gameState = END;
obstacleG.destroyEach();
   railway.velocityY=0;
  }
   if (coinG.isTouching(boy)) {
    treasureCollection = treasureCollection + 50
  }
  if (coinG.isTouching(boy)) {
   coinG.destroyEach();
  } else if (obstacleG.isTouching(boy)) {
    obstacleG.destroyEach();}

  
   
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection, 150, 30);
}

function spawnObstacle() {
  if (frameCount % 80 == 0) {
    obstacle = createSprite(150, 250, 10, 10);
    obstacle.scale=0.3;
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        obstacle.addImage("obstacle", ob1img);
         obstacle.scale=0.03;
        break;
      case 2:
        obstacle.addImage("obstacle", ob2img);
         obstacle.scale=0.1;
        break;
      case 3:
        obstacle.addImage("obstacle", ob3img);
         obstacle.scale=0.1;
        break;
     
       
      default:
        break;
    }
    
     obstacle.x = Math.round(random (50, 340));
    obstacle.velocityY=3;
    obstacle.setLifetime=100;
    obstacleG.add(obstacle);
  }
}
function spawncoin() {
  if (frameCount % 60 == 0) {
    coin= createSprite(150, 250, 10, 10);
    coin.addImage("coin",coinimg);
 coin.x = Math.round(random (60, 380));
   coin.scale=0.05;
 coin.velocityY=3; 
   coin.setLifetime=100;
    coinG.add(coin);
  }
}