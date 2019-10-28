const GameView = require("./game_view");


document.addEventListener("DOMContentLoaded", function () {
	const canvasEl = document.getElementsByTagName("canvas")[0];
	canvasEl.width = 1200;
	canvasEl.height = 900;
	const ctx = canvasEl.getContext("2d");

	// sounds
	const audioCtx = new AudioContext();
	const gainNode = audioCtx.createGain();
	gainNode.gain.value = .25;

	let g = new GameView(ctx, canvasEl.width, canvasEl.height, 
		{
			phasSound: getSound("phaser", audioCtx, gainNode), 
			disruptSound: getSound("disruptor", audioCtx, gainNode), 
			disrupt2Sound: getSound("disruptor2", audioCtx, gainNode), 
			kTorpSound: getSound("klingonTorpedo", audioCtx, gainNode), 
			torpSound: getSound("torpedo", audioCtx, gainNode),	
			exploSound: getSound("explosion", audioCtx, gainNode), 
			theme: getSound("theme", audioCtx, gainNode)
		});

	g.start();

	canvasEl.addEventListener("click", (e) => {
		if (g.gameOpening !== null && !g.gameOpening.getChoose()) {
			g.gameOpening.setChoose();
			audioCtx.resume().then(() => { return true; });
		}
		else g.checkClick(e.pageX, e.pageY, gainNode);

		// console.log(e.pageX, e.pageY);
	});

	window.addEventListener('keydown', (e) => {
		if (e.keyCode == 80 && e.target == document.body) g.pauseGameToggle();
		else {
			// this line stops the spacebar from moving window
			if (e.keyCode == 32 && e.target == document.body) e.preventDefault();
			
			g.keyHandler(e);
		}
	});

	window.addEventListener('keyup', (e) => {
		g.keyHandler(e);
	});

});

function getSound(id, audioCtx, gainNode) { 
	const sound = document.getElementById(id);
	const track = audioCtx.createMediaElementSource(sound);
	track.connect(gainNode).connect(audioCtx.destination);
	return sound;
};



