const OrbitingPlanet = require("./orbiting_planet");
const Comet = require("./comet");

const SSData1 = {
	

	addDataToSS(ctx, ss, center) {
		ss.setTilt(.294);
		
		if (center) ss.setCenter(center);
		else center = ss.getCenter();
		let x;
		let y;

		// const o = new SolarObject( {
		// 	pos: center,
		// 	radius: 60,
		// 	mass: 300,
		// 	color: "yellow"
		// });

		ss.addSun(ctx, "yellow",
			new OrbitingPlanet( { 
				center,
				pos: center,
				radius: 60,
				mass: 300,
				speed: 0,
				suns: [],
				dir: {x:0, y:0}
			})
		);


		x = center.x - 150
		y = center.y

		const vensMoon = {
			center,
			pos: { x: x - 15, y:y },
			radius: 1,
			color: "lightgreen",
			mass: .3,
			speed: 1,
			dir: { x: 0, y: -1 },
			suns: []
		};

		ss.addPlanet(new OrbitingPlanet( {
			center,
			pos: { x, y },
			radius: 6,
			gradientColors: { a: "lightgreen", b: "darkgreen" },
			mass: 8,
			suns: ss.getSuns(),
			speed: 4.98,
			dir: { x: 0, y: 1 },
			path: true,
			moonData: [vensMoon]
		}));


		ss.addPlanet(new OrbitingPlanet({
			center,
			pos: { x: center.x + 250, y: center.y },
			radius: 9,
			gradientColors: { a: "lightblue", b: "blue" },
			mass: 10,
			suns: ss.getSuns(),
			speed: 3,
			dir: { x: 0, y: -1 },
			path: true,
			ringsColor: "darkblue",
			// ringsGradient: { a: "blue", b: "darkblue" },
			rings: [{radius: 18, angle: Math.PI / 6, thickness: 2 },
				{radius: 15, angle: Math.PI / 6, thickness: 2 },
				{radius: 12, angle: Math.PI / 6, thickness: 2 }]
		}));


		// ss.addPlanet(new OrbitingPlanet({
		// 	center,
		// 	pos: { x: center.x -300, y: center.y },
		// 	radius: 3,
		// 	gradientColors: {a: "#cc66ff", b: "#9900cc" },
		// 	mass: 6,
		// 	suns: ss.getSuns(),
		// 	speed: 2.5,
		// 	dir: { x: 0, y: 1 },
		// 	path: true,
		// }));


		x = center.x + 400;
		y = center.y;

		const jupsMoon = {
			center,
			pos: { x: x - 50, y },
			radius: 2,
			color: "brown",
			mass: 1.5,
			speed: 2,
			dir: { x: 0, y: -1 },
			center,
			suns: []
		};

		ss.addPlanet(new OrbitingPlanet({
			center,
			pos: { x: x, y: y },
			radius: 12,
			gradientColors: { a: "rgb(255, 153, 51)", b: "darkred" },
			mass: 40,
			suns: ss.getSuns(),
			speed: 1.90,
			dir: { x: 0, y: -1 },
			center,
			path: true,
			moonData: [jupsMoon]
		}));



		ss.addComet(new Comet({
			center,
			pos: { x: center.x + 150, y: center.y + 250 },
			radius: 1.5,
			color: "rgb(255, 255, 204)",
			// color: "#9933ff",
			mass: 1,
			suns: ss.getSuns(),
			speed: 1.8,
			dir: { x: 0, y: -1 }
		}));
	}
};

module.exports = SSData1;
