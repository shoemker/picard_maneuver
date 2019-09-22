const SpaceObject = require("./space_object");

class Torpedo extends SpaceObject {
	constructor(pos, directionIndex) {
		super(pos);

		
		if (directionIndex === 36) directionIndex = 0;
		else if (directionIndex === -1) directionIndex = 35;

		this.direction = this.directionArray[directionIndex];
		this.speed = 3;
		this.height = 10;
		this.width = 10;

		this.loadTorpImg();
	};
	
	draw(ctx) {
		ctx.drawImage(this.torpImg, 0, 0, 44, 46,
			this.pos[0],
			this.pos[1],
			this.width,
			this.height);
	};


	move() {
		this.pos[0] += this.speed * this.direction[0];
		this.pos[1] -= this.speed * this.direction[1];
	};


	loadTorpImg() {
		this.torpImg = new Image();
		this.torpImg.onload = () => { return true; }
		this.torpImg.src = '../images/torpedo.png';
	};

};

module.exports = Torpedo;