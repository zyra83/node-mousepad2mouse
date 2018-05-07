var robot = require("robotjs");
var gamepad = require("gamepad");

// Speed up the mouse.
//robot.setMouseDelay(2);

var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) - 10;
var width = screenSize.width;

console.log("Screeensizse : ", screenSize)


var mouseX = 0;
var mouseY = 0;


var vectorX = 0;
var vectorY = 0;

var deadX = 0.14;
var deadY = 0.14;

calculMousePosiFromPad();
drawMouse();


function calculMousePosiFromPad() {
	setInterval(function(){ 
		var accelereation = 10;
		mouseY = mouseTrim(mouseY + vectorY * accelereation, 0, screenSize.height);
		mouseX =  mouseTrim(mouseX + vectorX * accelereation, 0, screenSize.width);
	}, 16.667);
}

function mouseTrim(value, min, max){
	if(value <= min)
		return min;

	if(value >= max)
		return max;
	return value;
}


function drawMouse() {
	setInterval(function(){ 
		robot.moveMouse(mouseX, mouseY);
	}, 16.667);
}






// Initialize the library
gamepad.init()

// List the state of all currently attached devices
for (var i = 0, l = gamepad.numDevices(); i < l; i++) {
  console.log(i, gamepad.deviceAtIndex());
}

// Create a game loop and poll for events
setInterval(gamepad.processEvents, 16);
// Scan for new gamepads as a slower rate
setInterval(gamepad.detectDevices, 500);




// Listen for move events on all gamepads

axisx = 0;
axisy = 0;
gamepad.on("move", function (id, axis, value, a, b) {

	if(axis == 0 ){
		axisx = value;
		vectorX = accelerate(undead(value, deadX));
	}
		if(axis == 1 ){
		axisy = value;
		vectorY = - accelerate(undead(value, deadY));
	} 

	console.log(Number.parseFloat(axisx).toFixed(2) + " " + Number.parseFloat(axisy).toFixed(2))
	

});


/**
* Renvoie une valeur, que si elle est au dessus du point "mort".
*/
function undead(value, dead){
	return Math.abs(value) >= dead ? value: 0;
}


function accelerate(vector){
	// return (vector)
	if(vector < 0){
		return - 1 / Math.abs(Math.log(Math.abs(vector)))
	} else {
		return 1 / Math.abs(Math.log(vector))
	}
	
}

// Listen for button up events on all gamepads
gamepad.on("up", function (id, num) {
  console.log("up", {
    id: id,
    num: num,
  });
});
// Listen for button down events on all gamepads
gamepad.on("down", function (id, num) {
  console.log("down", {
    id: id,
    num: num,
  });
});

/*
function calculMousePosiFromPadDirect() {
	setInterval(function(){ 
		mouseY = vectorY * screenSize.height / 2 + screenSize.height / 2;
		mouseX = vectorX * screenSize.width / 2 + screenSize.width / 2;
	}, 16);
}
*/