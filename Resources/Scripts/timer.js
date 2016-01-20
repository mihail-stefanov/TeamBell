function Timer(){
    this._time = 0;
    this._running = 0;
}

Timer.prototype.startPause = function(){
    if(this._running == 0){
        this._running = 1;
        this._increment();
    }else{
        this._running = 0;
    }
};

Timer.prototype.reset = function() {

};

Timer.prototype._increment = function(){

};