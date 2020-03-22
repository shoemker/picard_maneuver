const OrbitingPlanet = require("./orbiting_planet");
const Utils = require("../utils");

class Comet extends OrbitingPlanet {
	constructor(options) {
		super(options);
		this.tailLength = 100;
	};


	draw(ctx, tilt) {
		tilt -= .1;

		const orbitPos = this.suns[0].getPosition();
		const orbitRad = this.suns[0].radius;

		// hopefully comet isn't drawn when it's behind sun
		if (this.pos.x > orbitPos.x + orbitRad/3 || 
			this.pos.x < orbitPos.x - orbitRad/3 ||
			this.pos.y > orbitPos.y) {
					
			super.draw(ctx, tilt);
			this.drawTail(ctx,tilt);
		}
	};


	// the tail is a gradient in a triangle that extends behind the comet away from sun
	drawTail(ctx,tilt) {
		let y = this.yAfterTilt;
		let x = this.pos.x;

		const endOfTail = this.findEndOfTail(tilt);

		const angle = Utils.findAngle([x,y], 
			[this.suns[0].getPosition().x, this.suns[0].getPosition().y]);

		const leftEdgeOfComet = this.getEdgeOfComet(x,y,angle + Math.PI / 2);
		const rightEdgeOfComet = this.getEdgeOfComet(x,y,angle - Math.PI / 2);

		ctx.fillStyle = this.createGradient(ctx, {x,y}, endOfTail);

		ctx.moveTo(leftEdgeOfComet.x, leftEdgeOfComet.y);
		ctx.lineTo(rightEdgeOfComet.x, rightEdgeOfComet.y);
		ctx.lineTo(endOfTail.x, endOfTail.y);
		ctx.lineTo(leftEdgeOfComet.x, leftEdgeOfComet.y);
		ctx.fill();
	};


	createGradient(ctx, start, end) {
		const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
		gradient.addColorStop(0, this.color);
		gradient.addColorStop(1, "transparent");
		return gradient;
	};


	getEdgeOfComet(x, y, angle) {
		const xOffset = Math.cos(angle) * this.radius * this.radiusMult;
		const yOffset = Math.sin(angle) * this.radius * this.radiusMult;

		return {x: x + xOffset, y: y + yOffset};
	};


	findEndOfTail(tilt) {
		const deltaX = this.pos.x - this.centerOfSS.x;
		const deltaY = this.pos.y - this.centerOfSS.y;

		const ratio = (this.tailLength + this.distance) / this.distance;

		let tailX = deltaX * ratio + this.centerOfSS.x;
		let tailY = deltaY * ratio + this.centerOfSS.y;


		const distanceFromSunY = tailY - this.centerOfSS.y;
		const tailYAfterTilt = distanceFromSunY * tilt + this.centerOfSS.y;

		return {x:tailX, y:tailYAfterTilt};
	};

}

module.exports = Comet;