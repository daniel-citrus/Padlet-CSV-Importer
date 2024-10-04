/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style/style.css":
/*!*****************************!*\
  !*** ./src/style/style.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://padlet-importing-script/./src/style/style.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/style.css */ \"./src/style/style.css\");\n\r\n\r\nconst API_KEY =\r\n    'pdltp_01d47008663dee1ddceaac8f60c53b8dc2d491f5d1287135c84ab844040d7654026d3f';\r\nconst BOARD_ID = 'ug6iwn6vavccerwj';\r\n\r\ngetBoard(API_KEY, BOARD_ID)\r\n    .then((response) => response.text())\r\n    .then((result) => console.log(result));\r\n\r\nfunction createPostJSON(boardID) {\r\n    return {\r\n        data: {\r\n            type: 'post',\r\n            attributes: {\r\n                content: {\r\n                    subject: `Daniel's API post`,\r\n                    body: 'If you see this, then the API post worked.',\r\n                    attachment: {\r\n                        url: 'https://www.daniel-calvo.com',\r\n                        previewImageUrl:\r\n                            'https://daniel-calvo.com/eb99eca034ccbd4d4368.png',\r\n                        caption: `Daniel's website`,\r\n                    },\r\n                    color: 'orange',\r\n                },\r\n            },\r\n        },\r\n    };\r\n}\r\n\r\n/* \r\n{\r\n            type: 'post',\r\n            attributes: {\r\n                content: {\r\n                    subject: `Daniel's first API post`,\r\n                    body: 'If you see this, then the API post worked.',\r\n                    attachment: {\r\n                        url: 'www.daniel-calvo.com',\r\n                        caption: `Daniel's website`,\r\n                    },\r\n                },\r\n                color: 'orange',\r\n            },\r\n            relationships: {\r\n                section: {\r\n                    data: {\r\n                        id: boardID,\r\n                    },\r\n                },\r\n            },\r\n        }\r\n*/\r\n\r\ninsertPost(API_KEY, BOARD_ID, createPostJSON(BOARD_ID));\r\n\r\nasync function getBoard(API, boardID) {\r\n    const board = await fetch(\r\n        `https://api.padlet.dev/v1/boards/${boardID}?include=posts%2Csections`,\r\n        {\r\n            headers: {\r\n                'X-Api-Key': API,\r\n                accept: 'application/vnd.api+json',\r\n            },\r\n        }\r\n    );\r\n\r\n    return board;\r\n}\r\n\r\nasync function insertPost(API, boardID, post) {\r\n    fetch(`https://api.padlet.dev/v1/boards/${boardID}/posts`, {\r\n        method: 'POST',\r\n        headers: {\r\n            'X-Api-Key': API,\r\n            accept: 'application/vnd.api+json',\r\n            'content-type': 'application/vnd.api+json',\r\n        },\r\n        body: JSON.stringify(post),\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack://padlet-importing-script/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;