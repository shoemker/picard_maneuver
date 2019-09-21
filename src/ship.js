class Ship {
	constructor(options) {

		this.pos = options.pos;
	
		this.directionIndex = options.directionIndex;
		this.direction = options.direction;

		this.speed = 0;
		this.width = 60;
		this.height = 30
		this.phasorCounter = 0;

		this.rotationOffset = 0;
		this.increment = Math.PI / 18;

	}

	getDirection(){
		return this.direction;
	}

	getSpeed() {
		return this.speed;
	}

	center() {
		return[this.pos[0] + this.width/2, this.pos[1] +this.height/2];
	}

	shift(direction, speed) {
		this.pos[0] -= speed * direction[0];
		this.pos[1] += speed * direction[1];
	};

	rotateCanvas(ctx) {
		ctx.translate(this.center()[0], this.center()[1]);
		ctx.rotate(this.rotationOffset);
		ctx.translate(-(this.center()[0]), -(this.center()[1]));
	};
	

	move() {
		this.pos[0] += this.speed * this.direction[0];
		this.pos[1] -= this.speed * this.direction[1];
	};
	
	power(impulse) {
		this.speed += impulse;
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

		if (this.rotationOffset > 6.2) this.rotationOffset -= Math.PI *2;
		else if (this.rotationOffset < -.0000000000001) this.rotationOffset += Math.PI * 2;

		this.direction = directionArray[this.directionIndex];
		// console.log(this.rotationOffset);
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
