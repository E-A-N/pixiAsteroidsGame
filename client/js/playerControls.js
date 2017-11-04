// var _keys = {};
// kUp = keyboard(38);
// kDn = keyboard(40);
// kLf = keyboard(37);
// kRt = keyboard(39);

var playerControls = function(ship){
    var kUp = keyboard(38);
    var kDn = keyboard(40);
    var kLf = keyboard(37);
    var kRt = keyboard(39);
    console.log("keys are running!!")
    kUp.press = function(){
        //pressing up
        ship.vy = -ship.spd;
    }
    kUp.release = function(){
        if (!kDn.isDown) {
            ship.vy = 0;
        }
    }
    kDn.press = function(){
        ship.vy = ship.spd;
    }
    kDn.release = function(){
        if (!kUp.isDown) {
            ship.vy = 0;
        }
    }
    kLf.press = function(){
        ship.vx = -ship.spd;
    }
    kLf.release = function(){
        if (!kRt.isDown) {
            ship.vx = 0;
        }
    }
    kRt.press = function(){
        ship.vx = ship.spd;
    }
    kRt.release = function(){
        if (!kLf.isDown) {
            ship.vx = 0;
        }
    }

}
