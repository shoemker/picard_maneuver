const SpaceObject = require("../non-ship_space_objects/space_object");
const Explosion = require("../explosion");
const Fire = require("../fire");
const EnemyAI = require("../enemyAI");
const Utils = require("../utils");

class Ship extends SpaceObject{

	constructor(options) {
		super();

		if (options.rotationOffset) this.rotationOffset = options.rotationOffset;
		else this.rotationOffset = 0;
		
		this.images = options.images;
		this.target = options.target;
		
		this.AI= new EnemyAI(this, options.game, options.aiTargeting);

		this.explosion = new Explosion(this.images.explosionImg, options.sounds.exploSound);
		// this.fire = new Fire(options.images.fireImg);

		this.beamPattern = [];

		this.speed = 0;
		this.width = 60; 		// height and width need to be here
		this.height = 30;
		this.phaserOffsetDistance = 0;
		this.phaserOffsetAngle = 0;
		this.phaserCounter = 0;
		this.torpExplosionCounter = 0;
		this.shipExplosionCounter = 0;
		this.phaserDamage = 18;
		this.torpedoDamage = 20;
		this.targetShieldHP = 1;
		this.ssdPos = options.ssdPos;

		this.engineDamCount = 0;
		this.beamDamCount = 0; 
		this.torpDamCount = 0;
		this.damageCountMax = 480;

		this.direction = this.calcDirection(this.rotationOffset);

		this.ssd;
		this.damageTokens = [];

		if (options.phaserRecharge) this.phaserRecharge = options.phaserRecharge;
		else this.phaserRecharge = 0;
		this.phaserRechargeMax = 180;

		if (options.torpedoReload) this.torpedoReload = options.torpedoReload;
		else this.torpedoReload = 0;
		this.torpedoReloadMax= 220;

		this.hullIntegrityMax = 200;
		this.hullIntegrity = this.hullIntegrityMax;
	};

	// getter methods
	getDirection() { return this.direction; }
	getSpeed() { return this.speed; }
	getRotation() { return this.rotationOffset; }
	getSSD() { return this.ssd; }
	phaserReady() { return this.phaserRecharge === this.phaserRechargeMax; }
	torpedosReady() { return this.torpedoReload >= this.torpedoReloadMax; }
	getHull() { return this.hullIntegrity; }
	getTarget() { return this.target; }
	getTurnRadius() { return this.turnRadius; }
	getTorpedoDamage() { return this.torpedoDamage; }
	isGone() { return this.shipExplosionCounter >= 33; }
	isEnemy() { return this.enemy; }

	// setter methods
	setTarget(target) { this.target = target; }
	setLabels(val) { this.ssd.setLabels(val); }
	

	draw(ctx, beamCallback, engineDamCallback, beamDamCallback, shipImage, target) {
		// debugger
		this.drawShip(ctx, shipImage);

		//draw ship systems display
		this.drawSSD(ctx, engineDamCallback, beamDamCallback, target);

		// if there are multiple enemies, the current target gets a target draw on on it
		if (target) Utils.drawTarget(ctx, this.center()[0], this.center()[1], 7,1);

		if (this.phaserCounter > 0 && this.ptarget && !this.ptarget.isGone()) 
			this.drawPhaser(ctx, this.phaserOffsetAngle, this.phaserDamage, beamCallback);

		// recharge weapons
		if (this.phaserRecharge !== this.phaserRechargeMax) this.phaserRecharge++;
		if (this.torpedoReload < this.torpedoReloadMax) this.torpedoReload++;

		//shows torpedo hit
		if (this.torpExplosionCounter) {
			this.drawTorpExplosion(ctx);
			this.torpExplosionCounter++;
			if (this.torpExplosionCounter > 10) this.torpExplosionCounter = 0;
		}

		if (this.damageTokens.length > 0) this.drawDamageTokens(ctx);

		if (this.hullIntegrity === 0) this.shipExplosionCounter = this.drawShipExplosion(ctx);

		// this.fire.draw(ctx, {x:this.pos[0],y:this.pos[1] + 20});
	};


