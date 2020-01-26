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
	// user can draw a ship in a box with cursor
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

	// take user drawn picture
	acceptDrawing(){
		const imgData = this.ctx.getImageData(this.boxX, this.boxY, this.boxWidth, this.boxHeight);

		const virtualCanvas = document.createElement('canvas');
		virtualCanvas.width = this.boxWidth;
		virtualCanvas.height = this.boxHeight;
		const virtualCtx = virtualCanvas.getContext('2d');

		// sets the black pixels to transparent
		for (let index = 0; index < imgData.data.length; index += 4) {
			if (imgData.data[index] === 0 && 
					imgData.data[index + 1] === 0 &&
					imgData.data[index + 2] === 0)
				imgData.data[index + 3] = 0;
		}

		// puts the imageData on a canvas and turns it into an Image
		virtualCtx.putImageData(imgData, 0, 0);
		this.img = new Image();
		this.img.src = virtualCanvas.toDataURL();

		virtualCtx.clearRect(0, 0, this.boxWidth, this.boxHeight );

		// this block puts the Image back onto a canvas and rotates it 90 degrees
		setTimeout( () => { 
			virtualCtx.save();
			virtualCtx.translate(this.boxWidth / 2, this.boxHeight / 2);
			virtualCtx.rotate(Math.PI / 2);
			virtualCtx.translate(-this.boxWidth / 2, -this.boxHeight / 2);
			virtualCtx.drawImage(this.img, 0, 0, 500, 500, 0, 0, 500, 500); 

			virtualCtx.restore();
			this.img.src = virtualCanvas.toDataURL();
		}, 1);

		this.generateSSDImg(imgData);
	}


	// this generates the ssd portrait from user drawn picture
	generateSSDImg(imgData) {

		// turns the image grey for the ssd portrait
		for (let index = 0; index < imgData.data.length; index += 4) {
			if (imgData.data[index] != 0 || imgData.data[index + 1] != 0 || imgData.data[index + 2] != 0) {
				imgData.data[index] = 194;
				imgData.data[index + 1] = 194;
				imgData.data[index + 2] = 194;
			}
		}	
		const virtualCanvas = document.createElement('canvas');
		virtualCanvas.width = this.boxWidth;
		virtualCanvas.height = this.boxHeight;
		const virtualCtx = virtualCanvas.getContext('2d');


		virtualCtx.putImageData(imgData, 0, 0);
		this.ssdImg = new Image();

		this.ssdImg.src = virtualCanvas.toDataURL();
	}

	getDrawing() { return this.img; }
	
	getSSDportrait() { return this.ssdImg; }
	
}

module.exports = UserDraw;