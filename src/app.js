function Time(){
    this.elapsedSeconds = 0;
}

Time.prototype.tick = function(){
    this.elapsedSeconds++;
}

function Ticker(someTime){
    this.time = someTime;
    this.interval = null;
}

Ticker.prototype.start = function(){
    if(this.interval) return;
    this.interval = setInterval(function(){
        this.time.tick();    
    }.bind(this),1000);   
}

Ticker.prototype.stop = function(){
    clearInterval(this.interval);
    this.interval = null;
}

function stopwatchController(){
}