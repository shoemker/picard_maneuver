const Utils = require("./utils");

class RadarScreen {
	constructor() {
		this.radius = 90;
		this.sceenCenter = {x:100, y:100};
		this.scale = .06;
	};


	draw(ctx, main, allies, enemies){
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(this.sceenCenter.x, this.sceenCenter.y, this.radius, 0, 360);
		ctx.strokesStyle = "white";
		ctx.stroke();

		Utils.drawFilledCircle(ctx,this.sceenCenter.x,this.sceenCenter.y,3,"white");

		this.drawArrowsForShips(ctx, main, enemies, "green");
		this.drawArrowsForShips(ctx, main, allies, "white");
	};


	drawArrowsForShips(ctx, main, ships, color) {

		const headAngle = Math.PI / 9;
		const headEdgeLength = 7;
		ctx.lineWidth = 2;

		ships.forEach((ship) => {
			const deltaX = ship.center()[0] - main.center()[0];
			const deltaY = ship.center()[1] - main.center()[1];

			const posX = deltaX * this.scale + this.sceenCenter.x;
			const posY = deltaY * this.scale + this.sceenCenter.y;

			ctx.beginPath();
			ctx.moveTo(posX, posY);


			const headEdgeAngle1 = ship.getRotation() + headAngle;
			const headEdgeAngle2 = ship.getRotation() - headAngle;

			let xOffset = Math.cos(headEdgeAngle1) * headEdgeLength;
			let yOffset = Math.sin(headEdgeAngle1) * headEdgeLength;

			// this draws one edge of the arrowhead
			ctx.lineTo(posX - xOffset, posY - yOffset);
			ctx.moveTo(posX, posY);

			xOffset = Math.cos(headEdgeAngle2) * headEdgeLength;
			yOffset = Math.sin(headEdgeAngle2) * headEdgeLength;

			// this draws the other edge of the arrowhead
			ctx.lineTo(posX - xOffset, posY - yOffset);
			
			ctx.strokeStyle = color;
			ctx.stroke();

			// Utils.drawFilledCircle(ctx, posX, posY, 3, color);
		});
	};

};


module.exports = RadarScreen;