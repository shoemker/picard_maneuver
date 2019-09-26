
const SpaceObject = require("./space_object");
const Torpedo = require("./torpedo");
const Explosion = require("./explosion")
const Utils = require("./utils");

class Ship extends SpaceObject{

	constructor(options) {
		super(options.pos);

		this.directionIndex = options.directionIndex;
		this.direction = options.direction;

		this.speed = 0;
		this.width = 60;
		this.height = 30
		this.phasorCounter = 0;
		this.phasorColor = options.phasorColor;
		this.torpExplosionCounter = 0;
		this.shipExplosionCounter = 0;

		this.rotationOffset = 0;
		this.increment = Math.PI / 18;

		this.torpedos = [];
		this.ssd;

		this.phasorRecharge = 0;
		this.phasorRechargeMax = 150;

		this.torpedoReload = 0;
		this.torpedoReloadMax= 200;

		this.hullIntegrity = 200;
		this.hullIntegrityMax = 200;

		this.loadExplosionImg();
		this.explosion = new Explosion(this.explosionImg);
	}

	// getter methods
	getDirection()	{ return this.direction; }
	getSpeed() 			{	return this.speed; }
	getTorpedos() 	{ return this.torpedos; }
	getRotation() 	{ return this.rotationOffset; }
	phasorReady() 	{ return this.phasorRecharge === this.phasorRechargeMax; }
	getHull() 			{ return this.hullIntegrity; }
	torpedosReady() { return this.torpedoReload === this.torpedoReloadMax; }


	rotateCanvas(ctx) {
		ctx.translate(this.center()[0], this.center()[1]);
		ctx.rotate(this.rotationOffset);
		ctx.translate(-(this.center()[0]), -(this.center()[1]));
	};
	

	move(base_speed_inverse) {
		this.pos[0] += (this.direction[0] / base_speed_inverse) * this.speed ;
		this.pos[1] -= (this.direction[1] / base_speed_inverse) * this.speed ;
	};

	
	draw(ctx) {
		//draw ship systems display
		this.ssd.draw(ctx,
									this.phasorRecharge / this.phasorRechargeMax,
									this.torpedoReload / this.torpedoReloadMax,
									this.hullIntegrity / this.hullIntegrityMax);

		if (this.phasorCounter > 0) this.drawPhasor(ctx);

		// recharge weapons
		if (this.phasorRecharge !== this.phasorRechargeMax) this.phasorRecharge++;
		if (this.torpedoReload !== this.torpedoReloadMax) this.torpedoReload++;

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

		if (this.hullIntegrity === 0) this.shipExplosionCounter = this.drawShipExplosion(ctx);
	}

	// draw the phasor fire. The line extends toward the target over phasorDrawMax frames,
	// then stays there
	drawPhasor(ctx) {
		const phasorDrawMax = 12;
		const xDelta = this.target.center()[0] - this.center()[0];
		const yDelta = this.target.center()[1] - this.center()[1];

		let ratio = this.phasorCounter/ phasorDrawMax;
		if (ratio > 1) ratio = 1;

		const xProgress = ratio * xDelta + this.center()[0];
		const yProgress = ratio * yDelta + this.center()[1];

		ctx.beginPath();
		ctx.moveTo(this.center()[0], this.center()[1]);
		ctx.lineTo(xProgress, yProgress);
		ctx.strokeStyle = this.phasorColor;
		ctx.lineWidth = 3;
		ctx.stroke();
		this.phasorCounter++;
		if (this.phasorCounter > (phasorDrawMax+10)) this.phasorCounter = 0;
	};


	power(impulse) {
		if (impulse > 0 && this.speed < 3) this.speed += impulse;
		else if (impulse < 0 && this.speed > -1) this.speed += impulse;
	};


	firePhasors(target) {
		if (this.phasorRecharge === this.phasorRechargeMax) {
			this.target = target;
			this.phasorCounter = 1;
			this.target.receivePhasorHit(this);
			this.phasorRecharge = 0;
		}
	};


	fireTorpedos(torpImg) {
		if (this.torpedoReload === this.torpedoReloadMax) {
			this.torpedos.push(new Torpedo(this.center(), torpImg, this.directionIndex - 1));
			this.torpedos.push(new Torpedo(this.center(), torpImg, this.directionIndex));
			this.torpedos.push(new Torpedo(this.center(), torpImg, this.directionIndex + 1));
			this.torpedoReload = 0;
		}
	}


	receivePhasorHit(attacker) {
		this.takeDamage(attacker, 18);
	};


	receiveTorpHit(attacker) {
		this.takeDamage(attacker, 20);
		this.torpExplosionCounter = 1;
	};


	takeDamage(attacker, damage){
		let shieldHit = this.whichShieldWasHit(attacker);

		if (this.ssd.getShields()[shieldHit].getHitpoints() > 0)
				this.ssd.getShields()[shieldHit].hit(damage);
		else this.hullIntegrity -= damage;

		if (this.hullIntegrity < 0) this.hullIntegrity = 0;
	};

	
	whichShieldWasHit(attacker) {
		let shieldHit;

		const angle = Utils.angleToOtherShip(this, attacker)

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
	};


	onscreen(canvas_width, canvas_height) {
		const center = this.center();
		return (center[0] > 0 && center[0] < canvas_width &&
						center[1] > 0 && center[1] < canvas_height)  
	};
	

	drawShipExplosion(ctx) {
		this.explosion.draw(ctx, this.center());
	};


	loadExplosionImg() {
		this.explosionImg = new Image();
		this.explosionImg.onload = () => { return true; }
		this.explosionImg.src = '../images/explosion-sprite-sheet.png';
	};

}

module.exports = Ship


