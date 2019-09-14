class MovingObject {
	constructor(options) {

		this.pos = options.pos;
		this.vel = options.vel;
		this.loadShipImg();

	}
	
	move() {
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];
	}
	
	draw(ctx) {

		ctx.drawImage(this.shipImg, 0, 0, 15, 15,
			this.pos[0],
			this.pos[1],
			this.width,
			this.height);

	}


	loadShipImg() {
		this.shipImg = new Image();
		this.shipImg.onload = () => { return true; }
		this.shipImg.src = './images/uss-enterprise-png-view-original-669.png';
	}
}

module.exports = MovingObject