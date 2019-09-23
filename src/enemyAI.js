
const EnemyAI = {
	checkForMoves(enemy, enterprise, canvas_width, canvas_height){

		if (enemy.getSpeed() < 2) enemy.power(1);
		if (enemy.phasorReady() && enemy.onscreen(canvas_width,canvas_height)) {
			
			enemy.firePhasors(enterprise);
		}
	}
}

module.exports = EnemyAI;