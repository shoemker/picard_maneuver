const Star = require("./non-ship_space_objects/star");
const Planet = require("./non-ship_space_objects/planet");
const EnemyAI = require("./enemyAI");
const Torpedo = require("./non-ship_space_objects/torpedo");
const BridgeView = require("./bridge_view");
const Utils = require("./utils");

class Game {

	constructor(images) {
		this.images = images;

		this.base_speed_inverse = 5;

		this.win = false;
		this.lose = false;
		this.muted = false;
		this.autopilot = false;

		this.enemies = [];
		this.allies = [];
		this.enemyAIs = [];
		this.allyAIs = []
		this.torpedoes = [];
		this.stars = [];

		this.keyMap = {};

		this.torpedoKey = 0;

		this.createStarField();

		this.turnCounter = 0;
		this.turnCounterMax = 6;
		this.bridgeView = new BridgeView(images);
	}

	getKeyMap() { return this.keyMap; };
	getBridge() { return this.bridgeView; };

	addMainShip(ship, aiTargeting) {
		this.main = ship;
		this.mainAI = new EnemyAI(ship, this, aiTargeting);
	};

	addEnemy(enemy, aiTargeting) {
		this.enemies.push(enemy);
		this.enemyAIs.push(new EnemyAI(enemy, this, aiTargeting));
	};

	addAlly(ship, aiTargeting) {
		this.allies.push(ship);
		this.allyAIs.push(new EnemyAI(ship, this, aiTargeting));
	};

	// factory method to create planet and moon objects
	createPlanetAndMoon(planetImg, pCoords, moonImg, mCoords = [3, 3, 58, 58]) {

		this.planet = new Planet({
			pos: [300, 300],
			img: planetImg,
			width: 200, height: 200,
			sheetCoords: pCoords
		});

		this.moon_01 = new Planet({
			pos: [260, 410],
			img: moonImg,
			width: 50, height: 50,
			sheetCoords: mCoords
		});
	};


	step() {
		// console.log((Utils.findAngle(this.main.center(), this.enemies[0].center())) / Math.PI *180);

		// gets user input
		this.turnCounter++;
		if (this.turnCounter === this.turnCounterMax) {
			this.turnCounter = 0;
			this.checkKeyMap();
		}
		else if (this.turnCounter === this.turnCounterMax / 2) this.checkKeyMap();

		this.moveObjects();

		// this.enemyAIs.forEach((AI, i) =>
		// 	AI.consultAI(this.enemies[i].onscreen()));

		this.allyAIs.forEach((AI, i) =>
			AI.consultAI(this.allies[i].onscreen()));

		if (this.autopilot && this.main.getTarget())
			this.mainAI.consultAI(this.main.getTarget().onscreen());

		this.checkTorpCollisions();

		this.bridgeView.step();
	};


	moveObjects() {
		this.shift();

		// now give ships and objects their own movement
		this.enemies.forEach((enemy) => enemy.move(this.base_speed_inverse));

		this.allies.forEach((ally) => ally.move(this.base_speed_inverse));

		this.moveTorpedos();
	}


	// shift moves everything but main ship to show main ship's movement
	shift() {
		const shift_x = this.main.getDirection()[0] / this.base_speed_inverse;
		const shift_y = this.main.getDirection()[1] / this.base_speed_inverse;

		this.stars.forEach((star) =>
			star.shift([shift_x, shift_y], this.main.getSpeed()));

		this.enemies.forEach((enemy) => enemy.shift([shift_x, shift_y], this.main.getSpeed()));
		this.allies.forEach((ally) => ally.shift([shift_x, shift_y], this.main.getSpeed()));


		// the planet and moon shift differently than the stars to give a layered background
		this.planet.shift(
			[this.main.getDirection()[0] / (this.base_speed_inverse - 2),
			this.main.getDirection()[1] / (this.base_speed_inverse - 2)],
			this.main.getSpeed());

		this.moon_01.shift(
			[this.main.getDirection()[0] / (this.base_speed_inverse - 2.25),
			this.main.getDirection()[1] / (this.base_speed_inverse - 2.25)],
			this.main.getSpeed());
	}


	draw(ctx) {
		// clear canvas and draw black background
		ctx.beginPath();
		ctx.clearRect(0, 0, Utils.getCanvasDim()[0], Utils.getCanvasDim()[1]);
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, Utils.getCanvasDim()[0], Utils.getCanvasDim()[1]);

		// draw all of the objects
		this.stars.forEach((star) => star.draw(ctx));
		this.planet.draw(ctx);
		this.moon_01.draw(ctx);
		this.torpedoes.forEach((torpedo) => torpedo.draw(ctx));

