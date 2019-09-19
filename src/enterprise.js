const Ship = require("./ship");

class Enterprise extends Ship {
	constructor(options) {
		super(options);
 
		this.loadShipImg();
	
	}

	center() {
		
	}

	draw(ctx) {
		ctx.save();

		this.rotateCanvas(ctx);

		ctx.drawImage(this.shipImg, 0, 0, 660, 300,
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
		this.shipImg.src = '../images/enterprise-refit.png';

	}

}


module.exports = Enterprise