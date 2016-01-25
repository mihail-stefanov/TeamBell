// Options Screen Functions

// ==================== DEFINITIONS OF THINGS TO EXIST ON THE OPTIONS SCREEN ====================

function initializeOptionsScreenElements() {
    buttons = new Array();
    buttons.push(new Button(740,10,50,50,"gray", buttonName.exit));
    buttons.push(new Button(200,200,50,50,"gray", buttonName.easy));
    buttons.push(new Button(200,300,50,50,"gray", buttonName.normal));
    buttons.push(new Button(200,400,50,50,"gray", buttonName.hard));
}

// ==================== DEFINITIONS OF THINGS TO BE DRAWN ====================

function drawOptionsScreenText() {
    // Title text
    context.fillStyle = "black";
    context.font = '45px Consolas';
    context.fillStyle = "black";
    context.fillText("Choose difficulty:", 100, 150);

    // Buttons text
    context.fillStyle = "black";
    context.font = '35px Consolas';
    context.fillText("Easy", 270, 237);
    context.fillText("Normal", 270, 337);
    context.fillText("Hard", 270, 437);
    context.font = '35px Arial';
    context.fillText("X", 753,47);
    
    switch(chosenDifficulty) {
        case difficultyOptions.easy:
            context.fillText("✔", 212,238);
            velocity = 500;
            break;
        case difficultyOptions.normal:
            context.fillText("✔", 212,338);
            velocity = 350;
            break;
        case difficultyOptions.hard:
            context.fillText("✔", 212,438);
            velocity = 200;
            break;
        default:
    }
}

// ==================== FUNCTION CALLED REPETITIVELY ====================

function drawOptionsScreen() {
    if (redrawingIsNeeded) {
        context.clearRect(0,0,width,height);

        drawButtons();
        
        drawOptionsScreenText();

        redrawingIsNeeded = false;
    }
}