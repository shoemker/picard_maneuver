const Utils = require("./utils");

class BridgeView {
	constructor(images){
		this.width = 200;
		this.height = 150;
		this.bridgeImage = images.bridge;
		// this.bridgeShaken = images.bridgeShaken;
	}

	draw(ctx) {
		let x = Utils.getCanvasDim()[0] - this.width;
		let lineWidth = 10;

		ctx.drawImage(this.bridgeImage, 0,0, 1022, 765, x, 0,this.width, this.height);
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = "grey";
		ctx.beginPath();
		ctx.moveTo(x-lineWidth/2, 0);
		ctx.lineTo(x-lineWidth/2, this.height+lineWidth/2);
		ctx.lineTo(Utils.getCanvasDim()[0], this.height + lineWidth/2);
		ctx.stroke();
		// ctx.drawImage(this.bridgeShaken, 0, 0, 510, 380, x - 210, 0, this.width, this.height);

	}
}

module.exports = BridgeView;

