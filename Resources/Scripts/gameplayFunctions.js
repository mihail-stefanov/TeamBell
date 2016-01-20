// Gameplay Functions

// ==================== DEFINITIONS OF THINGS TO BE EXIST ON THE OPTIONS SCREEN ====================

function initializeGameplayElements() {
    buttons = new Array();
}

// ==================== DEFINITIONS OF THINGS TO BE DRAWN ====================

function drawMatrix() {
    // Drawing the matrix background
    context.fillStyle = "darkgray";
    context.fillRect(200,50,200,400);

    // Drawing the matrix lines
    var horizontalLines = 20;
    var verticalLines = 10;
    var offsetX = 200;
    var offsetY = 50;
    var scale = 20; // cube width/height
    var matrixWidth = verticalLines * scale;
    var matrixHeight = horizontalLines * scale;

    context.strokeStyle = "#a0a0a0";
    for (var i = 1; i <= verticalLines - 1; i++) {
        context.moveTo(offsetX + i * scale, offsetY + 0 * scale);
        context.lineTo(offsetX + i * scale, offsetY + matrixHeight);
        context.stroke();
    }
    for (var i = 1; i <= horizontalLines - 1; i++) {
        context.moveTo(offsetX + 0 * scale, offsetY + i * scale);
        context.lineTo(offsetX + matrixWidth, offsetY + i * scale);
        context.stroke();
    }

    context.strokeStyle = "black";
    context.strokeRect(offsetX, offsetY, scale * verticalLines, scale * horizontalLines);
}

function drawScore(score) {
    context.fillStyle = 'black';
    context.fillRect(199,30,202,20);
    context.font = '20px Consolas';
    context.strokeStyle = 'red';

    var output = 'Score: ' + score;
    context.strokeText(output, 280, 47);
//    context.strokeRect(); // Gives error - consider changing
}



// ==================== FUNCTION CALLED REPETITIVELY ====================

function drawGamePlay() {
    
    if (redrawingIsNeeded) {

        context.clearRect(0,0,width,height);

        drawMatrix();
        
        drawScore(score);

        redrawingIsNeeded = false;
    }
}