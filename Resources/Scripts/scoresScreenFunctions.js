// Scores Screen Functions

// ==================== DEFINITIONS OF THINGS TO EXIST ON THE SCORES SCREEN ====================

// Extracting the scores from a JSON file via AJAX
var scores;

var dataRequest = new XMLHttpRequest();

dataRequest.onreadystatechange = function() {
    if(dataRequest.readyState == 4 && dataRequest.status === 200) {
        scores = JSON.parse(dataRequest.responseText);
    }
};

// Performed only once when the game is loaded so that a new score can be added by the current player
dataRequest.open("GET", "Resources/Data/scores.json", false); // not asynchronous
dataRequest.send(null); // Sending the request without any parameters

function initializeScoresScreenElements() {
    buttons = new Array();
    buttons.push(new Button(740,10,50,50,"gray", buttonName.exit));
}

// ==================== DEFINITIONS OF THINGS TO BE DRAWN ====================

function drawScoresScreenButtons() {
    // Buttons bodies        
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].draw();
    }
}

function drawScoresScreenText() {
    // Title text
    context.fillStyle = "black";
    context.font = '45px Consolas';
    context.fillText("High Scores:", 20, 50);

    // Buttons text
    context.font = '35px Arial';
    context.fillText("X", 753,47);
    
    // High Scores Table
        // To be defined
    
}

function drawScores() { 
    context.font = 'bold 25px Consolas';
    
    context.fillStyle = "rgb(224, 224, 224)";
    context.fillRect(75, 83, 615, 40);
    context.fillStyle = "black";
    context.fillText("No.", 100, 110);
    context.fillText("Name", 200, 110);
    context.fillText("Score", 600, 110);
    
    context.font = '25px Consolas';
    for (var i = 0; i < scores.length; i++) {
        
        // Drawing a darker background every even line
        if (i % 2 == 0) {
            context.fillStyle = "rgb(154, 154, 154)";
        } else {
            context.fillStyle = "rgb(224, 224, 224)";
        }
        context.fillRect(75, 83 + (i + 1) * 35, 615, 35);
        
        context.fillStyle = "black";
        var currentPlace = Number(i + 1) + ".";
        context.fillText(currentPlace, 100, 110 + (i + 1) * 35);
        context.fillText(scores[i].name, 200, 110 + (i + 1) * 35);
        context.fillText(scores[i].score, 600, 110 + (i + 1) * 35);
    }
}

// ==================== FUNCTION CALLED REPETITIVELY ====================

function drawScoresScreen() {
    if (redrawingIsNeeded) {
        context.clearRect(0,0,width,height);

        drawScoresScreenButtons();
        
        drawScoresScreenText();
        
        drawScores();

        redrawingIsNeeded = false;
    }
}