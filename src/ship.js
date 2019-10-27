
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
		this.shipImg = options.shipImg;
		this.target = options.target;

		this.turnRadius;
		this.speed = 0;
		this.width = 60;
		this.height = 30;
		this.phaserOffsetDistance = 0;
		this.phaserOffsetAngle = 0;
		this.phaserCounter = 0;
		this.torpExplosionCounter = 0;
		this.shipExplosionCounter = 0;
		this.phaserDamage = 18;
		this.torpedoDamage = 20;
		this.targetShieldHP = 1;
		
		this.direction = this.calcDirection(this.rotationOffset);
		this.increment = Math.PI / 36;

		this.ssd;

		if (options.phaserRecharge) this.phaserRecharge = options.phaserRecharge;
		else this.phaserRecharge = 0;
		this.phaserRechargeMax = 180;

		if (options.torpedoReload) this.torpedoReload = options.torpedoReload;
		else this.torpedoReload = 0;
		this.torpedoReloadMax= 220;

		this.hullIntegrityMax = 200;
		this.hullIntegrity = this.hullIntegrityMax;
	}

	// getter methods
	getDirection() { return this.direction; }
	getSpeed() { return this.speed; }
	getRotation() { return this.rotationOffset; }
	phaserReady() { return this.phaserRecharge === this.phaserRechargeMax; }
	torpedosReady() { return this.torpedoReload === this.torpedoReloadMax; }
	getHull() { return this.hullIntegrity; }
	getTarget() { return this.target; }
	getTurnRadius() { return this.turnRadius; }
	isGone() { return this.shipExplosionCounter >= 33; }

	setTarget(target) { this.target = target; }
	
	draw(ctx, target) {
		//draw ship systems display
		this.ssd.draw(ctx,
			this.phaserRecharge / this.phaserRechargeMax,
			this.torpedoReload / this.torpedoReloadMax,
			this.hullIntegrity / this.hullIntegrityMax,
			target
		);

		// if there are multiple enemies, the current target gets a target draw on on it
		if (target) Utils.drawTarget(ctx, this.center()[0], this.center()[1], 7,1);

		if (this.phaserCounter > 0 && this.ptarget) this.drawPhaser(ctx, this.phaserOffsetAngle);

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
	drawPhaser(ctx, angle = 0, dashed) {

		const phaserDrawMax = 12;

		// moves the starting point for the phaser(on the saucer for the enterprise, on the wing for bop)
		const xStartingPoint = this.center()[0] + Math.cos(this.rotationOffset + angle) * this.phaserOffsetDistance;
		const yStartingPoint = this.center()[1] + Math.sin(this.rotationOffset + angle) * this.phaserOffsetDistance;

		let xDelta = this.ptarget.center()[0] - xStartingPoint;
		let yDelta = this.ptarget.center()[1] - yStartingPoint;

		// beam should stop if it hits a shield
		if (this.targetShieldHP > 0) {
			const distance = Utils.distance(this, this.ptarget);
			if (distance > 35 ) {
				const distanceRatio = (distance - 35) / distance
				xDelta = xDelta * distanceRatio;
				yDelta = yDelta * distanceRatio;
			}
		}

		let increasingRatio = this.phaserCounter / phaserDrawMax;
		if (increasingRatio > 1) increasingRatio = 1;

		const xProgress = increasingRatio * xDelta + xStartingPoint;
		const yProgress = increasingRatio * yDelta + yStartingPoint;

		ctx.beginPath();
		ctx.moveTo(xStartingPoint, yStartingPoint);
		ctx.lineTo(xProgress, yProgress);
		ctx.strokeStyle = this.phaserColor;

		if (dashed) {
			ctx.setLineDash([5,2,5,20]);
			ctx.lineWidth = 3;
		} else ctx.lineWidth = 3;

		ctx.stroke();
		ctx.setLineDash([]);


		if (angle === this.phaserOffsetAngle) this.phaserCounter++;

		if (this.phaserCounter == phaserDrawMax) { this.targetShieldHP = this.target.receivePhaserHit(this); }

		if (this.phaserCounter >= phaserDrawMax) {
			if (this.targetShieldHP > 0) {
				this.ptarget.drawShieldOnHit(ctx, this.ptarget.shieldHit);
			}

			let sizeFactor = 1;
			if (this.targetShieldHP === 0) sizeFactor = 1.5;

			//draws sparks effect when beam hits
			if (this.phaserCounter%2 === 0) {
				ctx.drawImage(this.sparksImg, 1, 25, 92, 108, xProgress - 5 * sizeFactor, yProgress - 5 * sizeFactor, 
					10 * sizeFactor, 10 * sizeFactor);
			}
			else ctx.drawImage(this.sparksImg, 120, 2, 165, 148, xProgress - 7 * sizeFactor, yProgress - 7 * sizeFactor, 
				14 * sizeFactor, 14 * sizeFactor);
		}

		// zeros the counter and ends the beam effect
		if (this.phaserCounter > (phaserDrawMax+10)) {
			this.phaserCounter = 0;
			this.targetShieldHP = 1;
		}
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
		return this.explosion.draw(ctx, this.center());
	};


	power(impulse) {
		if (impulse > 0 && this.speed < 3) this.speed += impulse;
		else if (impulse < 0 && this.speed > -1) this.speed += impulse;
	};


	firePhasers() {
		if (this.phaserRecharge === this.phaserRechargeMax) {
			this.phaserCounter = 1;
			this.ptarget = this.target;
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
		return this.takeDamage(attacker, attacker.phaserDamage);
	};


	receiveTorpHit(torpedo) {
		this.takeDamage(torpedo.getLauncher(), this.torpedoDamage);
		this.torpExplosionCounter = 1;
	};


	takeDamage(attacker, damage){
		this.attacker = attacker;

		this.whichShieldWasHit(attacker);
		const hp = this.ssd.getShields()[this.shieldHit].getHitpoints();
		if (hp > 0) {
			this.ssd.getShields()[this.shieldHit].hit(damage);
		}
		else this.hullIntegrity -= damage;

		if (this.hullIntegrity < 0) this.hullIntegrity = 0;

		return hp;
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


