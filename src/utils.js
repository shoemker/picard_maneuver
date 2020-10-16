const Utils = {

	distance(obj1, obj2) {
		let distance_x = obj1[0] - obj2[0];
		let distance_y = obj1[1] - obj2[1];
		return Math.sqrt(distance_x * distance_x + distance_y * distance_y);
	},
	
	
	angleToOtherShip(ship, otherShip) {

		let angle = this.findAngle(ship.center(),otherShip.center());
		
		// take the rotation of the hit ship into account
		angle -= ship.getRotation();
		if (angle < 0) angle += Math.PI * 2;
		return angle;
	},

	
	// find the angle between the 2 objects
	findAngle(point1, point2) {
		const xDelta = point2[0] - point1[0];
		const yDelta = point2[1] - point1[1];

		const arcTangent = Math.atan(yDelta / xDelta);
		let angle;
		
		if (xDelta < 0) angle = arcTangent + Math.PI;
		else if (xDelta > 0 && yDelta < 0) angle = arcTangent + Math.PI * 2;
		else angle = arcTangent;

		return angle;
	},


	loadImg(file) {
		let img = new Image();
		img.onload = () => { return true; }
		img.src = file;
		return img;
	},


	// kind of a factory method to create a star
	// a version of this came from http://thenewcode.com/81/Make-A-Starfield-Background-with-HTML5-Canvas
	createStarData(xRange, yRange) {
		const colorrange = [0, 60, 240];
		return {
				pos: [Math.random() * xRange, Math.random() *yRange],
				radius: Math.random() * 2.0,
				hue: colorrange[Utils.getRandom(0, colorrange.length - 1)],
				sat: this.getRandom(50, 100),
			};	
	},
	// helper method
	getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},


	// draw a red circle with a vert and a horiz line like crosshairs
	drawTarget(ctx, x, y, size, lw, color = "red") {

		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineWidth = lw;
		ctx.arc(x, y, size, 0, 2 * Math.PI);

		ctx.moveTo(x, y - size);
		ctx.lineTo(x, y + size);
		ctx.moveTo(x - size, y);
		ctx.lineTo(x + size, y);
		
		ctx.stroke();
	}, 


	// callback for ship beam effect
	drawLine(ctx, from, to){
		ctx.moveTo(to.x, to.y);
		ctx.lineTo(from.x, from.y);
	},


	// a version of this came from https://codepen.io/alexkulagin/pen/wGwpdx
	// callback for ship beam effect
	drawWavyLine(ctx, from, to) {
		let cx = 0;
		let cy = 0;
		let waveOffsetLength;

		const ang = Math.atan2(to.y - from.y, to.x - from.x);
		const distance = Math.sqrt((from.x - to.x) * (from.x - to.x) + 
			(from.y - to.y) * (from.y - to.y));
		
		const frequency = 1/ 8;
		const amplitude = 3;

		const f = Math.PI * frequency *distance;

		let step = 1;	// lower step makes curve smoother
		for (let i = 0; i <= distance; i += step) {
			waveOffsetLength = Math.sin((i / distance) * f) * amplitude;
			cx = from.x + Math.cos(ang) * i + Math.cos(ang - Math.PI / 2) * waveOffsetLength;
			cy = from.y + Math.sin(ang) * i + Math.sin(ang - Math.PI / 2) * waveOffsetLength;
			i > 0 ? ctx.lineTo(cx, cy) : ctx.moveTo(cx, cy);
		}
	},


	// callback for ship beam effect
	drawCircleBeam(ctx, from, to) {
		const separation = 15;
		let ratio;
		const xDelta = to.x - from.x;
		const yDelta = to.y - from.y;
		const distance = Math.sqrt(xDelta*xDelta + yDelta*yDelta)

		const angle = Utils.findAngle([from.x, from.y], [to.x, to.y] );

		ctx.lineWidth = 1;
		
		for(let i = 0; i <= distance; i += separation) {
			ratio = i / distance;
			ctx.beginPath();
			ctx.ellipse(from.x + xDelta*ratio, from.y + yDelta*ratio, 
				ratio*2, ratio*5, angle, 0, 2 * Math.PI);
			ctx.stroke();
		}
	},
	

	drawFilledCircle(ctx, x, y, radius, fillStyle) {
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 360);
		ctx.fillStyle = fillStyle;
		ctx.fill();
	},


	// wrapper so that I can use ctx.ellipse as a callback
	drawEllipse(ctx, x, y, width, height) {
		ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2);
	},


	// wrapper so that I can use ctx.rect as a callback
	drawRect(ctx, x, y, width, height) {
		ctx.rect(x, y, width, height);
	},


	getCanvasDim() { return {x:1200, y:900}; }
}

module.exports = Utils;