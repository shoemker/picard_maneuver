/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ai.js":
/*!*******************!*\
  !*** ./src/ai.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst AI = {\n\tcheckForMoves(enemy, enterprise){\n\t\t// if (enemy)\n\t}\n\n}\n\nmodule.exports = AI;\n\n//# sourceURL=webpack:///./src/ai.js?");

/***/ }),

/***/ "./src/d7.js":
/*!*******************!*\
  !*** ./src/d7.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst SSD = __webpack_require__(/*! ./ssd */ \"./src/ssd.js\");\n\nclass D7 extends Ship {\n\tconstructor(options) {\n\t\tsuper(options);\n\n\t\t// this.speed = 1;\n\t\tthis.loadShipImg();\n\n\t\t// ssd is the ship systems display in the corner of the screen\n\t\tthis.ssd = new SSD({\n\t\t\tssd_x: 100,\n\t\t\tssd_y: 550,\n\t\t\tssd_width: 70,\n\t\t\tssd_height: 120,\n\t\t\timgName: '../images/D7-SSD.png',\n\t\t\timgCoords: [0, 0, 170, 175]\n\t\t});\n\t};\n\n\n\tdraw(ctx) {\n\t\tctx.save();\n\n\t\tthis.rotateCanvas(ctx);\n\n\t\t//draw ship\n\t\tctx.drawImage(this.shipImg, 0, 0, 380, 275,\n\t\t\tthis.pos[0],\n\t\t\tthis.pos[1],\n\t\t\tthis.width,\n\t\t\tthis.height);\n\n\t\tctx.restore();\n\n\t\tsuper.draw(ctx);\n\t};\n\n\n\tloadShipImg() {\n\t\tthis.shipImg = new Image();\n\t\tthis.shipImg.onload = () => { return true; }\n\t\tthis.shipImg.src = '../images/D7.png';\n\t};\n}\n\n\nmodule.exports = D7\n\n//# sourceURL=webpack:///./src/d7.js?");

/***/ }),

