const Utils = require("../utils");

class OrbitingObject {
	constructor(options) {
		this.pos = options.pos;
		this.radius = options.radius;
		this.mass = options.mass;
		this.color = options.color;
		this.dir = options.dir;
		this.speed = options.speed;

		if (options.suns) this.suns = options.suns;
		else this.suns = [];

		this.centerOfSS = options.centerOfSS;		
		this.path = options.path;
		this.moonData = options.moonData;
		this.moons = [];
		this.centerOfSS = options.center;

		this.gradientColors = options.gradientColors;

		this.rings = options.rings;
		this.ringsColor = options.ringsColor;
		this.yAfterTilt;

		this.farAwayMultiplier = .75;
		this.closeMultiplier = 1.25;
	};

	getPosition() { return this.pos; };
	getMass() { return this.mass; };
	getRadius() { return this.radius; };

	addMoon(moon) { this.moons.push(moon); };
	getMoons() { return this.moons; };
	getMoonData() { return this.moonData; };
	setColor(color) { this.color = color; };
	addSun(sun) { this.suns.push(sun); };

	move() {
		this.suns.forEach(sun => {

			const constant = 2.5;
			this.distance = Utils.distance([this.pos.x, this.pos.y],
				[sun.getPosition().x, sun.getPosition().y]);

			// console.log(this.distance)

			const deltaX = sun.getPosition().x - this.pos.x;
			const deltaY = sun.getPosition().y - this.pos.y;

			const gravity = constant * this.mass * sun.getMass() / 
				(this.distance * this.distance);

			// mass of planet acutally cancels out so is actually unnecessary
			this.dir.x += deltaX / this.distance * gravity / this.mass;
			this.dir.y += deltaY / this.distance * gravity / this.mass;
		});

		const movementX = this.dir.x * this.speed;
		const movementY = this.dir.y * this.speed;

		this.pos.x += movementX;
		this.pos.y += movementY;

		this.moons.forEach(moon =>{
			moon.shift(movementX, movementY);
			moon.move();
		});

	};


	draw(ctx, tilt) {


		let distanceFromSunY = this.pos.y - this.centerOfSS.y;

		// objects above sun are closer together on tilt
		if (distanceFromSunY < 0) distanceFromSunY *= this.farAwayMultiplier;
		if (distanceFromSunY > 0) distanceFromSunY *= this.closeMultiplier;

		this.yAfterTilt =  distanceFromSunY*tilt +this.centerOfSS.y ;

		this.radiusMult = 1 +  distanceFromSunY/300;

		this.radiusMult = this.radiusMult - this.radiusMult*tilt + 1;


		if (this.gradientColors) this.color = this.generateRGradient(ctx, this.gradientColors);

		// draw moon if it's in back of planet
		this.moons.forEach(moon => {
			if (moon.getPosition().y < this.pos.y) 
				moon.draw(ctx, tilt, this.yAfterTilt, this.radiusMult);
		});

		// back of rings drawn
		if (this.rings) 
			this.rings.forEach((ring)=> this.drawRings(ctx, ring, this.yAfterTilt, Math.PI));

		// planet drawn
		Utils.drawFilledCircle(ctx, 
			this.pos.x, this.yAfterTilt, 
			this.radius * this.radiusMult, this.color);

		// front of rings drawn
		if (this.rings)
			this.rings.forEach((ring) => this.drawRings(ctx, ring, this.yAfterTilt, 0));

		// draw moon if it's in front of planet
		this.moons.forEach(moon => {
			if (moon.getPosition().y >= this.pos.y)
				moon.draw(ctx, tilt, this.yAfterTilt, this.radiusMult);
		});
	};


	generateRGradient(ctx, colors) {
		const distance = Utils.distance([this.pos.x, this.yAfterTilt], 
			[this.centerOfSS.x,this.centerOfSS.y]);

		let radius1 = distance - this.radius * .9;
		if (radius1 < 0) radius1 = 0;

		let radius2 = distance + this.radius * 2;
		if (radius2 < 0) radius2 = 0;

		const gradient = ctx.createRadialGradient(
			this.centerOfSS.x, this.centerOfSS.y-distance/5,radius1,
			this.centerOfSS.x, this.centerOfSS.y-distance/5, radius2);

		gradient.addColorStop(0, colors.a);
		gradient.addColorStop(1, colors.b);

		return gradient;

	};


	drawRings(ctx, ring, y, start) {
		ctx.beginPath();
		ctx.lineWidth = ring.thickness * this.radiusMult;
		ctx.strokeStyle = this.ringsColor;
		ctx.ellipse(this.pos.x, y, 
			ring.radius*this.radiusMult, 
			ring.radius/3*this.radiusMult,
			ring.angle, start-.01, start+Math.PI+.01);
		ctx.stroke();
	};



	drawPath(ctx, tilt) {
		if (this.path) {
			ctx.beginPath();
			ctx.lineWidth = .5;
			ctx.strokeStyle = "white";
			ctx.ellipse(this.centerOfSS.x, this.centerOfSS.y,
				this.distance, this.distance * tilt* this.closeMultiplier, 0, 0, Math.PI);
			// ctx.stroke();
			ctx.ellipse(this.centerOfSS.x, this.centerOfSS.y,
				this.distance, this.distance * tilt * this.farAwayMultiplier, 0, Math.PI,0);			
			ctx.stroke();

		}
	};
}

module.exports = OrbitingObject;