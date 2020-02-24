const Utils = require("./utils");

class BridgeView {
	constructor(images){
		this.width = 200;
		this.height = 150;
		this.bridgeImage = images.bridge;
		this.bridgeShaken = images.bridgeShaken;

		this.bridgePos = { x: Utils.getCanvasDim()[0] - this.width, y: 0}
		this.shakeCounter = 0;
		
		this.alive = true;
	}

	destroyed() { this.alive = false;}

	step() {
		if (this.shakeCounter > 0) this.shakeCounter++;
		if (this.shakeCounter === 30) this.shakeCounter = 0;
	}

	draw(ctx) {
		if (this.alive) {
			let x = Utils.getCanvasDim()[0] - this.width;
			let lineWidth = 10;

			if (this.shakeCounter === 0) 
				ctx.drawImage(this.bridgeImage, 0,0, 1022, 765, 
					this.bridgePos.x, this.bridgePos.y,this.width, this.height);
			else {	// when hit, the bridge shakes 
				ctx.save();

				ctx.translate(Math.random() * 7, Math.random() * 7); 

				ctx.drawImage(this.bridgeShaken, 0, 0, 510, 380, 
					this.bridgePos.x, this.bridgePos.y, this.width, this.height);
			
				ctx.restore();
			}

			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = "grey";
			ctx.beginPath();
			ctx.moveTo(this.bridgePos.x - lineWidth/2, this.bridgePos.y);
			ctx.lineTo(this.bridgePos.x - lineWidth / 2, this.bridgePos.y + this.height+lineWidth/2);
			ctx.lineTo(Utils.getCanvasDim()[0], this.bridgePos.y + this.height + lineWidth/2);
			ctx.stroke();
		}
	}

	shakeOn() {
		this.shakeCounter = 1;
	}
}

module.exports = BridgeView;

