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
			if (this.prevX && this.prevY) this.ctx.stroke();
			this.prevX = e.offsetX;
			this.prevY = e.offsetY;
		}
		else this.setPrevToNull();
	}

	acceptDrawing(){
		
	}

	getDrawing() {

	}
}

module.exports = UserDraw;