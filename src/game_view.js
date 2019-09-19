const  Game = require("./game");
const Enterprise = require("./enterprise");
const D7 = require("./d7");

class GameView {

	constructor(ctx, width, height) {

		this.ctx = ctx;
		this.game = new Game(width, height);

		this.game.addEnterprise(new Enterprise({
			pos: [width/2, height/2],
			directionIndex: 12,
			direction: [-3,0]
		}));

		this.game.addEnemy( new D7({
			pos: [0, 0],
			directionIndex: 0,
			direction: [3, 0]
		}));

		this.bindKeyHandlers = this.bindKeyHandlers.bind(this);
	
	}

	start() {
		this.bindKeyHandlers();

		this.lastTime = 0;

		// start the animation
		requestAnimationFrame(this.animate.bind(this));
	};

	animate(time) {
		const timeDelta = time - this.lastTime;
		this.game.step(timeDelta);
		this.game.draw(this.ctx);

		this.lastTime = time;

		// every call to animate requests causes another call to animate
		requestAnimationFrame(this.animate.bind(this));
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

		const ship = this.game.enterprise;
		const enemy = this.game.enemy;

		Object.keys(MOVES).forEach(function (k) {
			const move = MOVES[k];
			key(k, function () { ship.power(move); });
		});

		// key("space", function () { ship.fireBullet(); });
		
		//call to rotate ship image
		key("a", function () { ship.changeDirection(-1); });
		key("d", function () { ship.changeDirection(1); });

		key("j", function () { enemy.changeDirection(-1); });
		key("l", function () { enemy.changeDirection(1); });

	}
}

module.exports = GameView;