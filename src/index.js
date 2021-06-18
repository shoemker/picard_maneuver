const GameView = require("./game_view");
const Utils = require("./utils");

document.addEventListener("DOMContentLoaded", function () {
	const canvasEl = document.getElementsByTagName("canvas")[0];
	canvasEl.width = Utils.getCanvasDim().x;
	canvasEl.height = Utils.getCanvasDim().y;
	const ctx = canvasEl.getContext("2d");

	// sounds
	const audioCtx = new AudioContext();
	const gainNode = audioCtx.createGain();
	gainNode.gain.value = .25;

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
	canvasEl.addEventListener('mousedown', () => { 
		if (gv.gameOpening && gv.gameOpening.getUserDraw()) 
			gv.gameOpening.getUserDraw().setMouseDown(true); 
	});
	canvasEl.addEventListener('mousemove', (e) => {
		if (gv.gameOpening && gv.gameOpening.getUserDraw() 
			&& gv.gameOpening.getUserDraw().getMouseDown()) 
				gv.gameOpening.getUserDraw().drawFromUser(e);
	});
	canvasEl.addEventListener('mouseup', () => {
		if (gv.gameOpening && gv.gameOpening.getUserDraw()) {
			gv.gameOpening.getUserDraw().setMouseDown(false);
			gv.gameOpening.getUserDraw().endLine();
		}
	});


	canvasEl.addEventListener("click", (e) => {
		gv.checkClick(e, gainNode);
		// console.log("x = " + e.offsetX, "y = " + e.offsetY);
		// console.log("x = " + e.pageX, "y = " + e.pageY);

	});
 

	window.addEventListener('keydown', (e) => {

		if (e.target == document.body) {
			switch (e.keyCode) {
				case 80:
					if (!gv.gameOpening) gv.pauseGameToggle(); // p pauses game
					break;
				case 32: case 37: case 38: case 39: case 40:
				// stops the spacebar and arrow keys from moving window
					e.preventDefault();
			}
		}

		gv.keyHandler(e);
		
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