const Game = require("./game");
const GameOpening = require("./game_opening");
const Enterprise = require("./enterprise");
const D7 = require("./d7");
const Bird_of_Prey = require("./bird_of_prey");
const Explosion = require("./explosion")
const Utils = require("./utils");

class GameView {

	constructor(ctx, width, height, sounds) {

		this.ctx = ctx;
		this.pause = false;
		this.sounds = sounds;

		this.game = new Game(width, height);
		this.gameOpening = new GameOpening(width, height);

		this.sparksImg = Utils.loadImg('./images/sparks.png');
		this.explosionImg = Utils.loadImg('./images/explosion-sprite-sheet.png');

		this.game.addEnterprise(new Enterprise({
			pos: [width/2 - 50, height/2 - 50],
			rotationOffset: Math.PI,
			phaserColor: "red",
			torpSound: this.sounds.torpSound,
			beamSound: this.sounds.phasSound,
			explosion: new Explosion(this.explosionImg, this.sounds.exploSound),
			explosionImg: this.explosionImg,
			sparksImg: this.sparksImg,
			ssdPos: [1040, 710],
			target: this.game.enemies[0]
		}));
	};
	

	addBops() {
		this.game.addEnemy(new Bird_of_Prey({
			pos: [0, 600],
			rotationOffset: 0,
			phaserColor: "green",
			torpSound: this.sounds.kTorpSound,
			beamSound: this.sounds.disruptSound,
			explosion: new Explosion(this.explosionImg, this.sounds.exploSound),
			explosionImg: this.explosionImg,
			sparksImg: this.sparksImg,
			ssdPos: [100, 710],
			target: this.game.enterprise
		}), 3);

		this.game.addEnemy(new Bird_of_Prey({
			pos: [0, 250],
			rotationOffset: 0,
			phaserColor: "green",
			torpSound: this.sounds.kTorpSound,
			beamSound: this.sounds.disruptSound,
			explosion: new Explosion(this.explosionImg, this.sounds.exploSound),
			explosionImg: this.explosionImg,
			sparksImg: this.sparksImg,
			ssdPos: [100, 60],
			target: this.game.enterprise,
			phaserRecharge: 80,
			torpedoReload: 100
		}), 3);

		this.game.enterprise.setTarget(this.game.enemies[0]);
	};


	addD7() {
		this.game.addEnemy(new D7({
			pos: [0, 100],
			rotationOffset: 0,
			phaserColor: "green",
			torpSound: this.sounds.kTorpSound,
			beamSound: this.sounds.disruptSound,
			explosion: new Explosion(this.explosionImg, this.sounds.exploSound),
			explosionImg: this.explosionImg,
			sparksImg: this.sparksImg,
			ssdPos: [100, 710],
			target: this.game.enterprise
		}), 4);

		this.game.enterprise.setTarget(this.game.enemies[0]);
	}


	start() {
		// start the animation
		requestAnimationFrame(this.animate.bind(this));
	};


	animate() {
		if (!this.pause) {

			// if unpaused this steps and draws either the game or the gameOpening
			if (this.gameOpening !== null) this.gameOpening.stepAndDraw(this.ctx);
			else {
				if (this.game.enterprise.getHull() === 0) this.game.lose = true;
				else if (this.game.enemies.length === 0) this.game.win = true;
				else {
					this.game.enemies.forEach((enemy, i) => {
						if (enemy.isGone()){
							this.game.enemies.splice(i, 1);
							this.game.enemyAIs.splice(i, 1);
							if(this.game.enterprise.getTarget() === enemy) this.game.changeTarget();
						} 
					})
					this.game.step();
				}
				this.game.draw(this.ctx);
			}

			// every call to animate requests causes another call to animate
			requestAnimationFrame(this.animate.bind(this));
		}
	};

	
	keyHandler(e) {
		if (e.type == 'keydown') this.game.getKeyMap()[e.keyCode] = true;
		else this.game.getKeyMap()[e.keyCode] = false;			
	};


	// get scenario click if still in the opening of the game, or
	// check to see if mute or autopilot is being clicked
	checkClick(x, y, gainNode) {

		if (this.gameOpening !== null) {
			if (y >= 267 && y <= 734) {
				if (x > 166 && x < 522) {
					this.addD7();
					this.openingOff();
				}
				else if (x > 716 && x < 1070) {
					this.addBops();
					this.openingOff();
				}
			}
		}
		else {
			if(x > 1085 && x < 1112) {
				if (y > 46 && y < 71) {
					this.game.muteToggle();

					if (gainNode.gain.value > -.01 && gainNode.gain.value < .01) gainNode.gain.value = .25;
					else gainNode.gain.value = 0;

					// if paused, draw to show checkmark in box
					if (this.pause) this.game.draw(this.ctx)
				}
				else if (y > 85 && y < 112) {
					this.game.autoPilotToggle();

					// if paused, draw to show checkmark in box
					if (this.pause) this.game.draw(this.ctx)
				}
			}
		}
	}


	pauseGameToggle() {
		this.pause = this.pause === false;
		
		// needed to restart animation on unpause
		if (!this.pause) requestAnimationFrame(this.animate.bind(this));
	};


	openingOff() {
		this.gameOpening = null;
		this.sounds.theme.play();
	};
}

module.exports = GameView;