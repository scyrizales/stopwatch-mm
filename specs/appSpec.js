describe("Stopwatch MM", function(){
    "use strict";
    it("time should return lapsed seconds",function(){
        // given
        var time = new Time();
        
        //when
        time.tick();
        
        //then
        expect(time.elapsedSeconds).toBe(1);
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

})

