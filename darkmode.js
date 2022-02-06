const html = document.getElementsByTagName('html')
const switchInput = document.getElementById('switch-input')

const theme = document.getElementById('theme')
const githubLogo = document.getElementsByClassName('icon')
//Index section
const index = document.getElementById('index')
const indexBackground = document.getElementById('background')
const birds = document.querySelectorAll('.bird')
//Blog section
const blog = document.getElementById('blog')
const accessabillity = document.getElementById('accessabillity')
//Changes contrast ratio values in Accessability blog item when user highlights and background changes 
//from white to gray.
const yellowC = document.getElementById('yellow')
const greenC = document.getElementById('green')
const pinkC = document.getElementById('pink')
const blueC = document.getElementById('blue')
//Projects section
const projects = document.getElementById('projects')

const rememberedTheme = localStorage.getItem("sliderChecked")

//Contrast values for "Accessability" blog.
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

//Dark updates for Index page 
const indexDarkUpdates = () => {
    indexBackground.src = "./resources/Mountain.png"
    indexBackground.className = "mntn-background"
    //birds.style.backgroundImage = "url('./resources/bird-cells-white.svg')"
    birds.forEach(bird => {
        bird.style.backgroundImage = "url('./resources/bird-cells-white.svg')"
    })
}
const indexLightUpdates = () => {
    //sets html level background as white
    html[0].style.backgroundColor = '#FFF' 
    indexBackground.src = "./resources/mads-schmidt-rasmussen-6YmzwamGzCg-unsplash-4.jpg"
    indexBackground.className = "snow-mntn-background"
    birds.forEach(bird => {
        bird.style.backgroundImage = "url('./resources/bird-cells-black.svg')"
    })
}

//Dark updates for Blog page 
const blogDarkUpdates = () => {
    //Remove event listener so contrast values don't change when mouse is over blog item. 
    accessabillity.removeEventListener('mouseenter', handleMouseEnter)
    accessabillity.removeEventListener('mouseleave', handleMouseLeave)

    //Update contrast values for dark mode.
    yellowC.innerHTML = "13.91:1"
    greenC.innerHTML = "10.88:1"
    pinkC.innerHTML = "6.95:1"
    blueC.innerHTML = "1.73:1"
}
const blogLightUpdates = () => {
    //sets html level background as site-blue
    html[0].style.backgroundColor = '#578CA9' 

    //Add event listeners so contrast values do change when mouse is over blog item.
    accessabillity.addEventListener('mouseenter', handleMouseEnter)
    accessabillity.addEventListener('mouseleave', handleMouseLeave)    

    //Reset contrast values for light mode.
    handleMouseLeave()
}

//Dark updates for Projects page 
const projectsDarkUpdates = () => {
    githubLogo[1].src = "./resources/github-dark-logo.png";
}
const projectsLightUpdates = () => {
    //sets html level background as site-blue
    html[0].style.backgroundColor = '#578CA9' 
    githubLogo[1].src = "./resources/github-logo.png";
}

//If a user has previously set a theme, reapply theme.
if (rememberedTheme==='true') {
    switchInput.checked = true; //reapplys checked status of slider on page reload
    theme.className = "dark";
    githubLogo[0].src = "./resources/github-dark-logo.png"; //logo in header 
    html[0].style.backgroundColor = '#000'
    if(index) indexDarkUpdates()
    if(blog) blogDarkUpdates()
    if(projects) projectsDarkUpdates()
} else {
    theme.className = "light";
    githubLogo[0].src = "./resources/github-logo.png"; //logo in header 
    if(index) indexLightUpdates()
    if(blog) blogLightUpdates()
    if(projects) projectsLightUpdates()
}

//Event listener from click. Event handler looks at the class name and changes between dark and light.
switchInput.addEventListener('click', () => {

    if(theme.className==='light'){
        theme.className = 'dark';

        githubLogo[0].src = "./resources/github-dark-logo.png"; //logo in header
        html[0].style.backgroundColor = '#000'

        if(index) indexDarkUpdates()
        if(blog) blogDarkUpdates()
        if(projects) projectsDarkUpdates()

    } else {
        theme.className = 'light';

        githubLogo[0].src = "./resources/github-logo.png";
        html[0].style.backgroundColor = '#578CA9'

        if(index) indexLightUpdates()
        if(blog) blogLightUpdates()
        if(projects) projectsLightUpdates()
    }

    //Stores theme in local storage so on a page switch theme is remembered.
    localStorage.setItem("sliderChecked", switchInput.checked)
})

//Event listeners that change contrast ratio values for accessability blog.
if(blog && theme.className==='light'){
    accessabillity.addEventListener('mouseenter', handleMouseEnter)
    accessabillity.addEventListener('mouseleave', handleMouseLeave)   
}
