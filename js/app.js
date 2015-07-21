
/*

 App.js
 Code by Dennis Drenner |  July 2015  |  www.ddcodes.com
 Udacity.com FrontEnd Nanodegree Program Project | Frogger Game

 This Javascript code works in conjunction with engine.js and resources.js to run the Frogger game
 when the index.html file is opened in the browser window.
 App.js contains the Player, Treasure and Enemy object constructors which describe their
 appearance and behaviors.
 The code for animating the game screen is in Engine.js.

*/

"use strict";


//Allow user to select girl or boy player
var person = prompt("Would you like a Boy or Girl player?", "Girl");

if (person !== null) {
   if (person == 'Boy' || person == 'Girl' || person == 'boy' || person == 'girl') {}
   else {
    prompt("Would you like a boy or girl player?", "Girl");
   }
}



// Helper function: Generate a random y coordinate/random row for enemies and treasures
var randomRow = function () {
    var y;
    if (Math.random() <0.33) {
        y = 60;
    } else if (Math.random() <0.66) {
        y = 143;
    } else {
        y = 223;
    }
    return y;
};

// Helper function: Generate a random x coordinate/random column for enemies and treasures
var randomColumn = function () {
    var x;
    if (Math.random() <0.2) {
        x = 5;
    } else if (Math.random() <0.4) {
        x = 105;
    } else if (Math.random() <0.6) {
        x = 205;
    } else if (Math.random() <0.8) {
        x = 305;
    } else {
        x = 405;
    }
    return x;
};

// Helper function: Generate random speed for bugs
var randomSpeed = function () {
    var speed;
    if (Math.random() < 0.33) speed=200;
    else if (Math.random() <0.66) speed=300;
    else speed=400;
    return speed;
};


// Constructor for enemy class

var Enemy = function() {
    //Set initial starting position for enemy bug.
    //Randomly assign y coordinate to place bug on one of three rows of stones.
    this.x = -100;
    this.y = randomRow();
    this.speed = randomSpeed();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks, allows program to run at same speed on different computers

//Update the position of the enemy prior to rendering a new game screen
Enemy.prototype.update = function(dt) {

    //update x and y position. randomly change speed and row everytime a bug leaves the screen
    if (this.x > 500) {
        this.x = -100;
        this.y = randomRow();
        this.speed = randomSpeed();
    } else {
         this.x = this.x + (this.speed * dt);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Constructor for treasure objects. Set random start position
var Treasure = function () {
    this.x = randomColumn();
    this.y = randomRow()+15;
    this.sprite = 'images/Star.png';
};

var i = 0;

//Update the location of the Treasure object before rendering new game screen
Treasure.prototype.update = function() {
    i+=1;
    if (i>240) {   //Reset position of treasure approximately every four seconds (assuming 60 animation frames/second)
        this.x = randomColumn();
        this.y = randomRow()+15;
        i=0;
    }
};

// Draw the treasure on the screen
Treasure.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Constructor for our player object

var Character = function() {

    //Set initial starting position for character
        this.x = 202;
        this.y = 415;

    //Set initial score
        this.score = 0;

    // Set the image/sprite for our player depending on the user response to prompt
    if (person == 'boy' || person == 'Boy') {
        this.sprite = 'images/char-boy.png';
    } else {
        this.sprite = 'images/char-cat-girl.png';
    }

};


// Update the player's position before rendering game screen
// Also implement cheat function to temporarily slow down the enemy
Character.prototype.update = function(direction) {

    var currentPlayer = this;

// Move character according to keyboard inputs but make sure it is not moving off the playing field

    if (direction == 'left' && this.x >= 102) { this.x -= 100;}
    if (direction == 'right' && this.x <= 302) { this.x += 100;}
    if (direction == 'up'  && this.y > -14) { this.y -= 84;
    }
    if (direction == 'down' && this.y <406) { this.y += 84;}
    if (direction == 'slow') {
        bug1.speed = 50;
        bug2.speed = 50;
        bug3.speed = 50;
    }

    //Check for collision with enemies and treasures
    //Reset player to initial position if collision detected with enemy
    //Add points to player for 'collision' with treasure

    var detectCollision = function () {
        allEnemies.forEach(function(enemy){
            if ((Math.abs(currentPlayer.x - enemy.x) < 60) && (Math.abs(currentPlayer.y - enemy.y)) < 65) {
              currentPlayer.x = 202;
              currentPlayer.y = 406;
            }
        });

        allTreasures.forEach(function(treasure){
            if ((Math.abs(currentPlayer.x - treasure.x) < 60) && (Math.abs(currentPlayer.y - treasure.y)) < 65) {
                currentPlayer.score += 100;
                star.x = randomColumn();
                star.y = randomRow()+15;
            }
        });
    };

    detectCollision();

};  // End of Character.prototype.update function

// Draw the player on the screen
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


// Stop the game once the player has reached the water. Ask player if they want to play again.
// The main() function in engine.js has a if statement asking if stopAnimating == false before continuing to animate

    if (this.y <= -5) {
       stopAnimating = true;
       this.x = 202;
       this.y = 415;
       var newGame = confirm("Way to go! Another game?");
       if (newGame === true) {
        stopAnimating = false;
       }

    }
};

// Event listener for keys which will move the player around the board
// Also a cheat key 's' which temporarily slows down the enemies

Character.prototype.handleInput = function (keyCode) {
    if (keyCode =='left') { player.update('left');}
    if (keyCode == 'up') { player.update('up');}
    if (keyCode == 'right') { player.update('right');}
    if (keyCode == 'down') { player.update('down');}
    if (keyCode == 'slow') { player.update('slow');}
};


// Instantiating Enemy, Treasure and Character objects


// Enemy objects instantiated and put into an array

var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();

var allEnemies = [bug1,bug2, bug3];


//Place Treasure objects in an array called allTreasures
var star = new Treasure();

var allTreasures = [star];


// Place the player object in a variable called player
var player = new Character();




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// Cheat key 's' slows down enemies for one run across the field
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        83: 'slow'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
