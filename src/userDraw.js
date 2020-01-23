
class userDraw {
	constructor() {}
	
	draw(ctx) {

		ctx.fillStyle = "black";
		ctx.fillRect(350, 100, 500, 400);

		ctx.rect(350, 100, 500, 400);
		ctx.strokeStyle = "grey";
		ctx.stroke();
	}
}

module.exports = userDraw;