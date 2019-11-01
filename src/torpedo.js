const SpaceObject = require("./space_object");

class Torpedo extends SpaceObject {
	constructor(launcher, images, direction) {
		super(launcher.center());

		this.launcher = launcher;
		this.direction = direction;
		this.images = images;

		this.torpImg;
		this.dim;
		if (launcher.isEnemy()) {
			this.torpImg = this.images.kTorpImg;
			this.dim = [249, 137, 79, 78];
		}
		else {
			this.torpImg = this.images.torpImg
			this.dim = [0, 0, 44, 46];
		}

		this.speed = 3;
		this.height = 10;
		this.width = 10;
	};
	
	getLauncher() { return this.launcher; }
	
	draw(ctx) {
		ctx.drawImage(this.torpImg, this.dim[0], this.dim[1], this.dim[2], this.dim[3],
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
