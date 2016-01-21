function Timer(){
    var totalseconds = 0;
    var running = 0;

    var increment = function(){
        if(running == 1){
            setTimeout(function () {
                totalseconds++;

                var min = Math.floor(totalseconds/60);
                var secs = totalseconds % 60;



                if ( min < 10 ){
                    min = "0" + min;
                }

                if ( secs < 10 ){
                    secs = "0" + secs;
                }

                document.getElementById('timer').innerHTML = min + ":" + secs;

                increment();

            },1000)
        }};

    this.startPause = function(){
        if(running == 0){
            running = 1;
            increment();
        }else{
            running = 0;
        }

    };

    this.reset = function() {
        running = 0;
        totalseconds = 0;
        document.getElementById('timer').innerHTML = '00:00';
    };
}
