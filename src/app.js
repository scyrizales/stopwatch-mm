function Time(){
    this.elapsedSeconds = 0;
    this.currentTime = new Date(1970,0,1);
}

Time.prototype.tick = function(){
    this.elapsedSeconds++;
};

Time.prototype.getTime = function(){
    return new Date(this.currentTime.getTime() + this.elapsedSeconds * 1000);
};

Time.prototype.clear = function () {
    this.elapsedSeconds = 0;
};

function CountDown() {
    Time.apply(this);
}

function helperConstructor() {}
helperConstructor.prototype = Time.prototype;
CountDown.prototype = new helperConstructor();
CountDown.prototype.constructor = CountDown;

CountDown.prototype.tick = function() {
    if (this.elapsedSeconds) {
        this.elapsedSeconds--;
    }
};

CountDown.prototype.setTime = function(seconds) {
    this.elapsedSeconds = seconds;
};



function Ticker(someTime, someInterval){
    this.time = someTime;
    this.interval = someInterval;
    this.intervalId = null;
    this.ticking = false;
}

Ticker.prototype.start = function(){
    if(this.intervalId) return;
    this.ticking = true;
    this.intervalId = this.interval(function(){
        this.time.tick();    
    }.bind(this), 1000);   
};

Ticker.prototype.stop = function(){
    this.ticking = false;
    this.interval.cancel(this.intervalId);
    this.intervalId = null;
};

function StopwatchController($scope, $interval, Ticker, Time){
    $scope.showntime = new Time();
    var ticker = $scope.ticker = new Ticker($scope.showntime, $interval);
    
    $scope.toggle = function(){
        if (ticker.ticking) {
            ticker.stop();
        } else {
            ticker.start();
        }
    };

    $scope.clear = function () {
        ticker.stop();
        $scope.showntime.clear();
    }
}

function CountdownController($scope, $interval, Ticker, CountDown){
    $scope.showntime = new CountDown();
    $scope.showntime.setTime(($scope.minutes || 18) * 60);
    var ticker = $scope.ticker = new Ticker($scope.showntime, $interval);

    $scope.toggle = function(){
        if (ticker.ticking) {
            ticker.stop();
        } else {
            ticker.start();
        }
    };

    $scope.clear = function () {
        ticker.stop();
        $scope.showntime.clear();
    };

    $scope.$watch("minutes", function(val, oldVal) {
        if (val && oldVal !== val) {
            $scope.showntime.setTime((val || 18) * 60);
        }
    })
}

// Genrar apliacion angular
angular.module("StopwatchMM", ["ngRoute"]);
angular.module("StopwatchMM").config(function ($routeProvider) {
    $routeProvider
        .when("/timer", {
            templateUrl: "/src/views/timerView.html"
        })
        .when("/countdown", {
            templateUrl: "/src/views/countdownView.html"
        })
        .when("/marshmallow", {
            templateUrl: "/src/views/marshmallowView.html"
        });
    $routeProvider.otherwise({
        redirectTo: "/timer"
    });
});
angular.module("StopwatchMM").factory("Time",function(){
    return Time;
});
angular.module("StopwatchMM").factory("CountDown",function(){
    return CountDown;
});
angular.module("StopwatchMM").factory("Ticker",function(){
    return Ticker;
});
angular.module("StopwatchMM").controller("StopwatchController",StopwatchController);
angular.module("StopwatchMM").controller("CountdownController",CountdownController);
angular.module("StopwatchMM").directive("timer", function() {
    return {
        restrict: "E",
        controller: "StopwatchController",
        templateUrl: "/src/views/stopWatchView.html",
        scope: {
            "title": "@"
        }
    };
});

angular.module("StopwatchMM").directive("countdown", function() {
    return {
        restrict: "E",
        controller: "CountdownController",
        templateUrl: "/src/views/stopWatchView.html",
        scope: {
            "title": "@",
            "minutes": "="
        }
    };
});

angular.module("StopwatchMM").directive("swNavbar", function() {
    return {
        restrict: "E",
        templateUrl: "/src/views/navbarView.html"
    };
});