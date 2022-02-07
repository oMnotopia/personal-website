import Ball from './pong-ball.js'
import Paddle from './pong-paddle.js'

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))

const computerPaddle = new Paddle(document.getElementById("computer-paddle"))

 const pongBtn = document.getElementById('pong-btn')


const playerScoreElem = document.getElementById("player-score") 
const computerScoreElem = document.getElementById("computer-score")

let lastTime;
let winCondition = true;

function update(time) {


    if(lastTime!=null){
        const delta = time - lastTime;



        //update code
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
        document.documentElement.style.setProperty("--hue", hue + delta *0.01)

        if(isLose()) handleLose()
    }

    lastTime = time;

    if(winCondition!==true){
        window.requestAnimationFrame(update)
    } else {
        lastTime = null;
    }
}

//works
function isLose() {
    const rect = ball.rect()
    const gameContainer2 =  document.getElementById("game-container-2")//Can only be called once pong button is clicked
    const gameRect = gameContainer2.getBoundingClientRect()
    console.log(rect.right, gameRect.right)
    console.log(rect.left, gameRect.left)
    return rect.right >= gameRect.right || rect.left <= gameRect.left
}

function handleLose() {
    const rect = ball.rect()
    if(rect.right >= gameRect.right){
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }
    ball.reset()
    computerPaddle.reset()

    winCondition = !winCondition
}



pongBtn.addEventListener('click', () => {
    const pongContainer = document.getElementById('container-2')
    pongContainer.classList.toggle('hidden')
    const gameContainer2 =  document.getElementById("game-container-2")//Can only be called once pong button is clicked
    const gameRect = gameContainer2.getBoundingClientRect()
    gameContainer2.addEventListener('mousemove', e => {
        playerPaddle.position = (((e.y-gameRect.top) / window.innerHeight) * 100)
    })
    gameContainer2.addEventListener(
        "click", 
        () => {
            winCondition = !winCondition
            update()
        }, 
        {once : true}
    )
})

//Update Loop
update()