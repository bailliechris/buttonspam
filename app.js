// const Ball = require('./ball.js');
// Create Ball Class
// Stores current position, speed in xy and id
class Ball {
    constructor(x, y, sx, sy, id) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
    }

    // Get ID
    get get_id() {
        return this.id;
    }

    // Get current position
    get update() {
        return {
            'x': this.x,
            'y': this.y
        }
    }

    // Calculate new position after 'tick'
    // Best called with setinterval
    calcUpdate(maxx, maxy) {
        this.x += this.sx;
        this.y += this.sy;

        if (this.x > maxx) {
            this.x = maxx;
            this.sx = this.sx * -1;
        }

        if (this.y > maxy) {
            this.y = maxy;
            this.sy = this.sy * -1;
        }

        if (this.x < 0) {
            this.x = 0;
            this.sx = this.sx * -1;
        }

        if (this.y < 0) {
            this.y = 0;
            this.sy = this.sy * -1;
        }
    }

    // force change the x direction
    bouncex() {
        this.sx = -this.sx;
    }

    // force change the y direction
    bouncey() {
        this.sy = -this.sy;
    }
}

// Global Variables
// Counter for unique IDs
var num = 0;
// Move or not?
var move_flag = false;
var interval = 0;
// Set up for choosing random numbers
const colour_val= ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
// Prepare list for 'balls' to bounce around
const ball_list = [];

// Function - Get random numbers
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Create random colour value
function create_colour() {
    return "#" + colour_val[getRandom(0, 15)]
        + colour_val[getRandom(0, 15)]
        + colour_val[getRandom(0, 15)]
        + colour_val[getRandom(0, 15)]
        + colour_val[getRandom(0, 15)]
        + colour_val[getRandom(0, 15)];
}

// Function to create a new button
// x for number of buttons to add
function add(x) {
    for (let i = 0; i < x; i++) {
        // Work out current screen size
        let div_height = document.querySelector("#container").clientHeight;
        let div_width = document.querySelector('#container').clientWidth;
        let index = 0;
        
        // Create a new ball item with random positions, speeds and id 
        let new_ball = new Ball(getRandom(0, div_width),
            getRandom(0, div_height),
            getRandom(-10, 10),
            getRandom(-10, 10),
            num.toString()
        );
    
        ball_list.push(new_ball);
        index = ball_list.length - 1;
    
        // Create new DOM item with an id to match the new ball in the array
        let new_circle = document.createElement("BUTTON");
        new_circle.innerHTML = num.toString();
        new_circle.id = num.toString();
        new_circle.className = "circle";
        new_circle.style.backgroundColor = create_colour();
        new_circle.style.position = "absolute";
        new_circle.style.top = ball_list[index].update.y.toString() + "px";
        new_circle.style.left = ball_list[index].update.x.toString() + "px";
        new_circle.style.borderRadius = "100%";
        new_circle.addEventListener("mousedown", function(e) {
            if (e.target.nodeName === "BUTTON"){
                document.getElementById(e.target.id).remove();
                console.log(e.target.id);
                index = ball_list.findIndex(ball => ball.get_id === e.target.id);
                ball_list.splice(index, 1);
                console.log(ball_list);
            }
        }, false);
    
        // Add new item to DOM
        document.getElementById("container").appendChild(new_circle);

        // Increase unique ID value
        num++;
    }
}

// Move button
function trigger_move() {
    move_flag = !move_flag;
    if (move_flag) {
        interval = setInterval(move, 125);
        document.querySelector("#move_button").innerHTML = "Stop";
    }
    else {
        clearInterval(interval);
        document.querySelector("#move_button").innerHTML = "Move";
    }
}

// Update position of all elements in the ball_list array
function move() {
    let circles = document.querySelectorAll(".circle");
    let index = -1;
    if (circles.length && move_flag) {
        let div_height = document.querySelector("#container").clientHeight;
        let div_width = document.querySelector('#container').clientWidth;
        circles.forEach(circle => {
            index = ball_list.findIndex(ball => ball.get_id === circle.id);
            ball_list[index].calcUpdate(div_width, div_height);
            circle.style.left = ball_list[index].update.x.toString() + "px";
            circle.style.top = ball_list[index].update.y.toString() + "px";
        });   
    }
}