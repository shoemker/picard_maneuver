
const Utils = require("./utils");

const EnemyAI = {
	consultAI(enemy, enterprise, onscreen,  torpImg){
		const angleOfEnterprise = Utils.angleToOtherShip(enemy, enterprise);
		const turnCounterMax = 5;
		const turnCircleMax = 50;

		// speed
		if ((enemy.getSpeed() < 2 && enemy.getSpeed() < enterprise.getSpeed()) || 
					enemy.getSpeed() < 1) {
						enemy.power(1);
		}

		// fire phasors
		if (enemy.phasorReady() && onscreen) enemy.firePhasors(enterprise);

		// set static variables
		if (typeof turnLeftLength == 'undefined') turnLeftLength = 0;
		if (typeof turnRightLength == 'undefined') turnRightLength = 0;
		if (typeof turnCounter == 'undefined') turnCounter = 0;

		// turning and torpedos
		if (!onscreen || enemy.torpedosReady()) {
			if (angleOfEnterprise > Math.PI * .0625 && angleOfEnterprise <= Math.PI) {
				if (turnCounter === turnCounterMax) {
					if(turnRightLength < turnCircleMax) {
						enemy.changeDirection(1);
						turnRightLength++;
						turnLeftLength = 0;
					}
					else enemy.changeDirection(-1);
				}
			}
			else if (angleOfEnterprise < Math.PI * 1.9375 &&
				angleOfEnterprise > Math.PI) {
				if (turnCounter === turnCounterMax) {
					if (turnLeftLength < turnCircleMax) {
						enemy.changeDirection(-1);
						turnLeftLength++;
						turnRightLength = 0;
					}
					else enemy.changeDirection(1);
				}
			}
			else enemy.fireTorpedos(torpImg);
		}

		turnCounter++;
		if (turnCounter > turnCounterMax) turnCounter = 0;
	}
}

module.exports = EnemyAI;