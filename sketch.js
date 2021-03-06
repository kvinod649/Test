var PLAY = 0;
var END = 1;
var COMPLETE = 2;
var START = 3;
var gameState = START;
var quince, quinceImg, stopQuinceImg;
var ground, groundImg;
var flowerGroup, ghostGroup, ghostGroup2, ghostGroup3;
var flowerImg, ghostImg, ghost2Img, ghost3Img;
var flowerCount = 0;
var deathCount = 0;
var spookySound;

function preload(){
  quinceImg = loadAnimation("Run_1.png","Run_2.png");
  stopQuinceImg = loadAnimation("Stop_Quince.png");

  groundImg = loadImage("bg_grave.png");
  flowerImg = loadImage("Pink_Flower.png");
  ghostImg = loadImage("Grave_Ghost.png");
  ghost2Img = loadImage("Grave_Ghost2.png");
  ghost3Img = loadImage("Grave_Ghost3.png");

  //spookySound = loadSound("yt1s.com - Horror Music No Copyright (1).mp3");
  spookySound = loadSound("spooky.wav")
}

function setup() {
   //createCanvas(600,600);
   createCanvas(displayWidth - 20, displayHeight-10);
   //ground = createSprite(300, 0, 600, 2000);
   ground = createSprite(displayWidth/2, 0, 600, 2000);
   ground.addImage("ground",groundImg);
   ground.scale = 1;
   ground.y = ground.height /2;
  
   //quince = createSprite(300, 100, 15, 25);
   quince = createSprite(displayWidth/2, 100, 15, 25)
   quince.addAnimation("RunQuince",quinceImg);
   quince.addAnimation("StopQuince", stopQuinceImg)
   quince.scale = 0.5;
  
   //spookySound.loop();

  flowerGroup = new Group();
  ghostGroup = new Group();
  ghostGroup2 = new Group();
  ghostGroup3 = new Group();

  //spookySound = new Audio("https://www.youtube.com/watch?v=5oF5lS0sajs");
}

