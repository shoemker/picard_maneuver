class UserDraw {
	constructor(ctx) {
		this.ctx = ctx;
		this.boxX = 350;
		this.boxY = 150;
		this.boxWidth = 500;
		this.boxHeight = 500;

		this.strokeStyleFromUser = "white";
		this.lineWidthFromUser = 20;

		this.ctx.strokeStyle = "white";
		this.ctx.lineWidth = 20;
		this.started = false;

		this.ctx.lineJoin = 'round';
		this.ctx.lineCap = 'round';

		this.allLines = [];
		this.colors = [];
		this.widths = [];

		this.endLine();
		this.mouseDown = false;
	}

	getMouseDown() { return this.mouseDown; };

	
	setMouseDown(val) {
		this.mouseDown = val;
		if (val) this.addLine();
		else this.endLine();
	};


	addLine() {
		this.allLines.push([]);
		this.colors.push(this.strokeStyleFromUser);
		this.widths.push(this.lineWidthFromUser);
	};


	endLine() {
		this.prevX = null;
		this.prevY = null;
	};


	draw() {
		this.drawBlackRectangleWithBorder(this.boxX, this.boxY, this.boxWidth, this.boxHeight);

		this.drawAcceptButton();

		this.ctx.fillStyle = "lightblue";
		this.ctx.font = "60px FINALOLD";
		this.ctx.fillText("Front of Ship", 470, this.boxY - 25);
		this.ctx.fillText("Rear of Ship", 485, this.boxY + this.boxHeight + 63);

		this.ctx.font = "50px FINALOLD";

		this.drawColorChoices();
		this.drawLineWidthChoices();

		if (!this.started) this.drawInstructions();

		this.drawColorIndicator();
		this.drawLineWidthIndicator();

		// draws the array holding the users drawing
		for (let i = 0; i < this.allLines.length; i++) {
			this.ctx.strokeStyle = this.colors[i];
			this.ctx.lineWidth = this.widths[i];
			for (let j = 0; j < this.allLines[i].length - 1; j++) {
				this.ctx.beginPath();
				this.ctx.moveTo(this.allLines[i][j][0], this.allLines[i][j][1]);
				this.ctx.lineTo(this.allLines[i][j + 1][0], this.allLines[i][j + 1][1]);
				this.ctx.stroke();
			}
		}
	};


	drawBlackRectangleWithBorder(x, y, width, height, color = "grey", lineWidth = 1) {
		this.ctx.beginPath();

		this.ctx.lineWidth = lineWidth;

		this.ctx.fillStyle = "black";
		this.ctx.fillRect(x, y, width, height);

		this.ctx.rect(x - 1, y - 1, width + 2, height + 2);
		this.ctx.strokeStyle = color;
		this.ctx.stroke();
	};


	drawInstructions() {
		this.ctx.fillStyle = "white";
		this.ctx.font = "60px FINALOLD";
		this.ctx.globalAlpha = 0.3;
		this.ctx.fillText("Hold Down Mouse Button", 361, this.boxY + 210);
		this.ctx.fillText("to Draw in this Area", 400, this.boxY + 310);

		this.ctx.globalAlpha = 1;
	}


	drawAcceptButton() {
		this.ctx.beginPath();

		this.drawBlackRectangleWithBorder(500, 802, 210, 50, "lightblue", 3);
		this.ctx.stroke();
		this.ctx.fillStyle = "lightblue";
		this.ctx.font = "40px FINALOLD";
		this.ctx.fillText("Click to Accept", 510, 840);
	}


	drawLineWidthChoices() {

		const x = this.boxX + 550;
		const y = this.boxY + 100;

		if (this.strokeStyleFromUser === "black") this.ctx.strokeStyle = "white";
		else this.ctx.strokeStyle = this.strokeStyleFromUser;

		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.lineTo(x + 50, y);
		this.ctx.lineWidth = 13;
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.moveTo(x, y + 150);
		this.ctx.lineTo(x + 50, y + 150);
		this.ctx.lineWidth = 20;
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.moveTo(x, y + 300);
		this.ctx.lineTo(x + 50, y + 300);
		this.ctx.lineWidth = 27;
		this.ctx.stroke();
	}


	drawLineWidthIndicator() {

		const x = this.boxX + 550;
		const y = this.boxY + 100;

		this.ctx.lineWidth = 4;
		this.ctx.beginPath();
		this.ctx.strokeStyle = "lightblue";

		switch (this.lineWidthFromUser) {
			case 13:
				this.ctx.strokeRect(x - 20, y - 20, 90, 40);
				break;
			case 20:
				this.ctx.strokeRect(x - 20, y - 20 + 150, 90, 40);
				break;
			case 27:
				this.ctx.strokeRect(x - 20, y - 20 + 300, 90, 40);
				break;
		}
	}


	drawColorChoices() {
		const x = this.boxX - 70;
		const y = this.boxY + 33;

		this.ctx.fillStyle = "white";
		this.ctx.fillRect(x, y, 30, 30);

		this.ctx.fillStyle = "red";
		this.ctx.fillRect(x, y + 80, 30, 30);

		this.ctx.fillStyle = "blue";
		this.ctx.fillRect(x, y + 160, 30, 30);

		this.ctx.fillStyle = "yellow";
		this.ctx.fillRect(x, y + 240, 30, 30);

		this.ctx.fillStyle = "green";
		this.ctx.fillRect(x, y + 320, 30, 30);

		this.drawBlackRectangleWithBorder(x, y + 400, 30, 30);
		this.ctx.strokeStyle = "white";
	}


	drawColorIndicator() {

		const x = this.boxX - 70;
		const y = this.boxY + 33;

		this.ctx.lineWidth = 4;
		this.ctx.strokeStyle = "lightblue";
		this.ctx.beginPath();

		switch (this.strokeStyleFromUser) {
			case "#ffffff":
			case "white":
				this.ctx.strokeRect(x - 4, y - 4, 38, 38);
				break;
			case "#ff0000":
			case "red":
				this.ctx.strokeRect(x - 4, y - 4 + 80, 38, 38);
				break;
			case "#0000ff":
			case "blue":
				this.ctx.strokeRect(x - 4, y - 4 + 160, 38, 38);
				break;
			case "#ffff00":
			case "yellow":
				this.ctx.strokeRect(x - 4, y - 4 + 240, 38, 38);
				break;
			case "#008000":
			case "green":
				this.ctx.strokeRect(x - 4, y - 4 + 320, 38, 38);
				break;
			case "#000000":
			case "black":
				this.ctx.strokeRect(x - 4, y - 4 + 400, 38, 38);
				break;
		}
	}


	changeColor(y) {
		const yOffset = this.boxY + 55;

		if (y >= yOffset && y <= yOffset + 30) this.strokeStyleFromUser = "white";
		else if (y >= yOffset + 80 && y <= yOffset + 110) this.strokeStyleFromUser = "red";
		else if (y >= yOffset + 160 && y <= yOffset + 190) this.strokeStyleFromUser = "blue";
		else if (y >= yOffset + 240 && y <= yOffset + 270) this.strokeStyleFromUser = "yellow";
		else if (y >= yOffset + 320 && y <= yOffset + 350) this.strokeStyleFromUser = "green";
		else if (y >= yOffset + 400 && y <= yOffset + 430) this.strokeStyleFromUser = "black";
	}


	changeLineWidth(y) {
		if (y >= 170 && y < 330) this.lineWidthFromUser = 13;
		else if (y >= 330 && y < 490) this.lineWidthFromUser = 20;
		else if (y >= 490 && y < 670) this.lineWidthFromUser = 27;
	}


	// this was adapted from http://www.mattmorgante.com/technology/javascript-draw-html5-canvas
	// user can draw a ship in a box with cursor
	drawFromUser(e) {

		if (e.offsetX >= this.boxX &&
			e.offsetX <= this.boxX + this.boxWidth &&
			e.offsetY >= this.boxY &&
			e.offsetY <= this.boxY + this.boxHeight) {

			// reddraw area without instructions
			if (!this.started) this.started = true;

			this.ctx.beginPath();
			this.ctx.moveTo(this.prevX, this.prevY);
			this.ctx.lineTo(e.offsetX, e.offsetY);

			if (this.prevX && this.prevY) this.ctx.stroke();

			this.allLines[this.allLines.length - 1].push([e.offsetX, e.offsetY]);

			this.prevX = e.offsetX;
			this.prevY = e.offsetY;
		}
		else {
			this.endLine();
			this.addLine();
		}
	}


	// take user drawn picture
	acceptDrawing() {
		const imgData = this.ctx.getImageData(this.boxX, this.boxY, this.boxWidth, this.boxHeight);

		const virtualCanvas = document.createElement('canvas');
		virtualCanvas.width = this.boxWidth;
		virtualCanvas.height = this.boxHeight;
		const virtualCtx = virtualCanvas.getContext('2d');

		// sets the black pixels to transparent
		for (let index = 0; index < imgData.data.length; index += 4) {
			if (imgData.data[index] === 0 &&
				imgData.data[index + 1] === 0 &&
				imgData.data[index + 2] === 0)
				imgData.data[index + 3] = 0;
		}

		// puts the imageData on a canvas and turns it into an Image
		virtualCtx.putImageData(imgData, 0, 0);
		this.img = new Image();
		this.img.src = virtualCanvas.toDataURL();

		virtualCtx.clearRect(0, 0, this.boxWidth, this.boxHeight);

		// this block puts the Image back onto a canvas and rotates it 90 degrees
		setTimeout(() => {
			virtualCtx.save();
			virtualCtx.translate(this.boxWidth / 2, this.boxHeight / 2);
			virtualCtx.rotate(Math.PI / 2);
			virtualCtx.translate(-this.boxWidth / 2, -this.boxHeight / 2);
			virtualCtx.drawImage(this.img, 0, 0, 500, 500, 0, 0, 500, 500);

			virtualCtx.restore();
			this.img.src = virtualCanvas.toDataURL();
		}, 1);

		// debugger
		this.generateSSDImg(imgData);
	}


	// this generates the ssd portrait from user drawn picture
	generateSSDImg(imgData) {

		// turns the image grey for the ssd portrait
		for (let index = 0; index < imgData.data.length; index += 4) {
			if (imgData.data[index] != 0 || imgData.data[index + 1] != 0 || imgData.data[index + 2] != 0) {
				imgData.data[index] = 194;
				imgData.data[index + 1] = 194;
				imgData.data[index + 2] = 194;
			}
		}
		const virtualCanvas = document.createElement('canvas');
		virtualCanvas.width = this.boxWidth;
		virtualCanvas.height = this.boxHeight;
		const virtualCtx = virtualCanvas.getContext('2d');

		virtualCtx.putImageData(imgData, 0, 0);
		this.ssdImg = new Image();

		this.ssdImg.src = virtualCanvas.toDataURL();
	}

	getDrawing() { return this.img; }

	getSSDportrait() { return this.ssdImg; }

}

module.exports = UserDraw;
