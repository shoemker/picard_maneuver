const GameView = require("./game_view");
const Utils = require("./utils");
// const CanvasGifEncoder = require('canvas-gif-encoder');
// const fs = require('fs-extra');

document.addEventListener("DOMContentLoaded", function () {
	const canvasEl = document.getElementsByTagName("canvas")[0];
	canvasEl.width = Utils.getCanvasDim().x;
	canvasEl.height = Utils.getCanvasDim().y;
	const ctx = canvasEl.getContext("2d");
	// const encoder = new CanvasGifEncoder(1200, 900);
	// let stream = fs.createWriteStream('output.gif');
	// encoder.createReadStream().pipe(stream);

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

	// encoder.begin(); 

	// encoder.addFrame(ctx, 250);

	
	// for (let i = 0; i < 20; ++i) {
	// 	encoder.addFrame(ctx, 250);
	// }

	// encoder.end();



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
			switch (e.key) {
				case "p":
					if (!gv.gameOpening) gv.pauseGameToggle(); // p pauses game
					break;
					
				case " ": 
				case "ArrowUp": 
				case "ArrowDown": 
				case "ArrowLeft": 
				case "ArrowRight":
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