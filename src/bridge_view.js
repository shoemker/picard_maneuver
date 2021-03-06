const Utils = require("./utils");

class BridgeView {
	constructor(images){
		this.width = 200;
		this.height = 150;
		this.bridgeImage = images.bridge;
		this.bridgeShaken = images.bridgeShaken;

		this.bridgePos = { x: Utils.getCanvasDim().x - this.width, y: 0}

		this.shakeCounter = 0;
		this.phaserCounter = 0;
		this.torpedoCounter = 0;
		this.damageBubble = false;

		this.alive = true;
		this.lights = 0;
	};

	destroyed() { this.alive = false; };
	shakeOn() { this.shakeCounter = 1; };
	phasersBubbleOn() { this.phaserCounter = 1; };
	torpedosBubbleOn() { this.torpedoCounter = 1; };


	enginDamBubbleOn() { 
		this.damageBubble = true;
		this.bubData = {
			bubbleX: Utils.getCanvasDim().x - 140, bubbleW: 120,
			messageX: Utils.getCanvasDim().x - 194, message: "Engines Damaged!"
		};
	};

	beamDamBubbleOn() {
		this.damageBubble = true;
		this.bubData = {
			bubbleX: Utils.getCanvasDim().x - 120, bubbleW: 180,
			messageX: Utils.getCanvasDim().x - 194, message: "Phasers at 1/2 Strength!"
		};
	};

	torpDamBubbleOn() { 
		this.damageBubble = true;
		this.bubData = {
			bubbleX: Utils.getCanvasDim().x - 110, bubbleW: 180,
			messageX: Utils.getCanvasDim().x - 189, message: "Torpedo Loader Damaged!"
		};
	};


	step() {
		if (this.shakeCounter > 0) this.shakeCounter++;
		if (this.shakeCounter === 30) {
			this.shakeCounter = 0;
			this.damageBubble = false;
		}

		if (this.phaserCounter > 0) this.phaserCounter++;
		if (this.phaserCounter === 40) this.phaserCounter = 0;

		if (this.torpedoCounter > 0) this.torpedoCounter++;
		if (this.torpedoCounter === 40) this.torpedoCounter = 0;

		this.stepLights();
	};


	draw(ctx) {
		if (this.alive) {

			if (this.shakeCounter !== 0) this.shakeBridge(ctx);
			else {
				ctx.drawImage(this.bridgeImage, 0,0, 1022, 765, 
					this.bridgePos.x, this.bridgePos.y,this.width, this.height);
					
				if (this.phaserCounter > 0) {
					this.drawSpeachBubble(ctx, { x: Utils.getCanvasDim().x - 150, y: 60}, 
						100, 25, { x: this.bridgePos.x + 63, y: 85 });	

					this.drawText(ctx, this.bridgePos.x + 7, 65, "Firing Phasers", 13);
				}
				else if (this.torpedoCounter > 0) {
					this.drawSpeachBubble(ctx, { x: Utils.getCanvasDim().x - 50, y: 107}, 
						100,25, { x: this.bridgePos.x + 177, y: 131 });

					this.drawText(ctx, Utils.getCanvasDim().x - 95, 111, "Torpedos Away", 13);				
				}

				this.drawLights(ctx);
			}

			this.drawBorder(ctx);
		}
	};


	stepLights(){
		this.lights++;
		if (this.lights > 40) this.lights = 0;
	};


	drawLights(ctx) {
		if (this.lights < 20) {
			Utils.drawFilledCircle(ctx, this.bridgePos.x + 7, 28, 1, "red");
			Utils.drawFilledCircle(ctx, this.bridgePos.x + 37, 14, 1, "yellow");
			Utils.drawFilledCircle(ctx, this.bridgePos.x + 140, 18, 1, "yellow");
			Utils.drawFilledCircle(ctx, this.bridgePos.x + 190, 80, 1, "yellow");
			Utils.drawFilledCircle(ctx, this.bridgePos.x + 193, 145, 1, "red");
			Utils.drawFilledCircle(ctx, this.bridgePos.x + 193, 145, 1, "red");
			Utils.drawFilledCircle(ctx, this.bridgePos.x + 54, 98, 1, "yellow");

		}
		else {
			Utils.drawFilledCircle(ctx, this.bridgePos.x + 22, 21, 1,"lightgreen");
			Utils.drawFilledCircle(ctx, this.bridgePos.x + 150, 28, 1,"lightgreen");
			Utils.drawFilledCircle(ctx, this.bridgePos.x + 176, 46, 1,"red");
			Utils.drawFilledCircle(ctx, this.bridgePos.x + 193, 135, 1,"lightgreen");
			Utils.drawFilledCircle(ctx, this.bridgePos.x + 87, 123, 1, "red");
		}
	};


	drawBorder(ctx) {
		let lineWidth = 10;
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = "grey";
		ctx.beginPath();
		ctx.moveTo(this.bridgePos.x - lineWidth / 2, this.bridgePos.y);
		ctx.lineTo(this.bridgePos.x - lineWidth / 2, this.bridgePos.y + this.height + lineWidth / 2);
		ctx.lineTo(Utils.getCanvasDim().x, this.bridgePos.y + this.height + lineWidth / 2);
		ctx.stroke();
	};


	drawSpeachBubble(ctx, center, width, height, speaker) {
		const top = { x: center.x, y: center.y - height / 2 };
		const left = { x: center.x - width / 2, y: center.y }
		const right = { x: center.x + width / 2, y: center.y }
		const bottom = { x: center.x, y: center.y + height / 2 }

		ctx.fillStyle = "white";

		ctx.beginPath();
		ctx.moveTo(top.x, top.y);

		// quadraticCurveTo(cp1x, cp1y, x, y) cp1 is control point
		ctx.quadraticCurveTo(left.x, top.y, left.x, left.y); // top to left
		ctx.quadraticCurveTo(left.x, bottom.y, bottom.x,bottom.y); // left to bottom
		ctx.quadraticCurveTo(right.x, bottom.y, right.x, right.y); // to right
		ctx.quadraticCurveTo(right.x, top.y, top.x, top.y); // to top
		ctx.fill();

		// triange to speaker
		ctx.beginPath();
		ctx.moveTo(center.x - 10, center.y);
		ctx.lineTo(speaker.x, speaker.y);
		ctx.lineTo(center.x + 10, center.y);
		ctx.fill();
	};


	drawText(ctx, x, y, message, size = 16){
		ctx.fillStyle = "black";
		ctx.font = size +"px ComicRelief";
		ctx.fillText(message, x, y);
	};


	// this function makes the bridge view shake when ship is hit
	shakeBridge(ctx) {
		ctx.save();
		ctx.translate(Math.random() * 7, Math.random() * 7);

		ctx.drawImage(this.bridgeShaken, 0, 0, 510, 380,
			this.bridgePos.x, this.bridgePos.y, this.width, this.height);

		this.drawSpeachBubble(ctx, { x: Utils.getCanvasDim().x - 50, y: 20},90,30, 
			{ x: this.bridgePos.x + 125, y: 50 });

		this.drawText(ctx, Utils.getCanvasDim().x - 90, 26, "Direct Hit!")
	
		// if there's system damage, there's a speech bubble for that
		if (this.damageBubble) {
			this.drawSpeachBubble(ctx, { x:this.bubData.bubbleX, y: 137 },
				this.bubData.bubbleW, 25, { x: this.bridgePos.x + 35, y: 105 });
			this.drawText(ctx, this.bubData.messageX, 142, this.bubData.message, 13);	
		}

		ctx.restore();
	};
};

module.exports = BridgeView;