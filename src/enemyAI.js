
const Utils = require("./utils");

class EnemyAI  {
	constructor(controlledShip, opponent, randomness, torpImg,) {
		this.controlledShip = controlledShip;
		this.opponent = opponent;
		this.torpImg = torpImg;
		this.randomness = randomness;

		this.turnLeftLength = 0;
		this.turnRightLength = 0;
		this.turnCounter = 0;
	}

	consultAI(onscreen){
		const angleOfOponent = Utils.angleToOtherShip(this.controlledShip, this.opponent);
		const turnCounterMax = 5;
		const turnCircleMax = 50;

		// speed
		if ((this.controlledShip.getSpeed() < 2 && this.controlledShip.getSpeed() < this.opponent.getSpeed()) || 
				this.controlledShip.getSpeed() < 1) {
			this.controlledShip.power(1);
		}

		// fire phasors
		if (this.controlledShip.phasorReady() && onscreen) this.controlledShip.firePhasors(this.opponent);


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
			else this.controlledShip.fireTorpedos(this.torpImg);
		}
		else if (this.randomness) {
			const random = Math.random();
			if (random < .01) this.controlledShip.changeDirection(1);
			else if (random > .99) this.controlledShip.changeDirection(-1);
		}

		this.turnCounter++;
		if (this.turnCounter > turnCounterMax) this.turnCounter = 0;
	}
}

module.exports = EnemyAI;