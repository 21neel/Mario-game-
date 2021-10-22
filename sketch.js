var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mario, mario_running, mario_collided;
var ground, invisibleGround, groundImage;

var pipe, pipeGroup, pipeImg;
var brick, brickGroup, brickImg;
var enemy, enemyGroup, enemyImg;

var gameover;
var gameoverImg;
var restart;
var restartImg;

var score=0;

function preload() {

  background = loadImage('/assets/background.png');

  pipe = loadImage('/assets/pipe.png');

  enemy = loadImage('/assets/enemy.png')
  
  brick = loadImage('/assets/brick.png');

  mario_running = loadAnimation("mario1.png","mario2.png");
  mario_collided = loadAnimation("mario_dead.png");

  ground = loadImage("ground.png");

  gameoverImg = loadImage("gameover.png")
  restartImg = loadImage("restart.png")

}

function setup() {

  createCanvas(600,200);
  
  mario = createSprite(50,180,20,50);
  mario.addAnimation("running", mario_running);
  mario.addAnimation("collided", mario_collided);
  mario.scale = 0.5;

  ground = createSprite(200,180,400,20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width/2;
  ground.velocityX = -(6 + 3*score/100);

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  pipeGroup = new Group();
  brickGroup = new Group();
  enemyGroup = new Group();

  gameover = createSprite(300,100);
  gameover.addImage(gameoverImg);

  restart = createSprite(300,140);
  restart.addImage(restartImg);

  score = 0;
}

function draw() {
  background(255,255,255);  
  text("Score"+score, 500, 50);

  if(gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);

    if(KeyDown("space") && mario.y >= 159){
      mario.velocityY = -12;
    }
    
    mario.velocityY = mario.velocityY + 0.8

    if(ground.x < 10){
      ground.x = ground.width/2;
    }

    mario.collide(invisibleGround);
    spawnpipe();
    spawnbrick();
    spawnenemy();
    
  }

  else if (gameState === END){
    //setting velocity of each game object to 0
    ground.velocityX = 0;
    mario.velocityY = 0;
    pipeGroup.setVelocityXEach(0);
    brickGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);

    //change the trex animation
    mario.changeAnimation("collided",mario_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    pipeGroup.setLifetimeEach(-1);
    brickGroup.setLifetimeEach(-1);
    enemyGroup.setLifetimeEach(-1);

    if(mousePressedOver(restart)) {
      reset();
    }

  }

  drawSprites();
}

function spawnbrick() 
{
  //write code here to spawn the brick
  if (frameCount % 60 === 0){
    var brick = createSprite(210,170,20,20);
    brick.y = Math.round(random(140,165));
    brick.addImage(brickImg);
    brick.scale = 0.5;
    brick.velocityX = -3;

    //assign lifetime to the variable
    brick.lifetime = 200;

    //add each brick to the group
    brickGroup.add(brick);
  }
}

function spawnpipe(){
  //write code here to spawn the pipe
  if (frameCount % 90 === 0){
    var pipe = createSprite(210,195,25,35);
    pipe.addImage(pipeImg);
    pipe.scale = 0.5;
    pipe.velocityX = -3;

    //assign lifetime to the variable
    pipe.lifetime = 200;

    //add each pipe to the group
    pipeGroup.add(pipe);
  }
}

function spawnenemy(){

  //write code here to spawn the enemy
  if (frameCount % 90 === 0){
    var enemy = createSprite(210,195,25,35);
    enemy.addImage(enemyImg);
    enemy.scale = 0.5;
    enemy.velocityX = -3;

    //assign lifetime to the variable
    enemy.lifetime = 200;

    //add each enemy to the group
    enemyGroup.add(enemy);
  }

}

function reset(){

  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;

  mario.changeAnimation("running", mario_running);

  score = 0;

}