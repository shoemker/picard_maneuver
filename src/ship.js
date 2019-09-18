class Ship {
	constructor(options) {

		this.pos = options.pos;
		this.vel = options.vel;

		this.width = 50;
		this.height = 25

		this.rotationOffset = 0;
		this.increment = Math.PI / 12;

		this.directionArray = [
			[3,0],
			[3,1],
			[3,2],
			[3,3],
			[2,3],
			[1,3],
			[0,3],
			[-1,3],
			[-2,3],
			[-3,3],
			[-3,2],
			[-3,1],
			[-3,0],
			[-3,-1],
			[-3,-2],
			[-3,-3],
			[-2,-3],
			[-1,-3],
			[0,-3]
			[1,-3],
			[2,-3],
			[3,-3],
			[3,-2],
			[3,-1]
		];

	}

	rotateCanvas(ctx) {
		ctx.translate(this.pos[0] + this.width / 2, this.pos[1] + this.height / 2);
		ctx.rotate(this.rotationOffset);
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


// this.directionArray = [
// 	[2, 0],
// 	[2, 1],
// 	[2, 2],
// 	[1, 2],
// 	[0, 2],
// 	[-1, 2],
// 	[-2, 2],
// 	[-2, 1],
// 	[-2, 0],
// 	[-2, -1],
// 	[-2, -2],
// 	[-1, -2],
// 	[0, -2],
// 	[1, -2],
// 	[2, -2],
// 	[2, -1]
// ];