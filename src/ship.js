class Ship {
	constructor(options) {

		this.pos = options.pos;
		this.vel = options.vel;

		this.rotationOffset = 0;
		this.increment = 2;

	}
	
	move() {
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];
	};
	
	power(impulse) {
	
		this.vel[0] += impulse[0];
		this.vel[1] += impulse[1];
	};

	rotateCC() { 
		this.rotationOffset -= this.increment 
	};

	rotateCL() {
		this.rotationOffset += this.increment
	};
}

module.exports = Ship