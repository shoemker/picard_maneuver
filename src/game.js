const Star = require("./star");
const Torpedo = require("./torpedo");

class Game {

	constructor(canvas_width, canvas_height) {
		this.canvas_width = canvas_width;
		this.canvas_height = canvas_height;
		this.stars = [];

		this.createStarField();
		this.loadTorpImg();
;
	}

	addEnterprise(enterprise){
		this.enterprise = enterprise;
	}

	addEnemy(enemy){
		this.enemy = enemy
	}

	step() {
		this.moveObjects();
		this.checkTorpCollisions(this.enemy, this.enterprise.getTorpedos());
		this.checkTorpCollisions(this.enterprise, this.enemy.getTorpedos());
	}

	moveObjects() {
		
		this.shift();

		// now give ships and objects their own movement
		this.enemy.move();

		this.enterprise.getTorpedos().forEach((torpedo, i) => {
			torpedo.move();

			// delete torpedo when it moves offscreen
			let center = torpedo.center();
			if (center[0] < 0 || center [0] > this.canvas_width ||
					center[1] < 0 || center [1] > this.canvas_height)
				this.enterprise.getTorpedos().splice(i,1);
		});
		// console.log(this.enterprise.getTorpedos());
	}


	// shift moves everything but main ship to show main ship's movement
	shift() {
		const base_speed_inverse = 5;

		const shift_x = this.enterprise.getDirection()[0];
		const shift_y = this.enterprise.getDirection()[1];


		this.stars.forEach((star) =>
			star.shift([shift_x / base_speed_inverse,
									shift_y / base_speed_inverse],
				this.enterprise.getSpeed()));

		this.enemy.shift([shift_x / base_speed_inverse,
											shift_y / base_speed_inverse],
			this.enterprise.getSpeed());
	}


	draw(ctx){
		ctx.beginPath();
		ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, this.canvas_width, this.canvas_height);

		// draw all of the objects
		this.drawStars(ctx);
		this.enterprise.draw(ctx);
		this.enemy.draw(ctx);
		this.enterprise.getTorpedos().forEach((torpedo) => torpedo.draw(ctx));
		
	}

	drawStars(ctx) {
		this.stars.forEach((star) => star.draw(ctx));
	}



	// a version of this came from http://thenewcode.com/81/Make-A-Starfield-Background-with-HTML5-Canvas
	createStarField() {
		const starCount = 250;
		const	colorrange = [0, 60, 240];
		
		for (var i = 0; i < starCount; i++) {
	
			this.stars.push(new Star({
				pos: [Math.random() * this.canvas_width, Math.random() * this.canvas_height],
				radius: Math.random() * 1.6,
				hue: colorrange[this.getRandom(0, colorrange.length - 1)],
				sat: this.getRandom(50, 100),
				canvas_width: this.canvas_width,
				canvas_height: this.canvas_height				
			}))
		}
	}

	getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	} 


	fireTorpedos(ship) {
		ship.getTorpedos().push(new Torpedo(ship.center(), this.torpImg, ship.getDirectionIndex() - 1));
		ship.getTorpedos().push(new Torpedo(ship.center(), this.torpImg, ship.getDirectionIndex()));
		ship.getTorpedos().push(new Torpedo(ship.center(), this.torpImg, ship.getDirectionIndex() + 1));
	}

	checkTorpCollisions(ship, torpedos) {
		let distance;

		torpedos.forEach((torpedo,i) => {
			let distance_x = ship.center()[0] - torpedo.center()[0];
			let distance_y = ship.center()[1] - torpedo.center()[1];
			distance = Math.sqrt(distance_x*distance_x + distance_y*distance_y);
			if (distance < 30) {
				torpedos.splice(i, 1);
				ship.torpHit(torpedo);
			}
		})
	}


	loadTorpImg() {
		this.torpImg = new Image();
		this.torpImg.onload = () => { return true; }
		this.torpImg.src = '../images/torpedo.png';
	};

}

module.exports = Game;