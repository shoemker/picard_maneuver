const Utils = require("./utils");

class RadarScreen {
	constructor() {
		this.radius = 90;
		this.screenCenter = {x:100, y:100};
		this.scale = .06;
	};


	draw(ctx, main, allies, enemies){
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(this.screenCenter.x, this.screenCenter.y, this.radius, 0, 360);
		ctx.strokesStyle = "white";
		ctx.stroke();

		Utils.drawFilledCircle(ctx,this.screenCenter.x,this.screenCenter.y,3,"white");

		this.drawArrowsForShips(ctx, main, enemies, "green");
		this.drawArrowsForShips(ctx, main, allies, "white");
	};


	drawArrowsForShips(ctx, main, ships, color) {

		ships.forEach((ship) => {
			const deltaX = (ship.center()[0] - main.center()[0]) * this.scale;
			const deltaY = (ship.center()[1] - main.center()[1]) * this.scale;

			if (Math.sqrt(deltaX*deltaX + deltaY*deltaY) < this.radius) {
				const x = deltaX + this.screenCenter.x;
				const y = deltaY + this.screenCenter.y;

				Utils.drawArrowEdges(ctx, {x, y}, ship.getRotation(), Math.PI/9, 7, color, 2);
			}		
		});
	};
};


module.exports = RadarScreen;