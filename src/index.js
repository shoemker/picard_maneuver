const GameView = require("./game_view");


document.addEventListener("DOMContentLoaded", function () {
	const canvasEl = document.getElementsByTagName("canvas")[0];
	canvasEl.width = 1200;
	canvasEl.height = 900;
	const ctx = canvasEl.getContext("2d");

	// sounds
	const audioContext = new AudioContext();
	const gainNode = audioContext.createGain();
	gainNode.gain.value = .2;

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

	canvasEl.addEventListener("click", (event) => {
		if (g.gameOpening !== null) {
			g.openingOff();
			audioContext.resume().then(() => { });
		}
		else{
			const x = event.pageX;
			const y = event.pageY;

			if (x > 1107 && x < 1132 && y > 46 && y < 69) {
				g.game.muteToggle();
				if (gainNode.gain.value === 0) gainNode.gain.value = .2;
				else gainNode.gain.value = 0;
				console.log(gainNode.gain.value);
			}
		}
	});
});

window.addEventListener('keydown', function (e) {
	if (e.keyCode == 32 && e.target == document.body) {
		e.preventDefault();
	}
});