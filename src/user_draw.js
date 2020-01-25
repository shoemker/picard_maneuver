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

	acceptDrawing(images){
		const imgData = this.ctx.getImageData(this.boxX, this.boxY, this.boxWidth, this.boxHeight);
		const virtualCanvas = document.createElement('canvas');
		virtualCanvas.width = this.boxWidth;
		virtualCanvas.height = this.boxHeight;
		const virtualCtx = virtualCanvas.getContext('2d');

		// sets the black pixels to transparent
		for (let index = 0; index < imgData.data.length; index += 4) {
			if (imgData.data[index] === 0 && 
				imgData.data[index+1] === 0 &&
				imgData.data[index+2] === 0)
				imgData.data[index + 3] = 0;
		}

		virtualCtx.putImageData(imgData, 0, 0);
		this.updatedImg = new Image();
		this.updatedImg.src = virtualCanvas.toDataURL();


		


	}


	getDrawing() {
		return this.updatedImg;
	}
}

module.exports = UserDraw;