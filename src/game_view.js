const Game = require("./game");
const Enterprise = require("./enterprise");
const D7 = require("./d7");

class GameView {

	constructor(ctx, width, height) {

		this.ctx = ctx;
		this.game = new Game(width, height);
		this.pause = false;

		this.game.addEnterprise(new Enterprise({
			pos: [width/2 - 50, height/2-50],
			directionIndex: 18,
			direction: [-3,0],
			phasorColor: "red"
		}));

		this.game.addEnemy( new D7({
			pos: [0, 100],
			directionIndex: 0,
			direction: [3, 0],
			phasorColor: "green"
		}));
	};
	

	start() {
		this.bindKeyHandlers();


		// start the animation
		requestAnimationFrame(this.animate.bind(this));
	};


	animate() {
		if (!this.pause) {

			if(this.game.enterprise.getHull() > 0 && this.game.enemy.getHull() > 0)
						this.game.step();

			this.game.draw(this.ctx);

			// every call to animate requests causes another call to animate
			requestAnimationFrame(this.animate.bind(this));
		}
	};
	
	bindKeyHandlers() {

		const MOVES = {
			w: 1,
			s:-1
		}

		const that = this;
		
		if (this.game.enterprise.getHull() > 0) {
			
			Object.keys(MOVES).forEach(function (k) {
				const move = MOVES[k];
				key(k, function () { that.game.enterprise.power(move); });
			});

			key("space", function () { 
				that.game.firePhasors(that.game.enterprise); 
			});
			

			//call to rotate ship image
			key("a", function () { that.game.enterprise.changeDirection(-1); });
			key("d", function () { that.game.enterprise.changeDirection(1); });

			// key("j", function () { that.game.enemy.changeDirection(-1); });
			// key("l", function () { that.game.enemy.changeDirection(1); });

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
}

module.exports = GameView;