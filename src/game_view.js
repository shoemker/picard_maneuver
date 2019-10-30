const Game = require("./game");
const GameOpening = require("./game_opening");
const Enterprise = require("./enterprise");
const Soyuz = require("./soyuz");
const D7 = require("./d7");
const Bird_of_Prey = require("./bird_of_prey");
const Explosion = require("./explosion")
const Utils = require("./utils");

class GameView {

	constructor(ctx, width, height, sounds) {

		this.ctx = ctx;
		this.pause = false;
		this.sounds = sounds;
		this.width = width;
		this.height = height;

		this.game = new Game(width, height);
		this.gameOpening = new GameOpening(width, height);

		this.sparksImg = Utils.loadImg('./images/sparks.png');
		this.explosionImg = Utils.loadImg('./images/explosion-sprite-sheet.png');
		this.bopImg = Utils.loadImg('./images/bop.png');
		this.d7Img = Utils.loadImg('./images/D7.png');
		this.soyuzImg = Utils.loadImg('./images/soyuz.png');
		this.enterpriseImg = Utils.loadImg('./images/uss-enterprise-png-view-original-669.png')
	};
	
	addMain(ssdPos, aiTargeting, phaserRecharge, torpedoReload) {
		this.game.addMainShip(new Enterprise({
			pos: [this.width / 2 - 50, this.height / 2 - 50],
			ssdPos,
			rotationOffset: Math.PI,
			torpSound: this.sounds.torpSound,
			beamSound: this.sounds.phasSound,
			explosion: new Explosion(this.explosionImg, this.sounds.exploSound),
			explosionImg: this.explosionImg,
			sparksImg: this.sparksImg,
			target: this.game.enemies[0],
			enemy: false,
			shipImg: this.enterpriseImg,
			phaserRecharge,
			torpedoReload
		}), aiTargeting);
	}

	addBop(pos, ssdPos, aiTargeting, phaserRecharge, torpedoReload) {
		this.game.addEnemy(new Bird_of_Prey({
			pos,
			ssdPos,
			rotationOffset: 0,
			torpSound: this.sounds.kTorpSound,
			beamSound: this.sounds.disrupt2Sound,
			explosion: new Explosion(this.explosionImg, this.sounds.exploSound),
			explosionImg: this.explosionImg,
			sparksImg: this.sparksImg,
			target: this.game.main,
			enemy: true,
			shipImg: this.bopImg,
			phaserRecharge,
			torpedoReload
		}), aiTargeting);
	};

		
	addSoyuz(pos, ssdPos, aiTargeting, phaserRecharge, torpedoReload) {
		this.game.addAlly(new Soyuz({
			pos,
			ssdPos,
			rotationOffset: Math.PI,
			torpSound: this.sounds.torpSound,
			beamSound: this.sounds.disrupt2Sound,
			explosion: new Explosion(this.explosionImg, this.sounds.exploSound),
			explosionImg: this.explosionImg,
			sparksImg: this.sparksImg,
			target: this.game.enemies[1],
			enemy: false,
			shipImg: this.soyuzImg,
			phaserRecharge,
			torpedoReload
		}),aiTargeting);

	};


	addD7(pos, ssdPos, aiTargeting, phaserRecharge, torpedoReload) {
		this.game.addEnemy(new D7({
			pos,
			ssdPos,
			rotationOffset: 0,
			torpSound: this.sounds.kTorpSound,
			beamSound: this.sounds.disruptSound,
			explosion: new Explosion(this.explosionImg, this.sounds.exploSound),
			explosionImg: this.explosionImg,
			sparksImg: this.sparksImg,
			target: this.game.main,
			enemy: true,
			shipImg: this.d7Img,
			phaserRecharge,
			torpedoReload
		}), aiTargeting);

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
				if (this.game.main.getHull() === 0) this.game.lose = true;
				else if (this.game.enemies.length === 0) this.game.win = true;
				else {
					this.game.enemies.forEach((enemy, i) => {
						if (enemy.isGone()){
							this.game.enemies.splice(i, 1);
							this.game.enemyAIs.splice(i, 1);
							if(this.game.main.getTarget() === enemy) this.game.changeMainTarget();
						} 
					})
					this.game.allies.forEach((ally, i) => {
						if (ally.isGone()) {
							this.game.allies.splice(i, 1);
							this.game.allyAIs.splice(i, 1);
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
					this.addMain([1040, 710, 1], false);
					this.addD7([0, 100], [100, 710, 1], false);
					
					this.game.main.setTarget(this.game.enemies[0]);
					this.openingOff();
				}
				else if (x > 716 && x < 1070) {
					this.addMain([1040, 775, .6], false);
					this.addBop([0, 50], [100, 620, .6], true);
					this.addBop([0, 500], [100, 465, .6], true, 80, 100);
					this.addD7([0, 100], [100, 775, .6], true);
					this.addSoyuz([600, 350], [1040, 465, .6], true);
					this.addSoyuz([600, 450], [1040, 620, .6], true);

					this.game.main.setTarget(this.game.enemies[0]);
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