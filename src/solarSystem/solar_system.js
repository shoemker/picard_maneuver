const Star = require("../non-ship_space_objects/star");
const SolarObject = require("./solar_object");
const OrbitingPlanet = require("./orbiting_planet");
const Comet = require("./comet");
const Moon = require("./moon");
const Utils = require("../utils");

class SolarSystem {

	constructor(tilt, starCount, bottomOfStarField) {
		this.suns = [];
		this.planets = [];

		this.tilt = tilt;
		this.center = { x: Utils.getCanvasDim().x / 2, y: Utils.getCanvasDim().y / 2 };

		this.stars = new Array(starCount);
		for (let i = 0; i < this.stars.length; i++) {
			const starData = Utils.createStarData(Utils.getCanvasDim().x, bottomOfStarField);
			this.stars[i] = new Star(starData);
		};	
	};

	getTilt() { return this.tilt; };
	setTilt(tilt) { this.tilt = tilt; };
	getSuns() { return this.suns; };
	getCenter() { return this.center; }
	setCenter(center) { this.center = center; }


	addSun(ctx, options) {
		const gradient = ctx.createRadialGradient(
			options.pos.x, options.pos.y, options.radius / 4,
			options.pos.x, options.pos.y, options.radius);

		gradient.addColorStop(0, options.color);
		gradient.addColorStop(1, "transparent");

		options.color = gradient;
		options.centerOfSS = this.center;

		this.suns.push(new OrbitingPlanet(options));
	};


	addPlanet(options) {
		options.centerOfSS = this.center;
		this.planets.push(new OrbitingPlanet(options));
	};


	addComet(options) {
		options.centerOfSS = this.center;
		this.planets.push(new Comet(options));
	};


	addPlanetWithMoon(planetOptions, moonOptions) {
		moonOptions.centerOfSS = this.center;
		planetOptions.centerOfSS = this.center

		const moon = new Moon(moonOptions);
		const planet = new OrbitingPlanet(planetOptions);

		planet.addMoon(moon);
		moon.addSun(planet);

		this.planets.push(planet);
	};


	step() {
		this.moveObjects();
	};


	draw(ctx) {
		this.stars.forEach((star) => star.draw(ctx));
		this.suns.forEach((sun) => sun.draw(ctx, this.tilt));
		this.planets.forEach((planet) => planet.drawPath(ctx, this.tilt));
		this.planets.forEach((planet) => planet.draw(ctx, this.tilt));
	};

	moveObjects(){
		this.planets.forEach((planet) => planet.move());
	};
}

module.exports = SolarSystem;
