

var person = prompt("Would you like a Boy or Girl player?", "Girl");
if (person != null) {
   if (person == 'Boy' || person == 'Girl' || person == 'boy' || person == 'girl') {}
   else {
    prompt("Would you like a boy or girl player?", "Girl");
   }
}


//Generate a random y coordinate/random row for enemies to appear
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

//Generate random speed for bugs
var randomSpeed = function () {
    var speed;
    if (Math.random() < .33) speed=200;
    else if (Math.random() <.66) speed=300;
    else speed=400;
    return speed;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Character = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //Set initial starting position for character
    this.x = 202;
    this.y = 406;

    // The image/sprite for our player.

    if (person == 'boy' || person == 'Boy') {
        this.sprite = 'images/char-boy.png';
    }
    else { this.sprite = 'images/char-princess-girl.png'}

        console.log('sprite:', this.sprite);
}


// Update the player's position
// Parameter: dt, a time delta between ticks
Character.prototype.update = function(direction) {
    currentPlayer = this;

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

    //Check for collision with each enemy in the allEnemies array
    //Reset player to initial position if collision detected

    var detectCollision = function () {
        allEnemies.forEach(function(enemy){
            if ((Math.abs(currentPlayer.x - enemy.x) < 60) && (Math.abs(currentPlayer.y - enemy.y)) < 65) {
              currentPlayer.x = 202;
              currentPlayer.y = 406;
            }
        });
    }
    detectCollision();
}

// Draw the enemy on the screen, required method for game
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

// Place the player object in a variable called player

var player = new Character();


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();

var allEnemies = [bug1,bug2, bug3];



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
