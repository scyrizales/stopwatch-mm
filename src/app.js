function Time(){
    this.elapsedSeconds = 0;
    this.currentTime = new Date(1970,0,1);
}

Time.prototype.tick = function(){
    this.elapsedSeconds++;
}

Time.prototype.getTime = function(){
    this.currentTime.setSeconds(this.elapsedSeconds);
    return this.currentTime;
}


function Ticker(someTime, someInterval){
    this.time = someTime;
    this.interval = someInterval;
    this.intervalId = null;
}

Ticker.prototype.start = function(){
    if(this.intervalId) return;
    this.intervalId = this.interval(function(){
        this.time.tick();    
    }.bind(this), 1000);   
}

Ticker.prototype.stop = function(){
    this.interval.cancel(this.intervalId);
    this.intervalId = null;
}

function StopwatchController($scope, $interval, Ticker, Time){
    $scope.showntime = new Time();
    var ticker = new Ticker($scope.showntime, $interval);
    
    $scope.start = function(){
        ticker.start();
    }
    
    $scope.stop = function(){
        ticker.stop();
    }

}

// Genrar apliacion angular
angular.module("StopwatchMM", ["ngRoute"]);
angular.module("StopwatchMM").config(function ($routeProvider) {
    $routeProvider.when("/", {
        controller: "StopwatchController",
        templateUrl: "/src/views/stopWatchView.html"
    })
})
angular.module("StopwatchMM").factory("Time",function(){
    return Time;
});
angular.module("StopwatchMM").factory("Ticker",function(){
    return Ticker;
});
angular.module("StopwatchMM").controller("StopwatchController",StopwatchController);




