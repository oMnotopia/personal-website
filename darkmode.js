//Changes between dark mode and light mode, using the slider bar in the header.
//Global variables
const sliderMode = document.getElementById('slider');
const theme = document.getElementById('theme')
const githubLogo = document.getElementsByClassName('icon')

//Changes contrast ratio values in Accessability blog item when user highlights and background changes 
//from white to gray.
const accessabillity = document.getElementById('accessabillity')
//Colours that have contrast ratio values changed.
const yellowC = document.getElementById('yellow')
const greenC = document.getElementById('green')
const pinkC = document.getElementById('pink')
const blueC = document.getElementById('blue')


//Event listener from click. Event handler looks at the class name and changes between dark and light.
sliderMode.addEventListener('click', () => {
    if(theme.className==='light'){
        theme.className = 'dark';
        githubLogo[0].src = "./resources/github-dark-logo.png";
        if(githubLogo[1]) githubLogo[1].src = "./resources/github-dark-logo.png";
        

        //Remove event listener so contrast values don't change when mouse is over blog item. 
        if(accessabillity) {
            accessabillity.removeEventListener('mouseenter', handleMouseEnter)
            accessabillity.removeEventListener('mouseleave', handleMouseLeave)
        }


        //Update contrast values for dark mode.
        if(yellowC||greenC||pinkC||blueC) darkModeContrastValues()

    } else {
        theme.className = 'light';
        githubLogo[0].src = "./resources/github-logo.png";
        if (githubLogo[1]) githubLogo[1].src = "./resources/github-logo.png";

        //Reset contrast values for light mode.
        if(yellowC||greenC||pinkC||blueC) handleMouseLeave()

        //Add event listeners so contrast values do change when mouse is over blog item.
        if(accessabillity) {
            accessabillity.addEventListener('mouseenter', handleMouseEnter)
            accessabillity.addEventListener('mouseleave', handleMouseLeave)    
        }
    }
})


//Contrast values for "Accessability" blog.
const darkModeContrastValues = () => {
    yellowC.innerHTML = "13.91:1"
    greenC.innerHTML = "10.88:1"
    pinkC.innerHTML = "6.95:1"
    blueC.innerHTML = "1.73:1"
}
const handleMouseEnter = () => {
    yellowC.innerHTML = "1.49:1"
    greenC.innerHTML = "1.17:1"
    pinkC.innerHTML = "1.33:1"
    blueC.innerHTML = "5.35:1"
}
const handleMouseLeave = () => {
    yellowC.innerHTML = "1.07:1"
    greenC.innerHTML = "1.37:1"
    pinkC.innerHTML = "3.18:1"
    blueC.innerHTML = "8.59:1"
}

//Event listeners that change contrast ratio values for accessability blog.

if(accessabillity){
    accessabillity.addEventListener('mouseenter', handleMouseEnter)
    accessabillity.addEventListener('mouseleave', handleMouseLeave)   
}


