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

		let distanceFromPlanetY = this.pos.y - this.suns[0].getPosition().y;
		let positionOffsetX = (this.pos.x - this.suns[0].getPosition().x) * mult;
		let positionOffsetY = distanceFromPlanetY * tilt *mult;

		// putting moon orbit on different plane from solar system plane
		positionOffsetY += positionOffsetX * Math.sin(this.offplane);
		positionOffsetX = positionOffsetX * Math.cos(this.offplane);

		// the moon needs to change size from its orbit, not just planet's orbit
		let moonOrbitRadiusMult = 1 + distanceFromPlanetY / 300;
		let radius = moonOrbitRadiusMult * this.radius * mult;

		const newX = this.suns[0].getPosition().x + positionOffsetX;
	
		Utils.drawFilledCircle(ctx, newX, orbitCenterY + positionOffsetY, radius, this.color);
	}
}

module.exports = Moon;