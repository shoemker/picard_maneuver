
const Utils = require("./utils");

class EnemyAI  {
	constructor(controlledShip, game) {
		this.controlledShip = controlledShip;
		this.game = game;
		this.turnCounterMax = controlledShip.getTurnRadius();

		this.turnLeftLength = 0;
		this.turnRightLength = 0;
		this.turnCounter = 0;
		this.reverseCount = 0;
		this.reverseCountMax = 60;
	}

	consultAI(onscreen){
		const angleOfOpponent = Utils.angleToOtherShip(this.controlledShip, this.controlledShip.getTarget());
		this.changeSpeed();
		this.fireBeamWeapon(onscreen);
		this.checkForRearEnemy(angleOfOpponent);
		this.turningAndTorpedoes(angleOfOpponent, onscreen);
	}


	fireBeamWeapon(onscreen) {
		if (this.controlledShip.phaserReady() && onscreen) this.controlledShip.firePhasers();
	}

	// if the other ship is sitting behind, stop
	checkForRearEnemy(angleOfOpponent) {
		if (Math.abs(Math.PI - angleOfOpponent) < .4 &&
			Utils.distance(this.controlledShip, this.controlledShip.getTarget()) < 120 &&
			Math.abs(this.controlledShip.getRotation() - this.controlledShip.getTarget().getRotation()) < .4) {
			this.reverseCount++;
		}
	}
	

	turningAndTorpedoes(angleOfOpponent, onscreen) {
		const turnCircleMax = 80;
		if (!onscreen || this.controlledShip.torpedosReady()) {
			if (angleOfOpponent > Math.PI * .0625 && angleOfOpponent <= Math.PI) {
				if (this.turnCounter === this.turnCounterMax) {
					if (this.turnRightLength < turnCircleMax) {
						this.controlledShip.changeDirection(1);
						this.turnRightLength++;
						this.turnLeftLength = 0;
					}
					else this.controlledShip.changeDirection(-1);
				}
			}
			else if (angleOfOpponent < Math.PI * 1.9375 && angleOfOpponent > Math.PI) {
				if (this.turnCounter === this.turnCounterMax) {
					if (this.turnLeftLength < turnCircleMax) {
						this.controlledShip.changeDirection(-1);
						this.turnLeftLength++;
						this.turnRightLength = 0;
					}
					else this.controlledShip.changeDirection(1);
				}
			}
			else if (onscreen) this.game.fireTorpedoes(this.controlledShip);
		}
		// ai gets some randomness
		else {
			const random = Math.random();
			if (random < .02) this.controlledShip.changeDirection(1);
			else if (random > .98) this.controlledShip.changeDirection(-1);
		}

		this.turnCounter++;
		if (this.turnCounter > this.turnCounterMax) this.turnCounter = 0;
	}


	changeSpeed() {
		if (this.reverseCount !== 0) {
			this.controlledShip.power(-1);
			this.reverseCount++;
			if (this.reverseCount >= this.reverseCountMax) this.reverseCount = 0;
		}
		else if ((this.controlledShip.getSpeed() < 2 && this.controlledShip.getSpeed() < this.controlledShip.getTarget().getSpeed()) ||
			this.controlledShip.getSpeed() < 1) {
			this.controlledShip.power(1);
		}
	}
}

module.exports = EnemyAI;