/***/ "./src/enterprise.js":
/*!***************************!*\
  !*** ./src/enterprise.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst SSD = __webpack_require__(/*! ./ssd */ \"./src/ssd.js\");\n\nclass Enterprise extends Ship {\n\tconstructor(options) {\n\t\tsuper(options);\n \n\t\tthis.loadShipImg();\n\n\t\t// rotates image 180 degrees so it faces left at start\n\t\tthis.rotationOffset = Math.PI;\n\n\t\t// ssd is the ship systems display in the corner of the screen\n\t\tthis.ssd = new SSD({\n\t\t\tssd_x: 830,\n\t\t\tssd_y: 550,\n\t\t\tssd_width: 60,\n\t\t\tssd_height: 120,\n\t\t\timgName: '../images/enterprise-refit-ssd.png',\n\t\t\timgCoords: [0, 0, 54, 129]\n\t\t});\n\t};\n\n\tdraw(ctx) {\n\t\tctx.save();\n\n\t\tthis.rotateCanvas(ctx);\n\n\t\t//draw ship\n\t\tctx.drawImage(this.shipImg, 22, 0, 660, 300,\n\t\t\tthis.pos[0],\n\t\t\tthis.pos[1],\n\t\t\tthis.width,\n\t\t\tthis.height);\n\n\t\tctx.restore();\n\t\t\n\t\tsuper.draw(ctx);\n\t};\n\n\n\tloadShipImg() {\n\t\tthis.shipImg = new Image();\n\t\tthis.shipImg.onload = () => { return true; }\n\t\tthis.shipImg.src = '../images/uss-enterprise-png-view-original-669.png';\n\t};\n\n\n}\n\n\nmodule.exports = Enterprise\n\n//# sourceURL=webpack:///./src/enterprise.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Star = __webpack_require__(/*! ./star */ \"./src/star.js\");\nconst AI = __webpack_require__(/*! ./ai */ \"./src/ai.js\");\n\nclass Game {\n\n\tconstructor(canvas_width, canvas_height) {\n\t\tthis.canvas_width = canvas_width;\n\t\tthis.canvas_height = canvas_height;\n\t\tthis.stars = [];\n\n\t\tthis.createStarField();\n\t\tthis.loadTorpImg();\n\t}\n\n\taddEnterprise(enterprise){\n\t\tthis.enterprise = enterprise;\n\t}\n\n\taddEnemy(enemy){\n\t\tthis.enemy = enemy\n\t}\n\n\tstep() {\n\t\tthis.moveObjects();\n\n\t\tthis.checkTorpCollisions(this.enemy, this.enterprise.getTorpedos());\n\t\tthis.checkTorpCollisions(this.enterprise, this.enemy.getTorpedos());\n\n\t\tAI.checkForMoves(this.enemy,this.enterprise);\n\t}\n\n\n\tmoveObjects() {\t\t\n\t\tthis.shift();\n\n\t\t// now give ships and objects their own movement\n\t\tthis.enemy.move();\n\n\t\tthis.enterprise.getTorpedos().forEach((torpedo, i) => {\n\t\t\ttorpedo.move();\n\n\t\t\t// delete torpedo when it moves offscreen\n\t\t\tlet center = torpedo.center();\n\t\t\tif (center[0] < 0 || center [0] > this.canvas_width ||\n\t\t\t\t\tcenter[1] < 0 || center [1] > this.canvas_height)\n\t\t\t\tthis.enterprise.getTorpedos().splice(i,1);\n\t\t});\n\t}\n\n\n\t// shift moves everything but main ship to show main ship's movement\n\tshift() {\n\t\tconst base_speed_inverse = 5;\n\n\t\tconst shift_x = this.enterprise.getDirection()[0];\n\t\tconst shift_y = this.enterprise.getDirection()[1];\n\n\n\t\tthis.stars.forEach((star) =>\n\t\t\t\t\tstar.shift([shift_x / base_speed_inverse,\n\t\t\t\t\t\t\t\t\t\t\tshift_y / base_speed_inverse],\n\t\t\t\t\t\t\t\t\t\t\tthis.enterprise.getSpeed()));\n\n\t\tthis.enemy.shift([shift_x / base_speed_inverse,\n\t\t\t\t\t\t\t\t\t\t\tshift_y / base_speed_inverse],\n\t\t\t\t\t\t\t\t\t\t\tthis.enterprise.getSpeed());\n\t}\n\n\n\tdraw(ctx){\n\t\t// clear canvas and draw black background\n\t\tctx.beginPath();\n\t\tctx.clearRect(0, 0, this.canvas_width, this.canvas_height);\n\t\tctx.fillStyle = \"black\";\n\t\tctx.fillRect(0, 0, this.canvas_width, this.canvas_height);\n\n\t\t// draw all of the objects\n\t\tthis.drawStars(ctx);\n\t\tthis.enterprise.draw(ctx);\n\t\tthis.enemy.draw(ctx);\n\t\tthis.enterprise.getTorpedos().forEach((torpedo) => torpedo.draw(ctx));\n\t\tthis.enemy.getTorpedos().forEach((torpedo) => torpedo.draw(ctx));\n\t}\n\n\tdrawStars(ctx) {\n\t\tthis.stars.forEach((star) => star.draw(ctx));\n\t}\n\n\n\t// factory method to create stars\n\t// a version of this came from http://thenewcode.com/81/Make-A-Starfield-Background-with-HTML5-Canvas\n\tcreateStarField() {\n\t\tconst starCount = 250;\n\t\tconst\tcolorrange = [0, 60, 240];\n\t\t\n\t\tfor (let i = 0; i < starCount; i++) {\n\t\n\t\t\tthis.stars.push(new Star({\n\t\t\t\tpos: [Math.random() * this.canvas_width, Math.random() * this.canvas_height],\n\t\t\t\tradius: Math.random() * 1.6,\n\t\t\t\thue: colorrange[this.getRandom(0, colorrange.length - 1)],\n\t\t\t\tsat: this.getRandom(50, 100),\n\t\t\t\tcanvas_width: this.canvas_width,\n\t\t\t\tcanvas_height: this.canvas_height\t\t\t\t\n\t\t\t}))\n\t\t}\n\t}\n\n\tgetRandom(min, max) {\n\t\treturn Math.floor(Math.random() * (max - min + 1)) + min;\n\t} \n\n\n\tfireTorpedos(ship) {\n\t\tship.fireTorpedos(this.torpImg);\n\t}\n\n\n\tfirePhasors(ship) {\n\t\tlet target;\n\t\tif(ship === this.enterprise) {\n\t\t\ttarget = this.enemy;\n\t\t\n\t\t\tconst center = target.center();\n\n\t\t\tif (center[0] > 0 && center[0] < this.canvas_width &&\n\t\t\t\tcenter[1] > 0 && center[1] < this.canvas_height)  ship.firePhasors(target);\n\t\t}\n\t\telse { \n\t\t\ttarget = this.enterprise;\n\t\t\tship.firePhasors(target);\n\t\t}\n\t}\n\n\n\tcheckTorpCollisions(ship, torpedos) {\n\t\tlet distance;\n\n\t\ttorpedos.forEach((torpedo,i) => {\n\t\t\tlet distance_x = ship.center()[0] - torpedo.center()[0];\n\t\t\tlet distance_y = ship.center()[1] - torpedo.center()[1];\n\t\t\tdistance = Math.sqrt(distance_x*distance_x + distance_y*distance_y);\n\t\t\tif (distance < 30) {\n\t\t\t\ttorpedos.splice(i, 1);\n\t\t\t\tif (ship === this.enterprise) ship.receiveTorpHit(this.enemy);\n\t\t\t\telse ship.receiveTorpHit(this.enterprise)\n\t\t\t}\n\t\t})\n\t}\n\n\n\tloadTorpImg() {\n\t\tthis.torpImg = new Image();\n\t\tthis.torpImg.onload = () => { return true; }\n\t\tthis.torpImg.src = '../images/torpedo.png';\n\t};\n\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const  Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst Enterprise = __webpack_require__(/*! ./enterprise */ \"./src/enterprise.js\");\nconst D7 = __webpack_require__(/*! ./d7 */ \"./src/d7.js\");\n\nclass GameView {\n\n\tconstructor(ctx, width, height) {\n\n\t\tthis.ctx = ctx;\n\t\tthis.game = new Game(width, height);\n\t\tthis.pause = false;\n\n\t\tthis.game.addEnterprise(new Enterprise({\n\t\t\tpos: [width/2 - 50, height/2-50],\n\t\t\tdirectionIndex: 18,\n\t\t\tdirection: [-3,0]\n\t\t}));\n\n\t\tthis.game.addEnemy( new D7({\n\t\t\tpos: [0, 100],\n\t\t\tdirectionIndex: 0,\n\t\t\tdirection: [3, 0]\n\t\t}));\n\t\n\t};\n\t\n\n\tstart() {\n\t\tthis.bindKeyHandlers();\n\n\t\tthis.lastTime = 0;\n\n\t\t// start the animation\n\t\trequestAnimationFrame(this.animate.bind(this));\n\t};\n\n\n\tanimate(time) {\n\t\tif (!this.pause) {\n\t\t\tconst timeDelta = time - this.lastTime;\n\t\t\tthis.game.step(timeDelta);\n\t\t\tthis.game.draw(this.ctx);\n\n\t\t\tthis.lastTime = time;\n\n\t\t\t// every call to animate requests causes another call to animate\n\t\t\trequestAnimationFrame(this.animate.bind(this));\n\t\t}\n\t};\n\t\n\tbindKeyHandlers() {\n\n\t\tconst MOVES = {\n\t\t\tw: 1,\n\t\t\ts:-1\n\t\t}\n\n\t\tconst that = this;\n\t\t\n\t\tObject.keys(MOVES).forEach(function (k) {\n\t\t\tconst move = MOVES[k];\n\t\t\tkey(k, function () { that.game.enterprise.power(move); });\n\t\t});\n\n\t\tkey(\"space\", function () { \n\t\t\tthat.game.firePhasors(that.game.enterprise); \n\t\t});\n\t\t\n\n\t\t//call to rotate ship image\n\t\tkey(\"a\", function () { that.game.enterprise.changeDirection(-1); });\n\t\tkey(\"d\", function () { that.game.enterprise.changeDirection(1); });\n\n\t\tkey(\"j\", function () { that.game.enemy.changeDirection(-1); });\n\t\tkey(\"l\", function () { that.game.enemy.changeDirection(1); });\n\n\t\tkey(\"f\", function () { that.game.fireTorpedos(that.game.enterprise); });\n\n\t\tkey(\"p\", function () { that.pauseGame(); });\n\t};\n\n\t\n\tpauseGame() {\n\t\tif (!this.pause) this.pause = true;\n\t\telse { \n\t\t\tthis.pause = false;\n\t\t\trequestAnimationFrame(this.animate.bind(this));\n\t\t}\n\t};\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\n\n// window.MovingObject = MovingObject;\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n\tconst canvasEl = document.getElementsByTagName(\"canvas\")[0];\n\tcanvasEl.width = 1000;\n\n\tcanvasEl.height = 750;\n\n\tconst ctxMain = canvasEl.getContext(\"2d\");\n\n\tlet g = new GameView(ctxMain, canvasEl.width, canvasEl.height);\n\n\n\tg.start(ctxMain);\n\n})\n\nwindow.addEventListener('keydown', function (e) {\n\tif (e.keyCode == 32 && e.target == document.body) {\n\t\te.preventDefault();\n\t}\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/shield.js":
