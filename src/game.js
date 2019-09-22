const Star = require("./star");

class Game {

	constructor(canvas_width, canvas_height) {
		this.canvas_width = canvas_width;
		this.canvas_height = canvas_height;
		this.stars = [];

		this.createStarField();
	}

	addEnterprise(enterprise){
		this.enterprise = enterprise;
	}

	addEnemy(enemy){
		this.enemy = enemy
	}

	step(timeDelta) {
		this.moveObjects(timeDelta);
	}

	moveObjects() {
	
		const base_speed_inv = 5;

		const shift_x = this.enterprise.getDirection()[0];
		const shift_y = this.enterprise.getDirection()[1];

		// shift the stars and enemy ship for main ship movement
		this.stars.forEach((star) => 
			star.shift([shift_x / base_speed_inv, 
									shift_y / base_speed_inv], 
									this.enterprise.getSpeed()));

		this.enemy.shift([shift_x / base_speed_inv, 
											shift_y / base_speed_inv], 
											this.enterprise.getSpeed());

		this.enemy.move();
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

}

module.exports = Game;