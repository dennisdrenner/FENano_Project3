
"use strict";


//Allow user to select girl or boy player
var person = prompt("Would you like a Boy or Girl player?", "Girl");
if (person != null) {
   if (person == 'Boy' || person == 'Girl' || person == 'boy' || person == 'girl') {}
   else {
    prompt("Would you like a boy or girl player?", "Girl");
   }
}


//Generate a random y coordinate/random row for enemies and treasures
var randomRow = function () {
    var y;
    if (Math.random() <.33) {
        y = 60;
    } else if (Math.random() <.66) {
        y = 143;
    } else {
        y = 223;
    }
    return y;
}

//Generate a random x coordinate/random column for enemies and treasures
var randomColumn = function () {
    var x;
    if (Math.random() <.2) {
        x = 5;
    } else if (Math.random() <.4) {
        x = 105;
    } else if (Math.random() <.6) {
        x = 205;
    } else if (Math.random() <.8) {
        x = 305;
    } else {
        x = 405;
    }
    return x;
}

//Generate random speed for bugs
var randomSpeed = function () {
    var speed;
    if (Math.random() < .33) speed=200;
    else if (Math.random() <.66) speed=300;
    else speed=400;
    return speed;
}


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
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //update x and y position. randomly change speed and row everytime a bug leaves the screen

    if (this.x > 500) {
        this.x = -100;
        this.y = randomRow();
        this.speed = randomSpeed();
    } else {
         this.x = this.x + (this.speed * dt);
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Constructor for treasure objects. Set random start position
var Treasure = function () {
    this.x = randomColumn();
    this.y = randomRow()+15;
    this.sprite = 'images/Star.png';
}



var i = 0;

Treasure.prototype.update = function() {
    i+=1;
    if (i>240) {   //Reset position of treasure approximately every four seconds (assuming 60 animation frames/second)
        this.x = randomColumn();
        this.y = randomRow()+15;
        i=0;
    }
}

// Draw the treasure on the screen
Treasure.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


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

}


// Update the player's position
//Also implement cheat function to temporarily slow down the enemy
Character.prototype.update = function(direction) {
    var currentPlayer = this;
//move character according to keyboard inputs but make sure it is not moving off the playing field
    if (direction == 'left' && this.x >= 102) { this.x -= 100;}
    if (direction == 'right' && this.x <= 302) { this.x += 100;}
    if (direction == 'up'  && this.y > -14) { this.y -= 84;}
    if (direction == 'down' && this.y <406) { this.y += 84;}
    if (direction == 'slow') {
        bug1.speed = 50;
        bug2.speed = 50;
        bug3.speed = 50;
        console.log(bug1.speed, bug2.speed, bug3.speed);
    }

    //Check for collision with enemies and treasures
    //Reset player to initial position if collision detected with enemy
    //Add points to player if collision with treasure
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
                console.log('score:', currentPlayer.score);
                star.x = randomColumn();
                star.y = randomRow()+15;
            }
        });
    }
    detectCollision();
}

// Draw the player on the screen
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Character.prototype.handleInput = function (keyCode) {
    if (keyCode =='left') { player.update('left');}
    if (keyCode == 'up') { player.update('up');}
    if (keyCode == 'right') { player.update('right');}
    if (keyCode == 'down') { player.update('down');}
    if (keyCode == 'slow') { player.update('slow');}
}




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();

var allEnemies = [bug1,bug2, bug3];


//Place treasure objects in an array called allTreasures
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
