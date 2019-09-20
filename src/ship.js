class Ship {
	constructor(options) {

		this.pos = options.pos;
	
		this.directionIndex = options.directionIndex;
		this.direction = options.direction;

		this.vel = 0;
		this.width = 50;
		this.height = 25
		this.phasorCounter = 0;

		this.rotationOffset = Math.PI;
		this.increment = Math.PI / 18;

	}

	getDirection(){
		return this.direction;
	}

	getVelocity() {
		return this.vel;
	}

	center() {
		return[this.pos[0] + this.width/2, this.pos[1] +this.height/2];
	}

	shift(direction, vel) {
		this.pos[0] -= vel * direction[0];
		this.pos[1] += vel * direction[1];
	};

	rotateCanvas(ctx) {
		ctx.translate(this.center()[0], this.center()[1]);
		ctx.rotate(this.rotationOffset);
		ctx.translate(-(this.center()[0]), -(this.center()[1]));
	};
	

	move() {
		this.pos[0] += this.vel * this.direction[0];
		this.pos[1] -= this.vel * this.direction[1];
	};
	
	power(impulse) {
		this.vel += impulse;
	};

	firePhasor(enemy) {
		this.enemy = enemy;
		this.phasorCounter = 1;
	}

	changeDirection(dir) { 
		const directionArray = [
			[7, 0],
			[7, -1],
			[7, -2],
			[6, -3],
			[5, -4],
			[4, -5],
			[3, -6],
			[2, -7],
			[1, -7],
			[0, -7],
			[-1, -7],
			[-2, -7],
			[-3, -6],
			[-4, -5],
			[-5, -4],
			[-6, -3],
			[-7, -2],
			[-7, -1],
			[-7, 0],
			[-7, 1],
			[-7, 2],
			[-6, 3],
			[-5, 4],
			[-4, 5],
			[-3, 6],
			[-2, 7],
			[-1, 7],
			[0, 7],
			[1, 7],
			[2, 7],
			[3, 6],
			[4, 5],
			[5, 4],
			[6, 3],
			[7, 2],
			[7, 1]
		];

		this.rotationOffset += dir*this.increment;
		if (dir > 0 && this.directionIndex === 35) this.directionIndex = 0;
		else if (dir < 0 && this.directionIndex === 0) this.directionIndex = 35;
		else this.directionIndex += dir;

		this.direction = directionArray[this.directionIndex];
		console.log(this.rotationOffset);
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



// const directionArray = [
// 	[4, 0],
// 	[4, -1],
// 	[4, -2],
// 	[3, -3],
// 	[2, -4],
// 	[1, -4],
// 	[0, -4],
// 	[-1, -4],
// 	[-2, -4],
// 	[-3, -3],
// 	[-4, -2],
// 	[-4, -1],
// 	[-4, 0],
// 	[-4, 1],
// 	[-4, 2],
// 	[-3, 3],
// 	[-2, 4],
// 	[-1, 4],
// 	[0, 4],
// 	[1, 4],
// 	[2, 4],
// 	[3, 3],
// 	[4, 2],
// 	[4, 1]
// ];
