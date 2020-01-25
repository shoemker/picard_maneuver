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
		let imgData = this.ctx.getImageData(this.boxX, this.boxY, this.boxWidth, this.boxHeight);
		// let virtualCanvas = document.createElement('canvas');
		let secondCanvas = document.getElementsByTagName("canvas")[1];
		secondCanvas.width = this.boxWidth;
		secondCanvas.height = this.boxHeight;
		let secondCtx = secondCanvas.getContext('2d');

		const thirdCanvas = document.getElementsByTagName("canvas")[2];
		thirdCanvas.width = this.boxWidth;
		thirdCanvas.height = this.boxHeight;
		const thirdCtx = thirdCanvas.getContext('2d');

		// sets the black pixels to transparent
		for (let index = 0; index < imgData.data.length; index += 4) {
			if (imgData.data[index] === 0 && 
				imgData.data[index+1] === 0 &&
				imgData.data[index+2] === 0)
				imgData.data[index + 3] = 0;
		}

		secondCtx.putImageData(imgData, 0, 0);
		/////////////////////////////////
		this.img = new Image();
		this.img.src = secondCanvas.toDataURL();


		setTimeout( () => { 
			thirdCtx.save();
			thirdCtx.translate(this.boxWidth / 2, this.boxHeight / 2);
			thirdCtx.rotate(Math.PI / 2);
			thirdCtx.translate(-this.boxWidth / 2, -this.boxHeight / 2);
			thirdCtx.drawImage(this.img, 0, 0, 500, 500, 0, 0, 500, 500); 

			thirdCtx.restore();
			this.img.src = thirdCanvas.toDataURL();

		}, 1);



	}

	getDrawing() {
		return this.img;
	}
}

module.exports = UserDraw;