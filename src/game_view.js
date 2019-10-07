const Game = require("./game");
const GameOpening = require("./game_opening");
const Enterprise = require("./enterprise");
const D7 = require("./d7");
const Explosion = require("./explosion")


class GameView {

	constructor(ctx, width, height, sounds) {

		this.ctx = ctx;
		this.pause = false;
		this.theme = sounds.theme;

		this.game = new Game(width, height);
		this.gameOpening = new GameOpening(width, height);

		this.loadSparksImg();
		this.loadExplosionImg();
		this.explosion = new Explosion(this.explosionImg, sounds.exploSound);

		this.game.addEnterprise(new Enterprise({
			pos: [width/2 - 50, height/2 - 50],
			rotationOffset: Math.PI,
			phaserColor: "red",
			torpSound: sounds.torpSound,
			beamSound: sounds.phasSound,
			explosion: this.explosion,
			explosionImg: this.explosionImg,
			sparksImg: this.sparksImg
		}));

		this.game.addEnemy( new D7({
			pos: [0, 100],
			rotationOffset: 0,
			phaserColor: "green",
			torpSound: sounds.kTorpSound,
			beamSound: sounds.disruptSound,
			explosion: this.explosion,
			explosionImg: this.explosionImg,
			sparksImg: this.sparksImg
		}));

		this.game.addAI();
	};
	

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
				else if (this.game.enemy.getHull() === 0) this.game.win = true;
				else this.game.step();

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


	// check to see if mute or autopilot is being clicked
	checkClick(x, y, gainNode) {
		
		if(x > 1085 && x < 1112) {
			if (y > 46 && y < 71) {
				this.game.muteToggle();

				if (gainNode.gain.value > -.01 && gainNode.gain.value < .01) gainNode.gain.value = .25;
				else gainNode.gain.value = 0;
			}
			else if (y > 85 && y < 112) this.game.autoPilotToggle();
		}
	}


	pauseGameToggle() {
		if (!this.pause) this.pause = true;
		else { 
			this.pause = false;
			requestAnimationFrame(this.animate.bind(this));
		}
	};


	openingOff() {
		this.gameOpening = null;
		this.theme.play();
	};


	loadExplosionImg() {
		this.explosionImg = new Image();
		this.explosionImg.onload = () => { return true; }
		this.explosionImg.src = './images/explosion-sprite-sheet.png';
	};

	loadSparksImg() {
		this.sparksImg = new Image();
		this.sparksImg.onload = () => { return true; }
		this.sparksImg.src = './images/sparks.png';
	};
}

module.exports = GameView;