	drawShip(ctx, shipImage){
		ctx.save();

		// rotate
		ctx.translate(this.center()[0], this.center()[1]);
		ctx.rotate(this.rotationOffset);
		ctx.translate(-(this.center()[0]), -(this.center()[1]));

		//draw ship
		if (this.shipExplosionCounter < 34) {
			ctx.drawImage(shipImage.image, shipImage.x, shipImage.y, 
				shipImage.width, shipImage.height,
				this.pos[0], this.pos[1], this.width, this.height);
		}

		ctx.restore();
	};


	drawSSD(ctx, engineDamCallback, beamDamCallback, target) {
		this.ssd.draw(ctx,
			this.phaserRecharge / this.phaserRechargeMax,
			this.torpedoReload / this.torpedoReloadMax,
			this.hullIntegrity / this.hullIntegrityMax,
			target
		);

		this.drawEngineDamageOnSSD(ctx, engineDamCallback);
		this.drawBeamDamageOnSSD(ctx, beamDamCallback);
		this.drawTorpDamageOnSSD(ctx);
	};


	drawEngineDamageOnSSD(ctx, engineDamCallback) {
		if (this.engineDamCount === this.damageCountMax) {
			this.engineDamCount = 0;
		}
		else if (this.engineDamCount > 0) {
			this.engineDamCount++;
			this.ssd.drawDamageLabel(ctx, "Repairing Engines", 0);

			if (this.engineDamCount % 40 > 10) {
				engineDamCallback(ctx, this.engineDamageDim, this.ssdPos);
			}
		}
	};


	drawBeamDamageOnSSD(ctx, beamDamCallback) {
		if (this.beamDamCount === this.damageCountMax) {
			this.beamDamCount = 0;
			this.phaserDamage = this.phaserDamage * 2;
		}
		else if (this.beamDamCount > 0) {
			this.beamDamCount++;	
			this.ssd.drawDamageLabel(ctx, "Repairing " + this.ssd.getBeamName() + "s", 50);

			if (this.beamDamCount % 40 > 10) {
				beamDamCallback(ctx, this.beamDamageDim, this.ssdPos);
			}
		}
	};


	drawTorpDamageOnSSD(ctx) {
		if (this.torpDamCount === this.damageCountMax) {
			this.torpDamCount = 0;
			this.torpedoReloadMax = this.torpedoReloadMax / 2;

			if (this.torpedoReload > this.torpedoReloadMax)
				this.torpedoReload = this.torpedoReloadMax;
		}
		else if (this.torpDamCount > 0) {
			this.torpDamCount++;
			this.ssd.drawDamageLabel(ctx, "Repairing Torpedos", 100);

			if (this.torpDamCount % 40 > 10) {
				this.ssd.drawTorpIcon(ctx, this.images.torpIcon, this.torpImgOnSSD);
			}
		}
	};


	// draw the phaser fire. The line extends toward the target over phaserDrawMax frames,
	// then stays there for a few frames
	drawPhaser(ctx, angle, damage, callback) {

		const phaserDrawMax = 20;

		// moves the starting point for the phaser(on the saucer for the enterprise, on the wing for bop)
		let xStartingPoint = this.center()[0] + 
			Math.cos(this.rotationOffset + angle) * this.phaserOffsetDistance;
			
		let yStartingPoint = this.center()[1] + 
			Math.sin(this.rotationOffset + angle) * this.phaserOffsetDistance;

		let xDelta = this.ptarget.center()[0] - xStartingPoint;
		let yDelta = this.ptarget.center()[1] - yStartingPoint;

		// beam should stop if it hits a shield
		let distance = Utils.distance(this.center(), this.ptarget.center());
		if (this.targetShieldHP > 0) {
			if (distance > 35 ) {
				const distanceRatio = (distance - 35) / distance;
				distance -= 35;
				xDelta = xDelta * distanceRatio;
				yDelta = yDelta * distanceRatio;
			}
		}

		let increasingRatio = this.phaserCounter / phaserDrawMax;
		if (increasingRatio > 1) increasingRatio = 1;

		const xProgress = increasingRatio * xDelta + xStartingPoint;
		const yProgress = increasingRatio * yDelta + yStartingPoint;

		ctx.strokeStyle = this.phaserColor;
		ctx.beginPath();
		ctx.lineWidth = 3;
		if (this.beamDamCount > 0) ctx.lineWidth = 1;
		ctx.setLineDash(this.beamPattern);  // bop beam is a dotted line
		
		// this callback draws the beam which can be straight, wavy, or circles depending on the callback
		callback(ctx, 
			{ x: xStartingPoint, y: yStartingPoint }, 
			{ x: xProgress, y: yProgress });

		ctx.stroke();
		ctx.setLineDash([]);	// in case line was dotted, this sets it back to solid


		if (angle === this.phaserOffsetAngle) this.phaserCounter++;

		if (this.phaserCounter === phaserDrawMax && damage > 0) {
			this.targetShieldHP = this.ptarget.receivePhaserHit(this, damage,
					[xProgress-this.ptarget.center()[0],yProgress-this.ptarget.center()[1]]);
		}

		if (this.phaserCounter > phaserDrawMax && damage > 0) {
			if (this.targetShieldHP > 0) {
				this.ptarget.drawShieldOnHit(ctx, this.ptarget.shieldHit);
			}

			let sizeFactor = 1;
			if (this.targetShieldHP === 0) sizeFactor = 1.5;

			//draws sparks effect when beam hits
			if (this.phaserCounter%2 === 0) {
				ctx.drawImage(this.images.sparksImg, 1, 25, 92, 108, 
					xProgress - 5 * sizeFactor, yProgress - 5 * sizeFactor, 
					10 * sizeFactor, 10 * sizeFactor);
			}
			else 
				ctx.drawImage(this.images.sparksImg, 120, 2, 165, 148, 
					xProgress - 7 * sizeFactor, yProgress - 7 * sizeFactor, 
					14 * sizeFactor, 14 * sizeFactor);
		}

		// zeros the counter and ends the beam effect
		if (this.phaserCounter > (phaserDrawMax+15)) {
			this.phaserCounter = 0;
			this.targetShieldHP = 1;
		}
	};


