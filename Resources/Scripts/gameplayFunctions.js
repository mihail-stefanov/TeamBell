// Gameplay Functions

// ==================== DEFINITIONS OF THINGS TO EXIST DURING THE GAMEPLAY ====================

var currentFigure;
var currentTime;
var previousTime;
var horizontalLines = 20;
var verticalLines = 10;
var offsetX = 200;
var offsetY = 50;
var scale = 20; // cube width/height
var matrixWidth = verticalLines * scale;
var matrixHeight = horizontalLines * scale;


function initializeGameplayElements() {
    document.getElementById("gameCanvas").setAttribute("style", "background-image: url(Resources/Images/gameplayBG.png)");
    buttons = new Array();
    previousTime = 0;
    buttons.push(new Button(740, 10, 50, 50, "gray", buttonName.exit));
    initializeGameBoard(board);
    currentFigure = generateFigure();

//    window.requestAnimationFrame(update);
}

// ==================== DEFINITIONS OF THINGS TO BE DRAWN ====================

function drawGameplayButtons() {
    // Buttons bodies        
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].draw();
    }
}

function drawScore(score) {
    context.fillStyle = 'black';
    context.fillRect(199, 30, 202, 20);
    context.font = '20px Consolas';
    context.strokeStyle = 'red';

    var output = 'Score: ' + score;
    context.strokeText(output, 280, 47);
//    context.strokeRect(); // Gives error - consider changing
}

function drawGameplayText() {
    // Buttons text
    context.fillStyle = "black";
    context.font = '35px Arial';
    context.fillText("X", 753, 47);
}

function drawCurrentFigure(figure) {
    var matrix = figure.matrix;
    var x = figure.x;
    var y = figure.y;

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (y + i < 0) {
                continue;
            }

            if (matrix[i][j] ) {
                context.fillStyle = "red";
                context.fillRect(200 + x * scale + j * scale, 50 + y * scale + i * scale, scale, scale);
            }
        }
    }
}

function initializeGameBoard(board) {
    for (var r = 0; r < rows; r++) {
        board[r] = new Array();
        for (var c = 0; c < cols; c++) {
            board[r].push(0);
        }
    }
}

// ==================== FUNCTION CALLED REPETITIVELY ====================
function update() {
    currentTime = new Date();
    if (currentTime - previousTime > 500) {
        if (CheckMove(currentFigure, currentFigure.x, currentFigure.y + 1)) {
            currentFigure.y += 1;
            redrawingIsNeeded = true;
        } else {

            currentFigure = generateFigure();
        }

        previousTime = currentTime;
    }


    //requestAnimationFrame(update);

    //
    //if (isGameOver()) {
    //    //TODO Draw game over screen
    //} else {
    //    requestAnimationFrame(update);
    //}
}

function CheckMove(figure, targetX, targetY) {
    var xPos = figure.x;
    var yPos = figure.y;

    for (var r = 0; r < figure.matrix.length; r++) {
        for (var c = 0; c < figure.matrix[r].length; c++) {
            if (figure.matrix[r][c] && r + targetY > rows - 1) {
                return false;
            }

            if (figure.matrix[r][c] && (c + targetX < 0 || c + targetX > cols - 1)) {
                return false;
            }
        }
    }

    return true;
}

function drawGamePlay() {
    if (redrawingIsNeeded) {

        context.clearRect(0, 0, width, height);

        drawGameplayButtons();

        drawCurrentFigure(currentFigure);

        drawScore(score);

        drawGameplayText();

        redrawingIsNeeded = false;
    }
}