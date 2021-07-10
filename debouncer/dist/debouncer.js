"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var $ = function (query, $el) {
    if ($el === void 0) { $el = document; }
    var $result = $el.querySelector(query);
    if (!$result)
        throw '검색 대상이 없습니다';
    return $result;
};
// const $text = $('#text');
// const $message = $('#message');
// let number = 0;
/**기본 코드
 * input tag에 값이 입력되면 그 값을 message에 적용
 * number + 1한 결과를 number에 저장
 * number를 출력
 * */
// $text.addEventListener('input', (e) => {
//   const $currentTarget = <HTMLInputElement>e.currentTarget;
//   if (!$currentTarget) throw 'event target이 없습니다';
//   $message.innerHTML = $currentTarget.value;
//   number = number + 1;
//   console.log(number);
// });
/** debounce 적용
 * input tag에 값이 입력되면 그 값을 message에 적용
 * 단, 입력중엔 적용하지 않고, 마지막 입력하고 1초 후 실행
 */
// let timer: number | undefined = undefined;
// $text.addEventListener('input', (e) => {
//   const $currentTarget = <HTMLInputElement>e.currentTarget;
//   if (!$currentTarget) throw 'event target이 없습니다';
//   if (timer) {
//     clearTimeout(timer);
//   }
//   timer = setTimeout(() => {
//     $message.innerHTML = $currentTarget.value;
//     number = number + 1;
//     console.log(number);
//   }, 1000);
// });
/** debouncer 모듈화 */
// const debouncer = () => {
//   let timer: number | undefined = undefined;
//   return (callback: TimerHandler, timeout: number = 0, ...params: any[]) => {
//     if (timer) clearTimeout(timer);
//     timer = setTimeout(callback, timeout, ...params);
//   };
// };
// const timeout = debouncer();
// $text.addEventListener('input', (e) => {
//   const $currentTarget = <HTMLInputElement>e.currentTarget;
//   if (!$currentTarget) throw 'event target이 없습니다';
//   timeout(() => {
//     $message.innerHTML = $currentTarget.value;
//     number = number + 1;
//     console.log(number);
//   }, 1000);
// });
/** return 값을 넘겨받을 수 있도록 개선 */
var debouncer = function () {
    var timer = undefined;
    return function (callback, timeout) {
        if (timeout === void 0) { timeout = 0; }
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        if (timer)
            clearTimeout(timer);
        return new Promise(function (resolve) {
            timer = setTimeout(function () {
                resolve(callback.apply(void 0, params));
            }, timeout);
        });
    };
};
var $text = $('#text');
var $message = $('#message');
var number = 0;
var timeout = debouncer();
$text.addEventListener('input', function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var $currentTarget;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                $currentTarget = e.currentTarget;
                if (!$currentTarget)
                    throw 'event target이 없습니다';
                return [4 /*yield*/, timeout(function (value) {
                        $message.innerHTML = $currentTarget.value;
                        return value + 1;
                    }, 1000, number)];
            case 1:
                number = _a.sent();
                console.log(number);
                return [2 /*return*/];
        }
    });
}); });
var $id = $('#id');
var $age = $('#age');
var Validator = function () {
    var validMap = new Map();
    var addValid = function (target, item) {
        var _a;
        if (!validMap.has(target)) {
            validMap.set(target, []);
        }
        (_a = validMap.get(target)) === null || _a === void 0 ? void 0 : _a.push(item);
    };
    var checkValid = function (target) {
        var items = validMap.get(target);
        if (!items)
            throw new Error('target이 없습니다');
        var index = items.findIndex(function (item) {
            if (typeof item.condition === 'function') {
                return item.condition() !== item.match;
            }
            else {
                return item.condition.test(target.value) !== item.match;
            }
        });
        return { index: index, item: items[index] };
    };
    return { addValid: addValid, checkValid: checkValid };
};
var _a = Validator(), addValid = _a.addValid, checkValid = _a.checkValid;
addValid($id, { condition: /[a-z]+/, match: true });
addValid($age, { condition: /[0-9]/g, match: true });
var inputDebouncer = debouncer();
var idInputHandler = function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, index, item;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, inputDebouncer(checkValid, 300, e.currentTarget)];
            case 1:
                _a = _b.sent(), index = _a.index, item = _a.item;
                $message.innerHTML = "id\uAC00 " + (index < 0 ? '정상입니다' : '잘못됐습니다');
                console.log(index);
                return [2 /*return*/];
        }
    });
}); };
$id.addEventListener('input', idInputHandler);
$age.addEventListener('input', function (e) { return console.log(checkValid(e.currentTarget)); });