function draw() {
  background(0);
  drawSprites();
  spookySound.play();
  //text("Flowers: " + flowerCount, 500,50);
  //text("Death Count: " + deathCount, 40,50);
  textSize(20);
  fill("white");
  text("Flowers: " + flowerCount, displayWidth - 150, displayHeight-720);
  text("Death Count: " + deathCount, 40 ,displayHeight-720);
  if(gameState === START){
    textSize(12);
    /*
    text("Help Quince gather enough flowers to make a bouquet for her deceased dog Stone.", 90, 250);
      text("Directions -", 275, 285);
    text("Use the left and right arrow keys to collect flowers.", 170, 300);
    text("Be careful though! Ghosts can decrease Quince's flower count.", 150, 315);
    text("If you get below 0 flowers, Quince's death count will increase.", 155, 330);
    text("Try to get as few deaths as possible!", 200, 345);
    text("Gather 30 flowers to complete the bouquet.", 190, 360);
    text("Good luck!", 275, 375);
    text("Press the up arrow key to start.", 225, 410);
    */
    text("Help Quince gather enough flowers to make a bouquet for her deceased dog Stone.",displayWidth/3, 250);
    text("Directions -", displayWidth/2.1, 285);
    text("Use the left and right arrow keys to collect flowers.", displayWidth/2.5, 300);
    text("Be careful though! Ghosts can decrease Quince's flower count.", displayWidth/2.7, 315);
    text("If you get below 0 flowers, Quince's death count will increase.", displayWidth/2.65, 330);
    text("Try to get as few deaths as possible!", displayWidth/2.35, 345);
    text("Gather 30 flowers to complete the bouquet.", displayWidth/2.43, 360);
    text("Good luck!", displayWidth/2.1, 375);
    text("Press the up arrow key to start.", displayWidth/2.28, 410);

    ground.velocityY = -5;
    if (ground.y < 0){
      ground.y = ground.height/2;
    }

    if (keyIsDown(UP_ARROW)){
      gameState = PLAY;
    }
  }

  if (gameState === PLAY){
  
  ground.velocityY = -5;
  if (ground.y < 0){
    ground.y = ground.height/2;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    quince.x = quince.x +8;
  }
  if (keyIsDown(LEFT_ARROW)) {
    quince.x = quince.x -8;
  }

  if(flowerGroup.isTouching(quince)){
    flowerGroup.destroyEach();
    flowerCount = flowerCount+1;
  }

  if(ghostGroup.isTouching(quince)){
    ghostGroup.destroyEach();
    flowerCount = flowerCount-10;
  }
  if(ghostGroup2.isTouching(quince)){
    ghostGroup2.destroyEach();
    flowerCount = flowerCount-15;
  }
  if(ghostGroup3.isTouching(quince)){
    ghostGroup3.destroyEach();
    flowerCount = flowerCount-25;
  }

  if(flowerCount >= 0){
    spawnGhosts();
  }

  if(flowerCount >= 10){
    spawnGhosts();
    spawnGhosts2();
  }

  if(flowerCount >= 20){
    spawnGhosts();
    spawnGhosts2();
    spawnGhosts3();
  }

  spawnFlower();
  if(flowerCount < 0){
    gameState = END;
    deathCount = deathCount+1;
  }

  if(flowerCount >= 30){
    gameState = COMPLETE;
  }
}

if (gameState === END){
  //text("Game Over", 275, 300);
  //text("Press the down arrow key to play again", 200, 315);
  textSize(12);
  text("Game Over", displayWidth/2.1, 300);
  text("Press the down arrow key to play again", displayWidth/2.35, 315);
  flowerGroup.setVelocityYEach(0);
  ghostGroup.setVelocityYEach(0);
  ghostGroup2.setVelocityYEach(0);
  ghostGroup3.setVelocityYEach(0);
  ground.velocityY = 0;
  quince.changeAnimation("StopQuince", stopQuinceImg);
  
  flowerGroup.setLifetimeEach(-1);
  ghostGroup.setLifetimeEach(-1);
  ghostGroup2.setLifetimeEach(-1);
  ghostGroup3.setLifetimeEach(-1);
  if (keyIsDown(DOWN_ARROW)){
    gameState = PLAY;
    flowerCount = 0;
    
    flowerGroup.destroyEach();
    ghostGroup.destroyEach();
    ghostGroup2.destroyEach();
    ghostGroup3.destroyEach();

    quince.changeAnimation("RunQuince",quinceImg);
    
    //quince.x = 300;
    quince.x = displayWidth/2;
  }
}

if (gameState === COMPLETE){
  textSize(12);
  //text("Congrats! You have helped Quince deliver the bouquet to Stone's grave Safely!", 100, 300);
  //text("If you wish to play again to get fewer deaths, press the down arrow key.", 140, 315);
  text("Congrats! You have helped Quince deliver the bouquet to Stone's grave Safely!", displayWidth/3, 300);
  text("If you wish to play again to get fewer deaths, press the down arrow key.", displayWidth/2.8, 315);
  flowerGroup.setVelocityYEach(0);
  ghostGroup.setVelocityYEach(0);
  ghostGroup2.setVelocityYEach(0);
  ghostGroup3.setVelocityYEach(0);
  ground.velocityY = 0;
  quince.changeAnimation("StopQuince", stopQuinceImg);

  if (keyIsDown(DOWN_ARROW)){
    flowerCount = 0;
    deathCount = 0;
    flowerGroup.destroyEach();
    ghostGroup.destroyEach();
    ghostGroup2.destroyEach();
    ghostGroup3.destroyEach();
    quince.changeAnimation("RunQuince",quinceImg);
    //quince.x = 300;
    quince.x = displayWidth/2;
    gameState = START;
  }
  flowerGroup.setLifetimeEach(-1);
  ghostGroup.setLifetimeEach(-1);
  ghostGroup2.setLifetimeEach(-1);
  ghostGroup3.setLifetimeEach(-1);
}
  //drawSprites();
}

function spawnFlower(){
  if (frameCount % 140 === 0){
    //var flower = createSprite(Math.round(random(15,585)), 600, 10, 10);
    var flower = createSprite(Math.round(random(15,displayWidth-15)), displayHeight, 10, 10);
    flower.addImage("flower",flowerImg);
    flower.scale = 0.2;
    flower.velocityY=-5;
    flower.lifetime = 170;
    flowerGroup.add(flower);
}
}

function spawnGhosts(){
  if (frameCount % 200 === 0){
    //var ghost = createSprite(Math.round(random(100,500)), 600, 20, 20);
    var ghost = createSprite(Math.round(random(100,displayWidth-100)), displayHeight, 20, 20);
    ghost.addImage("ghost",ghostImg);
    ghost.scale = 0.12;

    ghost.velocityY=-5;
    ghost.lifetime = 170;
    ghostGroup.add(ghost);
  }
}

function spawnGhosts2(){
  if (frameCount % 80 === 0){
    //var ghost = createSprite(Math.round(random(100,500)), 600, 20, 20);
    var ghost2 = createSprite(Math.round(random(100,displayWidth-100)), displayHeight, 20, 20);
    ghost2.addImage("ghost2",ghost2Img);
    ghost2.scale = 0.12;

    ghost2.velocityY=-7;
    ghost2.lifetime = 170;
    ghostGroup2.add(ghost2);
  }
}

function spawnGhosts3(){
  if (frameCount % 30 === 0){
    //var ghost = createSprite(Math.round(random(100,500)), 600, 20, 20);
    var ghost3 = createSprite(Math.round(random(100,displayWidth-100)), displayHeight, 20, 20);
    ghost3.addImage("ghost3",ghost3Img);
    ghost3.scale = 0.12;

    ghost3.velocityY=-9;
    ghost3.lifetime = 170;
    ghostGroup3.add(ghost3);
  }
}