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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/calculator.ts":
/*!***************************!*\
  !*** ./src/calculator.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Operator;
(function (Operator) {
    Operator[Operator["Empty"] = 0] = "Empty";
    Operator[Operator["Sum"] = 1] = "Sum";
    Operator[Operator["Substraction"] = 2] = "Substraction";
    Operator[Operator["Multiplier"] = 3] = "Multiplier";
})(Operator || (Operator = {}));
;
var Side;
(function (Side) {
    Side[Side["Left"] = 0] = "Left";
    Side[Side["Right"] = 1] = "Right";
})(Side || (Side = {}));
;
var Calculator = /** @class */ (function () {
    function Calculator(input) {
        if (input === void 0) { input = ''; }
        this._input = input.trim().replace(' ', '');
    }
    Calculator.prototype.solve = function () {
        if (this._input === null)
            throw new Error('Not value provided');
        var items = this._input.split('');
        var number1 = 0;
        var number2 = 0;
        var multiplier = 1;
        var operation = Operator.Empty;
        var side = Side.Right;
        var result = 0;
        while (items.length != 0) {
            var item = items.pop();
            if (this.isNumber(item)) { //its a number
                if (side === Side.Right) {
                    number1 += (Number(item) * multiplier);
                }
                else {
                    number2 += (Number(item) * multiplier);
                }
                multiplier *= 10;
            }
            else { // it's an operator
                if (operation != Operator.Empty) { //operation pending
                    var partial = this.solvePartial(number1, number2, operation);
                    number1 = partial;
                    number2 = 0;
                    side = Side.Left;
                    operation = this.getOperator(item);
                }
                else {
                    operation = this.getOperator(item);
                    if (side === Side.Right) {
                        side = Side.Left;
                    }
                    else {
                        side = Side.Right;
                    }
                }
                multiplier = 1;
            }
        }
        result = this.solvePartial(number1, number2, operation);
        return result;
    };
    Calculator.prototype.solvePartial = function (number1, number2, operation) {
        switch (operation) {
            case Operator.Sum:
                return number1 + number2;
                break;
            case Operator.Substraction:
                return number2 - number1;
                break;
            case Operator.Multiplier:
                return number1 * number2;
                break;
            default:
                return 0;
        }
    };
    Calculator.prototype.getOperator = function (item) {
        switch (item) {
            case '+':
                return Operator.Sum;
                break;
            case '-':
                return Operator.Substraction;
                break;
            case '*':
                return Operator.Multiplier;
                break;
            default:
                throw new Error("Symbol '" + item + "' not recognized");
        }
    };
    Calculator.prototype.isNumber = function (value) {
        return !isNaN(Number(value));
    };
    return Calculator;
}());
exports.default = Calculator;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var calculator_1 = __importDefault(__webpack_require__(/*! ./calculator */ "./src/calculator.ts"));
var input = document.querySelector('#input');
var solve = document.querySelector('#btn');
var result = document.querySelector('#result');
solve.addEventListener('click', function (e) {
    var app = new calculator_1.default(input.value);
    result.textContent = String(app.solve());
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbGN1bGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxJQUFLLFFBS0o7QUFMRCxXQUFLLFFBQVE7SUFDVCx5Q0FBSztJQUNMLHFDQUFHO0lBQ0gsdURBQVk7SUFDWixtREFBVTtBQUNkLENBQUMsRUFMSSxRQUFRLEtBQVIsUUFBUSxRQUtaO0FBQUEsQ0FBQztBQUNGLElBQUssSUFHSjtBQUhELFdBQUssSUFBSTtJQUNMLCtCQUFJO0lBQ0osaUNBQUs7QUFDVCxDQUFDLEVBSEksSUFBSSxLQUFKLElBQUksUUFHUjtBQUFBLENBQUM7QUFDRjtJQUtJLG9CQUFZLEtBQWtCO1FBQWxCLGtDQUFrQjtRQUMxQixJQUFJLENBQUMs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LElBQUksRUFBQztZQUNSLEtBQUssR0FBRztnQkFDSixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUM7Z0JBQ3BCLE1BQU07WUFDVixLQUFLLEdBQUc7Z0JBQ0osT0FBTyxRQUFRLENBQUMsWUFBWSxDQUFDO2dCQUM3QixNQUFNO1lBQ1YsS0FBSyxHQUFHO2dCQUNKLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQztnQkFDM0IsTUFBTTtZQUNWO2dCQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsYUFBVyxJQUFJLHFCQUFrQixDQUFDLENBQUM7U0FDMUQ7SUFDTCxDQUFDO0lBRU8sNkJBQVEsR0FBaEIsVUFBaUIsS0FBWTtRQUN6QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUM7QUFFRCxrQkFBZSxVQUFVLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RHMUIsbUdBQXNDO0FBRXRDLElBQU0sS0FBSyxHQUF1QyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ25GLElBQU0sS0FBSyxHQUFzQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2hGLElBQU0sTUFBTSxHQUE0QixRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRTFFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsV0FBQztJQUM3QixJQUFNLEdBQUcsR0FBYyxJQUFJLG9CQUFVLENBQUMsS0FBSyxDQUFDLEtBQU8sQ0FBQyxDQUFDO0lBQ3JELE1BQU0sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQzdDLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZW51bSBPcGVyYXRvciB7XHJcbiAgICBFbXB0eSxcclxuICAgIFN1bSxcclxuICAgIFN1YnN0cmFjdGlvbixcclxuICAgIE11bHRpcGxpZXJcclxufTtcclxuZW51bSBTaWRle1xyXG4gICAgTGVmdCxcclxuICAgIFJpZ2h0XHJcbn07XHJcbmNsYXNzIENhbGN1bGF0b3J7XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5wdXQ6c3RyaW5nO1xyXG4gICAgXHJcblxyXG4gICAgY29uc3RydWN0b3IoaW5wdXQ6IHN0cmluZyA9ICcnKXtcclxuICAgICAgICB0aGlzLl9pbnB1dCA9IGlucHV0LnRyaW0oKS5yZXBsYWNlKCcgJywgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzb2x2ZSgpOiBudW1iZXJ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2lucHV0ID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ05vdCB2YWx1ZSBwcm92aWRlZCcpO1xyXG5cclxuICAgICAgICBsZXQgaXRlbXM6IHN0cmluZ1tdICAgICA9IHRoaXMuX2lucHV0LnNwbGl0KCcnKTtcclxuICAgICAgICBsZXQgbnVtYmVyMTpudW1iZXIgICAgICA9IDA7XHJcbiAgICAgICAgbGV0IG51bWJlcjI6bnVtYmVyICAgICAgPSAwO1xyXG4gICAgICAgIGxldCBtdWx0aXBsaWVyOm51bWJlciAgID0gMTtcclxuICAgICAgICBsZXQgb3BlcmF0aW9uOk9wZXJhdG9yICA9IE9wZXJhdG9yLkVtcHR5O1xyXG4gICAgICAgIGxldCBzaWRlOlNpZGUgICAgICAgICAgID0gU2lkZS5SaWdodDtcclxuICAgICAgICBsZXQgcmVzdWx0Om51bWJlciAgICAgICA9IDA7XHJcblxyXG4gICAgICAgIHdoaWxlKGl0ZW1zLmxlbmd0aCAhPSAwKXtcclxuICAgICAgICAgICAgY29uc3QgaXRlbTpzdHJpbmcgPSBpdGVtcy5wb3AoKSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5pc051bWJlcihpdGVtKSl7IC8vaXRzIGEgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICBpZihzaWRlID09PSBTaWRlLlJpZ2h0KXtcclxuICAgICAgICAgICAgICAgICAgICBudW1iZXIxICs9IChOdW1iZXIoaXRlbSkgKiBtdWx0aXBsaWVyKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG51bWJlcjIgKz0gKE51bWJlcihpdGVtKSAqIG11bHRpcGxpZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbXVsdGlwbGllciAqPSAxMDtcclxuICAgICAgICAgICAgfWVsc2V7IC8vIGl0J3MgYW4gb3BlcmF0b3JcclxuICAgICAgICAgICAgICAgIGlmKG9wZXJhdGlvbiAhPSBPcGVyYXRvci5FbXB0eSl7IC8vb3BlcmF0aW9uIHBlbmRpbmdcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0aWFsID0gdGhpcy5zb2x2ZVBhcnRpYWwobnVtYmVyMSwgbnVtYmVyMiwgb3BlcmF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBudW1iZXIxID0gcGFydGlhbDtcclxuICAgICAgICAgICAgICAgICAgICBudW1iZXIyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBzaWRlICAgID0gU2lkZS5MZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbiA9IHRoaXMuZ2V0T3BlcmF0b3IoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb24gPSB0aGlzLmdldE9wZXJhdG9yKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNpZGUgPT09IFNpZGUuUmlnaHQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlID0gU2lkZS5MZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlID0gU2lkZS5SaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgICAgICAgICAgbXVsdGlwbGllciA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5zb2x2ZVBhcnRpYWwobnVtYmVyMSwgbnVtYmVyMiwgb3BlcmF0aW9uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNvbHZlUGFydGlhbChudW1iZXIxOm51bWJlciwgbnVtYmVyMjpudW1iZXIsIG9wZXJhdGlvbjpPcGVyYXRvcik6IG51bWJlcntcclxuICAgICAgICBzd2l0Y2gob3BlcmF0aW9uKXtcclxuICAgICAgICAgICAgY2FzZSBPcGVyYXRvci5TdW06XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVtYmVyMSArIG51bWJlcjI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE9wZXJhdG9yLlN1YnN0cmFjdGlvbjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBudW1iZXIyIC0gbnVtYmVyMTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgT3BlcmF0b3IuTXVsdGlwbGllcjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBudW1iZXIxICogbnVtYmVyMjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRPcGVyYXRvcihpdGVtOnN0cmluZyk6T3BlcmF0b3J7XHJcbiAgICAgICAgc3dpdGNoKGl0ZW0pe1xyXG4gICAgICAgICAgICBjYXNlICcrJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBPcGVyYXRvci5TdW07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnLSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT3BlcmF0b3IuU3Vic3RyYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJyonOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9wZXJhdG9yLk11bHRpcGxpZXI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgU3ltYm9sICcke2l0ZW19JyBub3QgcmVjb2duaXplZGApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTnVtYmVyKHZhbHVlOnN0cmluZyk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gIWlzTmFOKE51bWJlcih2YWx1ZSkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYWxjdWxhdG9yOyIsImltcG9ydCBDYWxjdWxhdG9yIGZyb20gJy4vY2FsY3VsYXRvcic7XHJcblxyXG5jb25zdCBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dCcpO1xyXG5jb25zdCBzb2x2ZTpIVE1MSW5wdXRFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bicpO1xyXG5jb25zdCByZXN1bHQ6SFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdCcpO1xyXG5cclxuc29sdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgIGNvbnN0IGFwcDpDYWxjdWxhdG9yID0gbmV3IENhbGN1bGF0b3IoaW5wdXQudmFsdWUhISk7XHJcbiAgICByZXN1bHQudGV4dENvbnRlbnQgPSBTdHJpbmcoYXBwLnNvbHZlKCkpO1xyXG59KTsiXSwic291cmNlUm9vdCI6IiJ9