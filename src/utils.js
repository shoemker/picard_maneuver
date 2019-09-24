
const Utils = {

	distance(obj1, obj2) {
		let distance_x = obj1.center()[0] - obj2.center()[0];
		let distance_y = obj1.center()[1] - obj2.center()[1];
		return Math.sqrt(distance_x * distance_x + distance_y * distance_y);
	},

	angleToOtherShip(ship, otherShip) {
		const xDelta = otherShip.center()[0] - ship.center()[0];
		const yDelta = otherShip.center()[1] - ship.center()[1];

		// find the angle between the 2 objects
		const arcTangent = Math.atan(yDelta / xDelta);
		if(xDelta < 0) angle = arcTangent + Math.PI;
		else if(xDelta > 0 && yDelta < 0) angle = arcTangent + Math.PI * 2;
			else angle = arcTangent;

		// take the rotation of the hit ship into account
		angle -= ship.getRotation();
		if (angle < 0) angle += Math.PI * 2;
		return angle;
	}
}

module.exports = Utils;