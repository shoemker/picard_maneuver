const Ship = require("./ship");

class Enterprise extends Ship {
	constructor(options) {
		super(options);
 
		this.loadShipImg();
		this.loadSSDImg();

		// rotates image 180 degrees so it faces left at start
		this.rotationOffset = Math.PI;

	}

	draw(ctx) {
		ctx.save();

		this.rotateCanvas(ctx);

		//draw ship
		ctx.drawImage(this.shipImg, 22, 0, 660, 300,
			this.pos[0],
			this.pos[1],
			this.width,
			this.height);

		ctx.restore();

		//draw ship systems display
		const ssd_x = 880;
		const ssd_y = 550;
		const ssd_width = 60;
		const ssd_height = 120;
		ctx.drawImage(this.shipSSD, 0, 0, 54, 129,
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
		this.shipImg.src = '../images/uss-enterprise-png-view-original-669.png';

	}

	loadSSDImg() {
		this.shipSSD = new Image();
		this.shipSSD.onload = () => { return true; }
		this.shipSSD.src = '../images/enterprise-refit-ssd.png';

	}

}


module.exports = Enterprise