// inside this file - script.js - we are going to create our first phaser video game
"use strict";

// outline of the steps we are going to take to create a game in the browser and Phaser

// step 1. define all of the properties for a new phaser game object that phaser how to organize game (width/height and etc.)
const myconfig = {
  // we use an object value a list of property names and their assoc values
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  physics: {
    default: 'arcade'
  },
  scene: {
    preload: myPreloadCode,
    create: myCreateCode,
    update: myUpdateCode
  }
};

// step 2. define some variables that we will use as the game's data model to represent score, or the game objects we control
// ALL VARIABLES IN OUR GAME THAT MORE THAN ONE FUNCTION NEED TO USE MUST BE DECLARED WITH LET OUTSIDE OF CURLIES
let myplayer;
let mystar;
let mykeys;

// step 3. define a function for the PRELOAD event for our game's scene (where we load all of the files we need)
function myPreloadCode() {
  // load all of the files that contain assets our game needs (bitmap images)
  // the image() method takes 2 arguments:
  // (1) the made-up key name of the asset (nickname we use later on)
  // (2) the path for phaser to find the bitmap file I want to load for this asset
  this.load.image( 'sky', 'assets/sky.png' );
  this.load.image( 'star', 'assets/star.png' );
  this.load.image( 'dude', 'assets/1dude.png' );
  console.log('preload is done');
}
// step 4. define a function for the CREATE event where we write code to layout the game objects and initialize values like score
function myCreateCode() {
  /* create a background image game object
    add.image() method takes three arguments
    (1) the horizontal (x-axis) coordinate position
    (2) the vertical (y-axis) coordinate
    (3) the key (or nickname) for the asset we loaded during preload
  */
  this.add.image( 400, 300, 'sky' );

  // add a myplayer controlled game object (sprite) 
  myplayer = this.physics.add.sprite( 100, 450, 'dude' );
  
  // add a collectible (star) game object (sprite) 
  mystar = this.physics.add.sprite( 300, 50, 'star' );
    
  // now lets enable keyboard controls using the inputmanager for our scene
  mykeys = this.input.keyboard.createCursorKeys();
    
  // define a collision event and ask phaser to watch the myplayer and star touch each other
  // arguments for overlap()
  // (1) the variable that holds one of the sprites we want to detect collision for
  // (2) the variable that holds the other sprite we are looking for
  // (3) the name of the function that you want to have phaser run when the sprites touch
  // (4) set this to null (or nothing for now)
  // (5) give the function your current scene using this
  this.physics.add.overlap( myplayer, mystar, collectStar, null, this );
  console.log("create is done");
}
// step 5. define a function for the UPDATE event that automatically is repeated over and over by the phaser game engine in a loop
function myUpdateCode() {
  // ask about the state of the mykeys during the update (30fps)
  if ( mykeys.left.isDown ) {
    myplayer.setVelocityX(-160);
  } else if ( mykeys.right.isDown ) {
    myplayer.setVelocityX(160);
  } else {
    myplayer.setVelocityX(0);
  }
  
  if ( mykeys.up.isDown ) {
    myplayer.setVelocityY(-160);
  } else if ( mykeys.down.isDown ) {
    myplayer.setVelocityY(160);
  } else {
    myplayer.setVelocityY(0);
  }
}
// step 6. create a new phaser Game object to start the game (game is running after next line runs)
const mygame = new Phaser.Game( myconfig );

// steps 7 and beyond. create a named function for each special phaser event you want to handle
function collectStar() {
  console.log("overlap detected");
}