		this.main.draw(ctx);

		this.enemies.forEach((enemy) => {
			if (this.enemies.length > 1) enemy.draw(ctx, enemy === this.main.getTarget());
			else enemy.draw(ctx);
		});

		this.allies.forEach((ally) => ally.draw(ctx));

		// draw mute and autopilot box
		this.drawCheckBox(ctx, 20, 30, "Mute", this.muted);
		this.drawCheckBox(ctx, 20, 70, "Autopilot", this.autopilot);

		this.bridgeView.draw(ctx);

		if (!this.main.getTarget().onscreen()) 
			this.drawTargetArrow(ctx);

		if (this.lose) this.drawMessage(ctx, "Sorry, your ship exploded");
		if (this.win) this.drawMessage(ctx, "Congratulations, You Win!");
	};


	drawMessage(ctx, message) {
		ctx.font = "72px FINALOLD";
		ctx.fillStyle = "#FAFAD2";

		ctx.fillText(message, Utils.getCanvasDim()[0] / 2 - 315,
			Utils.getCanvasDim()[1] / 3 - 100);
		ctx.fillText("Click to play again", Utils.getCanvasDim()[0] / 2 - 240, 
			Utils.getCanvasDim()[1] / 3 - 20);
	};


	// draws the mute and autopilot check boxes	
	drawCheckBox(ctx, x, y, label, check) {
		ctx.beginPath();
		ctx.rect(x, y, 20, 20);
		ctx.strokeStyle = "white";
		ctx.lineWidth = 3;
		ctx.stroke();

		ctx.font = "24px Arial";
		ctx.fillStyle = "white";
		ctx.fillText(label, x + 30, y + 18);

		if (check) {
			ctx.beginPath();
			ctx.moveTo(x, y + 10);
			ctx.lineTo(x + 10, y + 20);
			ctx.lineTo(x + 25, y);
			ctx.strokeStyle = 'red';
			ctx.lineWidth = 5;
			ctx.stroke();
		}
	};


	drawTargetArrow(ctx) {
		// console.log(Utils.findAngle(this.main.center(), [0,0]));
		// console.log(Utils.findAngle(this.main.center(), [1200, 0]));
		// console.log(Utils.findAngle(this.main.center(), [1200, 900]));
		// console.log(Utils.findAngle(this.main.center(), [0, 900]));
		const angle = Utils.findAngle(this.main.center(), this.main.getTarget().center());
		const arrowLength = 100;
		const upperLeftAngle = 3.741045138431531;
		const upperRightAngle = 5.6837328223378485;
		const lowerRightAngle = .6848212459426003;
		const lowerLeftAngle = 2.4567714076471927;

		const deltaX = this.main.getTarget().center()[0] - this.main.center()[0];
		const deltaY = this.main.getTarget().center()[1] - this.main.center()[1];

		let endPoint = [0,0];
		let startPoint = [0,0]; 

		if (angle >= upperRightAngle || angle < lowerRightAngle) {
			endPoint[0] = 1200;
			endPoint[1] = this.main.center()[1] + (1200 - this.main.center()[0])/deltaX  * deltaY;
		}
		else if (angle >= lowerRightAngle && angle < lowerLeftAngle) {
			endPoint[1] = 900;
			endPoint[0] = this.main.center()[0] + (900 - this.main.center()[1]) / deltaY * deltaX;
		}
		else if (angle >= lowerLeftAngle && angle < upperLeftAngle){
			endPoint[0] = 0;
			endPoint[1] = this.main.center()[1] - this.main.center()[0] / deltaX * deltaY;	
		}
		else {
			endPoint[1] = 0;
			endPoint[0] = + this.main.center()[0] - this.main.center()[1] / deltaY * deltaX;	
		}

		const distance = Utils.distance(this.main.center(), endPoint);
		const offsetRatio =  (distance - arrowLength) / distance;

		startPoint[0] = (endPoint[0] - this.main.center()[0]) * offsetRatio + this.main.center()[0];
		startPoint[1] = (endPoint[1] - this.main.center()[1]) * offsetRatio + this.main.center()[1];


		ctx.lineWidth = 3;
		ctx.strokeStyle = "blue";
		ctx.beginPath();
		ctx.moveTo(startPoint[0], startPoint[1]);
		ctx.lineTo(endPoint[0], endPoint[1]);
		ctx.stroke();
	}


	muteToggle(gainNode) {
		this.muted = this.muted === false;
		if (gainNode.gain.value > -.01 && gainNode.gain.value < .01) gainNode.gain.value = .25;
		else gainNode.gain.value = 0;
	};


	autoPilotToggle() {
		this.autopilot = this.autopilot === false;
	};

	// factory method to create stars
	// a version of this came from http://thenewcode.com/81/Make-A-Starfield-Background-with-HTML5-Canvas
	createStarField() {
		const starCount = 250;
		const colorrange = [0, 60, 240];

		for (let i = 0; i < starCount; i++) {
			this.stars.push(new Star({
				pos: [Math.random() * Utils.getCanvasDim()[0], Math.random() * Utils.getCanvasDim()[1]],
				radius: Math.random() * 2.0,
				hue: colorrange[this.getRandom(0, colorrange.length - 1)],
				sat: this.getRandom(50, 100),
			}))
		}
	};

	getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};


	moveTorpedos() {
		this.torpedoes.forEach((torpedo, i) => {
			torpedo.move();

			// delete torpedo when it moves offscreen
			let center = torpedo.center();
			if (center[0] < 0 || center[0] > Utils.getCanvasDim()[0] ||
				center[1] < 0 || center[1] > Utils.getCanvasDim()[1])
				this.torpedoes.splice(i, 1);
		});
	};


	fireTorpedoes(ship) {
		if (ship.fireTorpedos()) {

			this.torpedoes.push(new Torpedo(ship, this.images, this.torpedoKey,
				ship.calcDirection(ship.getRotation() - Math.PI / 18)));

			this.torpedoes.push(new Torpedo(ship, this.images, this.torpedoKey,
				ship.getDirection()));

			this.torpedoes.push(new Torpedo(ship, this.images, this.torpedoKey,
				ship.calcDirection(ship.getRotation() + Math.PI / 18)));

			this.torpedoKey++;
			if (this.torpedoKey === 100) this.torpedoKey = 0;
		}
	};


	firePhasers(ship) {
		const enemyOnScreen = this.main.getTarget().onscreen();
		if ((ship === this.main && enemyOnScreen) ||
			(ship !== this.main && ship.onscreen()))
			ship.firePhasers();
	};


	checkTorpCollisions() {
		const ships = this.enemies.concat(this.main).concat(this.allies);

		this.torpedoes.forEach((torpedo, i) => {
			ships.forEach((ship) => {
				if (ship.isEnemy() !== torpedo.getLauncher().isEnemy() 
					&& Utils.distance(ship.center(), torpedo.center()) < 30) {
					ship.receiveTorpHit(torpedo);
					this.torpedoes.splice(i, 1);
				}
			})
		})
	};


	changeMainTarget() {
		let newIdx = 0;
		this.enemies.forEach((enemy, i) => {
			if (enemy === this.main.getTarget()) newIdx = i + 1;
		})
		if (newIdx === this.enemies.length) newIdx = 0;
		this.main.setTarget(this.enemies[newIdx]);
	};

	// old version
	// randomTarget(ship) {
	// 	let potentialTargets = [];
	// 	if (ship.isEnemy()) potentialTargets = this.allies.concat(this.main);
	// 	else potentialTargets = this.enemies;

	// 	let newIdx = Math.floor(Math.random() * potentialTargets.length)

	// 	return potentialTargets[newIdx]
	// };

	// returns a new target
	randomTarget(ship) {
		let potentialTargets = [];

		if (ship.isEnemy()) potentialTargets = this.allies.concat(this.main);
		else potentialTargets = this.enemies;

		const targets = potentialTargets.concat([]);

		targets.forEach((target,i) => { if (!target.onscreen()) targets.splice(i,1)});

	
		if (targets.length > 0) return targets[Math.floor(Math.random() * targets.length)];
		else if (!ship.getTarget() || (!ship.isEnemy() && ship.getTarget() === this.main))
			return potentialTargets[Math.floor(Math.random() * potentialTargets.length)];
		else return ship.target;
	};


	checkKeyMap() {
		// spacebar
		if (this.keyMap["32"]) this.firePhasers(this.main);

		// t
		if (this.keyMap["84"] && this.turnCounter === 0) this.changeMainTarget();

		// f or k
		if (this.keyMap["75"] || this.keyMap["70"]) this.fireTorpedoes(this.main);

		// w or up arrow
		if ((this.keyMap["87"] || this.keyMap["38"]) && this.turnCounter === 0)
			this.main.power(1);

		// s or down arrow
		if ((this.keyMap["83"] || this.keyMap["40"]) && this.turnCounter === 0)
			this.main.power(-1);

		// a or left arrow
		if (this.keyMap["65"] || this.keyMap["37"]) this.main.changeDirection(-1);

		// d or right arrow
		if (this.keyMap["68"] || this.keyMap["39"]) this.main.changeDirection(1);
	};

}

module.exports = Game;