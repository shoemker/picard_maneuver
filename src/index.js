const GameView = require("./game_view");
const Utils = require("./utils");

document.addEventListener("DOMContentLoaded", function () {
	const canvasEl = document.getElementsByTagName("canvas")[0];
	canvasEl.width = Utils.getCanvasDim()[0];
	canvasEl.height = Utils.getCanvasDim()[1];
	const ctx = canvasEl.getContext("2d");

	// sounds
	const audioCtx = new AudioContext();
	const gainNode = audioCtx.createGain();
	gainNode.gain.value = .25;
	// gainNode.gain.value = 0;

	let gv = new GameView(ctx, audioCtx, {
			phasSound: getSound("phaser", audioCtx, gainNode), 
			disruptSound: getSound("disruptor", audioCtx, gainNode), 
			disrupt2Sound: getSound("disruptor2", audioCtx, gainNode), 
			kTorpSound: getSound("klingonTorpedo", audioCtx, gainNode), 
			torpSound: getSound("torpedo", audioCtx, gainNode),	
			exploSound: getSound("explosion", audioCtx, gainNode), 
			theme: getSound("theme", audioCtx, gainNode)
		});

	gv.start();

	// this block is for the events for the user to draw a ship
	let draw = false;
	canvasEl.addEventListener('mousedown', () => { 
		draw = true; 
	});
	canvasEl.addEventListener('mousemove', (e) => {
		if (gv.userDraw != null && draw) gv.userDraw.drawFromUser(e);
	});
	canvasEl.addEventListener('mouseup', () => {
		draw = false;
		if (gv.userDraw != null) gv.userDraw.setPrevToNull();
	});


	canvasEl.addEventListener("click", (e) => {

		gv.checkClick(e, gainNode);
		// console.log("x = " + e.pageX, "y = " + e.pageY);
	});


	window.addEventListener('keydown', (e) => {
		if (e.keyCode == 80 && e.target == document.body && gv.userDraw == null) gv.pauseGameToggle();
		else {
			// this line stops the spacebar from moving window
			if (e.keyCode == 32 && e.target == document.body) e.preventDefault();
			
			gv.keyHandler(e);
		}
	});


	window.addEventListener('keyup', (e) => {
		gv.keyHandler(e);
	});
});

function getSound(id, audioCtx, gainNode) { 
	const sound = document.getElementById(id);
	const track = audioCtx.createMediaElementSource(sound);
	track.connect(gainNode).connect(audioCtx.destination);
	return sound;
};



