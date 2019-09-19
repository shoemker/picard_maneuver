class Ship {
	constructor(options) {

		this.pos = options.pos;
	
		this.directionIndex = options.directionIndex;
		this.direction = options.direction;

		this.vel = 0;
		this.width = 50;
		this.height = 25

		this.rotationOffset = 0;
		this.increment = Math.PI / 12;

	}

	getDirection(){
		return this.direction;
	}

	getVelocity() {
		return this.vel;
	}

	shift(direction, vel) {
		this.pos[0] -= vel * direction[0];
		this.pos[1] += vel * direction[1];
	};

	rotateCanvas(ctx) {
		ctx.translate(this.pos[0] + this.width / 2, this.pos[1] + this.height / 2);
		ctx.rotate(this.rotationOffset);
		ctx.translate(-(this.pos[0] + this.width / 2), -(this.pos[1] + this.height / 2));
	};
	
	
	power(impulse) {
	
		this.vel += impulse;
		
	};

	changeDirection(dir) { 
		const directionArray = [
			[3, 0],
			[3, -1],
			[3, -2],
			[3, -3],
			[2, -3],
			[1, -3],
			[0, -3],
			[-1, -3],
			[-2, -3],
			[-3, -3],
			[-3, -2],
			[-3, -1],
			[-3, 0],
			[-3, 1],
			[-3, 2],
			[-3, 3],
			[-2, 3],
			[-1, 3],
			[0, 3],
			[1, 3],
			[2, 3],
			[3, 3],
			[3, 2],
			[3, 1]
		];

		this.rotationOffset += dir*this.increment;
		if (dir > 0 && this.directionIndex === 23) this.directionIndex = 0;
		else if (dir < 0 && this.directionIndex === 0) this.directionIndex = 23;
		else this.directionIndex += dir;

		this.direction = directionArray[this.directionIndex];
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