/*!***********************!*\
  !*** ./src/shield.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Shield {\n\tconstructor(options) {\n\t\tthis.pos = options.pos;\n\t\tthis.start = options.start;\n\t\tthis.end = options.end;\n\t\tthis.multiplier = options.multiplier\n\n\t\tthis.hitpoints = 100;\n\t\tthis.color = \"#ADD8E6\";\n\t\tthis.timer = 0;\n\t}\n\n\tgetHitpoints() {\n\t\treturn this.hitpoints;\n\t}\n\n\tdraw(ctx) {\n\t\tthis.timer++;\n\t\tif (this.timer === 20) {\n\t\t\tthis.timer = 0;\n\t\t\tthis.color = \"#ADD8E6\";\n\t\t}\n\n\t\tlet shieldPercentage = this.hitpoints / 100;\n\n\t\tctx.beginPath();\n\t\tctx.arc(this.pos[0], \n\t\t\t\t\t\tthis.pos[1], \n\t\t\t\t\t\t100, \n\t\t\t\t\t\tthis.start * Math.PI + this.multiplier * Math.PI * (1 - shieldPercentage),\n\t\t\t\t\t\tthis.end * Math.PI - this.multiplier * Math.PI * (1 - shieldPercentage));\n\t\n\t\tctx.strokeStyle = this.color;\n\t\tctx.stroke();\n\t}\n\n\n\thit() {\n\t\tthis.timer = 1;\n\t\tthis.color = \"red\";\n\n\t\tthis.hitpoints -= 20;\n\t\tif (this.hitpoints < 0) this.hitpoints = 0;\n\t}\n}\n\nmodule.exports = Shield;\n\n//# sourceURL=webpack:///./src/shield.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst SpaceObject = __webpack_require__(/*! ./space_object */ \"./src/space_object.js\");\nconst Torpedo = __webpack_require__(/*! ./torpedo */ \"./src/torpedo.js\");\n\nclass Ship extends SpaceObject{\n\n\tconstructor(options) {\n\t\tsuper(options.pos);\n\n\t\tthis.directionIndex = options.directionIndex;\n\t\tthis.direction = options.direction;\n\n\t\tthis.speed = 0;\n\t\tthis.width = 60;\n\t\tthis.height = 30\n\t\tthis.phasorCounter = 0;\n\t\tthis.torpExplosionCounter = 0;\n\n\t\tthis.rotationOffset = 0;\n\t\tthis.increment = Math.PI / 18;\n\n\t\tthis.torpedos = [];\n\t\tthis.ssd;\n\n\t\tthis.phasorRecharge = 0;\n\t\tthis.phasorRechargeMax = 100;\n\n\t\tthis.torpedoReload = 0;\n\t\tthis.torpedoReloadMax= 120;\n\n\t\tthis.loadExplosionImg();\n\t}\n\n\tgetDirection(){\n\t\treturn this.direction;\n\t}\n\n\tgetSpeed() {\n\t\treturn this.speed;\n\t}\n\n\tgetTorpedos() {\n\t\treturn this.torpedos;\n\t}\n\n\n\trotateCanvas(ctx) {\n\t\tctx.translate(this.center()[0], this.center()[1]);\n\t\tctx.rotate(this.rotationOffset);\n\t\tctx.translate(-(this.center()[0]), -(this.center()[1]));\n\t};\n\t\n\n\tmove() {\n\t\tthis.pos[0] += this.speed * this.direction[0];\n\t\tthis.pos[1] -= this.speed * this.direction[1];\n\t};\n\n\t\n\tdraw(ctx) {\n\n\t\t//draw ship systems display\n\t\tthis.ssd.draw(ctx,\n\t\t\t\t\t\t\t\t\tthis.phasorRecharge/this.phasorRechargeMax,\n\t\t\t\t\t\t\t\t\tthis.torpedoReload/this.torpedoReloadMax);\n\n\n\t\tif (this.phasorCounter > 0) this.drawPhasor(ctx);\n\n\t\t// recharge weapons\n\t\tif (this.phasorRecharge !== this.phasorRechargeMax) this.phasorRecharge++;\n\t\tif (this.torpedoReload !== this.torpedoReloadMax) this.torpedoReload++;\n\n\t\t//shows torpedo hit\n\t\tif (this.torpExplosionCounter) {\n\t\t\tctx.drawImage(this.explosionImg, 606, 295, 100, 100,\n\t\t\t\tthis.center()[0],\n\t\t\t\tthis.center()[1]-5,\n\t\t\t\t10,\n\t\t\t\t10);\n\n\t\t\tthis.torpExplosionCounter++;\n\t\t\tif (this.torpExplosionCounter > 10) this.torpExplosionCounter = 0;\n\t\t}\n\t}\n\n\n\tdrawPhasor(ctx) {\n\t\tctx.beginPath();\n\t\tctx.moveTo(this.center()[0], this.center()[1]);\n\t\tctx.lineTo(this.target.center()[0], this.target.center()[1]);\n\t\tctx.strokeStyle = 'red';\n\t\tctx.lineWidth = 2;\n\t\tctx.stroke();\n\t\tthis.phasorCounter++;\n\t\tif (this.phasorCounter > 20) this.phasorCounter = 0;\n\t};\n\n\n\tpower(impulse) {\n\t\tif (impulse > 0 && this.speed < 3) this.speed += impulse;\n\t\telse if (impulse < 0 && this.speed > -1) this.speed += impulse;\n\t};\n\n\n\tfirePhasors(target) {\n\t\tif (this.phasorRecharge === this.phasorRechargeMax) {\n\t\t\tthis.target = target;\n\t\t\tthis.phasorCounter = 1;\n\t\t\tthis.target.receivePhasorHit(this);\n\t\t\tthis.phasorRecharge = 0;\n\t\t}\n\t};\n\n\n\tfireTorpedos(torpImg) {\n\t\tif (this.torpedoReload === this.torpedoReloadMax) {\n\t\t\tthis.torpedos.push(new Torpedo(this.center(), torpImg, this.directionIndex - 1));\n\t\t\tthis.torpedos.push(new Torpedo(this.center(), torpImg, this.directionIndex));\n\t\t\tthis.torpedos.push(new Torpedo(this.center(), torpImg, this.directionIndex + 1));\n\t\t\tthis.torpedoReload = 0;\n\t\t}\n\t}\n\n\n\treceivePhasorHit(attacker) {\n\t\tlet shieldHit = this.whichShieldWasHit(attacker);\n\n\t\tif (this.ssd.getShields()[shieldHit].getHitpoints() > 0 ) \n\t\t\t\t\t\tthis.ssd.getShields()[shieldHit].hit();\n\t};\n\n\n\treceiveTorpHit(attacker) {\n\n\t\tlet shieldHit = this.whichShieldWasHit(attacker);\n\n\t\tif (this.ssd.getShields()[shieldHit].getHitpoints() > 0) \n\t\t\t\t\t\tthis.ssd.getShields()[shieldHit].hit();\n\n\t\tthis.torpExplosionCounter = 1;\n\t};\n\n\n\twhichShieldWasHit(attacker) {\n\t\tlet angle;\n\t\tlet shieldHit;\n\n\t\tconst xDelta = attacker.center()[0] - this.center()[0];\n\t\tconst yDelta = attacker.center()[1] - this.center()[1];\n\n\t\t// find the angle between the 2 objects\n\t\tconst arcTangent = Math.atan(yDelta / xDelta);\n\t\tif (xDelta < 0) angle = arcTangent + Math.PI;\n\t\telse if (xDelta > 0 && yDelta < 0) angle = arcTangent + Math.PI * 2;\n\t\telse angle = arcTangent;\n\n\t\t// take the rotation of the hit ship into account\n\t\tangle -= this.rotationOffset;\n\t\tif (angle < 0) angle += Math.PI * 2;\n\n\t\tif (angle <= .25 * Math.PI || angle >= 1.75 * Math.PI) shieldHit = 0;\n\t\telse if (angle > .25 * Math.PI && angle < .75 * Math.PI) shieldHit = 1;\n\t\telse if (angle >= .75 * Math.PI && angle <= 1.25 * Math.PI) shieldHit = 2;\n\t\telse shieldHit = 3;\n\n\t\treturn shieldHit;\n\t};\n\n\n\tchangeDirection(dir) { \n\t\tthis.rotationOffset += dir*this.increment;\n\t\tif (dir > 0 && this.directionIndex === 35) this.directionIndex = 0;\n\t\telse if (dir < 0 && this.directionIndex === 0) this.directionIndex = 35;\n\t\telse this.directionIndex += dir;\n\n\t\tif (this.rotationOffset > 6.2) this.rotationOffset -= Math.PI *2;\n\t\telse if (this.rotationOffset < -.000000001) this.rotationOffset += Math.PI * 2;\n\n\t\tthis.direction = this.directionArray[this.directionIndex];\n\t\t// console.log(this.rotationOffset*180/Math.PI);\n\t};\n\n\n\tloadExplosionImg() {\n\t\tthis.explosionImg = new Image();\n\t\tthis.explosionImg.onload = () => { return true; }\n\t\tthis.explosionImg.src = \n\t\t\t'../images/explosion-sprite-sheet.png';\n\t};\n\n}\n\nmodule.exports = Ship\n\n\n\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/space_object.js":
