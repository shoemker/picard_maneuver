const OrbitingObject = require("./orbiting_object");
const Utils = require("../utils");

class Moon extends OrbitingObject {
	constructor(options) {
		super(options);
	};

	addSun(sun) { this.suns.push(sun); };


	shift(shiftX, shiftY) {
		this.pos.x +=	shiftX;
		this.pos.y += shiftY;
	}

	draw(ctx, tilt, orbitCenterY, mult) {
		const positionOffsetY = (this.pos.y - this.suns[0].getPosition().y) * tilt *mult;

		const positionOffsetX = (this.pos.x - this.suns[0].getPosition().x);
		const newX = this.suns[0].getPosition().x + positionOffsetX*mult;

		Utils.drawFilledCircle(ctx, newX, orbitCenterY + positionOffsetY, this.radius*mult, this.color);
		
	}
}

module.exports = Moon;