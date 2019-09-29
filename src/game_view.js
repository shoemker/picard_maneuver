const Game = require("./game");
const GameOpening = require("./game_opening");
const Enterprise = require("./enterprise");
const D7 = require("./d7");


class GameView {

	constructor(ctx, width, height, torpSound) {

		this.ctx = ctx;
		this.pause = false;

		this.game = new Game(width, height, torpSound);
		this.gameOpening = new GameOpening(width, height);

		this.game.addEnterprise(new Enterprise({
			pos: [width/2 - 50, height/2 - 50],
			directionIndex: 18,
			direction: [-3, 0],
			phaserColor: "red",
			torpSound
		}));

		this.game.addEnemy( new D7({
			pos: [0, 100],
			directionIndex: 0,
			direction: [3, 0],
			phaserColor: "green",
			torpSound
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

	
	bindKeyHandlers() {

		const MOVES = {
			w: 1,
			s:-1
		};

		const that = this;
		
		if (this.game.enterprise.getHull() > 0) {
			
			Object.keys(MOVES).forEach(function (k) {
				const move = MOVES[k];
				key(k, function () { that.game.enterprise.power(move); });
			});

			key("space", function () { 
				that.game.firePhasers(that.game.enterprise); 
			});
			

			//call to rotate ship image
			key("a", function () { that.game.enterprise.changeDirection(-1); });
			key("d", function () { that.game.enterprise.changeDirection(1); });
			

			key("f", function () { that.game.fireTorpedos(that.game.enterprise); });
			key("k", function () { that.game.fireTorpedos(that.game.enterprise); });

			key("p", function () { that.pauseGame(); });
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
	};
}

module.exports = GameView;