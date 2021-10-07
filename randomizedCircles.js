//onclick called from inline html, enlarges blog item when clicked and shrinks when clicked again
const circles = document.querySelectorAll('.circle')

//Loop sets an event listener on each blog item.
for (let element of circles) {
    element.addEventListener('click', function() {randomMovement(element)} )
}

//First checks that blog-item has proper attributes, then removes/sets attributes when clicked.
function randomMovement(element) {
    let randomDirectionX = Math.floor(Math.random()*100)
    let randomDirectionY = Math.floor(Math.random()*100)
    element.style.transform = `translate(${randomDirectionX}%, ${randomDirectionY}%)`
    //element.setAttribute('transform', `translate(${randomDirectionX}%, ${randomDirectionY}%)`)
}