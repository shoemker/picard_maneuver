const  Game = require("./game");
const Enterprise = require("./enterprise");
const D7 = require("./d7");

class GameView {

	constructor(ctx, width, height) {

		this.ctx = ctx;
		this.game = new Game(width, height);
		this.pause = false;

		this.game.addEnterprise(new Enterprise({
			pos: [width/2 - 50, height/2],
			directionIndex: 18,
			direction: [-3,0]
		}));

		this.game.addEnemy( new D7({
			pos: [0, 0],
			directionIndex: 0,
			direction: [3, 0]
		}));
	
	}

	start() {
		this.bindKeyHandlers();

		this.lastTime = 0;

		// start the animation
		requestAnimationFrame(this.animate.bind(this));
	};

	animate(time) {
		if (!this.pause) {
			const timeDelta = time - this.lastTime;
			this.game.step(timeDelta);
			this.game.draw(this.ctx);

			this.lastTime = time;

			// every call to animate requests causes another call to animate
			requestAnimationFrame(this.animate.bind(this));
		}
	};
	
	bindKeyHandlers() {

		// const MOVES = {
		// 	w: [0, -1],
		// 	a: [-1, 0],
		// 	s: [0, 1],
		// 	d: [1, 0],
		// };

		const MOVES = {
			w: 1,
			s:-1
		}

		const that = this;
		

		Object.keys(MOVES).forEach(function (k) {
			const move = MOVES[k];
			key(k, function () { that.game.enterprise.power(move); });
		});

		key("space", function () { 
			that.game.enterprise.firePhasor(that.game.enemy, that.ctx); 
		});
		
		//call to rotate ship image
		key("a", function () {that.game.enterprise.changeDirection(-1); });
		key("d", function () { that.game.enterprise.changeDirection(1); });

		key("j", function () { that.game.enemy.changeDirection(-1); });
		key("l", function () { that.game.enemy.changeDirection(1); });

		key("p", function () { that.pauseGame(); });
	}

	pauseGame() {
		if (!this.pause) this.pause = true;
		else { 
			this.pause = false;
			requestAnimationFrame(this.animate.bind(this));
		}
	}
}

module.exports = GameView;