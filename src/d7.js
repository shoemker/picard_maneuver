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
		const ssd_x = 50;
		const ssd_y = 550;
		const ssd_width = 70;
		const ssd_height = 120;
		ctx.drawImage(this.shipSSD, 0, 0, 170, 175,
			ssd_x,
			ssd_y,
			ssd_width,
			ssd_height);

		this.drawShields(ctx, ssd_x + ssd_width / 2, ssd_y + ssd_height / 2);

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