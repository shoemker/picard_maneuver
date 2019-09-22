const Ship = require("./ship");

class D7 extends Ship {
	constructor(options) {
		super(options);

		// this.speed = 1;
		this.loadShipImg();
		this.loadSSDImg();

		// ssd is the ship systems display in the corner of the screen
		this.ssd_x = 50;
		this.ssd_y = 550;
		this.ssd_width = 70;
		this.ssd_height = 120

		this.raiseShields(this.ssd_x + this.ssd_width / 2, this.ssd_y + this.ssd_height / 2);

	}


	draw(ctx) {
		ctx.save();

		this.rotateCanvas(ctx);

		//draw ship
		ctx.drawImage(this.shipImg, 0, 0, 380, 275,
			this.pos[0],
			this.pos[1],
			this.width,
			this.height);

		ctx.restore();

		//draw ship systems display
		ctx.drawImage(this.shipSSD, 0, 0, 170, 175,
			this.ssd_x,
			this.ssd_y,
			this.ssd_width,
			this.ssd_height);

		this.drawShields(ctx);
		
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