// Canvas dimentions: 800px by 500px
// Well dimentions: 200px by 400px
// Standard tetrix grid dimentions: 10 x 20 boxes
// A figure element (box) will 20px by 20px

window.onload = function() {

    // Defining common varables
    
    var canvas;
    var context;
    var width;
    var height;
    
    var redrawInterval = 20;
    
    var mouseX;
    var mouseY;
    
    var redrawingIsNeeded = true;
    
    var gameStage = 'startScreen';
    
    // Defining start screen functions
    
    function Button(x,y) {
        this.x = x;
        this.y = y;
        this.w = 300;
        this.h = 50;
        this.color = "gray";
    }
    
    var buttons = [];
    buttons.push(new Button(250,200));
    buttons.push(new Button(250,300));
    buttons.push(new Button(250,400));
    
    function drawButtons() {
        // Buttons bodies        
        for (var i = 0; i < buttons.length; i++) {
            context.fillStyle = buttons[i].color;
            context.fillRect(buttons[i].x,buttons[i].y,buttons[i].w,buttons[i].h);
        }
    }
    
    function drawText() {
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
    
    function drawStartScreen() {
        if (redrawingIsNeeded) {
            
            context.clearRect(0,0,width,height);
            
            drawButtons();
            drawText();
            
            redrawingIsNeeded = false;
        }
    }
    
    function getMousePosition(eventObject) {
        mouseX = eventObject.pageX - canvas.offsetLeft;
        mouseY = eventObject.pageY - canvas.offsetTop;
    }
    
    function highlightButton(eventObject) {
        getMousePosition(eventObject);
        
        // Looping through the buttons to find if the mouse is over one
        for (var i = 0; i < buttons.length; i++) {
            var currentButton = buttons[i];            
            var mouseOverlapsButtonOnX = mouseX > currentButton.x && mouseX < currentButton.x + currentButton.w;
            var mouseOverlapsButtonOnY = mouseY > currentButton.y && mouseY < currentButton.y + currentButton.h;
            
            if (mouseOverlapsButtonOnX && mouseOverlapsButtonOnY) {
                buttons[i].color = "orange";
                redrawingIsNeeded = true;
            } else {
                buttons[i].color = "gray";
                redrawingIsNeeded = true;
            }
        }
    }
    
    function pressButton(eventObject) {
        
        getMousePosition(eventObject);
        
        // Looping through the buttons to find if the mouse is over one
        for (var i = 0; i < buttons.length; i++) {
            var currentButton = buttons[i];            
            var mouseOverlapsButtonOnX = mouseX > currentButton.x && mouseX < currentButton.x + currentButton.w;
            var mouseOverlapsButtonOnY = mouseY > currentButton.y && mouseY < currentButton.y + currentButton.h;
            
            if (mouseOverlapsButtonOnX && mouseOverlapsButtonOnY) {
                buttons[i].color = "yellow";
                redrawingIsNeeded = true;
            }
        }
    }
    
    function releaseButton(eventObject) {
        
        getMousePosition(eventObject);
        
        // Looping through the buttons to find if the mouse is over one
        for (var i = 0; i < buttons.length; i++) {
            var currentButton = buttons[i];            
            var mouseOverlapsButtonOnX = mouseX > currentButton.x && mouseX < currentButton.x + currentButton.w;
            var mouseOverlapsButtonOnY = mouseY > currentButton.y && mouseY < currentButton.y + currentButton.h;
            
            if (mouseOverlapsButtonOnX && mouseOverlapsButtonOnY) {
                
                buttons[i].color = "orange"; // may be removed after all options are implemented
                redrawingIsNeeded = true; // may be removed after all options are implemented
                
                // BUTTON SPECIFIC CODE HERE
                if (i == 0) {
                    redrawingIsNeeded = true;
                    beginGame();
                } else if (i == 1) {
                    showOptions();
                } else if (i == 2) {
                    showInstructions();
                }
            } 
        }
    }
    
    function showOptions() {
        // To be defined
    }
    
    function showInstructions() {
        // To be defined
    }
    
    // Gameplay Functions
    
    function drawGamePlay() {
        if (redrawingIsNeeded) {
            
            context.clearRect(0,0,width,height);
            
            redrawingIsNeeded = false;
        }
        
        // DRAWING OF MATRIX AND FALLING BRICKS GO HERE
    }
    
    function beginGame() {
        canvas.onmousemove = null; // TO BE DEFINED LATER
        canvas.onmousedown = null; // TO BE DEFINED LATER
        canvas.onmouseup = null; // TO BE DEFINED LATER
        
        drawGamePlay();
        
        setInterval(drawGamePlay, redrawInterval);
    }
    
    // Defining initializing the objects and draw loop
    
    function initialize() {
        
        canvas = document.getElementById("gameCanvas");
        context = canvas.getContext("2d");
        canvas.onselectstart = function() { return false; };  // Preventing double clicking from selecting outside text
        
        width = canvas.width;
        height = canvas.height;
        
        // Initial drawing
        drawStartScreen();
                    
        // Drawing loop
        setInterval(drawStartScreen, redrawInterval);
        
        // Defining mouse events
        
        canvas.onmousemove = highlightButton;
        canvas.onmousedown = pressButton;
        canvas.onmouseup = releaseButton;
        
    }

    // PERFORMING INITIALIZATION
    initialize();
}