
const SpaceObject = require("./space_object");
const Shield = require("./shield");

class Ship extends SpaceObject{
	constructor(options) {
		super(options.pos);

		this.directionIndex = options.directionIndex;
		this.direction = options.direction;

		this.speed = 0;
		this.width = 60;
		this.height = 30
		this.phasorCounter = 0;

		this.rotationOffset = 0;
		this.increment = Math.PI / 18;

		this.shields = [];
		this.torpedos = []
	}

	getDirection(){
		return this.direction;
	}

	getDirectionIndex(){
		return this.directionIndex;
	}

	getSpeed() {
		return this.speed;
	}

	getTorpedos() {
		return this.torpedos;
	}

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


	drawShields(ctx) {
		ctx.lineWidth = 3;

		this.shields.forEach((shield) => shield.draw(ctx))
	}

	// factory method to create shield objects
	raiseShields(x,y) {

		// forward shield
		this.shields.push(new Shield({
			pos: [x, y + 25],
			start: 1.4,
			end: 1.6,
			multiplier: .1
		}))

		// starboard shield
		this.shields.push(new Shield({
			pos: [x-30, y + 5],
			start: 1.8,
			end: 2.2,
			multiplier: .2
		}))

		// rear shield
		this.shields.push(new Shield({
			pos: [x, y -23],
			start: .4,
			end: .6,
			multiplier: .1,
		}))

		// port shield
		this.shields.push(new Shield({
			pos: [x+30, y + 5],
			start: .8,
			end: 1.2,
			multiplier: .2
		}))

	}

	receivePhasorHit(attacker) {
		let angle;
		let shieldHit;
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

		if (angle <= .25*Math.PI || angle >= 1.75*Math.PI) shieldHit = 0;
		else if (angle > .25*Math.PI && angle < .75* Math.PI) shieldHit = 1;
		else if (angle >= .75*Math.PI && angle <= 1.25*Math.PI) shieldHit = 2;
		else shieldHit = 3;

		if (this.shields[shieldHit].getHitpoints() > 0 ) this.shields[shieldHit].hit();
	}

	whichShieldWasHit() {

		
	}

	torpHit(torpedo){
		console.log("hit");
	}


	changeDirection(dir) { 
		this.rotationOffset += dir*this.increment;
		if (dir > 0 && this.directionIndex === 35) this.directionIndex = 0;
		else if (dir < 0 && this.directionIndex === 0) this.directionIndex = 35;
		else this.directionIndex += dir;

		if (this.rotationOffset > 6.2) this.rotationOffset -= Math.PI *2;
		else if (this.rotationOffset < -.000000001) this.rotationOffset += Math.PI * 2;

		this.direction = this.directionArray[this.directionIndex];
		// console.log(this.rotationOffset*180/Math.PI);
	};


}

module.exports = Ship


