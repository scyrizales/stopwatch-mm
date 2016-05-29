function Time(){
    this.elapsedSeconds = 0;
}

Time.prototype.tick = function(){
    this.elapsedSeconds++;
}

function Ticker(someTime){
    this.time = someTime;
}

Ticker.prototype.start = function(){
    
}

Ticker.prototype.stop = function(){
    
}