const D7 = require("./d7");
const Enterprise = require("./enterprise");
const BackgroundObject = require("./backgroundObject");

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

	moveObjects(timeDelta) {
		// this.enterprise.move(timeDelta);
		
		for (let i = 0; i < this.stars.length; i++) {
			this.stars[i].shift(this.enterprise.getDirection(), this.enterprise.getVelocity());
		}

		this.enemy.shift(this.enterprise.getDirection(), this.enterprise.getVelocity());
	}

	draw(ctx){
		ctx.beginPath();
		ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, this.canvas_width, this.canvas_height);
		this.drawStars(ctx);
		// debugger
		this.enterprise.draw(ctx);
		this.enemy.draw(ctx);
		
	}

	drawStars(ctx) {
		for (let i = 0; i < this.stars.length; i++) this.stars[i].draw(ctx);
	}



	// a version of this comes from http://thenewcode.com/81/Make-A-Starfield-Background-with-HTML5-Canvas
	createStarField() {
		const stars = 400;
		const	colorrange = [0, 60, 240];
		let x;
		let y;
		let radius;
		let hue;
		let sat;
		
		for (var i = 0; i < stars; i++) {
			x = Math.random() * this.canvas_width;
			y = Math.random() * this.canvas_height;
			radius = Math.random() * 1.2;
				hue = colorrange[this.getRandom(0, colorrange.length - 1)];
				sat = this.getRandom(50, 100);

			this.stars.push(new BackgroundObject({
				pos: [x,y],
				radius,
				hue,
				sat,
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