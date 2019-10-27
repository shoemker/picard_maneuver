const SpaceObject = require("./space_object");

class Torpedo extends SpaceObject {
	constructor(launcher, torpImg, direction) {
		super(launcher.center());

		this.launcher = launcher;
		this.torpImg = torpImg;
		this.direction = direction;

		this.speed = 3;
		this.height = 10;
		this.width = 10;
	};
	
	getLauncher() { return this.launcher; }
	
	draw(ctx) {
		ctx.drawImage(this.torpImg, 0, 0, 44, 46,
			this.pos[0]-this.width/2,
			this.pos[1]-this.height/2,
			this.width,
			this.height);
	};


	move() {
		this.pos[0] += this.speed * this.direction[0];
		this.pos[1] -= this.speed * this.direction[1];
	};

};

module.exports = Torpedo;
