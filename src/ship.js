
const SpaceObject = require("./space_object");


class Ship extends SpaceObject{

	constructor(options) {
		super(options.pos);

		this.directionIndex = options.directionIndex;
		this.direction = options.direction;

		this.speed = 0;
		this.width = 60;
		this.height = 30
		this.phasorCounter = 0;
		this.torpExplosionCounter = 0;

		this.rotationOffset = 0;
		this.increment = Math.PI / 18;

		this.torpedos = [];
		this.ssd;

		this.phasorRecharge = 0;
		this.phasorRechargeMax = 100;

		this.torpedoReload = 0;
		this.torpedoReloadMax= 120;

		this.loadExplosionImg();
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

	
	draw(ctx) {

		//draw ship systems display
		this.ssd.draw(ctx,
									this.phasorRecharge/this.phasorRechargeMax,
									this.torpedoReload/this.torpedoReloadMax);


		if (this.phasorCounter > 0) this.drawPhasor(ctx);
		if (this.phasorRecharge !== this.phasorRechargeMax) this.phasorRecharge++;

		//shows torpedo hit
		if (this.torpExplosionCounter) {
			ctx.drawImage(this.explosionImg, 606, 295, 100, 100,
				this.center()[0],
				this.center()[1]-5,
				10,
				10);

			this.torpExplosionCounter++;
			if (this.torpExplosionCounter > 10) this.torpExplosionCounter = 0;
		}
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
	};
	

	power(impulse) {
		this.speed += impulse;
	};


	firePhasor(target) {
		if (this.phasorRecharge === this.phasorRechargeMax) {
			this.target = target;
			this.phasorCounter = 1;
			this.target.receivePhasorHit(this);
			this.phasorRecharge = 0;
		}
	};


	receivePhasorHit(attacker) {
		let shieldHit = this.whichShieldWasHit(attacker);

		if (this.ssd.getShields()[shieldHit].getHitpoints() > 0 ) 
						this.ssd.getShields()[shieldHit].hit();
	};


	receiveTorpHit(attacker) {

		let shieldHit = this.whichShieldWasHit(attacker);

		if (this.ssd.getShields()[shieldHit].getHitpoints() > 0) 
						this.ssd.getShields()[shieldHit].hit();

		this.torpExplosionCounter = 1;
	};


	whichShieldWasHit(attacker) {
		let angle;
		let shieldHit;

		const xDelta = attacker.center()[0] - this.center()[0];
		const yDelta = attacker.center()[1] - this.center()[1];

		// find the angle between the 2 objects
		const arcTangent = Math.atan(yDelta / xDelta);
		if (xDelta < 0) angle = arcTangent + Math.PI;
		else if (xDelta > 0 && yDelta < 0) angle = arcTangent + Math.PI * 2;
		else angle = arcTangent;

		// take the rotation of the hit ship into account
		angle -= this.rotationOffset;
		if (angle < 0) angle += Math.PI * 2;

		if (angle <= .25 * Math.PI || angle >= 1.75 * Math.PI) shieldHit = 0;
		else if (angle > .25 * Math.PI && angle < .75 * Math.PI) shieldHit = 1;
		else if (angle >= .75 * Math.PI && angle <= 1.25 * Math.PI) shieldHit = 2;
		else shieldHit = 3;

		return shieldHit;
	};


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



	loadExplosionImg() {
		this.explosionImg = new Image();
		this.explosionImg.onload = () => { return true; }
		this.explosionImg.src = 
			'../images/explosion-sprite-sheet.png';
	};

}

module.exports = Ship


