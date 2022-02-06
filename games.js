// const choreDoorContainer = document.getElementById('game-container')
// const pongContainer = document.getElementById('container-2')

const btnContainer = document.getElementById('btn-container')

const choreDoorBtn2 = document.getElementById('CD-btn')
const pongBtn2 = document.getElementById('pong-btn')

choreDoorBtn2.addEventListener('click', () => {
    console.log(btnContainer)
    btnContainer.classList.add('hidden')
})


pongBtn2.addEventListener('click', () => {
    btnContainer.classList.add('hidden')
})