	drawTorpExplosion(ctx) {	
		let x = this.center()[0];
		let y = this.center()[1] - 5;
		let colorOfToken = "red";

		// if it hits a shield, it explodes there
		if (this.ssd.getShields()[this.shieldHit].getHitpoints() > 0) {
			const xDelta = this.attacker.center()[0] - this.center()[0];
			const yDelta = this.attacker.center()[1] - this.center()[1];
			const distance = Utils.distance(this, this.attacker);
			const percentage = 35 / distance;
			x = this.center()[0] - 5 + xDelta * percentage;
			y = this.center()[1] - 8 + yDelta * percentage;

			colorOfToken = "#ADD8E6";
			this.drawShieldOnHit(ctx, this.shieldHit);
		}
		
		if (this.torpExplosionCounter === 1) {
			let hitCoords = [x - this.center()[0], y - this.center()[1]] ;

			if (colorOfToken === "red") {
				hitCoords[0] = hitCoords[0] *4;
				hitCoords[1] = hitCoords[1] * 4;
			};
			let damage = this.attacker.getTorpedoDamage();
			let last = this.damageTokens.length - 1;
			if (last > -1 && this.damageTokens[last].key === this.torpHitKey) 
				this.damageTokens[last].damage += damage;
			else this.damageTokens.push(
				{ hitCoords, damage, colorOfToken, time:0, key:this.torpHitKey });
		}

		ctx.drawImage(this.images.explosionImg, 606, 295, 100, 100, x, y, 10, 10);
	};


	drawShieldOnHit(ctx, shieldNum){
		const startAndEnd = [
			[1.75,  .25],
			[ .25,  .75],
			[ .75, 1.25],
			[1.25, 1.75]
		];

		const gradient = ctx.createRadialGradient(
			this.center()[0], this.center()[1], 21, 
			this.center()[0], this.center()[1], 37);

		gradient.addColorStop(1, "#00FFFF");

		gradient.addColorStop(0, "transparent");
		
		ctx.beginPath();
		ctx.arc(
			this.center()[0],
			this.center()[1],
			35,
			startAndEnd[shieldNum][0] * Math.PI + this.rotationOffset,
			startAndEnd[shieldNum][1] * Math.PI + this.rotationOffset
		);

		ctx.fillStyle = gradient;
		ctx.fill();
	};


