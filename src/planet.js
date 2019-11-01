const SpaceObject = require("./space_object");

class Planet extends SpaceObject {
	constructor(options) {
		super(options.pos);
		this.img = options.img;
		this.width = options.width;
		this.height = options.height;
		this.sheetCoords = options.sheetCoords;
	}

	draw(ctx) {
		ctx.drawImage(this.img,
			this.sheetCoords[0], this.sheetCoords[1], this.sheetCoords[2], this.sheetCoords[3],
			this.pos[0], this.pos[1], this.width, this.height);
	}
}

module.exports = Planet;