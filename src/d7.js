const Ship = require("./ship");

class D7 extends Ship {
	constructor(options) {
		super(options);
		this.width = 100;
		this.height = 50
		this.loadShipImg();

	}


	draw(ctx) {
		ctx.save();
		ctx.rotate((Math.PI / 180) * this.rotationOffset);

		ctx.drawImage(this.shipImg, 0, 0, 380, 275,
			this.pos[0],
			this.pos[1],
			this.width,
			this.height);

		ctx.restore();
	}


	loadShipImg() {
		this.shipImg = new Image();
		this.shipImg.onload = () => { return true; }
		this.shipImg.src = '../images/D7.png';

	}


}


module.exports = D7