class Ship {
	constructor(options) {

		this.pos = options.pos;
	
		this.directionIndex = options.directionIndex;

		this.vel = 0;
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
			[0,-3],
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
	};
	
	move() {
		this.pos[0] += this.vel*this.directionArray[this.directionIndex][0];
		this.pos[1] -= this.vel *this.directionArray[this.directionIndex][1];
		
	};
	
	power(impulse) {
	
		this.vel += impulse;
		
	};

	rotateCC() { 
		this.rotationOffset -= this.increment;
		if (this.directionIndex === 23) this.directionIndex = 0;
		else this.directionIndex++;
		console.log(this.directionArray[this.directionIndex]);

	};

	rotateCL() {
		this.rotationOffset += this.increment;
		if (this.directionIndex === 0) this.directionIndex = 23;
		else this.directionIndex--;
		console.log(this.directionArray[this.directionIndex]);

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