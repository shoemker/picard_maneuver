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

/***/ "./src/d7.js":
/*!*******************!*\
  !*** ./src/d7.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nclass D7 extends Ship {\n\tconstructor(options) {\n\t\tsuper(options);\n\n\t\tthis.loadShipImg();\n\n\t}\n\n\n\n\tdraw(ctx) {\n\t\tctx.save();\n\n\t\tthis.rotateCanvas(ctx);\n\n\t\tctx.drawImage(this.shipImg, 0, 0, 380, 275,\n\t\t\tthis.pos[0],\n\t\t\tthis.pos[1],\n\t\t\tthis.width,\n\t\t\tthis.height);\n\n\t\tctx.restore();\n\t}\n\n\n\tloadShipImg() {\n\t\tthis.shipImg = new Image();\n\t\tthis.shipImg.onload = () => { return true; }\n\t\tthis.shipImg.src = '../images/D7.png';\n\n\t}\n\n\n}\n\n\nmodule.exports = D7\n\n//# sourceURL=webpack:///./src/d7.js?");

/***/ }),

/***/ "./src/enterprise.js":
/*!***************************!*\
  !*** ./src/enterprise.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nclass Enterprise extends Ship {\n\tconstructor(options) {\n\t\tsuper(options);\n \n\t\tthis.loadShipImg();\n\t\n\t}\n\n\tcenter() {\n\t\t\n\t}\n\n\tdraw(ctx) {\n\t\tctx.save();\n\n\t\tthis.rotateCanvas(ctx);\n\n\t\tctx.drawImage(this.shipImg, 0, 0, 660, 300,\n\t\t\tthis.pos[0],\n\t\t\tthis.pos[1],\n\t\t\tthis.width,\n\t\t\tthis.height);\n\n\t\tctx.restore();\n\t}\n\n\n\tloadShipImg() {\n\t\tthis.shipImg = new Image();\n\t\tthis.shipImg.onload = () => { return true; }\n\t\tthis.shipImg.src = '../images/enterprise-refit.png';\n\n\t}\n\n}\n\n\nmodule.exports = Enterprise\n\n//# sourceURL=webpack:///./src/enterprise.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const D7 = __webpack_require__(/*! ./d7 */ \"./src/d7.js\");\nconst Enterprise = __webpack_require__(/*! ./enterprise */ \"./src/enterprise.js\");\n\n\nclass Game {\n\n\tconstructor(dim_x, dim_y) {\n\t\tthis.dim_x = dim_x;\n\t\tthis.dim_y = dim_y;\n\n\t}\n\n\taddEnterprise(enterprise){\n\t\tthis.enterprise = enterprise;\n\t}\n\n\taddEnemy(enemy){\n\t\tthis.enemy = enemy\n\t}\n\n\tstep(timeDelta) {\n\t\tthis.moveObjects(timeDelta);\n\t}\n\n\tdraw(ctx){\n\t\tctx.beginPath();\n\t\tctx.clearRect(0, 0, this.dim_x, this.dim_y);\n\t\tctx.fillStyle = \"black\";\n\t\tctx.fillRect(0, 0, this.dim_x, this.dim_y);\n\t\tthis.enterprise.draw(ctx);\n\t\tthis.enemy.draw(ctx);\n\t}\n\n\tmoveObjects(timeDelta) {\n\t\tthis.enterprise.move(timeDelta);\n\t}\n\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const  Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst Enterprise = __webpack_require__(/*! ./enterprise */ \"./src/enterprise.js\");\nconst D7 = __webpack_require__(/*! ./d7 */ \"./src/d7.js\");\n\nclass GameView {\n\n\tconstructor(ctx, width, height) {\n\n\t\tthis.ctx = ctx;\n\t\tthis.game = new Game(width, height);\n\n\t\tthis.game.addEnterprise(new Enterprise({\n\t\t\tpos: [300, 300],\n\t\t\tdirectionIndex: 12\n\t\t}));\n\n\t\tthis.game.addEnemy( new D7({\n\t\t\tpos: [0, 0],\n\t\t\tdirectionIndex: 0\n\t\t}));\n\n\t\tthis.bindKeyHandlers = this.bindKeyHandlers.bind(this);\n\t\n\t}\n\n\tstart() {\n\t\tthis.bindKeyHandlers();\n\n\t\tthis.lastTime = 0;\n\n\t\t// start the animation\n\t\trequestAnimationFrame(this.animate.bind(this));\n\t};\n\n\tanimate(time) {\n\t\tconst timeDelta = time - this.lastTime;\n\t\tthis.game.step(timeDelta);\n\t\tthis.game.draw(this.ctx);\n\n\t\tthis.lastTime = time;\n\n\t\t// every call to animate requests causes another call to animate\n\t\trequestAnimationFrame(this.animate.bind(this));\n\t};\n\t\n\tbindKeyHandlers() {\n\n\t\t// const MOVES = {\n\t\t// \tw: [0, -1],\n\t\t// \ta: [-1, 0],\n\t\t// \ts: [0, 1],\n\t\t// \td: [1, 0],\n\t\t// };\n\n\t\tconst MOVES = {\n\t\t\tw: 1,\n\t\t\ts:-1\n\t\t}\n\n\t\tconst ship = this.game.enterprise;\n\t\tconst enemy = this.game.enemy;\n\n\t\tObject.keys(MOVES).forEach(function (k) {\n\t\t\tconst move = MOVES[k];\n\t\t\tkey(k, function () { ship.power(move); });\n\t\t});\n\n\t\t// key(\"space\", function () { ship.fireBullet(); });\n\t\t\n\t\t//call to rotate ship image\n\t\tkey(\"a\", function () { ship.rotateCC(); });\n\t\tkey(\"d\", function () { ship.rotateCL(); });\n\n\t\tkey(\"j\", function () { enemy.rotateCC(); });\n\t\tkey(\"l\", function () { enemy.rotateCL(); });\n\n\t}\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\n\n// window.MovingObject = MovingObject;\n// console.log(\"Webpack  is working!\")\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n\tconst canvasEl = document.getElementsByTagName(\"canvas\")[0];\n\tcanvasEl.width = 750;\n\n\tcanvasEl.height = 750;\n\n\tconst ctxMain = canvasEl.getContext(\"2d\");\n\n\tlet g = new GameView(ctxMain, canvasEl.width, canvasEl.height);\n\n\n\tg.start(ctxMain);\n\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Ship {\n\tconstructor(options) {\n\n\t\tthis.pos = options.pos;\n\t\n\t\tthis.directionIndex = options.directionIndex;\n\n\t\tthis.vel = 0;\n\t\tthis.width = 50;\n\t\tthis.height = 25\n\n\t\tthis.rotationOffset = 0;\n\t\tthis.increment = Math.PI / 12;\n\t\t\n\n\t\tthis.directionArray = [\n\t\t\t[3,0],\n\t\t\t[3,-1],\n\t\t\t[3,-2],\n\t\t\t[3,-3],\n\t\t\t[2,-3],\n\t\t\t[1,-3],\n\t\t\t[0,-3],\n\t\t\t[-1,-3],\n\t\t\t[-2,-3],\n\t\t\t[-3,-3],\n\t\t\t[-3,-2],\n\t\t\t[-3,-1],\n\t\t\t[-3,0],\n\t\t\t[-3,1],\n\t\t\t[-3,2],\n\t\t\t[-3,3],\n\t\t\t[-2,3],\n\t\t\t[-1,3],\n\t\t\t[0,3],\n\t\t\t[1,3],\n\t\t\t[2,3],\n\t\t\t[3,3],\n\t\t\t[3,2],\n\t\t\t[3,1]\n\t\t];\n\n\t}\n\n\trotateCanvas(ctx) {\n\t\tctx.translate(this.pos[0] + this.width / 2, this.pos[1] + this.height / 2);\n\t\tctx.rotate(this.rotationOffset);\n\t\tctx.translate(-(this.pos[0] + this.width / 2), -(this.pos[1] + this.height / 2));\n\t};\n\t\n\tmove() {\n\n\t\t\tthis.pos[0] += this.vel*this.directionArray[this.directionIndex][0];\n\t\t\tthis.pos[1] += this.vel *this.directionArray[this.directionIndex][1];\n\t\t\tthis.wait = true;\n\n\t\t\n\t};\n\t\n\tpower(impulse) {\n\t\n\t\tthis.vel += impulse;\n\t\t\n\t};\n\n\trotateCC() { \n\t\tthis.rotationOffset -= this.increment;\n\t\tif (this.directionIndex === 23) this.directionIndex = 0;\n\t\telse this.directionIndex++;\n\n\t};\n\n\trotateCL() {\n\t\tthis.rotationOffset += this.increment;\n\t\tif (this.directionIndex === 0) this.directionIndex = 23;\n\t\telse this.directionIndex--;\n\n\t};\n}\n\nmodule.exports = Ship\n\n\n// this.directionArray = [\n// \t[2, 0],\n// \t[2, 1],\n// \t[2, 2],\n// \t[1, 2],\n// \t[0, 2],\n// \t[-1, 2],\n// \t[-2, 2],\n// \t[-2, 1],\n// \t[-2, 0],\n// \t[-2, -1],\n// \t[-2, -2],\n// \t[-1, -2],\n// \t[0, -2],\n// \t[1, -2],\n// \t[2, -2],\n// \t[2, -1]\n// ];\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ })

/******/ });