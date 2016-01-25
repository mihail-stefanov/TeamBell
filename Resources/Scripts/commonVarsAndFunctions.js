// ==================== DEFINITION OF COMMON VARIABLES ====================

var canvas;
var context;
var width;
var height;

var redrawingIsNeeded = true;

var updateInterval = 20;
var updateIntervalHandle = setInterval(null, updateInterval);

var redrawInterval = 20;
var redrawIntervalHandle = setInterval(null, redrawInterval);

var difficultyOptions = {easy: 'easy', normal: 'normal', hard: 'hard'};
var chosenDifficulty = difficultyOptions.normal;
var velocity = 350;

function getEnvironment() {
    canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d");
    
    canvas.onselectstart = function () {
        return false;
    };  // Preventing double clicking from selecting outside text

    width = canvas.width;
    height = canvas.height;
}

// ==================== DEFINITION OF COMMON GAMEPLAY VARIABLES ====================

// Scores extracted from a JSON file via AJAX
var scores = [];
var scoresObtained = false;
var unableToObtainScores = false;

var dataRequest;

try {
    dataRequest = new XMLHttpRequest();

    dataRequest.onreadystatechange = function() {

        if(dataRequest.readyState == 4 && dataRequest.status === 200) {
            scores = JSON.parse(dataRequest.responseText);
            scoresObtained = true;
        } else {
            unableToObtainScores = true;
        }

        redrawingIsNeeded = true;
    };

    // Performed only once when the game is loaded so that a new score can be added by the current player
    dataRequest.open("GET", "https://raw.githubusercontent.com/mihail-stefanov/TeamBell/master/Resources/Data/scores.json", true);
    dataRequest.send(null);

} catch(err) {
    unableToObtainScores = true;
    redrawingIsNeeded = true;
}


// ==================== DEFINITION OF MOUSE POSITION FOR WORK WITH BUTTONS ====================

var mouseX;
var mouseY;

function getMousePosition(eventObject) {
    mouseX = eventObject.pageX - canvas.offsetLeft;
    mouseY = eventObject.pageY - canvas.offsetTop;
}

// ==================== DEFINITION OF BUTTONS AND THEIR BEHAVIOUR ====================

function Button(x, y, w, h, color, name) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.name = name;
    this.draw = function () {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    };
}

var buttonName = {
    play: "play",
    options: "options",
    help: "help",
    highScores: "highScores",
    exit: "exit",
    pause: "pause",
    easy: "easy",
    normal: "normal",
    hard: "hard"
};

var buttons = [];

function drawButtons() {
    // Buttons bodies        
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].draw();
    }
}

// ==================== BUTTON FUNCTIONS CALLED ON MOUSE EVENTS ====================

function highlightButton(eventObject) {
    getMousePosition(eventObject);

    // Looping through the buttons to find if the mouse is over one
    for (var i = 0; i < buttons.length; i++) {
        var currentButton = buttons[i];
        var mouseOverlapsButtonOnX = mouseX > currentButton.x && mouseX < currentButton.x + currentButton.w;
        var mouseOverlapsButtonOnY = mouseY > currentButton.y && mouseY < currentButton.y + currentButton.h;

        if (mouseOverlapsButtonOnX && mouseOverlapsButtonOnY) {
            if (buttons[i].color == "gray") {
                buttons[i].color = "orange";
                redrawingIsNeeded = true;
                console.log("redrawing");
            }
        } else if (buttons[i].color == "orange") {
            buttons[i].color = "gray";
            redrawingIsNeeded = true;
            console.log("redrawing");
        }
    }
}

function pressButton(eventObject) {

    getMousePosition(eventObject);

    // Looping through the buttons to find if the mouse is over one
    for (var i = 0; i < buttons.length; i++) {
        var currentButton = buttons[i];
        var mouseOverlapsButtonOnX = mouseX > currentButton.x && mouseX < currentButton.x + currentButton.w;
        var mouseOverlapsButtonOnY = mouseY > currentButton.y && mouseY < currentButton.y + currentButton.h;

        if (mouseOverlapsButtonOnX && mouseOverlapsButtonOnY) {
            buttons[i].color = "yellow";
            redrawingIsNeeded = true;
        }
    }
}

function releaseButton(eventObject) {

    getMousePosition(eventObject);

    // Looping through the buttons to find if the mouse is over one
    for (var i = 0; i < buttons.length; i++) {
        var currentButton = buttons[i];
        var mouseOverlapsButtonOnX = mouseX > currentButton.x && mouseX < currentButton.x + currentButton.w;
        var mouseOverlapsButtonOnY = mouseY > currentButton.y && mouseY < currentButton.y + currentButton.h;

        if (mouseOverlapsButtonOnX && mouseOverlapsButtonOnY) {

            buttons[i].color = "orange";
            redrawingIsNeeded = true;

            // BUTTON SPECIFIC CODE HERE

            switch (buttons[i].name) {

                case buttonName.play:
                    beginGame();
                    break;

                case buttonName.options:
                    showGameOptions();
                    break;

                case buttonName.help:
                    showGameHelp();
                    break;

                case buttonName.highScores:
                    showHighScores();
                    break;

                case buttonName.exit:
                    initialize();
                    break;

                case buttonName.pause:
                    pauseGame();
                    break;

                case buttonName.easy:
                    chosenDifficulty = difficultyOptions.easy;
                    break;

                case buttonName.normal:
                    chosenDifficulty = difficultyOptions.normal;
                    break;

                case buttonName.hard:
                    chosenDifficulty = difficultyOptions.hard;
                    break;

                default:
            }
        }
    }
}

// ==================== KEY FUNCTION CALLED ON KEY EVENTS ====================

var moveObjects = function (eventObject) {
    switch (eventObject.keyCode) {
        case 37:
            // left key pressed
            if (checkMove(currentFigure, currentFigure.x - 1, currentFigure.y)) {
                currentFigure.x -= 1;
            }

            break;
            
        case 38:
            // up key pressed
            currentFigure.matrix = currentFigure.rotate();
            break;
            
        case 39:
            // right key pressed
            if (checkMove(currentFigure, currentFigure.x + 1, currentFigure.y)) {
                currentFigure.x += 1;
            }

            break;
            
        case 40:
            //velocity /=10;
            // down key pressed
            break;
    }


    redrawingIsNeeded = true;
}