/*!*****************************!*\
  !*** ./src/space_object.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass SpaceObject {\n\tconstructor(pos) {\n\t\tthis.pos = pos;\n\n\t\tthis.width;\n\t\tthis.height;\n\n\t\t// this array contains all of the directions (36 of them)\n\t\tthis.directionArray = [\n\t\t\t[7, 0],\n\t\t\t[7, -1],\n\t\t\t[7, -2],\n\t\t\t[6, -3],\n\t\t\t[5, -4],\n\t\t\t[4, -5],\n\t\t\t[3, -6],\n\t\t\t[2, -7],\n\t\t\t[1, -7],\n\t\t\t[0, -7],\n\t\t\t[-1, -7],\n\t\t\t[-2, -7],\n\t\t\t[-3, -6],\n\t\t\t[-4, -5],\n\t\t\t[-5, -4],\n\t\t\t[-6, -3],\n\t\t\t[-7, -2],\n\t\t\t[-7, -1],\n\t\t\t[-7, 0],\n\t\t\t[-7, 1],\n\t\t\t[-7, 2],\n\t\t\t[-6, 3],\n\t\t\t[-5, 4],\n\t\t\t[-4, 5],\n\t\t\t[-3, 6],\n\t\t\t[-2, 7],\n\t\t\t[-1, 7],\n\t\t\t[0, 7],\n\t\t\t[1, 7],\n\t\t\t[2, 7],\n\t\t\t[3, 6],\n\t\t\t[4, 5],\n\t\t\t[5, 4],\n\t\t\t[6, 3],\n\t\t\t[7, 2],\n\t\t\t[7, 1]\n\t\t];\n\t};\n\n\t// shifts to account for main ship movement\n\tshift(direction, speed) {\n\t\tthis.pos[0] -= speed * direction[0];\n\t\tthis.pos[1] += speed * direction[1];\n\t};\n\n\n\tcenter() {\n\t\treturn [this.pos[0] + this.width / 2, this.pos[1] + this.height / 2];\n\t};\n\n}\n\nmodule.exports = SpaceObject\n\n//# sourceURL=webpack:///./src/space_object.js?");

/***/ }),

