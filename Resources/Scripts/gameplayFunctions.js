// Gameplay Functions

// ==================== DEFINITIONS OF THINGS TO EXIST DURING THE GAMEPLAY ====================

// Constants

var offsetX = 200;
var offsetY = 50;
var scale = 20; // cube width/height
var rows = 20;
var cols = 10;
var board = [];

var DEFAULT_SCORE_ON_FULL_ROW = 10;

var playerName = "";
var score = 0;

var gameIsPaused = false;
var gameOverReached = false;

var timer;
var currentFigure;
var currentTime;
var previousTime;
var currentFigureColor;

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
    gameIsPaused = false;
    
    document.getElementById("gameCanvas").setAttribute("style", "background-image: url(Resources/Images/gameplayBG.png)");
    
    buttons = new Array();
    buttons.push(new Button(740, 10, 50, 50, "gray", buttonName.exit));
    buttons.push(new Button(680, 10, 50, 50, "gray", buttonName.pause));
    
    previousTime = 0;
    initializeGameBoard(board);
    currentFigure = generateFigure();
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
}

// ==================== SHOW SCORE SUBMISSION BOX FUNCTIONS ====================

function addCurrentScoreToHighScores(currentName, currentScore) {
    var currentPlayerAndScore = {};
    currentPlayerAndScore.name = currentName;
    currentPlayerAndScore.score = currentScore;
    
    scores.push(currentPlayerAndScore);
    scores.sort(function(a,b) {
        return b.score - a.score;
    });
    scores.splice(scores.length - 1, 1);
}

function showScoreSubmissionBox() {

    clearInterval(updateIntervalHandle);
    clearInterval(redrawIntervalHandle);
    
    buttons = new Array();
    redrawingIsNeeded = true;
    gameOverReached = false;
    document.getElementById("scoreSubmissionBox").setAttribute("style", "display: inherit");
    
    document.getElementById("scoreText").innerHTML = "Your score is: " + score;
    
    document.getElementById("scoreSubmitButton").onclick = function() {
        var nameWritten = document.getElementById("nameBox").value;
        addCurrentScoreToHighScores(nameWritten, score);
        document.getElementById("scoreSubmissionBox").setAttribute("style", "display: none");
        showHighScores();
    }
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
                context.fillStyle = board[i][j]
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
    
    if (!gameIsPaused) {
        context.fillText("||", 695, 45);
    } else {
        //UNICODE play symbol
        context.fillText("\u25BA", 690, 48);

        //annotation
        context.font = '25px Consolas';
        context.fillText("GAME IS PAUSED", 205, 130);
    }
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

function isGameOver() {
    if (currentFigure.y < 0) {
        //console.log('game over');
        return true;
    } else {
        return false;
    }
}

// ==================== FUNCTIONS CALLED REPETITIVELY ====================

function update() {
    currentTime = new Date();
    if (currentTime - previousTime > velocity && !gameIsPaused) {
        if (checkMove(currentFigure, currentFigure.x, currentFigure.y + 1)) {
            currentFigure.y += 1;
            redrawingIsNeeded = true;
        } else {
            gameOverReached = isGameOver();

            fillBoard(currentFigure);
            currentFigure = generateFigure();
        }

        previousTime = currentTime;
    }
    
    if (gameOverReached) {
        showScoreSubmissionBox();
    }
}

function drawGamePlay() {
    if (redrawingIsNeeded) {

        context.clearRect(0, 0, width, height);

        drawButtons();

        drawGameBoard();

        drawCurrentFigure(currentFigure);

        drawScore(score);

        drawGameplayText();

        redrawingIsNeeded = false;
    }
}