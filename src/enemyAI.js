
const Utils = require("./utils");

const EnemyAI = {
	checkForMoves(enemy, enterprise, canvas_width, canvas_height, torpImg){

		let onscreen = enemy.onscreen(canvas_width, canvas_height);
		let angleOfEnterprise = Utils.angleToOtherShip(enemy, enterprise);

		// console.log(angleOfEnterprise);

		// speed
		if (enemy.getSpeed() < 2) enemy.power(1);

		// fire phasors
		if (enemy.phasorReady() && onscreen) enemy.firePhasors(enterprise);

		if (!onscreen || enemy.torpedoReady) {
			if (angleOfEnterprise > Math.PI *.0625 && angleOfEnterprise <= Math.PI) enemy.changeDirection(1);
			else if (angleOfEnterprise < Math.PI * 1.9375 && angleOfEnterprise > Math.PI) enemy.changeDirection(-1);
			else enemy.fireTorpedos(torpImg);
		}

	}
}

module.exports = EnemyAI;