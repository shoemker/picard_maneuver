const OrbitingObject = require("./orbiting_object");
const Utils = require("../utils");

class Moon extends OrbitingObject {
	constructor(options) {
		super(options);

		// offplane is for putting moon orbit on different plane
		this.offplane = 0;
		if (options.offplane) this.offplane = options.offplane;
	};

	addSun(sun) { this.suns.push(sun); };


	shift(shiftX, shiftY) {
		this.pos.x +=	shiftX;
		this.pos.y += shiftY;
	}

	draw(ctx, tilt, orbitCenterY, mult) {
		
		let positionOffsetX = (this.pos.x - this.suns[0].getPosition().x) * mult;
		let positionOffsetY = (this.pos.y - this.suns[0].getPosition().y) * tilt *mult;

		// putting moon orbit on different plane from solar system plane
		positionOffsetX = positionOffsetX * Math.cos(this.offplane);
		positionOffsetY += positionOffsetX * Math.sin(this.offplane);
		
		
		const newX = this.suns[0].getPosition().x + positionOffsetX;

		Utils.drawFilledCircle(ctx, newX, orbitCenterY + positionOffsetY, this.radius*mult, this.color);
		// Utils.drawFilledCircle(ctx, newX, orbitCenterY , this.radius * mult, this.color);

	}
}

module.exports = Moon;