var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup;

var FoodGroup, obstacleGroup
var forest, forestImage;
var ground, groundImage;
var obstacles, obstaclesImage;
var obstaclesGroup;
var orange, orangeImage;
var food;
var Score;
var survivalTime;
var chances
var PLAY = 1;
var END = 0;
var wall, wallImage;
var baby, babyImage;
var gameover, gameoverImage;
var restart, restartImage;



function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  forestImage = loadImage("forest.jpg");
  obstaclesImage = loadImage("obstacle.png");
  groundImage = loadImage("ground.jpg");
  orangeImage = loadImage("orange.png");
  wallImage = loadImage("Green.jpg");
  babyImage = loadImage("baby.jpg");
  gameoverImage = loadImage("gameover.jpg");
  restartImage = loadImage("reset.png");
}



function setup() {
  createCanvas(650, 400);

  forest = createSprite(200, 280, 20, 20);
  forest.addImage(forestImage);
  forest.scale = 1.8;

  wall = createSprite(400, 200, 20, 20);
  wall.addImage(wallImage);
  wall.visible = false;

  restart = createSprite(300, 320);
  restart.addImage(restartImage);
  restart.scale = 0.3;
  restart.visible = false;

  gameover = createSprite(300, 220);
  gameover.addImage(gameoverImage);
  gameover.scale = 0.2;
  gameover.visible = false;

  baby = createSprite(300, 100, 20, 20);
  baby.addImage(babyImage);
  baby.scale = 0.2;
  baby.visible = false;


  monkey = createSprite(80, 345, 20, 20)
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;


  ground = createSprite(400, 820, 800, 10);
  ground.addImage(groundImage);
  ground.scale = 2;
  ground.velocityX = -5;

  Score = 0;
  survivalTime = 20;
  chances = 3;
  obstaclesGroup = createGroup();
  orangeGroup = createGroup();
  bananaGroup = createGroup();
}


function draw() {
  background("green");

  stroke("white");
  textSize(25);
  fill("white");
  text("Score: " + Score, 10, 25);

  stroke("white");
  textSize(25);
  fill("white");
  text("Survival Time: " + survivalTime, 450, 25);

  stroke("white");
  textSize(25);
  fill("white");
  text("Chances: " + chances, 200, 25)




  ground.x = ground.width / 2;


  if (keyDown("space") && monkey.y > 50) {
    monkey.velocityY = -12;
  }


  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);

  if (obstaclesGroup.isTouching(monkey)) {
    obstaclesGroup.destroyEach();
    chances = chances - 1;
  }




  if (orangeGroup.isTouching(monkey)) {
    orangeGroup.destroyEach();
    Score = Score + 1;
    survivalTime = survivalTime + 2;

  }


  if (bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
    Score = Score + 1;
    survivalTime = survivalTime + 2;

  }



  if (chances === 0 || survivalTime === 0) {
    gameSate = END;
    orangeGroup.destroyEach();
    bananaGroup.destroyEach();
    obstaclesGroup.destroyEach();
    monkey.visible = false;
    wall.visible = true;
    baby.visible = true;
    gameover.visible = true;
    restart.visible = true;
  }


  if (mousePressedOver(restart)) {
    gameState = PLAY;
    monkey.visible = true;
    gameover.visible = false;
    baby.visible = false;
    restart.visible = false;
    wall.visible = false;
    Score = 0;
    chances = 3;
    survivalTime = 20;
  }

  if (frameCount % 150 === 0) {
    survivalTime = survivalTime - 1;
  }

  orange();
  food();
  obstacles();
  drawSprites();
}

function obstacles() {
  if (frameCount % 100 === 0) {
    var obstacles = createSprite(690, 333, 20, 20)
    obstacles.velocityX = -6;
    obstacles.addImage(obstaclesImage)
    obstacles.scale = 0.2;
    obstaclesGroup.add(obstacles);

  }
}


function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(680, 0, 20, 20);
    banana.addImage(bananaImage);
    banana.velocityX = -6;
    banana.scale = 0.1;
    banana.y = Math.round(random(50, 250));
    bananaGroup.add(banana);
  }

}

function orange() {

  if (frameCount % 130 === 0) {
    var orange = createSprite(680, 50, 20, 20);
    orange.addImage(orangeImage);
    orange.velocityX = -8;
    orange.scale = 0.1;
    orange.y = Math.round(random(50, 250));
    orangeGroup.add(orange);

  }





}