const GameView = require("./game_view");


// window.MovingObject = MovingObject;


document.addEventListener("DOMContentLoaded", function () {
	const canvasEl = document.getElementsByTagName("canvas")[0];
	canvasEl.width = 1000;

	canvasEl.height = 750;

	const ctxMain = canvasEl.getContext("2d");

	let g = new GameView(ctxMain, canvasEl.width, canvasEl.height);


	g.start(ctxMain);

})

window.addEventListener('keydown', function (e) {
	if (e.keyCode == 32 && e.target == document.body) {
		e.preventDefault();
	}
});