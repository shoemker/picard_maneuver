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
		else{
			const x = event.pageX;
			const y = event.pageY;
			console.log(x + "," + y);
			if (x > 1085 && x < 1112 && y > 46 && y < 71) {
				g.game.muteToggle();

				if (gainNode.gain.value > -.01 && gainNode.gain.value < .01) gainNode.gain.value = .25;
				else gainNode.gain.value = 0;
			}
			else if (x > 1085 && x < 1112 && y > 85 && y < 112) g.game.autoPilotToggle();
		}
	});
});

window.addEventListener('keydown', function (e) {
	if (e.keyCode == 32 && e.target == document.body) {
		e.preventDefault();
	}
});