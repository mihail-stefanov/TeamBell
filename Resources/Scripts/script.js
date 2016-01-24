// Canvas dimentions: 800px by 500px
// Well dimentions: 200px by 400px
// Standard board dimentions: 10 x 20 boxes
// A figure element (box) will 20px by 20px
// Preview box is 120px by 120px

// ==================== DEFINITION OF THE SEPARATE STAGES OF THE GAME ====================

function initialize() {
    getEnvironment();

    // Initial drawing
    initializeStartScreenElements();
    drawStartScreen();

    // Drawing loop
    clearInterval(updateIntervalHandle);
    clearInterval(redrawIntervalHandle);
    redrawIntervalHandle = setInterval(drawStartScreen, redrawInterval);


    // Defining mouse events
    canvas.onmousemove = highlightButton;
    canvas.onmousedown = pressButton;
    canvas.onmouseup = releaseButton;
}

function showGameOptions() {

    // Initial drawing
    initializeOptionsScreenElements();
    drawOptionsScreen();

    // Drawing loop
    clearInterval(redrawIntervalHandle);
    redrawIntervalHandle = setInterval(drawOptionsScreen, redrawInterval);
}

function showGameHelp() {

    // Initial drawing
    initializeHelpScreenElements();
    drawHelpScreen();

    // Drawing loop
    clearInterval(redrawIntervalHandle);
    redrawIntervalHandle = setInterval(drawHelpScreen, redrawInterval);
}

function showHighScores() {

    // Initial drawing
    initializeScoresScreenElements();
    drawScoresScreen();

    // Drawing loop
    clearInterval(redrawIntervalHandle);
    redrawIntervalHandle = setInterval(drawScoresScreen, redrawInterval);
}


function beginGame() {
    // Initial drawing
    initializeGameplayElements();
    drawGamePlay();

    // Drawing loop
        clearInterval(redrawIntervalHandle);
        updateIntervalHandle = setInterval(update, updateInterval);
        redrawIntervalHandle = setInterval(drawGamePlay, redrawInterval);
    // Defining evsents
    canvas.addEventListener("keydown", moveObjects, false);
}

// ==================== PERFORMING INITIALIZATION ====================

window.onload = function() {
    initialize();
}