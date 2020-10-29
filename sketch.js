var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running, monkey_collided;
var ground, invisibleground, groundImage;

var bananaGroup, bananaImg;
var obstacleGroup,obstacleImg;

var surviveltime;
var score;


function preload(){
  

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaGroupImage = loadImage("banana.png");
  obstacleGroupImage = loadImage("obstacle.png");
  
}

function setup() {
  createCanvas(800 ,200);
   
  monkey = createSprite(50,height-25,20,50);
  monkey.addAnimation("moving", monkey_running);

  monkey.scale = 0.1;
  
  ground = createSprite(width/2,height-20,width,2);
  ground.velocityX=-4;
  ground.x = ground.width /2;
 // console.log(ground.x)
  
 invisibleGround = createSprite(width/2,height-10,width,10);
  invisibleGround.visible = false; 

obstacleGroup=new Group();
  bananaGroup=new Group();
  
 surviveltime = 0;
  score=0;
  stroke("white");
  textSize(15);
  fill("white");
 
  
  stroke("black");
  textSize(15);
  fill("black");
 
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Surviveltime: "+ surviveltime, 180,80);
  //console.log(monkey.y);
   monkey.collide(invisibleGround);
  
  if(gameState === PLAY){
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 154) {
        monkey.velocityY = -12;
        
    }
     
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.6
    
     text("Score:"+score,500,50);
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
     spawnBananas();
    spawnObstacles();
    
     surviveltime=Math.ceil(frameCount/getFrameRate())
 // text("survivel time:"+surviveltime,180,80);
  
    
    //spawn obstacles on the ground
    
    
    if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
    }
      
          if(bananaGroup.isTouching(monkey)){
   bananaGroup.destroyEach();
   score=score +5;
 }


        
      
    
  }
   else if (gameState === END) {
         
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach=0;
     bananaGroup.setVelocityXEach=0;    
   }
  
drawSprites();
  

    }


function spawnObstacles(){
 if (frameCount % 100 === 0){
   var Obstacle = createSprite(400,165,10,40);
   Obstacle.addImage(obstacleGroupImage);
    //assign scale and lifetime to the obstacle           
     Obstacle.scale= 0.1;
   Obstacle.lifetime=300;
   Obstacle.velocityX = -6;
    
   //add each obstacle to the group
   obstacleGroup.add(Obstacle);
    
 }
}

function  spawnBananas(){
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaGroupImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananaGroup.add(banana);
    
    //add each cloud to the group
  }
 
}



