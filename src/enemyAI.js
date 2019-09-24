
const Utils = require("./utils");

const EnemyAI = {
	checkForMoves(enemy, enterprise, canvas_width, canvas_height, torpImg){

		let onscreen = enemy.onscreen(canvas_width, canvas_height);
		let angleOfEnterprise = enemy.whichShieldWasHit(enterprise);

		// // speed
		// if (enemy.getSpeed() < 2) enemy.power(1);

		// // fire phasors
		// if (enemy.phasorReady() && onscreen) enemy.firePhasors(enterprise);

		// //
		// if (enemy.torpedoReady() && onscreen && dirOfEnterprise === 0) 
								// enemy.fireTorpedos(torpImg);
		
	}
}

module.exports = EnemyAI;