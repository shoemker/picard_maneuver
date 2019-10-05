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
			directionIndex: 18,
			direction: [-3, 0],
			phaserColor: "red",
			torpSound: sounds.torpSound,
			beamSound: sounds.phasSound,
			explosion: this.explosion,
			explosionImg: this.explosionImg,
			sparksImg: this.sparksImg
		}));

		this.game.addEnemy( new D7({
			pos: [0, 100],
			directionIndex: 0,
			direction: [3, 0],
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
		this.bindKeyHandlers();

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

	
	bindKeyHandlers(e) {

		const that = this;

		if (this.game.enterprise.getHull() > 0 && typeof e !== "undefined") {

			switch (e.keyCode) {
				case 80: 	// p
					{that.pauseGame(); }					
					break;
				case 32:	// space
					that.game.firePhasers(that.game.enterprise);
					break;
				case 87:	// w
					that.game.enterprise.power(1);
					break;
				case 83:	// s
					that.game.enterprise.power(-1)
					break;
				case 65:	// a
					that.game.enterprise.changeDirection(-1);
					break;
				case 68:	// d
					that.game.enterprise.changeDirection(1);
					break;
				case 75:	// k
				case 70:	// f
					that.game.fireTorpedos(that.game.enterprise);
					break;
				default:

			}

			// key("w", function () { that.game.enterpirse.power(1) });
			// key("s", function () { that.game.enterpirse.power(-1) });

			// key("space", function () { that.game.firePhasers(that.game.enterprise); });
			

			// //call to rotate ship image
			// key("a", function () { that.game.enterprise.changeDirection(-1); });
			// key("d", function () { that.game.enterprise.changeDirection(1); });

			// key("f", function () { that.game.fireTorpedos(that.game.enterprise); });
			// key("k", function () { that.game.fireTorpedos(that.game.enterprise); });

			// key("p", function () { that.pauseGame(); });
		}
	};

	
	pauseGame() {
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