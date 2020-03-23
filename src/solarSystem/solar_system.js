const Utils = require("../utils");
// const Star = require("../star");
const SolarObject = require("./solar_object");
const OrbitingPlanet = require("./orbiting_planet");
const Comet = require("./comet");
const Moon = require("./moon");

class SolarSystem {

	constructor(tilt, center) {
		this.suns = [];
		this.planets = [];

		this.tilt = tilt;
		this.center = center;
	};

	getTilt() { return this.tilt; };
	setTilt(tilt) { this.tilt = tilt; };
	getSuns() { return this.suns; };
	getCenter() { return this.center; }
	

	addSun(ctx, options) {
		const gradient = ctx.createRadialGradient(
			options.pos.x, options.pos.y, options.radius / 4,
			options.pos.x, options.pos.y, options.radius);

		gradient.addColorStop(0, options.color);
		gradient.addColorStop(1, "transparent");

		options.color = gradient;
		options.centerOfSS = this.center;

		this.suns.push(new SolarObject(options));
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


	getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};


	step() {
		this.moveObjects();
	};


	draw(ctx) {
		this.suns.forEach((sun) => sun.draw(ctx));
		this.planets.forEach((planet) => planet.draw(ctx, this.tilt));
	};

	moveObjects(){
		this.planets.forEach((planet) => planet.move());
	};
}

module.exports = SolarSystem;
