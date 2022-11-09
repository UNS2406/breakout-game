//C1-C7 breakout game

//Declare variables for game objects and behaviour indicators(FLAGS)
var ball;
var paddle;
var brick, bricksGroup;
var score;
var gameState;
var lives;



//define the initial environment of the software(before it is used) 
//by defining the declared variables with default values 
//executed only once at the start of the program
function setup(){
  //create ball as a sprite object
  ball = createSprite(200,200,10,10);
  ball.setAnimation("golfball_1");
  ball.scale = 0.05;
  
  //create paddle as a sprite object
  paddle = createSprite(200,350,120,10);
  paddle.shapeColor = "blue";
  
  //create group for bricks
  bricksGroup = createGroup();
  
  //create edges in the form of sprites
  createEdgeSprites();
  
  //assigning default values 
  score = 0;
  lives = 3;
  gameState = "pre-start";
  
  //function call to create a brick row based on y-position and color
  createBrickRow(65, 'red');
  createBrickRow(65+29, "orange");
  createBrickRow(65+29+29,"green");
  createBrickRow(65+29+29+29,"yellow");
}


//All modifications, conditions, actions to be executed and checked, 
//continuously or applied during the course of the program are written inside function draw. 
//function draw is executed for every frame created since the start of the program. 
function draw(){
  // color the background area  
  background("black");
  
  //display scoreboard and lives counter
  textSize(20);
  text("Score: "+score,40,25);
  text("Lives: "+lives, 40, 45);
  

  
  //conditions to check what kind of gamestate is active and choose the behaviour accordingly
  if(gameState == "pre-start"){
    //behaviour of the game when the game starts(or restarts)
    text("Click to serve the ball.", 120,250);
    ball.velocityX =0;
    ball.velocityY =0;
    ball.x = 200;
    ball.y = 200;
  }
  else if(gameState =="end") {
    //display gameover message
    text("Game Over", 150, 250);
    ball.remove();
  }
  else {
    //function call to choose behaviour of game when it is actively played
    gameplay();
  }
  
  
  
 
  
  //display sprite objects
  drawSprites();
}

//function definition to create a brick row as a sprite object based on y-position and color
function createBrickRow(yInput, colorInput){
  //for loop to create six bricks in a row
  for(var i = 0; i < 6; i++ ){
    brick = createSprite(65+54*i, yInput, 50, 25);
    brick.shapeColor = colorInput;
    bricksGroup.add(brick);
  }
}

// function definition and call to be triggered when a mouse button is pressed
// we use this function to add movement to the ball
function mousePressed(){
  ball.velocityX = 3;
  ball.velocityY = 2;
  
    
  if(gameState == "pre-start"){
    gameState = "play";
    ball.velocityY = -7;
    ball.velocityX = -7;
  }
}



//function definition to choose behaviour of game when it is actively played
function gameplay(){
  
  //add movement to the paddle
  //paddle.x = mouseX;
  paddle.x = ball.x;
  
  // //conditions to bring ball back to default position if it crosses the right/left edge
  // if(paddle.x < 60)
  // {
  //   paddle.x = 60;
  // }
    
  // if(paddle.x > 340)
  // {
  //   paddle.x = 340;
  // }
//conditions to change colour of the paddle
if(paddle.x<100){
    paddle.shapeColor = "yellow";
  }
  else if(paddle.x<250){
    paddle.shapeColor = "blue";
  }
  else{
    paddle.shapeColor = "purple";
  }
  
  
  
  //restrict ball movement inside canvas by bouncing it off all the four edges
  ball.bounceOff(rightEdge);
  ball.bounceOff(leftEdge);
  ball.bounceOff(topEdge);
  ball.bounceOff(bricksGroup, brickHit);
  
  //condition to make a sound if ball bounces off the paddle
  if(ball.bounceOff(paddle))
  {
    playSound("sound://category_tap/puzzle_game_organic_wood_block_tone_tap_1.mp3");
  }
  
  //condition to get the GAME WIN behaviour if all the bricks are destroyed
  if(!bricksGroup[0])
  {
    //console.log("Won");
    ball.velocityX = 0;
    ball.velocityY = 0;
    text("Well Done!!",150,200);
  }
  
  //condition to apply behaviour if the ball misses the paddle
  if(ball.isTouching(bottomEdge)) {
    //function call to end the game and reduce life by one
    lifeover();
  }
}

//function definition to end the game and reduce life by one
function lifeover(){
  lives = lives - 1;
  if(lives>=1) {
    gameState = "pre-start";
  }
  else {
    gameState = "end";
  }
}

function brickHit(ball, brick) {
 playSound("sound://category_hits/puzzle_game_button_04.mp3");
 brick.remove();
 score = score+5;
 
 if(ball.velocityY<12 && ball.velocityY>-12)
  { ball.velocityX *= 1.05;
    ball.velocityY *= 1.05;

  }
 
} 