/***/ "./src/ssd.js":
/*!********************!*\
  !*** ./src/ssd.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Shield = __webpack_require__(/*! ./shield */ \"./src/shield.js\");\n\n// SSD is the ship's systems display in the corner of the screen\nclass SSD {\n\tconstructor(options) {\n\t\tthis.ssd_x = options.ssd_x;\n\t\tthis.ssd_y = options.ssd_y;\n\t\tthis.ssd_width = options.ssd_width;\n\t\tthis.ssd_height = options.ssd_height;\n\t\tthis.imgCoords = options.imgCoords;\n\t\t\n\t\tthis.loadSSDImg(options.imgName);\n\n\t\tthis.shields = [];\n\t\tthis.raiseShields();\n\t}\n\n\n\tgetShields() {\n\t\treturn this.shields;\n\t}\n\n\n\tdraw(ctx, phasorRechargePercent, torpedoReloadPercent) {\n\n\t\tctx.lineWidth = 3;\n\n\t\tctx.drawImage(this.SSDimg, this.imgCoords[0], this.imgCoords[1], this.imgCoords[2], this.imgCoords[3],\n\t\t\tthis.ssd_x,\n\t\t\tthis.ssd_y,\n\t\t\tthis.ssd_width,\n\t\t\tthis.ssd_height);\n\n\t\tctx.beginPath(); \n\n\t\tthis.drawShields(ctx);\n\n\t\t// draw phasor recharge bar\n\t\tthis.drawRechargeBar(ctx, this.ssd_x - 60, phasorRechargePercent);\n\n\t\t// draw torpedo reload\n\t\tthis.drawRechargeBar(ctx, this.ssd_x + this.ssd_width + 50, torpedoReloadPercent);\n\t};\n\n\n\tdrawShields(ctx) {\n\t\tthis.shields.forEach((shield) => shield.draw(ctx))\n\t};\n\n\n\tdrawRechargeBar(ctx, x, percentage) {\n\t\tlet bar_height = this.ssd_height - 6;\n\n\t\tctx.beginPath();\n\t\tctx.rect(x, this.ssd_y, 10, this.ssd_height);\n\t\tctx.strokeStyle = \"grey\";\n\t\tctx.stroke();\n\n\t\tctx.beginPath();\n\t\tif (percentage === 1) ctx.fillStyle = \"green\";\n\t\telse ctx.fillStyle = \"grey\";\n\t\tctx.fillRect(x+3, this.ssd_y + 3 + bar_height*(1-percentage), 4, bar_height*percentage);\n\t}\n\n\n\t// factory method to create shield objects\n\traiseShields() {\n\t\tconst x = this.ssd_x + this.ssd_width / 2;\n\t\tconst y = this.ssd_y + this.ssd_height / 2\n\n\t\t// forward shield\n\t\tthis.shields.push(new Shield({\n\t\t\tpos: [x, y + 25],\n\t\t\tstart: 1.4,\n\t\t\tend: 1.6,\n\t\t\tmultiplier: .1\n\t\t}))\n\n\t\t// starboard shield\n\t\tthis.shields.push(new Shield({\n\t\t\tpos: [x - 30, y + 5],\n\t\t\tstart: 1.8,\n\t\t\tend: 2.2,\n\t\t\tmultiplier: .2\n\t\t}))\n\n\t\t// rear shield\n\t\tthis.shields.push(new Shield({\n\t\t\tpos: [x, y - 23],\n\t\t\tstart: .4,\n\t\t\tend: .6,\n\t\t\tmultiplier: .1,\n\t\t}))\n\n\t\t// port shield\n\t\tthis.shields.push(new Shield({\n\t\t\tpos: [x + 30, y + 5],\n\t\t\tstart: .8,\n\t\t\tend: 1.2,\n\t\t\tmultiplier: .2\n\t\t}))\n\t};\n\n\n\tloadSSDImg(imgName) {\n\t\tthis.SSDimg = new Image();\n\t\tthis.SSDimg.onload = () => { return true; }\n\t\tthis.SSDimg.src = imgName;\n\t};\n}\n\nmodule.exports = SSD;\n\n//# sourceURL=webpack:///./src/ssd.js?");

