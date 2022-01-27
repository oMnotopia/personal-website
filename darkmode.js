
const html = document.getElementsByTagName('html')
const switchInput = document.getElementById('switch-input')

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

const currentTheme = localStorage.getItem("theme")
const rememberedTheme = localStorage.getItem("sliderChecked")

console.log(html[0].style.backgroundColor = '#000')

if (rememberedTheme==='true') {
    switchInput.checked = true; //reapplys checked status of slider on page reload
    theme.className = "dark";
    githubLogo[0].src = "./resources/github-dark-logo.png"; //logo in header 
    if(githubLogo[1]) githubLogo[1].src = "./resources/github-dark-logo.png"; // logo in projects section
    if(yellowC||greenC||pinkC||blueC)  {
        darkModeContrastValues()
        html[0].style.backgroundColor = '#000' //ensures entires background is black even during filtering
    }
} else {
    theme.className = "light";
    githubLogo[0].src = "./resources/github-logo.png"; //logo in header 
    if(githubLogo[1]) githubLogo[1].src = "./resources/github-logo.png"; // logo in projects section  
    if(yellowC||greenC||pinkC||blueC) handleMouseLeave()
}

console.log(rememberedTheme)
console.log(theme.className)
//Event listener from click. Event handler looks at the class name and changes between dark and light.
switchInput.addEventListener('click', () => {

    if(theme.className==='light'){
        theme.className = 'dark';

        githubLogo[0].src = "./resources/github-dark-logo.png"; //logo in header
        if(githubLogo[1]) githubLogo[1].src = "./resources/github-dark-logo.png"; // logo in projects section
        

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
    console.log(theme.className)
    //Stores theme in local storage so on a page switch theme is remembered.
    localStorage.setItem("theme", theme.className);
    localStorage.setItem("sliderChecked", switchInput.checked)

})

//Event listeners that change contrast ratio values for accessability blog.
if(accessabillity && theme.className==='light'){
    accessabillity.addEventListener('mouseenter', handleMouseEnter)
    accessabillity.addEventListener('mouseleave', handleMouseLeave)   
}


