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

		this.shieldHIt;

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

	// shifts to account for main ship movement
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


	firePhasor(target) {
		this.target = target;
		this.phasorCounter = 1;
		this.target.receivePhasorHit(this);
	}


	drawPhasor(ctx) {
		ctx.beginPath();
		ctx.moveTo(this.center()[0], this.center()[1]);
		ctx.lineTo(this.target.center()[0], this.target.center()[1]);
		ctx.strokeStyle = 'red';
		ctx.lineWidth = 2;
		ctx.stroke();
		this.phasorCounter++;
		if (this.phasorCounter > 20) this.phasorCounter = 0;
	}
	

	receivePhasorHit(attacker) {
		let angle;
		const xDelta = attacker.center()[0] - this.center()[0];
		const yDelta = attacker.center()[1] - this.center()[1];

		// find the angle between the 2 ships to see what shield is hit
		const arcTangent = Math.atan(yDelta/xDelta);
		if (xDelta < 0) angle = arcTangent + Math.PI;
		else if (xDelta > 0 && yDelta < 0) angle =  arcTangent + Math.PI * 2;
		else angle = arcTangent;

		// take the rotation of the hit ship into account
		angle -= this.rotationOffset;
		if (angle < 0) angle += Math.PI *2;

		if (angle <= .25*Math.PI || angle >= 1.75*Math.PI) this.shieldHit = 0;
		else if (angle > .25*Math.PI && angle < .75* Math.PI) this.shieldHit = 1;
		else if (angle >= .75*Math.PI && angle <= 1.25*Math.PI) this.shieldHit = 2;
		else this.shieldHit = 3;

		console.log(this.shieldHit);
	}


	changeDirection(dir) { 
		// this array contains all of the directions (36 of them)
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
		// console.log(this.rotationOffset*180/Math.PI);
	};


}

module.exports = Ship


