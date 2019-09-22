
class SpaceObject {
	constructor(pos) {
		this.pos = pos;

		this.width;
		this.height;

		// this array contains all of the directions (36 of them)
		this.directionArray = [
			[7, 0],
			[7, -1],
			[7, -2],
			[6, -3],
			[5, -4],
			[4, -5],
			[3, -6],
			[2, -7],
			[1, -7],
			[0, -7],
			[-1, -7],
			[-2, -7],
			[-3, -6],
			[-4, -5],
			[-5, -4],
			[-6, -3],
			[-7, -2],
			[-7, -1],
			[-7, 0],
			[-7, 1],
			[-7, 2],
			[-6, 3],
			[-5, 4],
			[-4, 5],
			[-3, 6],
			[-2, 7],
			[-1, 7],
			[0, 7],
			[1, 7],
			[2, 7],
			[3, 6],
			[4, 5],
			[5, 4],
			[6, 3],
			[7, 2],
			[7, 1]
		];
	}

	// shifts to account for main ship movement
	shift(direction, speed) {
		this.pos[0] -= speed * direction[0];
		this.pos[1] += speed * direction[1];
	};


	center() {
		return [this.pos[0] + this.width / 2, this.pos[1] + this.height / 2];
	}

}

module.exports = SpaceObject