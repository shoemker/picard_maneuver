const GameView = require("./game_view");


document.addEventListener("DOMContentLoaded", function () {
	const canvasEl = document.getElementsByTagName("canvas")[0];
	canvasEl.width = 1200;
	canvasEl.height = 900;
	const ctx = canvasEl.getContext("2d");

	const audioContext = new AudioContext();
	const gainNode = audioContext.createGain();

	const torpSound = document.getElementById("torpedo");
	const track = audioContext.createMediaElementSource(torpSound);
	track.connect(audioContext.destination);
	track.connect(gainNode).connect(audioContext.destination);

	let g = new GameView(ctx, canvasEl.width, canvasEl.height, torpSound);

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