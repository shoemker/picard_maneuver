const Star = require("./star");
const Planet = require("./planet");
const EnemyAI = require("./enemyAI");
const Torpedo = require("./torpedo");
const Utils = require("./utils");

class Game {

	constructor(canvas_width, canvas_height) {
		this.canvas_width = canvas_width;
		this.canvas_height = canvas_height;

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

		this.createPlanetAndMoon();
		this.createStarField();
		this.torpImg = Utils.loadImg('./images/torpedo.png');

		this.turnCounter = 0;
		this.turnCounterMax = 8;
	}

	getKeyMap() { return this.keyMap; }
	getCanvasWidth() { return this.canvas_width; }
	getCanvasHeight() { return this.canvas_height; }

	addMainShip(ship, aiTargeting){
		this.main = ship;
		this.mainAI = new EnemyAI(ship, this, aiTargeting);
	};

	addEnemy(enemy, aiTargeting){
		this.enemies.push(enemy);
		this.enemyAIs.push(new EnemyAI(enemy, this, aiTargeting));
	};

	addAlly(ship, aiTargeting) {
		this.allies.push(ship);
		this.allyAIs.push(new EnemyAI(ship, this, aiTargeting));
	}

	// factory method to create planet and moon objects
	createPlanetAndMoon() {
		this.planet_08 = new Planet({
			pos: [300, 300],
			img: Utils.loadImg('./images/planets/planet_08.png'),
			width: 200, height: 200,
			sheetCoords: [20, 20, 460, 480]
		});

		this.moon_01 = new Planet({
			pos: [260, 410],
			img: Utils.loadImg('./images/planets/moon_01.png'),
			width: 50, height: 50,
			sheetCoords: [3, 3, 58, 58]
		});
	};


	step() {
		// gets user input
		this.turnCounter++;
		if (this.turnCounter === this.turnCounterMax) {
			this.turnCounter = 0;
			this.checkKeyMap();
		}
		else if (this.turnCounter === this.turnCounterMax/2) this.checkKeyMap();

		this.moveObjects();

		this.enemyAIs.forEach((AI, i) => 
			AI.consultAI(this.enemies[i].onscreen()));

		this.allyAIs.forEach((AI, i) =>
			AI.consultAI(this.allies[i].onscreen()));

		if (this.autopilot && this.main.getTarget()) 
			this.mainAI.consultAI(this.main.getTarget().onscreen());

		this.checkTorpCollisions();
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
					star.shift([shift_x , shift_y], this.main.getSpeed()));

		this.enemies.forEach((enemy) => enemy.shift([shift_x, shift_y], this.main.getSpeed()));
		this.allies.forEach((ally) => ally.shift([shift_x, shift_y], this.main.getSpeed()));

										
		// the planet and moon shift differently than the stars to give a layered background
		this.planet_08.shift(
			[this.main.getDirection()[0] / (this.base_speed_inverse -2),
			this.main.getDirection()[1] / (this.base_speed_inverse - 2)],
			this.main.getSpeed());
												
		this.moon_01.shift(
			[this.main.getDirection()[0] / (this.base_speed_inverse - 2.5),
			this.main.getDirection()[1] / (this.base_speed_inverse - 2.5)],
			this.main.getSpeed());	
	}


	draw(ctx){
		// clear canvas and draw black background
		ctx.beginPath();
		ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, this.canvas_width, this.canvas_height);

		// draw all of the objects
		this.stars.forEach((star) => star.draw(ctx));
		this.planet_08.draw(ctx);
		this.moon_01.draw(ctx);
		this.torpedoes.forEach((torpedo) => torpedo.draw(ctx));

		this.main.draw(ctx);

		this.enemies.forEach((enemy) =>{
			if(this.enemies.length > 1) enemy.draw(ctx, enemy === this.main.getTarget());
			else enemy.draw(ctx);
		});

		this.allies.forEach((ally) => ally.draw(ctx));

		// draw mute and autopilot box
		this.drawCheckBox(ctx, this.canvas_width - 130, 30, "Mute", this.muted);
		this.drawCheckBox(ctx, this.canvas_width - 130, 70, "Autopilot", this.autopilot);

		if (this.lose) this.drawMessage(ctx, "Sorry, your ship exploded");
		if (this.win) this.drawMessage(ctx, "Congratulations, You Win!");
	};


	drawMessage(ctx, message) {
		ctx.font = "72px FINALOLD";
		ctx.fillStyle = "#FAFAD2";

		ctx.fillText(message, this.canvas_width/2-315, this.canvas_height/3 - 100);
		ctx.fillText("Refresh to play again", this.canvas_width / 2 - 270, this.canvas_height / 3 - 20);
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


	muteToggle() {
		this.muted = this.muted === false;
	};


	autoPilotToggle() {
		this.autopilot = this.autopilot === false;
	};

	// factory method to create stars
	// a version of this came from http://thenewcode.com/81/Make-A-Starfield-Background-with-HTML5-Canvas
	createStarField() {
		const starCount = 250;
		const	colorrange = [0, 60, 240];
		
		for (let i = 0; i < starCount; i++) {
			this.stars.push(new Star({
				pos: [Math.random() * this.canvas_width, Math.random() * this.canvas_height],
				radius: Math.random() * 2.0,
				hue: colorrange[this.getRandom(0, colorrange.length - 1)],
				sat: this.getRandom(50, 100),
				canvas_width: this.canvas_width,
				canvas_height: this.canvas_height				
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
			if (center[0] < 0 || center[0] > this.canvas_width ||
				center[1] < 0 || center[1] > this.canvas_height)
				this.torpedoes.splice(i, 1);
		});
	};


	fireTorpedoes(ship) {
		if (ship.fireTorpedos()) {
			
			this.torpedoes.push(new Torpedo(ship, this.torpImg,
				ship.calcDirection(ship.getRotation() - Math.PI / 18)));

			this.torpedoes.push(new Torpedo(ship, this.torpImg, 
				ship.getDirection() ));

			this.torpedoes.push(new Torpedo(ship, this.torpImg,
				ship.calcDirection(ship.getRotation() + Math.PI / 18),));
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

		this.torpedoes.forEach((torpedo,i) => {
			ships.forEach((ship) => {
				if (ship.isEnemy() !== torpedo.getLauncher().isEnemy() && Utils.distance(ship, torpedo) < 30) {
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


	randomTarget(ship) {
		let potentialTargets = [];
		if (ship.isEnemy()) potentialTargets = this.allies.concat(this.main);
		else potentialTargets = this.enemies;

		let newIdx = Math.floor(Math.random() * potentialTargets.length)

		return potentialTargets[newIdx]
	};


	checkKeyMap() {
		// spacebar
		if (this.keyMap["32"]) this.firePhasers(this.main); 

		// t
		if (this.keyMap["84"] && this.turnCounter === 0) this.changeMainTarget(); 

		// f or k
		if (this.keyMap["75"] || this.keyMap["70"]) this.fireTorpedoes(this.main);

		// acceleration/decceleration needs a longer turnCounter than turning
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