// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //Set initial starting position for enemy bug.
    //Randomly assign y coordinate to place bug on one of three rows of stones.

    this.x = -100;
    if (Math.random() <.33) {
        this.y = 60;
    } else if (Math.random() <.66) {
        this.y = 143;
    } else {
        this.y = 223;
    }


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

    //update x position, y position will not change as bugs are moving horizontally

    if (this.x > 500) {
        this.x = -100;
    } else {
         this.x = this.x + (300 * dt);
    }



}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var bug = new Enemy();

var allEnemies = [bug];


// Place the player object in a variable called player
var player = {};
player.sprite = 'images/char-boy.png';
player.update = function () {return;}
player.render = function () {return;}
player.handleInput = function () {return;}





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
