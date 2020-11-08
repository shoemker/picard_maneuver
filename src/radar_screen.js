const Utils = require("./utils");

class RadarScreen {
	constructor() {
		this.radius = 90;
		this.sceenCenter = {x:100, y:100};
		this.scale = .05;
	};


	draw(ctx, main, allies, enemies){
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(this.sceenCenter.x, this.sceenCenter.y, this.radius, 0, 360);
		ctx.strokesStyle = "white";
		ctx.stroke();

		Utils.drawFilledCircle(ctx, this.sceenCenter.x, this.sceenCenter.y, 3, "white");

		this.drawArrowsForShips(ctx, main, enemies, "green");
		this.drawArrowsForShips(ctx, main, allies, "white");
	};


	drawArrowsForShips(ctx, main, ships, color) {
		ships.forEach((ship) => {
			const deltaX = ship.center()[0] - main.center()[0];
			const deltaY = ship.center()[1] - main.center()[1];

			const posX = deltaX * this.scale + this.sceenCenter.x;
			const posY = deltaY * this.scale + this.sceenCenter.y;

			Utils.drawFilledCircle(ctx, posX, posY, 3, color);
		});
	};

};


module.exports = RadarScreen;