const Ship = require("./ship");

class D7 extends Ship {
	constructor(options) {
		super(options);

		this.loadShipImg();

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
	}


	move() {
		this.pos[0] += this.vel * this.direction[0];
		this.pos[1] -= this.vel * this.direction[1];
	};


	loadShipImg() {
		this.shipImg = new Image();
		this.shipImg.onload = () => { return true; }
		this.shipImg.src = '../images/D7.png';

	}


}


module.exports = D7