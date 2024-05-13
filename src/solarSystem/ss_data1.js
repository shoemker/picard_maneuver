const OrbitingObject = require("./orbiting_object");
const Sun = require("./sun");
const Comet = require("./comet");

const SSData1 = {
	

	addDataToSS(ss, center) {
		ss.setTilt(.294);
		// ss.setTilt(0)
		
		if (center) ss.setCenter(center);
		else center = ss.getCenter();
		let x;
		let y;


		ss.addSun(new Sun( { 
				center,
				pos: center,
				radius: 110,
				gradientColor: "yellow",
				mass: 300,
				speed: 0,
				suns: [],
				dir: {x:0, y:0}
			})
		);


		x = center.x - 150
		y = center.y
		let moonData = [];

		const vensMoon = {
			center,
			pos: { x: x - 15, y:y },
			radius: 1,
			color: "pink",
			mass: .3,
			speed: 1,
			offplane: -.5, // angle in radians off solar system plane
			dir: { x: 0, y: -1 },
			suns: []
		};
		moonData.push(vensMoon);

		ss.addPlanet(new OrbitingObject( {
			center,
			pos: { x, y },
			radius: 6,
			gradientColors: { a: "lightgreen", b: "darkgreen" },
			mass: 8,
			suns: ss.getSuns(),
			speed: 4.98,
			dir: { x: 0, y: 1 },
			path: true,
			moonData
		}));


		ss.addPlanet(new OrbitingObject({
			center,
			pos: { x: center.x + 250, y: center.y },
			radius: 7.5,
			gradientColors: { a: "lightblue", b: "blue" },
			mass: 10,
			suns: ss.getSuns(),
			speed: 3,
			dir: { x: 0, y: -1 },
			path: true,
			ringsColor: "darkblue",
			// ringsGradient: { a: "blue", b: "darkblue" },
			rings: [{radius: 18, angle: Math.PI / 6, thickness: 2 },
				{radius: 14, angle: Math.PI / 6, thickness: 2 },
				{radius: 11, angle: Math.PI / 6, thickness: 2 }]
		}));


		// ss.addPlanet(new OrbitingObject({
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
		moonData = [];

		// const jupsMoon1 = {
		// 	center,
		// 	pos: { x: x - 50, y },
		// 	radius: 2.5,
		// 	color: "brown",
		// 	mass: 1.5,
		// 	speed: 2,
		// 	dir: { x: 0, y: -1 },
		// 	center,
		// 	offplane: 0,
		// 	suns: []
		// };
		// moonData.push(jupsMoon1);


		const jupsMoon2 = {
			center,
			pos: { x: x + 38, y },
			radius: 2,
			color: "purple",
			mass: 1.5,
			speed: 2.5,
			dir: { x: 0, y: 1 },
			center,
			offplane: .7, // angle in radians off solar system plane
			suns: []
		};
		moonData.push(jupsMoon2);


		ss.addPlanet(new OrbitingObject({
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
			moonData
		}));



		ss.addPlanet(new Comet({
			center,
			pos: { x: center.x + 150, y: center.y + 250 },
			radius: 1.5,
			color: "rgb(255, 255, 204)",
			mass: 1,
			suns: ss.getSuns(),
			speed: 1.8,
			dir: { x: 0, y: -1 }
		}));

		
		// adding asteroids
		ss.addPlanet(new OrbitingObject({
			center,
			pos: { x: center.x -300, y: center.y },
			radius: .8,
			gradientColors: {a: "lightgray", b: "gray" },
			mass: .2,
			suns: ss.getSuns(),
			speed: 2.5,
			dir: { x: 0, y: 1 },
			path: false
		}));


		ss.addPlanet(new OrbitingObject({
			center,
			pos: { x: center.x + 320, y: center.y },
			radius: .8,
			gradientColors: { a: "lightgray", b: "gray" },
			mass: .2,
			suns: ss.getSuns(),
			speed: 2.4,
			dir: { x: 0, y: -1 },
			path: false
		}));


		ss.addPlanet(new OrbitingObject({
			center,
			pos: { x: center.x - 200, y: center.y },
			radius: .8,
			gradientColors: { a: "lightgray", b: "gray" },
			mass: .2,
			suns: ss.getSuns(),
			speed: 3.5,
			dir: { x: 0, y: 1 },
			path: false
		}));

		ss.addPlanet(new OrbitingObject({
			center,
			pos: { x: center.x - 440, y: center.y},
			radius: .8,
			gradientColors: { a: "lightgray", b: "gray" },
			mass: .2,
			suns: ss.getSuns(),
			speed: 1.78,
			dir: { x: 0, y:1 },
			path: false
		}));
	}
};

module.exports = SSData1;
