// Scores Screen Functions

// ==================== DEFINITIONS OF THINGS TO EXIST ON THE SCORES SCREEN ====================

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

// ==================== FUNCTION CALLED REPETITIVELY ====================

function drawScoresScreen() {
    if (redrawingIsNeeded) {
        context.clearRect(0,0,width,height);

        drawScoresScreenButtons();
        
        drawScoresScreenText();

        redrawingIsNeeded = false;
    }
}