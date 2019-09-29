const GameView = require("./game_view");


document.addEventListener("DOMContentLoaded", function () {
	const canvasEl = document.getElementsByTagName("canvas")[0];
	canvasEl.width = 1200;
	canvasEl.height = 900;
	const ctx = canvasEl.getContext("2d");

	const audioContext = new AudioContext();
	const audioElement = document.getElementById("torpedo");
	const track = audioContext.createMediaElementSource(audioElement);
	track.connect(audioContext.destination);

	let g = new GameView(ctx, canvasEl.width, canvasEl.height, audioElement);

	g.start(ctx);

	canvasEl.onclick = function () { 
		g.openingOff(); 
		audioContext.resume().then(() => {
			console.log('Playback resumed successfully');
		});
		audioElement.play();
	}
})


window.addEventListener('keydown', function (e) {
	if (e.keyCode == 32 && e.target == document.body) {
		e.preventDefault();
	}
});