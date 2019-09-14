const MovingObject = require("./ship");


window.MovingObject = MovingObject;
console.log("Webpack  is working!")

document.addEventListener("DOMContentLoaded", function () {
	const canvasEl = document.getElementsByTagName("canvas")[0];
	canvasEl.width = 750;

	canvasEl.height = 750;

	const ctxMain = canvasEl.getContext("2d");
})