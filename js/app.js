
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
    this.x = 505-101-101-101;
    this.y = 606-171;

    // The image/sprite for our player.
    this.sprite = 'images/char-boy.png';
}

// Update the player's position
// Parameter: dt, a time delta between ticks
Character.prototype.update = function(direction) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (direction = 'left') { this.x -= 100;}
    if (direction = 'right') { this.x += 100;}
    if (direction = 'up') { this.y -= 100;}
    if (direction = 'down') { this.y += 100;}

    //Character.prototype.render();
}

// Draw the enemy on the screen, required method for game
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Character.prototype.handleInput = function (keyCode) {
    if (keyCode =='left') { Character.prototype.update('left');}
    if (keyCode == 'up') { Character.prototype.update('up');}
    if (keyCode == 'right') { Character.prototype.update('right');}
    if (keyCode == 'down') { Character.prototype.update('down');}
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
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
