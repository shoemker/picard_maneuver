
const Utils = require("./utils");

const EnemyAI = {
	consultAI(enemy, enterprise, canvas_width, canvas_height, turnCounter, torpImg){
		let onscreen = enemy.onscreen(canvas_width, canvas_height);
		let angleOfEnterprise = Utils.angleToOtherShip(enemy, enterprise);
		let timerMax = 5;

		// set static variables
		if (typeof turnLeftLength == 'undefined') turnLeftLength = 0;
		if (typeof turnRightLength == 'undefined') turnRightLength = 0;
			
		// speed
		if (enemy.getSpeed() < 1) enemy.power(1);

		// fire phasors
		if (enemy.phasorReady() && onscreen) enemy.firePhasors(enterprise);

		// turning and torpedos
		if (!onscreen || enemy.torpedoReady()) {
			if (angleOfEnterprise > Math.PI *.0625 && angleOfEnterprise <= Math.PI) {
				if(turnCounter === timerMax) {
					enemy.changeDirection(1);
					turnRightLength++;
					turnLeftLength = 0;
				}
			}
			else if (angleOfEnterprise < Math.PI * 1.9375 && 
							 angleOfEnterprise > Math.PI) {
				if (turnCounter === timerMax) {
					enemy.changeDirection(-1);
					turnLeftLength++;
					turnRightLength = 0;
				}
		 	}
			else enemy.fireTorpedos(torpImg);
		}

		// console.log("left: " + turnLeftLength + ", right: " +turnRightLength);
	}
}

module.exports = EnemyAI;