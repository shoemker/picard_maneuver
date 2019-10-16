
const SpaceObject = require("./space_object");
const Utils = require("./utils");

class Ship extends SpaceObject{

	constructor(options) {
		super(options.pos);

		this.rotationOffset = options.rotationOffset;
		this.phaserColor = options.phaserColor;
		this.beamSound = options.beamSound;
		this.torpSound = options.torpSound;
		this.explosion = options.explosion;
		this.explosionImg = options.explosionImg;
		this.sparksImg = options.sparksImg;

		this.speed = 0;
		this.width = 60;
		this.height = 30
		this.phaserStartOffset = 0;
		this.phaserCounter = 0;
		this.torpExplosionCounter = 0;
		this.shipExplosionCounter = 0;
		
		this.direction = this.calcDirection(this.rotationOffset);
		this.increment = Math.PI / 36;

		this.ssd;

		this.phaserRecharge = 0;
		this.phaserRechargeMax = 180;

		this.torpedoReload = 0;
		this.torpedoReloadMax= 220;

		this.hullIntegrityMax = 200;
		this.hullIntegrity = this.hullIntegrityMax;
	}

	// getter methods
	getDirection() { return this.direction; }
	getSpeed() {	return this.speed; }
	getRotation() { return this.rotationOffset; }
	phaserReady() { return this.phaserRecharge === this.phaserRechargeMax; }
	torpedosReady() { return this.torpedoReload === this.torpedoReloadMax; }
	getHull() { return this.hullIntegrity; }

	
	draw(ctx) {

		//draw ship systems display
		this.ssd.draw(ctx,
			this.phaserRecharge / this.phaserRechargeMax,
			this.torpedoReload / this.torpedoReloadMax,
			this.hullIntegrity / this.hullIntegrityMax
		);

		if (this.phaserCounter > 0) this.drawPhaser(ctx);

		// recharge weapons
		if (this.phaserRecharge !== this.phaserRechargeMax) this.phaserRecharge++;
		if (this.torpedoReload !== this.torpedoReloadMax) this.torpedoReload++;

		//shows torpedo hit
		if (this.torpExplosionCounter) {
			this.drawTorpExplosion(ctx);
			this.torpExplosionCounter++;
			if (this.torpExplosionCounter > 10) this.torpExplosionCounter = 0;
		}

		if (this.hullIntegrity === 0) this.shipExplosionCounter = this.drawShipExplosion(ctx);
	}

	// draw the phaser fire. The line extends toward the target over phaserDrawMax frames,
	// then stays there for a few frames
	drawPhaser(ctx) {

		const phaserDrawMax = 12;

		// moves the starting point for the phaser forward on the saucer for the enterprise
		const xStartingPoint = this.center()[0] + Math.cos(this.rotationOffset) * this.phaserStartOffset;
		const yStartingPoint = this.center()[1] + Math.sin(this.rotationOffset) * this.phaserStartOffset;

		let xDelta = this.target.center()[0] - xStartingPoint;
		let yDelta = this.target.center()[1] - yStartingPoint;

		// beam should stop if it hits a shield
		if (this.target.ssd.getShields()[this.target.shieldHit].getHitpoints() > 0) {
			const distance = Utils.distance(this, this.target);
			const distanceRatio = (distance-35)/distance
			xDelta = xDelta * distanceRatio;
			yDelta = yDelta * distanceRatio;
		}

		let increasingRatio = this.phaserCounter / phaserDrawMax;
		if (increasingRatio > 1) increasingRatio = 1;

		const xProgress = increasingRatio * xDelta + xStartingPoint;
		const yProgress = increasingRatio * yDelta + yStartingPoint;

		ctx.beginPath();
		ctx.moveTo(xStartingPoint, yStartingPoint);
		ctx.lineTo(xProgress, yProgress);
		ctx.strokeStyle = this.phaserColor;
		ctx.lineWidth = 3;
		ctx.stroke();

		this.phaserCounter++;

		if (this.phaserCounter >= phaserDrawMax) {
			if (this.target.ssd.getShields()[this.target.shieldHit].getHitpoints() > 0) {
				this.target.drawShieldOnHit(ctx, this.target.shieldHit);
			}

			//draws sparks effect when beam hits
			if (this.phaserCounter%2 === 0) {
				ctx.drawImage(this.sparksImg, 1, 25, 92, 108, xProgress-7, yProgress-7, 14, 14);
			}
			else ctx.drawImage(this.sparksImg, 120, 2, 165,148, xProgress - 10, yProgress - 10, 20, 20);
		}

		// zeros the counter and ends the beam effect
		if (this.phaserCounter > (phaserDrawMax+10)) this.phaserCounter = 0;
	};
	

