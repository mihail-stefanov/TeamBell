// Gameplay Functions

// ==================== DEFINITIONS OF THINGS TO EXIST DURING THE GAMEPLAY ====================

//Constants
var DEFAULT_SCORE_ON_FULL_ROW = 10;

var timer;
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
var score = 0;
var currentFigureColor;

var rows = 20;
var cols = 10;
var board = [];

var gameIsPaused = false;

function initializeGameBoard(board) {
    for (var r = 0; r < rows; r++) {
        board[r] = new Array();
        for (var c = 0; c < cols; c++) {
            board[r].push(0);
        }
    }
}

function initializeGameplayElements() {
    timer = new Timer();
    timer.startPause();
    document.getElementById("gameCanvas").setAttribute("style", "background-image: url(Resources/Images/gameplayBG.png)");
    buttons = new Array();
    buttons.push(new Button(740, 10, 50, 50, "gray", buttonName.exit));
    buttons.push(new Button(680, 10, 50, 50, "gray", buttonName.pause));
    previousTime = 0;
    initializeGameBoard(board);
    currentFigure = generateFigure();

//    window.requestAnimationFrame(update);
}

// ==================== DEFINITIONS OF THINGS TO BE UPDATED ====================


function checkMove(figure, targetX, targetY) {
    var checkX;
    var checkY;

    for (var r = 0; r < figure.matrix.length; r++) {
        for (var c = 0; c < figure.matrix[r].length; c++) {
            checkX = c + targetX;
            checkY = r + targetY;
            if (figure.matrix[r][c]) {
                if (checkX < 0 || checkX >= cols || checkY >= rows) {
                    return false;
                } else {
                    if (checkY > 0 && board[checkY][checkX]) {
                        return false;
                    }
                }
            }
        }
    }

    return true;
}

function fillBoard(figure) {
    var x = figure.x;
    var y = figure.y;
    for (var r = 0; r < figure.matrix.length; r++) {
        for (var c = 0; c < figure.matrix[r].length; c++) {
            if (figure.matrix[r][c]) {
                board[y + r][x + c] = figure.color;
            }
        }
    }

    CheckLines();
}

function CheckLines() {
    var fullRow = true;
    var lastRow = rows - 1;
    for (var i = lastRow; i >= 0; i--) {
        fullRow = true;

        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] === 0) {
                fullRow = false;
                break;
            }
        }

        if (fullRow) {
            moveDown(i);
            score += DEFAULT_SCORE_ON_FULL_ROW;
            redrawingIsNeeded = true;
        }
    }
}

function moveDown(row) {
    while (row > 0) {
        for (var i = 0; i < cols; i++) {
            board[row][i] = board[row - 1][i];
        }

        row--;
    }
}


function pauseGame() {
    //Changing pause state
    gameIsPaused = !gameIsPaused;
    //Clearing the || sign to change to play
    context.clearRect(680,10,50,50);
    context.fillStyle = 'gray';
    context.fillRect(680,10,50,50);
    context.fillStyle = 'black';
    //UNICODE play symbol
    context.fillText("\u25BA", 690, 48);

    //annotation
    context.font = '25px Consolas';
    context.fillText("GAME IS PAUSED", 205, 130);
    //setting font back to normal
    context.font = '35px Consolas';
}

// ==================== DEFINITIONS OF THINGS TO BE DRAWN ====================

function drawScore(score) {
    context.fillStyle = 'black';
    context.fillRect(199, 30, 202, 20);
    context.font = '20px Consolas';
    context.strokeStyle = 'red';

    var output = 'Score: ' + score;
    context.strokeText(output, 280, 47);
//    context.strokeRect(); // Gives error - consider changing
}

function drawGameBoard() {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j]) {
                context.fillStyle = "white";
                context.fillRect(200 + j * scale, 50 + i * scale, scale, scale);
                context.strokeStyle = "black";
                context.strokeRect(200 + j * scale, 50 + i * scale, scale, scale);
            }
        }
    }
}

function drawGameplayText() {
    // Buttons text
    context.fillStyle = "black";
    context.font = '35px Arial';
    context.fillText("X", 753, 47);
    context.fillText("||", 695, 45);
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

            if (matrix[i][j]) {
                context.fillStyle = figure.color;
                context.fillRect(offsetX + x * scale + j * scale, offsetY + y * scale + i * scale, scale, scale);
                context.strokeStyle = "black";
                context.strokeRect(offsetX + x * scale + j * scale, offsetY + y * scale + i * scale, scale, scale);
                currentFigureColor = figure.color;

            }
        }
    }
}

// ==================== FUNCTIONS CALLED REPETITIVELY ====================

function update() {
    currentTime = new Date();
    if (currentTime - previousTime > 500 && !gameIsPaused) {
        if (checkMove(currentFigure, currentFigure.x, currentFigure.y + 1)) {
            currentFigure.y += 1;
            redrawingIsNeeded = true;
        } else {
            fillBoard(currentFigure);
            currentFigure = generateFigure();
        }

        previousTime = currentTime;
    }

    //
    //if (isGameOver()) {
    //    //TODO Draw game over screen
    //} else {
    //    requestAnimationFrame(update);
    //}
}

function drawGamePlay() {
    if (redrawingIsNeeded && !gameIsPaused) {

        context.clearRect(0, 0, width, height);

        drawButtons();

        drawGameBoard();

        drawCurrentFigure(currentFigure);

        drawScore(score);

        drawGameplayText();

        redrawingIsNeeded = false;
    }
}