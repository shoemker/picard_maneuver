const GameView = require("./game_view");


// window.MovingObject = MovingObject;


document.addEventListener("DOMContentLoaded", function () {
	const canvasEl = document.getElementsByTagName("canvas")[0];
	canvasEl.width = 1200;

	canvasEl.height = 900;

	const ctx = canvasEl.getContext("2d");

	let g = new GameView(ctx, canvasEl.width, canvasEl.height);


	g.start(ctx);

	// canvasEl.onclick = function () { g.openingOff(); }
})

window.addEventListener('keydown', function (e) {
	if (e.keyCode == 32 && e.target == document.body) {
		e.preventDefault();
	}
});