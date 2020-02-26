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
		if (this.phaserCounter === 40) this.phaserCounter = 0;

		if (this.torpedoCounter > 0) this.torpedoCounter++;
		if (this.torpedoCounter === 40) this.torpedoCounter = 0;

		this.toggleLights();
	}


	draw(ctx) {
		if (this.alive) {

			if (this.shakeCounter !== 0) this.shakeBridge(ctx);
			else {
				ctx.drawImage(this.bridgeImage, 0,0, 1022, 765, 
					this.bridgePos.x, this.bridgePos.y,this.width, this.height);
					
				if (this.phaserCounter > 0) {
					this.drawBubble(ctx, { x: Utils.getCanvasDim()[0] - 150, y: 60, width: 50, height: 15 },
						{ x: this.bridgePos.x + 63, y: 85 });	
					this.drawText(ctx, this.bridgePos.x + 6, 65, "Firing Phasers", 13);
				}
				else if (this.torpedoCounter > 0) {
					this.drawBubble(ctx, { x: Utils.getCanvasDim()[0] - 50, y: 107, width: 55, height: 15 },
						{ x: this.bridgePos.x + 177, y: 131 });
					this.drawText(ctx, Utils.getCanvasDim()[0] - 97, 112, "Torpedos Away", 13);				
				}
			}

			this.drawBorder(ctx);

			this.drawLights(ctx);
		}
	}

	toggleLights(ctx){
		
	}

	drawLights(ctx) {
		
	}

	 

	drawBorder(ctx) {
		let lineWidth = 10;
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = "grey";
		ctx.beginPath();
		ctx.moveTo(this.bridgePos.x - lineWidth / 2, this.bridgePos.y);
		ctx.lineTo(this.bridgePos.x - lineWidth / 2, this.bridgePos.y + this.height + lineWidth / 2);
		ctx.lineTo(Utils.getCanvasDim()[0], this.bridgePos.y + this.height + lineWidth / 2);
		ctx.stroke();
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


	drawText(ctx, x, y, message, size = 16){
		ctx.fillStyle = "black";
		ctx.font = size +"px Arial";
		ctx.fillText(message, x, y);
	}


	// this function makes the bridge view shake when ship is hit
	shakeBridge(ctx) {
		ctx.save();
		ctx.translate(Math.random() * 7, Math.random() * 7);

		ctx.drawImage(this.bridgeShaken, 0, 0, 510, 380,
			this.bridgePos.x, this.bridgePos.y, this.width, this.height);

		this.drawBubble(ctx, { x: Utils.getCanvasDim()[0] - 50, y: 10, width: 50, height: 15 },
			{ x: this.bridgePos.x + 125, y: 50 });

		this.drawText(ctx, Utils.getCanvasDim()[0] - 84, 16, "Direct Hit!")

		ctx.restore();
	}
}

module.exports = BridgeView;