/***/ }),

/***/ "./src/star.js":
/*!*********************!*\
  !*** ./src/star.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const SpaceObject = __webpack_require__(/*! ./space_object */ \"./src/space_object.js\");\n\nclass Star extends SpaceObject {\n\tconstructor(options){\n\t\tsuper(options.pos);\n\n\t\tthis.radius = options.radius;\n\t\tthis.hue = options.hue;\n\t\tthis.sat = options.sat;\n\t\tthis.canvas_width = options.canvas_width;\n\t\tthis.canvas_height = options.canvas_height;\n\t};\n\n\tdraw(ctx) {\n\t\tctx.beginPath();\n\t\tctx.arc(this.pos[0], this.pos[1], this.radius, 0, 360);\n\t\tctx.fillStyle = \"hsl(\" + this.hue + \", \" + this.sat + \"%, 88%)\";\n\t\tctx.fill();\n\t};\n\t\n\tshift(direction, speed) {\n\t\tsuper.shift(direction, speed);\n\n\t\tif (this.pos[0] > this.canvas_width) this.pos[0] = 0;\n\t\telse if (this.pos[0] < 0) this.pos[0] = this.canvas_width;\n\n\t\tif (this.pos[1] > this.canvas_height) this.pos[1] = 0;\n\t\telse if (this.pos[1] < 0) this.pos[1] = this.canvas_height;\n\t};\n\n}\n\nmodule.exports = Star;\n\n//# sourceURL=webpack:///./src/star.js?");

