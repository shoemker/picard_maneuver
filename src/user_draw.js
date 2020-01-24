const Utils = require("./utils");

class UserDraw {
	constructor(ctx) {
		this.ctx = ctx;
		this.boxX = 350;
		this.boxY = 200;
		this.boxWidth = 500;
		this.boxHeight = 500;

		this.ctx.lineJoin = 'round';
		this.ctx.lineCap = 'round';

		this.setPrevToNull(); 
	}

	setPrevToNull() {
		this.prevX = null;
		this.prevY = null;
	}
	
	draw() {
		Utils.drawBlackRectangleWithBorder(this.ctx, this.boxX, this.boxY, this.boxWidth, this.boxHeight);
		
		Utils.drawBlackRectangleWithBorder(this.ctx, 500, 802, 210, 50, "lightblue", 3 );
		this.ctx.stroke();

		this.ctx.fillStyle = "lightblue";

		this.ctx.font = "40px FINALOLD";
		this.ctx.fillText("Click to Accept", 510, 840);

	}

	// this was adapted from http://www.mattmorgante.com/technology/javascript-draw-html5-canvas
	drawFromUser(e) {
		const x = e.offsetX;
		const y = e.offsetY;
		if (e.offsetX >= this.boxX && 
				e.offsetX <= this.boxX+this.boxWidth && 
				e.offsetY >= this.boxY && 
				e.offsetY <= this.boxY+this.boxHeight) {

			this.ctx.beginPath();
			this.ctx.moveTo(this.prevX, this.prevY);
			this.ctx.lineTo(e.offsetX, e.offsetY);

			this.ctx.strokeStyle = "white";
			this.ctx.lineWidth = 20;

			if (this.prevX && this.prevY) this.ctx.stroke();
			this.prevX = e.offsetX;
			this.prevY = e.offsetY;
		}
		else this.setPrevToNull();
	}

	acceptDrawing(){
		this.imgData = this.ctx.getImageData(this.boxX, this.boxY, this.boxWidth, this.boxHeight);
		this.virtualCanvas = document.createElement('canvas');
		this.virtualCanvas.width = this.boxWidth;
		this.virtualCanvas.height = this.boxHeight;
		this.virtualCtx = this.virtualCanvas.getContext('2d');

		// sets the black pixels to transparent
		for (let index = 0; index < this.imgData.data.length; index += 4) {
			if (this.imgData.data[index] === 0 && 
				this.imgData.data[index+1] === 0 &&
				this.imgData.data[index+2] === 0)
				this.imgData.data[index + 3] = 0;
		}

		this.virtualCtx.putImageData(this.imgData, 0, 0);

		// this.virtualCtx.save();
		// this.virtualCtx.translate(250, 250);
	
		// this.virtualCtx.rotate(Math.PI/2);
		// this.virtualCtx.translate(-250, -250);
		// this.virtualCtx.restore();


		this.updatedImg = new Image();
		this.updatedImg.src = this.virtualCanvas.toDataURL();

	}

	getDrawing() {
		return this.updatedImg;
	}
}

module.exports = UserDraw;