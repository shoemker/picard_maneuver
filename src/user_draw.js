const Utils = require("./utils");

class UserDraw {
	constructor() {
		this.setPrevToNull(); 
		this.boxX = 350;
		this.boxY = 200;
		this.boxWidth = 500;
		this.boxHeight = 500;
	}

	setPrevToNull() {
		this.prevX = null;
		this.prevY = null;
	}
	
	draw(ctx) {
		this.ctx = ctx
		Utils.drawBlackRectangleWithBorder(ctx, this.boxX, this.boxY, this.boxWidth, this.boxHeight);
		
	}

	// this was adapted from http://www.mattmorgante.com/technology/javascript-draw-html5-canvas
	drawFromUser(e) {
		const x = e.offsetX;
		const y = e.offsetY;
		if (x >= this.boxX && x <= this.boxX+this.boxWidth && y >= this.boxY && y <= this.boxY+this.boxHeight) {
			this.ctx.beginPath();
			this.ctx.moveTo(this.prevX, this.prevY);
			this.ctx.lineTo(x, y);
			this.ctx.strokeStyle = "white";
			if (this.prevX && this.prevY) this.ctx.stroke();
			this.prevX = x;
			this.prevY = y;
		}
		else this.setPrevToNull();
	}
}

module.exports = UserDraw;