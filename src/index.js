const GameView = require("./game_view");


document.addEventListener("DOMContentLoaded", function () {
	const canvasEl = document.getElementsByTagName("canvas")[0];
	canvasEl.width = 1200;
	canvasEl.height = 900;
	const ctx = canvasEl.getContext("2d");

	const audioContext = new AudioContext();
	const gainNode = audioContext.createGain();
	gainNode.gain.value = .3;

	const phasSound = document.getElementById("phaser");
	const track1 = audioContext.createMediaElementSource(phasSound);
	track1.connect(gainNode).connect(audioContext.destination);

	const disruptSound = document.getElementById("disruptor");
	const track2 = audioContext.createMediaElementSource(disruptSound);
	track2.connect(gainNode).connect(audioContext.destination);

	const torpSound = document.getElementById("torpedo");
	const track3 = audioContext.createMediaElementSource(torpSound);
	track3.connect(gainNode).connect(audioContext.destination);
	
	const exploSound = document.getElementById("explosion");
	const track4 = audioContext.createMediaElementSource(exploSound);
	track4.connect(gainNode).connect(audioContext.destination);

	let g = new GameView(ctx, canvasEl.width, canvasEl.height, {
		phasSound,
		disruptSound,
		torpSound,
		exploSound
		});

	g.start(ctx);

	canvasEl.onclick = function () { 
		g.openingOff(); 
		audioContext.resume().then(() => { });
	}
})


window.addEventListener('keydown', function (e) {
	if (e.keyCode == 32 && e.target == document.body) {
		e.preventDefault();
	}
});