	drawShipExplosion(ctx) {
		return this.explosion.draw(ctx, this.center());
	};

	
	drawDamageTokens(ctx) {
		const enlargeStop = 20;
		let factor = 1;

		this.damageTokens.forEach((token, i) => {
			ctx.fillStyle = token.colorOfToken;

			if (token.time < enlargeStop) factor = token.time/enlargeStop;
			else factor = 1;
			
			ctx.font = 20*factor + "px FINALOLD"; 
			ctx.fillText("-" + token.damage, 
				(this.center()[0] + token.hitCoords[0] * 1.1) -10, 
				this.center()[1] + token.hitCoords[1] * 1.1);

			token.time++;
			if (token.time === 40) this.damageTokens.splice(i, 1);
		})
	};


	consultAI(onscreen) {
		this.AI.consultAI(onscreen);
	};


	power(impulse) {
		if (impulse > 0 && this.speed < 2) {
			// next line takes engine damage into account
			if (this.engineDamCount === 0 || this.speed < .5) this.speed += impulse;
		}
		else if (impulse < 0 && this.speed > -1) {
			// next line takes engine damage into account
			if (this.engineDamCount === 0 || this.speed > -.5) this.speed += impulse;
		}
	};


	firePhasers() {
		if (this.phaserRecharge === this.phaserRechargeMax) {
			this.phaserCounter = 1;
			this.ptarget = this.target;
			this.phaserRecharge = 0;
			this.beamSound.play();
			return true;
		}
		return false;
	};


	fireTorpedos() {
		if (this.torpedoReload >= this.torpedoReloadMax && this.onscreen()) {
			this.torpedoReload = 0;
			this.torpSound.play();
			return true;
		}
		return false;
	};


	receivePhaserHit(attacker, damage, hitCoords) {
		let colorOfToken;
		const hp = this.takeDamage(attacker, damage);

		if (hp > 0) colorOfToken = "#ADD8E6";
		else colorOfToken = "red";

		this.damageTokens.push({hitCoords, damage, colorOfToken, time:0});
		
		return hp;
	};


	receiveTorpHit(torpedo) {
		let damage = torpedo.getLauncher().getTorpedoDamage();

		this.takeDamage(torpedo.getLauncher(),damage);
		
		this.torpExplosionCounter = 1;
		this.torpHitKey = torpedo.getKey();
	};


	takeDamage(attacker, damage){
		this.attacker = attacker;

		this.whichShieldWasHit(attacker);
		const hp = this.ssd.getShields()[this.shieldHit].getHitpoints();
		if (hp > 0) {
			this.ssd.getShields()[this.shieldHit].hit(damage);
		}
		else {
			this.hullIntegrity -= damage;
			if (this.hullIntegrity < 0) this.hullIntegrity = 0;
			else this.determineSystemDamage();

			this.ssd.updateImg(this.hullIntegrity / this.hullIntegrityMax);
		}

		return hp;
	};

	
	determineSystemDamage() {
		const rand = Math.random();

		if (this.engineDamCount === 0 && rand < .2) {
			this.engineDamCount = 1;
			if (this.speed > .5) this.speed = .5;
			else if (this.speed < -.5) this.speed = -.5;
		}
		else if (this.beamDamCount === 0 && rand >= .2 && rand < .4) {
			this.beamDamCount = 1;
			this.phaserDamage = this.phaserDamage / 2;
		}
		else if (this.torpDamCount === 0 && rand >= .4 && rand < .6) {
			this.torpDamCount = 1;
			this.torpedoReloadMax = this.torpedoReloadMax * 2;
		}
	};

	
	whichShieldWasHit(attacker) {
		const angle = Utils.angleToOtherShip(this, attacker);

		if (angle <= .25 * Math.PI || angle >= 1.75 * Math.PI) this.shieldHit = 0;
		else if (angle > .25 * Math.PI && angle < .75 * Math.PI) this.shieldHit = 1;
		else if (angle >= .75 * Math.PI && angle <= 1.25 * Math.PI) this.shieldHit = 2;
		else this.shieldHit = 3;
	};


	changeDirection(dir) { 
		const increment = Math.PI / 72;

		this.rotationOffset += dir*increment;

		if (this.rotationOffset > 6.28) this.rotationOffset -= Math.PI *2;
		else if (this.rotationOffset < -.000000001) this.rotationOffset += Math.PI * 2;

		this.direction = this.calcDirection(this.rotationOffset);
	};


	calcDirection(rotationOffset) {
		return {x:Math.cos(rotationOffset) * 7, y:Math.sin(rotationOffset) * -7};
	};
}

module.exports = Ship