// Help Screen Functions

// ==================== DEFINITIONS OF THINGS TO EXIST ON THE HELP SCREEN ====================

function initializeHelpScreenElements() {
    buttons = new Array();
    buttons.push(new Button(740,10,50,50,"gray", buttonName.exit));
}

// ==================== DEFINITIONS OF THINGS TO BE DRAWN ====================

function drawHelpScreenButtons() {
    // Buttons bodies        
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].draw();
    }
}

function drawHelpScreenText() {
    // Title text
    context.fillStyle = "black";
    context.font = '45px Consolas';
    context.fillStyle = "black";
    context.fillText("Game Instructions:", 20, 50);

    // Buttons text
    context.fillStyle = "black";
    context.font = '35px Arial';
    context.fillText("X", 753,47);
    
    // Description text
}

// ==================== FUNCTION CALLED REPETITIVELY ====================

function drawHelpScreen() {
    if (redrawingIsNeeded) {
        context.clearRect(0,0,width,height);

        drawHelpScreenButtons();
        
        drawHelpScreenText();

        redrawingIsNeeded = false;
    }
}