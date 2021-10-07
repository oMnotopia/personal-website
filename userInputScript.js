//Global Variables
//Vars to get HTML elements
const startButton = document.getElementById('start')
const currentScore = document.getElementById('current-score')
const bestScore = document.getElementById('best-score')
const submitBtn = document.getElementById('btn')
const doorParentID = document.getElementById('door-rows')

//Vars for image paths
const botDoorPath = "file:///C:/Users/persi/JavascriptProjects/CC-ChoreDoor/resources/robot.png"
const beachDoorPath = "file:///C:/Users/persi/JavascriptProjects/CC-ChoreDoor/resources/beach.png"
const spaceDoorPath = "file:///C:/Users/persi/JavascriptProjects/CC-ChoreDoor/resources/space.png"
const closedDoorPath = "file:///C:/Users/persi/JavascriptProjects/CC-ChoreDoor/resources/closed_door.png"

//Vars for javascript interactivity
let numClosedDoors = 0; //starts with a blank setup, no doors
let numberOfRobots = 1;
let maxNumOfDoors = 8; //max number of doors a user can have on screen, works up to large numbers
let minNumOfDoors = 2; //minimum number of doors
let userInputOfDoors;
let storedUserInputofDoors; 
let currentlyPlaying = false;
let currentWinCounter = 0;
let bestWinCounter = 0;
let regex = /(?<!.)[0-9](?!.)/;//no character can come before a digit 0-9 or afterwards

//Functions
//Checks to see if the user has opened a door with the robot.
const isBot = door => {
    return (door.src===botDoorPath) ? true:false;
}

//Makes sure each door is only clickable once.
const isClicked = door => {
    return (door.src===closedDoorPath) ? false:true;
}

//Reduces numClosedDoors every time a door is clicked so when it hits 0 there is a winner.
const playDoor = door => {
    numClosedDoors--;
    if(numClosedDoors===0) {
        gameOver('win')
    } else if(isBot(door)===true) {
        gameOver('lose')
    };
}

//Assigns a random image to each door as the door is clicked.
const randomChoreDoorGenerator = () => {
    submitBtn.style.display = 'none'//Hide submit button (redisplays when new round is started)
    //If only one door left assign robot
    if ((numberOfRobots===numClosedDoors)&&(numberOfRobots!==0)) {
        return botDoorPath;
    } else { //assign either space door or robot, more doors = lower chance of robot.
        let choreDoor = Math.floor(Math.random()*numClosedDoors);
        if ((choreDoor===1)&&(numberOfRobots!==0)) {
            numberOfRobots--
            return botDoorPath;  
        } else {
            return spaceDoorPath;
        }
    }
}

//Takes user input from submit button and allows for use when game is restarted.
const storedUserInput = (userInputOfDoors) => {
    //Stores value
    if(userInputOfDoors){
        storedUserInputofDoors = userInputOfDoors
    }
    //Retrieves value
    if(!userInputOfDoors){
        return storedUserInputofDoors
    }
}

//Restarts the game based off previous input value the user supplied.
const startRound = () => {
    //Reset necessary values for new start to game.
    currentlyPlaying=true;
    submitBtn.style.display = ''//Redisplay submit button (hides when door is clicked)
    startButton.innerHTML = 'Good Luck!'
    numberOfRobots = 1;
    numClosedDoors = storedUserInput()//Gets stored input.

    //Getting door image nodes and turning them into an array for manipulation.
    let childOfDoors = doorParentID.childNodes;
    let ChildOfDoorsArray = Array.from(childOfDoors)
    //Resets doors to blank and reassigns event listeners based off previous number of doors.
    ChildOfDoorsArray.forEach(element => {
        element.setAttribute("src", closedDoorPath) 
        element.addEventListener('click', () => {
            if((isClicked(element)===false)&&(currentlyPlaying===true)) {
                element.src = randomChoreDoorGenerator();
                playDoor(element);     
            }
        })  
    })
}

//Called when lose or win condition from playDoor() is met.
const gameOver = status => {
    //Changes the score counters based off win or lose.
    if(status==='win') {
        currentWinCounter++;
        if(currentWinCounter>bestWinCounter){
            bestWinCounter=currentWinCounter;
        }
        bestScore.innerHTML = bestWinCounter;
        currentScore.innerHTML = currentWinCounter;
        startButton.innerHTML = 'You win! Play again?'
    }else if(status==='lose'){
        currentWinCounter = 0;
        currentScore.innerHTML = currentWinCounter;
        startButton.innerHTML = 'You Lose! Play again?'
    }
    currentlyPlaying = false; //Reset playing flag to false
}

function howManyDoors(ev) {
    ev.preventDefault();//stops the form submitting
    
    //Value input from user
    userInputOfDoors = document.getElementById('numOfDoors').value
    //Compares user input to regex set in global variables, if not equal to the regex then user has 
    //entered something that is not a number between 0-9, and function exits.
    if(!regex.test(userInputOfDoors)) return; 

    //Sets variable for how many doors there currently are based off existing child nodes of a parent node.
    let childOfDoors = doorParentID.childNodes;

    //Needs to be converted from str to num in order for addition below.
    numClosedDoors = parseInt(numClosedDoors,  10)
    userInputOfDoors = parseInt(userInputOfDoors, 10)

    //If user enters a value less than two, raise to two, or more than ten, lower to then.
    if(userInputOfDoors<minNumOfDoors) userInputOfDoors=minNumOfDoors;//Min & Max defined in global vars
    if(userInputOfDoors>maxNumOfDoors) userInputOfDoors=maxNumOfDoors;

    //Stores user input in a function for next round
    storedUserInput(userInputOfDoors)

    //Numeric values to decide how many loops are needed to complete addition/subtraction of door elements.
    let addOrSubtractDoors = userInputOfDoors-childOfDoors.length
    let newDoorID = numClosedDoors+1
    let removeDoorID = Math.abs(numClosedDoors)
    numClosedDoors = userInputOfDoors;

    currentlyPlaying=true;
    //Determines if doors are going to be added/subtracted/or nothing done.
    if (addOrSubtractDoors===0) return
    //If doors added, then create nodes, assign attributes, and event listeners.
    if (addOrSubtractDoors>0) {
        while(addOrSubtractDoors!==0) {

            let newDoor = document.createElement("img")
            let newDoorNumber = doorParentID.appendChild(newDoor)

            newDoorNumber.setAttribute("id", "door"+newDoorID)
            newDoorNumber.setAttribute("class", "door-frame")
            newDoorNumber.setAttribute("src", closedDoorPath)
            newDoorNumber.addEventListener('click', () => {
                if((isClicked(newDoorNumber)===false)&&(currentlyPlaying===true)) {
                    newDoorNumber.src = randomChoreDoorGenerator(addOrSubtractDoors);
                    playDoor(newDoorNumber);     
                }
            })
            //Variables to adjust for loop increase and door class names.
            addOrSubtractDoors--
            newDoorID++;
        }
    //If doors removed, remove nodes containing doors.    
    } else {
        while(addOrSubtractDoors!==0) {

            let removeDoor = document.getElementById("door"+removeDoorID)
            doorParentID.removeChild(removeDoor)

            addOrSubtractDoors++
            removeDoorID--
        }  
    }
}

//Event Listeners
//Event listener 'click', starts/restarts the game.
startButton.addEventListener('click', () => {
    if(currentlyPlaying===false) startRound();
})


//Event listener 'click' on form button that user submits.
submitBtn.addEventListener('click', howManyDoors)


