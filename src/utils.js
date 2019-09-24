
const Utils = {

	distance(obj1, obj2) {
		let distance_x = obj1.center()[0] - obj2.center()[0];
		let distance_y = obj1.center()[1] - obj2.center()[1];
		return Math.sqrt(distance_x * distance_x + distance_y * distance_y);
	}
}

module.exports = Utils;