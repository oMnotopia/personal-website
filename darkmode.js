//Changes between dark mode and light mode, using the slider bar in the header.
//Global variables
const sliderMode = document.getElementById('slider');
const theme = document.getElementById('theme')

//Event listener from click. Event handler looks at the class name and changes between dark and light.
sliderMode.addEventListener('click', () => {
    if(theme.className==='light'){
        theme.className = 'dark';
    } else {
        theme.className = 'light';
    }
    console.log(theme)
})

