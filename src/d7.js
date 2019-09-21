const Ship = require("./ship");

class D7 extends Ship {
	constructor(options) {
		super(options);

		// this.speed = 1;
		this.loadShipImg();
		this.loadSSDImg();
	}


	draw(ctx) {
		ctx.save();

		this.rotateCanvas(ctx);

		ctx.drawImage(this.shipImg, 0, 0, 380, 275,
			this.pos[0],
			this.pos[1],
			this.width,
			this.height);

		ctx.restore();

		//draw ship systems display
		ctx.drawImage(this.shipSSD, 0, 0, 170, 175,
			50,
			550,
			70,
			120);

		if (this.phasorCounter > 0) this.drawPhasor(ctx);

	}



	loadShipImg() {
		this.shipImg = new Image();
		this.shipImg.onload = () => { return true; }
		this.shipImg.src = '../images/D7.png';

	}

	loadSSDImg() {
		this.shipSSD = new Image();
		this.shipSSD.onload = () => { return true; }
		this.shipSSD.src = '../images/D7-SSD.png';

	}


}


module.exports = D7