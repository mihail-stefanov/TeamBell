// Start Screen Functions

// ==================== DEFINITIONS OF THINGS TO EXIST ON THE START SCREEN ====================

function initializeStartScreenElements() {
    buttons = new Array();
    buttons.push(new Button(250,200,300,50,"gray", buttonName.play));
    buttons.push(new Button(250,300,300,50,"gray", buttonName.options));
    buttons.push(new Button(250,400,300,50,"gray", buttonName.help));
}

// ==================== DEFINITIONS OF THINGS TO BE DRAWN ====================

function drawStartScreenButtons() {
    // Buttons bodies        
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].draw();
    }
}

function drawStartScreenText() {
    // Title text
    context.fillStyle = "black";
    context.font = '90px Consolas';
    context.fillStyle = "black";
    context.fillText("Falling Blocks", 50, 115);

    // Buttons text
    context.fillStyle = "black";
    context.font = '35px Consolas';
    context.fillText("PLAY", 360, 237);
    context.fillText("Options", 335, 337);
    context.fillText("Instruction", 295, 437);
}

// ==================== FUNCTION CALLED REPETITIVELY ====================

function drawStartScreen() {
    if (redrawingIsNeeded) {

        context.clearRect(0,0,width,height);

        drawStartScreenButtons();
        
        drawStartScreenText();

        redrawingIsNeeded = false;
    }
}
