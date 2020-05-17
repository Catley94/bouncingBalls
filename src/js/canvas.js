import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

let gravity = 1;
let friction = 0.99;
let numberOfBalls = 100;

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})
//when clicking the page, restart animation
addEventListener('click', () => {
  init();
})

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    c.closePath()
  }

  update() {
    //if this.y this.radius and this.dy is greater than canvas.height
    if(this.y+ this.radius + this.dy > canvas.height) {
      //directionY reverses * friction
      //take friction out if you do not want to lose energy
      this.dy = -this.dy * friction;
    } else {
      //directionY add gravity aswell
      this.dy += gravity;
      // console.log(this.dy);
    }
    //if this.x this.radius and this.dx > canvas.width or this.x - this.radius less than or equal to 0
    if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
      //reverse directionX * friction
      //take friction out if you do not want to lose energy
      this.dx = -this.dx * friction;
    }
    //by default, this.x and this.y is added on to directionX or directionY
    this.x += this.dx;
    this.y += this.dy;
    //initiate 
    this.draw()
  }
}

// Implementation
let ballArray = [];
function init() {
  ballArray = [];
  for (let i = 0; i < numberOfBalls; i++) {
    //radius variable, randomint choose from 10 - 30 (size of ball)
    var radius = utils.randomIntFromRange(8, 20);
    //randomint from left side + radius of ball, to right side - radius
    //this prevents the balls from spawning and getting caught on either side
    var x = utils.randomIntFromRange(radius, canvas.width - radius);
    //randomint from top, to bottom - radius
    //added - 100 so it's at least 100px from the bottom
    var y = utils.randomIntFromRange(0, canvas.height - radius - 100);
    //randomint from -2 to 2, this causes the balls to have different velocity or gravity
    var dy = utils.randomIntFromRange(-2, 2);
    //randomint from -2 to 2, this causes the balls to move either left or right also
    var dx = utils.randomIntFromRange(-2, 2);
    //choose colour
    var color = utils.randomColor(colors);
    //create a new ball and push instantly in ballArray
    ballArray.push(new Ball(x, y, dx, dy, radius, color))
  }
  
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  //clears canvas every frame
  c.clearRect(0, 0, canvas.width, canvas.height)
  //es5
  for (var i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  //es6
  // ballArray.forEach(ball => {
  //  ball.update()
  // })
}

init()
animate()