	drawTorpExplosion(ctx) {	
		let x;
		let y;

		// if it hits a shield, it explodes there
		if (this.ssd.getShields()[this.shieldHit].getHitpoints() > 0) {
			const xDelta = this.attacker.center()[0] - this.center()[0];
			const yDelta = this.attacker.center()[1] - this.center()[1];
			const distance = Utils.distance(this, this.attacker);
			const percentage = 35 / distance;
			x = this.center()[0] + xDelta * percentage;
			y = this.center()[1] - 8 + yDelta * percentage;

			this.drawShieldOnHit(ctx, this.shieldHit);
		}
		else {
			x =	this.center()[0];
			y =	this.center()[1] - 5;
		}

		ctx.drawImage(this.explosionImg, 606, 295, 100, 100, x, y, 10, 10);
	};


	drawShieldOnHit(ctx, shieldNum){
		const startAndEnd = [
			[1.75,  .25],
			[ .25,  .75],
			[ .75, 1.25],
			[1.25, 1.75]
		];
		
		ctx.beginPath();
		ctx.arc(
			this.center()[0],
			this.center()[1],
			35,
			startAndEnd[shieldNum][0] * Math.PI + this.rotationOffset,
			startAndEnd[shieldNum][1] * Math.PI + this.rotationOffset
		);

		ctx.lineWidth = 1;

		ctx.strokeStyle = "#ADD8E6";
		ctx.stroke();
	};


	drawShipExplosion(ctx) {
		this.explosion.draw(ctx, this.center());
	};


	power(impulse) {
		if (impulse > 0 && this.speed < 3) this.speed += impulse;
		else if (impulse < 0 && this.speed > -1) this.speed += impulse;
	};


	firePhasers(target) {
		if (this.phaserRecharge === this.phaserRechargeMax) {
			this.target = target;
			this.target.receivePhaserHit(this);
			this.phaserCounter = 1;

			this.phaserRecharge = 0;
			this.beamSound.play();
		}
	};


	fireTorpedos() {
		if (this.torpedoReload === this.torpedoReloadMax) {
			this.torpedoReload = 0;
			this.torpSound.play();
			return true;
		}
		return false;
	};


	receivePhaserHit(attacker) {
		this.takeDamage(attacker, 18);
	};


	receiveTorpHit(torpedo) {
		this.takeDamage(torpedo.getLauncher(), 20);
		this.torpExplosionCounter = 1;
	};


	takeDamage(attacker, damage){
		this.attacker = attacker;

		this.whichShieldWasHit(attacker);

		if (this.ssd.getShields()[this.shieldHit].getHitpoints() > 0) {
			this.ssd.getShields()[this.shieldHit].hit(damage);
		}
		else this.hullIntegrity -= damage;

		if (this.hullIntegrity < 0) this.hullIntegrity = 0;
	};

	
	whichShieldWasHit(attacker) {
		const angle = Utils.angleToOtherShip(this, attacker);

		if (angle <= .25 * Math.PI || angle >= 1.75 * Math.PI) this.shieldHit = 0;
		else if (angle > .25 * Math.PI && angle < .75 * Math.PI) this.shieldHit = 1;
		else if (angle >= .75 * Math.PI && angle <= 1.25 * Math.PI) this.shieldHit = 2;
		else this.shieldHit = 3;
	};


	changeDirection(dir) { 
		this.rotationOffset += dir*this.increment;

		if (this.rotationOffset > 6.28) this.rotationOffset -= Math.PI *2;
		else if (this.rotationOffset < -.000000001) this.rotationOffset += Math.PI * 2;

		this.direction = this.calcDirection(this.rotationOffset);
	};


	calcDirection(rotationOffset) {
		return [Math.cos(rotationOffset) * 7, Math.sin(rotationOffset) * -7];
	}

}

module.exports = Ship


