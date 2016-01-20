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
    context.fillText("Game Instructions:", 20, 50);

    // Buttons text
    context.font = '35px Arial';
    context.fillText("X", 753,47);
    
    // Description text
    context.font = '20px Consolas';
    context.fillText("The goal of the game is to guide the falling blocks, aiming to form a", 20,120);
    context.fillText("horizontal line of ten chained squares. Each line awards points,     ", 20,150);
    context.fillText("gets removed and the blocks above it move one square down.           ", 20,180);
    context.fillText("The game ends when the squares of the matrix approach its top.       ", 20,210);
    context.fillText("Good luck!                                                           ", 20,240);
    context.fillText("Controls:                                                            ", 20,300);
    context.fillText(" ____  ____  ____                                                    ", 20,330);
    context.fillText("|    || ↑  ||    |      ↑: \"Rotate\"                                ", 20,350);
    context.fillText("|____||____||____|                                                   ", 20,370);
    context.fillText(" ____  ____  ____       ←: \"Move Left\"                             ", 20,390);
    context.fillText("| ←  || ↓  || →  |      ↓: \"Speed down\"                            ", 20,410);
    context.fillText("|____||____||____|      →: \"Move Right\"                            ", 20,430);
    
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