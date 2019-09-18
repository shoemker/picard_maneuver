class Ship {
	constructor(options) {

		this.pos = options.pos;
		this.vel = options.vel;

		this.width = 100;
		this.height = 50

		this.rotationOffset = 0;
		this.increment = 2;

	}

	rotateCanvas(ctx) {
		ctx.translate(this.pos[0] + this.width / 2, this.pos[1] + this.height / 2);
		ctx.rotate((Math.PI / 180) * this.rotationOffset);
		ctx.translate(-(this.pos[0] + this.width / 2), -(this.pos[1] + this.height / 2));
	}
	
	move() {
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];
	};
	
	power(impulse) {
	
		this.vel[0] += impulse[0];
		this.vel[1] += impulse[1];
		console.log(this.vel);
	};

	rotateCC() { 
		this.rotationOffset -= this.increment 
	};

	rotateCL() {
		this.rotationOffset += this.increment
	};
}

module.exports = Ship