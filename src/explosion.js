class Explosion {
	constructor(img, sound) {
		this.img = img;
		this.sound = sound;
		this.index = 0;

		// these are the x,y coords for different sprites on the sheet
		this.sheet = [
			[ 380, 854,  30,  26],
			[ 250, 852,  30,  30],
			[ 115, 845,  40,  40],

			[ 760, 715,  50,  45],
			[ 628, 710,  53,  50],
			[ 495, 705,  60,  60],
			[ 360, 705,  65,  60],
			[ 230, 705,  70,  65],
			[ 100, 705,  70,  65],

			[ 750, 575,  70,  70],
			[ 618, 570,  74,  75],
			[ 490, 570,  70,  75],
			[ 357, 570,  75,  75],
			[ 225, 570,  77,  75],
			[ 100, 570,  70,  75],

			[ 748, 435,  74,  90],
			[ 616, 435,  78,  90],			
			[ 488, 435,  74,  90],
			[ 355, 435,  79,  90],			
			[ 223, 435,  81,  90],
			[  98, 435,  74,  90],

			[ 740, 290, 100, 115],
			[ 605, 290, 105, 115],
			[ 470, 290, 110, 115],
			[ 340, 290, 110, 115],
			[ 210, 290, 110, 115],
			[  90, 290,  90, 115],

			[ 730, 160, 110, 110],
			[ 600, 160, 110, 110],
			[ 470, 160, 110, 110],
			[ 340, 160, 110, 110],
			[ 215, 160, 100, 110],
			[  85, 160, 100, 110],

			[ 735,  40, 100,  95],
			[ 610,  40,  90,  90],
			[ 485,  45,  80,  85],
			[ 355,  50,  80,  75],
			[ 230,  50,  75,  70],
			[ 105,  59,  55,  51]

		];
	};


	draw(ctx, pos) {
		if (this.index === 0) this.sound.play();
		
		if (this.index < this.sheet.length) {
			ctx.drawImage(this.img, 
				this.sheet[this.index][0], this.sheet[this.index][1], this.sheet[this.index][2], this.sheet[this.index][3],
				pos[0]-this.index/2,
				pos[1] - 5-this.index/2,
				15+this.index,
				15+this.index
			);

			this.index++;
		}
		
		return this.index
	};
}

module.exports = Explosion;