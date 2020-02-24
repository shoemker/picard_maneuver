const Utils = require("./utils");

class BridgeView {
	constructor(images){
		this.width = 200;
		this.height = 150;
		this.bridgeImage = images.bridge;
		this.bridgeShaken = images.bridgeShaken;

		this.bridgePos = { x: Utils.getCanvasDim()[0] - this.width, y: 0}

		this.shakeCounter = 0;
		this.phaserCounter = 0;
		this.torpedoCounter = 0;

		this.alive = true;
	}

	destroyed() { this.alive = false; }
	shakeOn() { this.shakeCounter = 1; }
	phasersBubbleOn() { this.phaserCounter = 1; }
	torpedosBubbleOn() { this.torpedoCounter = 1; }


	step() {
		if (this.shakeCounter > 0) this.shakeCounter++;
		if (this.shakeCounter === 30) this.shakeCounter = 0;

		if (this.phaserCounter > 0) this.phaserCounter++;
		if (this.phaserCounter === 30) this.phaserCounter = 0;

		if (this.torpedoCounter > 0) this.torpedoCounter++;
		if (this.torpedoCounter === 30) this.torpedoCounter = 0;
	}


	draw(ctx) {
		if (this.alive) {
			let lineWidth = 10;

			if (this.shakeCounter !== 0) this.shakeBridge(ctx);
			else {
				ctx.drawImage(this.bridgeImage, 0,0, 1022, 765, 
					this.bridgePos.x, this.bridgePos.y,this.width, this.height);
					
				if (this.phaserCounter > 0) {
					this.drawBubble(ctx, { x: Utils.getCanvasDim()[0] - 70, y: 10, width: 50, height: 15 },
						{ x: this.bridgePos.x + 103, y: 67 });	
					this.drawText(ctx, Utils.getCanvasDim()[0] - 110, 18, "Fire Phasers")
				}
				else if (this.torpedoCounter > 0) {
					this.drawBubble(ctx, { x: Utils.getCanvasDim()[0] - 70, y: 10, width: 50, height: 15 },
						{ x: this.bridgePos.x + 103, y: 67 });
					this.drawText(ctx, Utils.getCanvasDim()[0] - 113, 17, "Fire Torpedos.")					
				}
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


	shakeBridge(ctx) {
		ctx.save();

		ctx.translate(Math.random() * 7, Math.random() * 7);

		ctx.drawImage(this.bridgeShaken, 0, 0, 510, 380,
			this.bridgePos.x, this.bridgePos.y, this.width, this.height);

		this.drawBubble(ctx, { x: Utils.getCanvasDim()[0] - 50, y: 10, width: 50, height: 15 },
			{ x: this.bridgePos.x + 125, y: 50 });

		this.drawText(ctx, Utils.getCanvasDim()[0] - 83, 18, "Direct Hit!")

		ctx.restore();
	}
	 

	drawBubble(ctx, bub, speaker) {
		ctx.beginPath();
		ctx.fillStyle = "white"
		ctx.ellipse(bub.x, bub.y, bub.width, bub.height, 0, 0, 2 * Math.PI);
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(bub.x-10, bub.y);
		ctx.lineTo(speaker.x, speaker.y);
		ctx.lineTo(bub.x+10, bub.y);
		ctx.fill();
	}


	drawText(ctx, x, y, message){
		ctx.fillStyle = "black";
		ctx.font = "20px FINALOLD";
		ctx.fillText(message, x, y);
	}
}

module.exports = BridgeView;

