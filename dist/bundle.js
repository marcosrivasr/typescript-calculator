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
    Operator[Operator["Multiplication"] = 3] = "Multiplication";
    Operator[Operator["division"] = 4] = "division";
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
        var result = 0;
        var items = this.normalize(this._input.split(''));
        console.log('items', items);
        console.log('posfix', this.toPosfix(items));
        return result;
    };
    /*
    *
    Read all the symbols one by one from left to right in the given Infix Expression.
    If the reading symbol is operand, then directly print it to the result (Output).
    If the reading symbol is left parenthesis '(', then Push it on to the Stack.
    If the reading symbol is right parenthesis ')', then Pop all the contents of stack until respective left parenthesis
        is poped and print each poped symbol to the result.
    If the reading symbol is operator (+ , - , * , / etc.,), then Push it on to the Stack. However,
        first pop the operators which are already on the stack that have higher or equal precedence
        than current operator and print them to the result.
        http://btechsmartclass.com/data_structures/infix-to-postfix.html
    */
    Calculator.prototype.toPosfix = function (list) {
        var output = [];
        var stack = [];
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (this.isNumber(item)) {
                output.push(item);
            }
            else if (item === '(') {
                stack.unshift(item);
            }
            else if (item === ')') {
                //pop all the contents of stack until left parenthesis is poped
                var itemStack = stack.shift();
                while (itemStack != '(') {
                    output.push(itemStack);
                    itemStack = stack.shift();
                }
            }
            else if (this.isOperator(item)) {
                if (this.isEmpty(stack)) {
                    stack.unshift(item);
                }
                else {
                    while (stack.length > 0) {
                        if (this.getPrecedence(item) === this.getPrecedence(stack[0])) {
                            if (item === '-' && stack[0] === '+') {
                                output.push(stack.shift());
                            }
                        }
                        else if (this.getPrecedence(item) > this.getPrecedence(stack[0])) {
                            break;
                        }
                        else if (this.getPrecedence(item) < this.getPrecedence(stack[0])) {
                            output.push(stack.shift());
                        }
                    }
                    stack.unshift(item);
                }
            }
            else {
                throw new Error("Symbol '" + item + "' not identified");
            }
        }
        while (stack.length > 0) {
            output.push(stack.shift());
        }
        return output;
    };
    Calculator.prototype.getPrecedence = function (item) {
        switch (item) {
            case '+':
                return 1;
                break;
            case '-':
                return 1;
                break;
            case '*':
                return 2;
                break;
            case '/':
                return 3;
                break;
            default:
                return 0;
        }
    };
    Calculator.prototype.isEmpty = function (array) {
        return array.length === 0;
    };
    Calculator.prototype.isOperator = function (item) {
        if (item === '+' || item === '-' || item === '*' || item === '/')
            return true;
        return false;
    };
    Calculator.prototype.isNumber = function (value) {
        return !isNaN(Number(value));
    };
    Calculator.prototype.normalize = function (items) {
        var res = [];
        var item = '';
        var number = 0;
        var multiplier = 1;
        var digit = false;
        while (items.length > 0) {
            item = items.pop();
            //console.log(item);
            if (this.isNumber(item)) {
                //console.log('   = es numero');
                digit = true;
                number = Number(item) * multiplier;
                multiplier *= 10;
                //console.log('   = number:', number);
            }
            else if (item === '+' || item === '-' || item === '*' || item === '/' || item === '(' || item === ')') {
                //console.log('   = es una operacion');
                if (digit) {
                    //console.log('   = primero guardo el número ', number);
                    res.unshift(String(number));
                    digit = false;
                    number = 0;
                    multiplier = 1;
                    //console.log('   = ahora añado el operador ', item);
                    res.unshift(item);
                    //console.log('res: ', res);
                }
                else {
                    //console.log('   = no hay número guardado, se añade el operador ', item);
                    res.unshift(item);
                }
            }
        }
        return res;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbGN1bGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxJQUFLLFFBT0o7QUFQRCxXQUFLLFFBQVE7SUFDVCx5Q0FBSztJQUNMLHFDQUFHO0lBQ0gsdURBQVk7SUFDWiwyREFBYztJQUNkLCtDQUFRO0FBRVosQ0FBQyxFQVBJLFFBQVEsS0FBUixRQUFRLFFBT1o7QUFBQSxDQUFDO0FBQ0YsSUFBSyxJQUdKO0FBSEQsV0FBSyxJQUFJO0lBQ0wsK0JBQUk7SUFDSixpQ0FBSztBQUNULENBQUMsRUFISSxJQUFJLEtBQUosSUFBSSxRQUdSO0FBQUEsQ0FBQztBQUNGO0lBS0ksb0JBQVksS0FBa0I7UUFBbEIsa0NBQWtCO1FBQzFC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Q0o7U0FDSjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQztBQUVELGtCQUFlLFVBQVUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUsxQixtR0FBc0M7QUFFdEMsSUFBTSxLQUFLLEdBQXVDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbkYsSUFBTSxLQUFLLEdBQXNDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDaEYsSUFBTSxNQUFNLEdBQTRCLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFMUUsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxXQUFDO0lBQzdCLElBQU0sR0FBRyxHQUFjLElBQUksb0JBQVUsQ0FBQyxLQUFLLENBQUMsS0FBTyxDQUFDLENBQUM7SUFDckQsTUFBTSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDN0MsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJlbnVtIE9wZXJhdG9yIHtcclxuICAgIEVtcHR5LFxyXG4gICAgU3VtLFxyXG4gICAgU3Vic3RyYWN0aW9uLFxyXG4gICAgTXVsdGlwbGljYXRpb24sXHJcbiAgICBkaXZpc2lvblxyXG5cclxufTtcclxuZW51bSBTaWRle1xyXG4gICAgTGVmdCxcclxuICAgIFJpZ2h0XHJcbn07XHJcbmNsYXNzIENhbGN1bGF0b3J7XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5wdXQ6c3RyaW5nO1xyXG4gICAgXHJcblxyXG4gICAgY29uc3RydWN0b3IoaW5wdXQ6IHN0cmluZyA9ICcnKXtcclxuICAgICAgICB0aGlzLl9pbnB1dCA9IGlucHV0LnRyaW0oKS5yZXBsYWNlKCcgJywgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzb2x2ZSgpOiBudW1iZXJ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2lucHV0ID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ05vdCB2YWx1ZSBwcm92aWRlZCcpO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBsZXQgcmVzdWx0Om51bWJlciAgID0gMDtcclxuICAgICAgICBsZXQgaXRlbXM6IHN0cmluZ1tdID0gdGhpcy5ub3JtYWxpemUodGhpcy5faW5wdXQuc3BsaXQoJycpKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnaXRlbXMnLCBpdGVtcyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3Bvc2ZpeCcsdGhpcy50b1Bvc2ZpeChpdGVtcykpO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAqXHJcbiAgICBSZWFkIGFsbCB0aGUgc3ltYm9scyBvbmUgYnkgb25lIGZyb20gbGVmdCB0byByaWdodCBpbiB0aGUgZ2l2ZW4gSW5maXggRXhwcmVzc2lvbi5cclxuICAgIElmIHRoZSByZWFkaW5nIHN5bWJvbCBpcyBvcGVyYW5kLCB0aGVuIGRpcmVjdGx5IHByaW50IGl0IHRvIHRoZSByZXN1bHQgKE91dHB1dCkuXHJcbiAgICBJZiB0aGUgcmVhZGluZyBzeW1ib2wgaXMgbGVmdCBwYXJlbnRoZXNpcyAnKCcsIHRoZW4gUHVzaCBpdCBvbiB0byB0aGUgU3RhY2suXHJcbiAgICBJZiB0aGUgcmVhZGluZyBzeW1ib2wgaXMgcmlnaHQgcGFyZW50aGVzaXMgJyknLCB0aGVuIFBvcCBhbGwgdGhlIGNvbnRlbnRzIG9mIHN0YWNrIHVudGlsIHJlc3BlY3RpdmUgbGVmdCBwYXJlbnRoZXNpcyBcclxuICAgICAgICBpcyBwb3BlZCBhbmQgcHJpbnQgZWFjaCBwb3BlZCBzeW1ib2wgdG8gdGhlIHJlc3VsdC5cclxuICAgIElmIHRoZSByZWFkaW5nIHN5bWJvbCBpcyBvcGVyYXRvciAoKyAsIC0gLCAqICwgLyBldGMuLCksIHRoZW4gUHVzaCBpdCBvbiB0byB0aGUgU3RhY2suIEhvd2V2ZXIsIFxyXG4gICAgICAgIGZpcnN0IHBvcCB0aGUgb3BlcmF0b3JzIHdoaWNoIGFyZSBhbHJlYWR5IG9uIHRoZSBzdGFjayB0aGF0IGhhdmUgaGlnaGVyIG9yIGVxdWFsIHByZWNlZGVuY2UgXHJcbiAgICAgICAgdGhhbiBjdXJyZW50IG9wZXJhdG9yIGFuZCBwcmludCB0aGVtIHRvIHRoZSByZXN1bHQuXHJcbiAgICAgICAgaHR0cDovL2J0ZWNoc21hcnRjbGFzcy5jb20vZGF0YV9zdHJ1Y3R1cmVzL2luZml4LXRvLXBvc3RmaXguaHRtbFxyXG4gICAgKi9cclxuXHJcbiAgICBwcml2YXRlIHRvUG9zZml4KGxpc3Q6c3RyaW5nW10pOiBzdHJpbmdbXXtcclxuICAgICAgICBsZXQgb3V0cHV0OnN0cmluZ1tdID0gW107XHJcbiAgICAgICAgbGV0IHN0YWNrOnN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBsaXN0W2ldO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5pc051bWJlcihpdGVtKSl7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoaXRlbSA9PT0gJygnKXtcclxuICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoaXRlbSk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGl0ZW0gPT09ICcpJyl7XHJcbiAgICAgICAgICAgICAgICAvL3BvcCBhbGwgdGhlIGNvbnRlbnRzIG9mIHN0YWNrIHVudGlsIGxlZnQgcGFyZW50aGVzaXMgaXMgcG9wZWRcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtU3RhY2s6c3RyaW5nID0gPHN0cmluZz5zdGFjay5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUoaXRlbVN0YWNrICE9ICcoJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goaXRlbVN0YWNrKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtU3RhY2sgPSA8c3RyaW5nPnN0YWNrLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaXNPcGVyYXRvcihpdGVtKSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzRW1wdHkoc3RhY2spKXtcclxuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUoc3RhY2subGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCB0aGlzLmdldFByZWNlZGVuY2UoaXRlbSkgPT09IHRoaXMuZ2V0UHJlY2VkZW5jZShzdGFja1swXSkgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0gPT09ICctJyAmJiBzdGFja1swXSA9PT0gJysnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCg8c3RyaW5nPnN0YWNrLnNoaWZ0KCkpOyAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoIHRoaXMuZ2V0UHJlY2VkZW5jZShpdGVtKSA+IHRoaXMuZ2V0UHJlY2VkZW5jZShzdGFja1swXSkgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZiggdGhpcy5nZXRQcmVjZWRlbmNlKGl0ZW0pIDwgdGhpcy5nZXRQcmVjZWRlbmNlKHN0YWNrWzBdKSApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goPHN0cmluZz5zdGFjay5zaGlmdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgU3ltYm9sICcke2l0ZW19JyBub3QgaWRlbnRpZmllZGApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aGlsZShzdGFjay5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgb3V0cHV0LnB1c2goPHN0cmluZz5zdGFjay5zaGlmdCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRQcmVjZWRlbmNlKGl0ZW06c3RyaW5nKTpudW1iZXJ7XHJcbiAgICAgICAgc3dpdGNoKGl0ZW0pe1xyXG4gICAgICAgICAgICBjYXNlICcrJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnLSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJyonOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICcvJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAzO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzRW1wdHk8VD4oYXJyYXk6VFtdKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiBhcnJheS5sZW5ndGggPT09IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc09wZXJhdG9yKGl0ZW06c3RyaW5nKTpib29sZWFue1xyXG4gICAgICAgIGlmKGl0ZW0gPT09ICcrJyB8fCBpdGVtID09PSAnLScgfHwgaXRlbSA9PT0gJyonIHx8IGl0ZW0gPT09ICcvJykgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgaXNOdW1iZXIodmFsdWU6c3RyaW5nKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiAhaXNOYU4oTnVtYmVyKHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBub3JtYWxpemUoaXRlbXM6c3RyaW5nW10pOnN0cmluZ1tde1xyXG4gICAgICAgIGxldCByZXM6c3RyaW5nW10gPSBbXTtcclxuICAgICAgICBsZXQgaXRlbTpzdHJpbmcgPSAnJztcclxuICAgICAgICBsZXQgbnVtYmVyOm51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IG11bHRpcGxpZXI6bnVtYmVyID0gMTtcclxuICAgICAgICBsZXQgZGlnaXQ6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICB3aGlsZShpdGVtcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgaXRlbSA9IGl0ZW1zLnBvcCgpIGFzIHN0cmluZztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coaXRlbSk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLmlzTnVtYmVyKGl0ZW0pKXtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJyAgID0gZXMgbnVtZXJvJyk7XHJcbiAgICAgICAgICAgICAgICBkaWdpdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBudW1iZXIgPSBOdW1iZXIoaXRlbSkgKiBtdWx0aXBsaWVyO1xyXG4gICAgICAgICAgICAgICAgbXVsdGlwbGllciAqPSAxMDtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJyAgID0gbnVtYmVyOicsIG51bWJlcik7XHJcblxyXG4gICAgICAgICAgICB9ZWxzZSBpZihpdGVtID09PSAnKycgfHwgaXRlbSA9PT0gJy0nIHx8IGl0ZW0gPT09ICcqJyB8fCBpdGVtID09PSAnLycgfHwgaXRlbSA9PT0gJygnIHx8IGl0ZW0gPT09ICcpJyl7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCcgICA9IGVzIHVuYSBvcGVyYWNpb24nKTtcclxuICAgICAgICAgICAgICAgIGlmKGRpZ2l0KXtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCcgICA9IHByaW1lcm8gZ3VhcmRvIGVsIG7Dum1lcm8gJywgbnVtYmVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXMudW5zaGlmdChTdHJpbmcobnVtYmVyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlnaXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJyAgID0gYWhvcmEgYcOxYWRvIGVsIG9wZXJhZG9yICcsIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy51bnNoaWZ0KGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3JlczogJywgcmVzKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJyAgID0gbm8gaGF5IG7Dum1lcm8gZ3VhcmRhZG8sIHNlIGHDsWFkZSBlbCBvcGVyYWRvciAnLCBpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICByZXMudW5zaGlmdChpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYWxjdWxhdG9yOyIsImltcG9ydCBDYWxjdWxhdG9yIGZyb20gJy4vY2FsY3VsYXRvcic7XHJcblxyXG5jb25zdCBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dCcpO1xyXG5jb25zdCBzb2x2ZTpIVE1MSW5wdXRFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bicpO1xyXG5jb25zdCByZXN1bHQ6SFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdCcpO1xyXG5cclxuc29sdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgIGNvbnN0IGFwcDpDYWxjdWxhdG9yID0gbmV3IENhbGN1bGF0b3IoaW5wdXQudmFsdWUhISk7XHJcbiAgICByZXN1bHQudGV4dENvbnRlbnQgPSBTdHJpbmcoYXBwLnNvbHZlKCkpO1xyXG59KTsiXSwic291cmNlUm9vdCI6IiJ9