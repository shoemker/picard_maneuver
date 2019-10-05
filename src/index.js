const GameView = require("./game_view");


document.addEventListener("DOMContentLoaded", function () {
	const canvasEl = document.getElementsByTagName("canvas")[0];
	canvasEl.width = 1200;
	canvasEl.height = 900;
	const ctx = canvasEl.getContext("2d");

	// sounds
	const audioContext = new AudioContext();
	const gainNode = audioContext.createGain();
	gainNode.gain.value = .25;

	const phasSound = document.getElementById("phaser");
	const track1 = audioContext.createMediaElementSource(phasSound);
	track1.connect(gainNode).connect(audioContext.destination);

	const disruptSound = document.getElementById("disruptor");
	const track2 = audioContext.createMediaElementSource(disruptSound);
	track2.connect(gainNode).connect(audioContext.destination);

	const torpSound = document.getElementById("torpedo");
	const track3 = audioContext.createMediaElementSource(torpSound);
	track3.connect(gainNode).connect(audioContext.destination);

	const kTorpSound = document.getElementById("klingonTorpedo");
	const track4 = audioContext.createMediaElementSource(kTorpSound);
	track4.connect(gainNode).connect(audioContext.destination);

	const exploSound = document.getElementById("explosion");
	const track5= audioContext.createMediaElementSource(exploSound);
	track5.connect(gainNode).connect(audioContext.destination);

	const theme = document.getElementById("theme");
	const track6 = audioContext.createMediaElementSource(theme);
	track6.connect(gainNode).connect(audioContext.destination);

	let g = new GameView(ctx, canvasEl.width, canvasEl.height, {
		phasSound, disruptSound,
		kTorpSound, torpSound,
		exploSound,
		theme,
		}
	);

	g.start(ctx);

	canvasEl.addEventListener("click", (event) => {
		if (g.gameOpening !== null) {
			g.openingOff();
			audioContext.resume().then(() => { return true; });
		}
		else g.checkClick(event.pageX, event.pageY, gainNode);
	});

	window.addEventListener('keydown', function (e) {
		if (e.keyCode == 32 && e.target == document.body) {
			e.preventDefault();
		}
		g.bindKeyHandlers(e);
	});

	window.addEventListener('keyup', function (e) {
		g.bindKeyHandlers(e);
	});
});




