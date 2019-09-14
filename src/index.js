const GameView = require("./game_view");


// window.MovingObject = MovingObject;
// console.log("Webpack  is working!")

document.addEventListener("DOMContentLoaded", function () {
	const canvasEl = document.getElementsByTagName("canvas")[0];
	canvasEl.width = 750;

	canvasEl.height = 750;
	let g = new GameView(ctxMain, canvasEl.width, canvasEl.height);
	g.start(ctxMain)

	const ctxMain = canvasEl.getContext("2d");
})