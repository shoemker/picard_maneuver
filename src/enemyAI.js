
const Utils = require("./utils");

const EnemyAI = {
	consultAI(controlledShip, opponent, onscreen,  torpImg){
		const angleOfOponent = Utils.angleToOtherShip(controlledShip, opponent);
		const turnCounterMax = 5;
		const turnCircleMax = 50;

		// speed
		if ((controlledShip.getSpeed() < 2 && controlledShip.getSpeed() < opponent.getSpeed()) || 
					controlledShip.getSpeed() < 1) {
						controlledShip.power(1);
		}

		// fire phasors
		if (controlledShip.phasorReady() && onscreen) controlledShip.firePhasors(opponent);

		// set static variables
		if (typeof turnLeftLength == 'undefined') turnLeftLength = 0;
		if (typeof turnRightLength == 'undefined') turnRightLength = 0;
		if (typeof turnCounter == 'undefined') turnCounter = 0;

		// turning and torpedos
		if (!onscreen || controlledShip.torpedosReady()) {
			if (angleOfOponent > Math.PI * .0625 && angleOfOponent <= Math.PI) {
				if (turnCounter === turnCounterMax) {
					if(turnRightLength < turnCircleMax) {
						controlledShip.changeDirection(1);
						turnRightLength++;
						turnLeftLength = 0;
					}
					else controlledShip.changeDirection(-1);
				}
			}
			else if (angleOfOponent < Math.PI * 1.9375 &&
				angleOfOponent > Math.PI) {
				if (turnCounter === turnCounterMax) {
					if (turnLeftLength < turnCircleMax) {
						controlledShip.changeDirection(-1);
						turnLeftLength++;
						turnRightLength = 0;
					}
					else controlledShip.changeDirection(1);
				}
			}
			else controlledShip.fireTorpedos(torpImg);
		}

		turnCounter++;
		if (turnCounter > turnCounterMax) turnCounter = 0;
	}
}

module.exports = EnemyAI;