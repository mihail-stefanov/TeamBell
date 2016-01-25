function Timer() {
    var totalseconds = 0;
    
    var minutes = "00";
    var seconds = "00";
    
    var running = false;
    
    var addingTimeIntervalHandle = setInterval(null, 1000);
    
    this.toString = function() {
        return minutes + ":" + seconds;
    }
    
    this.getTotalSeconds = function() {
        return totalseconds;
    }
        
    var increment = function() {
        totalseconds++;
        minutes = Math.floor(totalseconds/60);
        seconds = totalseconds % 60;
        
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        
        redrawingIsNeeded = true;
    };

    this.start = function() {
        if (!running) {
            running = true;
            addingTimeIntervalHandle = setInterval(increment, 1000);
        } 

    };
    
     this.pause = function() {
        if (running) {
            running = false;
            clearInterval(addingTimeIntervalHandle);
        }
    };

    this.reset = function() {
        running = false;
        totalseconds = 0;
        minutes = "00";
        seconds = "00";
        clearInterval(addingTimeIntervalHandle);
    };
}
