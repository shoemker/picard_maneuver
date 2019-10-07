
const Utils = require("./utils");

class EnemyAI  {
	constructor(controlledShip, opponent, randomness, game) {
		this.controlledShip = controlledShip;
		this.opponent = opponent;
		this.randomness = randomness;
		this.game = game;

		this.turnLeftLength = 0;
		this.turnRightLength = 0;
		this.turnCounter = 0;
		this.reverseCount = 0;
		this.reverseCountMax = 60;
	}

	consultAI(onscreen){
		const angleOfOponent = Utils.angleToOtherShip(this.controlledShip, this.opponent);
		const turnCounterMax = 4;
		const turnCircleMax = 80;

		// speed
		if (this.reverseCount !== 0) {
			console.log(this.reverseCount);
			this.controlledShip.power(-1);
			this.reverseCount++;
			if (this.reverseCount >= this.reverseCountMax) this.reverseCount = 0;
		}
		else if ((this.controlledShip.getSpeed() < 2 && this.controlledShip.getSpeed() < this.opponent.getSpeed()) || 
				this.controlledShip.getSpeed() < 1) {
			this.controlledShip.power(1);
		}

		// if the other ship is sitting behind, stop
		if (Math.abs(Math.PI - angleOfOponent) < .4 && 
			Utils.distance(this.controlledShip, this.opponent) < 150 &&
			Math.abs(this.controlledShip.getRotation() - this.opponent.getRotation()) < .4) {
				this.reverseCount++;
		}


		// fire phasers
		if (this.controlledShip.phaserReady() && onscreen) this.controlledShip.firePhasers(this.opponent);


		// turning and torpedos
		if (!onscreen || this.controlledShip.torpedosReady()) {
			if (angleOfOponent > Math.PI * .0625 && angleOfOponent <= Math.PI) {
				if (this.turnCounter === turnCounterMax) {
					if(this.turnRightLength < turnCircleMax) {
						this.controlledShip.changeDirection(1);
						this.turnRightLength++;
						this.turnLeftLength = 0;
					}
					else this.controlledShip.changeDirection(-1);
				}
			}
			else if (angleOfOponent < Math.PI * 1.9375 &&
				angleOfOponent > Math.PI) {
				if (this.turnCounter === turnCounterMax) {
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
		else if (this.randomness) {
			const random = Math.random();
			if (random < .02) this.controlledShip.changeDirection(1);
			else if (random > .98) this.controlledShip.changeDirection(-1);
		}

		this.turnCounter++;
		if (this.turnCounter > turnCounterMax) this.turnCounter = 0;
	}
}

module.exports = EnemyAI;