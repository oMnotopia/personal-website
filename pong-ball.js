const INITIAL_VELOCITY = 0.025
const VELOCITY_INCREASE = 0.00001

const gameContainer2 = document.getElementById("game-container-2")
const gameRect = gameContainer2.getBoundingClientRect()

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem
        this.reset()
    } 

    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
    }

    set x(value){
        this.ballElem.style.setProperty("--x", value)
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
    }

    set y(value){
        this.ballElem.style.setProperty("--y", value)
    }

    rect() {
        return this.ballElem.getBoundingClientRect()
    }

    reset() {
        this.x = (117.5/2); //107 wide
        this.y = (85.5/2); //85.5 wide
        this.direction = { x: 0 }
        while(
            Math.abs(this.direction.x) <= 0.2 || 
            Math.abs(this.direction.x) >= 0.9
        ){
            const heading = randomNumBetween(0, 2 * Math.PI)
            this.direction = { x:Math.cos(heading), y:Math.sin(heading)}
        }
        this.velocity = INITIAL_VELOCITY
    }

    update(delta, paddleRects) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += VELOCITY_INCREASE * delta
        const rect = this.rect()
        console.log(this.x, this.y)
        if(rect.bottom >= gameRect.bottom|| rect.top <= gameRect.top) {
            this.direction.y *= -1;
        }

        if(paddleRects.some(r => isCollision(r, rect))) {
            this.direction.x *= -1;
        }
    }
}

function randomNumBetween(min, max) {
    return Math.random() * (max-min) + min
}

function isCollision(rect1, rect2) {
    return (rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom >= rect2.top) 
}