/***/ }),

/***/ "./src/torpedo.js":
/*!************************!*\
  !*** ./src/torpedo.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const SpaceObject = __webpack_require__(/*! ./space_object */ \"./src/space_object.js\");\n\nclass Torpedo extends SpaceObject {\n\tconstructor(pos, torpImg, directionIndex) {\n\t\tsuper(pos);\n\n\t\tthis.torpImg = torpImg;\n\t\t\n\t\tif (directionIndex === 36) directionIndex = 0;\n\t\telse if (directionIndex === -1) directionIndex = 35;\n\n\t\tthis.direction = this.directionArray[directionIndex];\n\t\tthis.speed = 3;\n\t\tthis.height = 10;\n\t\tthis.width = 10;\n\t};\n\t\n\tdraw(ctx) {\n\t\tctx.drawImage(this.torpImg, 0, 0, 44, 46,\n\t\t\tthis.pos[0],\n\t\t\tthis.pos[1],\n\t\t\tthis.width,\n\t\t\tthis.height);\n\t};\n\n\n\tmove() {\n\t\tthis.pos[0] += this.speed * this.direction[0];\n\t\tthis.pos[1] -= this.speed * this.direction[1];\n\t};\n\n};\n\nmodule.exports = Torpedo;\n\n//# sourceURL=webpack:///./src/torpedo.js?");

/***/ })

/******/ });