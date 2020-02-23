const Utils = require("./utils");

class BridgeView {
	constructor(images){
		this.width = 200;
		this.height = 150;
		this.bridgeImage = images.bridge;
	}

	draw(ctx) {
		ctx.drawImage(this.bridgeImage, 0,0,
			1022, 765,
			Utils.getCanvasDim()[0] - this.width, 0,this.width, this.height);
		
	}
}

module.exports = BridgeView;