describe("Stopwatch MM", function(){
    "use strict";
    it("time should return lapsed seconds",function(){
        // given
        var time = new Time();
        
        //when
        time.tick();
        
        //then
        var expectedTime = new Date(1970,0,1); 
        expect(time.currentTime.getTime()).toBe(expectedTime.getTime());
    });
    
    describe("Async behaviour", function(){
        var time, ticker;
        beforeEach(function(done) { 
            time = new Time();
            ticker = new Ticker(time);
            ticker.start();
            setTimeout(function(){
                done();
            }, 1500);
        });
        it("Ticker should notify Time that a new seconds has passed",function(){
            expect(time.elapsedSeconds).toBe(1);
            ticker.stop();            
        });
        
    })
    
    it("View shows time",inject(
        function($compile, $rootScope) {
            var template = $.ajax("/src/views/stopWatchView.html", { async: false }).responseText;
            console.log(template);
            var scope = $rootScope.$new();
            scope.showntime = 1
            var view = $compile(template)(scope);
            scope.$apply();
            var div = view.find("div");
            expect(+div.html()).toBe(1);
        }
    ))
})

