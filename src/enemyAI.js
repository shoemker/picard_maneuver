const Utils = require("./utils");

class EnemyAI  {
	constructor(aiShip, game, targeting = false) {
		this.aiShip = aiShip;
		this.game = game;
		this.targeting = targeting
		// this.aiShip.getTurnRadius() = this.aiShip.getTurnRadius();
		this.beenOffScreen = false;

		this.turnLeftLength = 0;
		this.turnRightLength = 0;
		this.turnCounter = 0;
		this.reverseCount = 0;
		this.reverseCountMax = 60;
	}

	consultAI(onscreen){
		if (!onscreen && this.aiShip !== this.game.main) this.beenOffScreen = true
		if (this.targeting) this.changeTarget(onscreen);

		if (this.aiShip.getTarget()) {
			const angleOfOpponent = Utils.angleToOtherShip(this.aiShip, this.aiShip.getTarget());

			this.changeSpeed();
			this.fireBeamWeapon(onscreen);
			this.checkForRearEnemy(angleOfOpponent);
			this.turningAndTorpedoes(angleOfOpponent, onscreen);
		} 
		else this.aiShip.setTarget(this.game.randomTarget(this.aiShip));
	}
	

	changeTarget(onscreen) {
		let potentialTargets = [];

		if (!onscreen && this.aiShip !== this.game.main) this.aiShip.setTarget(this.game.main);
		else if (onscreen && this.beenOffScreen) {
			this.aiShip.setTarget(this.game.randomTarget(this.aiShip))
			this.beenOffScreen = false;
			// if (!this.aiShip.isEnemy() && this.aiShip.getTarget() === this.game.main) debugger;
		}
		else {
			const target = this.aiShip.getTarget()
			if (!target || target.isGone() || !target.onscreen())
					this.aiShip.setTarget(this.game.randomTarget(this.aiShip))

			// if an enemy ship is in front of the ship in question, it becomes the target
			if (this.aiShip.isEnemy()) potentialTargets = this.game.allies.concat(this.game.main);
			else potentialTargets = this.game.enemies;
			potentialTargets.forEach((target) => {
				const angle = Utils.angleToOtherShip(this.aiShip, target)
				if ((angle > (2 * Math.PI - Math.PI / 9)) || (angle < Math.PI / 9) && this.aiShip.torpedosReady()) 
					this.aiShip.setTarget(target);
			});
		}
	}


	fireBeamWeapon(onscreen) {
		if (this.aiShip.phaserReady() && onscreen && this.aiShip.getTarget().onscreen()) 
			this.aiShip.firePhasers();
	}

	// if the other ship is sitting behind, stop
	checkForRearEnemy(angleOfOpponent) {
		if (Math.abs(Math.PI - angleOfOpponent) < .4 &&
			Utils.distance(this.aiShip.center(), this.aiShip.getTarget().center()) < 120 &&
			Math.abs(this.aiShip.getRotation() - this.aiShip.getTarget().getRotation()) < .4 &&
			this.aiShip.torpedosReady()) {
			this.reverseCount++;
		}
	}
	

	turningAndTorpedoes(angleOfOpponent, onscreen) {
		// if (this.aiShip.torpedosReady()) debugger;
		const turnCircleMax = 180;
		if (!onscreen || this.aiShip.torpedosReady()) {
			if (angleOfOpponent > Math.PI /18 && angleOfOpponent <= Math.PI) {
				if (this.turnCounter === this.aiShip.getTurnRadius()) {
					if (this.turnRightLength < turnCircleMax) {
						this.aiShip.changeDirection(1);
						this.turnRightLength++;
						this.turnLeftLength = 0;
					}
					else this.aiShip.changeDirection(-1);
				}
			}
			else if (angleOfOpponent < Math.PI * 1.9444 && angleOfOpponent > Math.PI) {
				if (this.turnCounter === this.aiShip.getTurnRadius()) {
					if (this.turnLeftLength < turnCircleMax) {
						this.aiShip.changeDirection(-1);
						this.turnLeftLength++;
						this.turnRightLength = 0;
					}
					else this.aiShip.changeDirection(1);
				}
			}
			else if (this.aiShip.getTarget().onscreen()) this.game.fireTorpedoes(this.aiShip);
		}
		// ai gets some randomness
		else {
			const random = Math.random();
			if (random < .04) this.aiShip.changeDirection(1);
			else if (random > .96) this.aiShip.changeDirection(-1);
		}

		this.turnCounter++;
		if (this.turnCounter > this.aiShip.getTurnRadius()) this.turnCounter = 0;
	}


	changeSpeed() {
		const speed = this.aiShip.getSpeed();

		const targetSpeed = this.aiShip.getTarget().getSpeed();
		if (this.reverseCount !== 0) {
			this.aiShip.power(-1);
			this.reverseCount++;
			if (this.reverseCount >= this.reverseCountMax) this.reverseCount = 0;
		}
		else if ((speed < 2 && speed < targetSpeed) || speed < 1) {
			this.aiShip.power(1);
		}
		else if ((speed > targetSpeed) && speed > 1) this.aiShip.power(-1);
	}
}

module.exports = EnemyAI;