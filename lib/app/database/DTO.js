"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DTO = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var DTO = /*#__PURE__*/function () {
  //** @var int */
  //** @var string */
  //** @var int */
  //** @var object[] */
  function DTO(httpCode, httpMessage, numberOfResults, data) {
    (0, _classCallCheck2.default)(this, DTO);
    (0, _defineProperty2.default)(this, "httpCode", -1);
    (0, _defineProperty2.default)(this, "httpMessage", "");
    (0, _defineProperty2.default)(this, "numberOfResults", -1);
    (0, _defineProperty2.default)(this, "data", void 0);
    this.httpCode = httpCode;
    this.httpMessage = httpMessage;
    this.numberOfResults = numberOfResults;
    this.data = data;
  }

  (0, _createClass2.default)(DTO, [{
    key: "HttpCode",
    get: function get() {
      return this.httpCode;
    },
    set: function set(httpCode) {
      this.httpCode = httpCode;
    }
  }, {
    key: "HttpMessage",
    get: function get() {
      return this.httpMessage;
    },
    set: function set(httpMessage) {
      this.httpMessage = httpMessage;
    }
  }, {
    key: "NumberOfResults",
    get: function get() {
      return this.numberOfResults;
    },
    set: function set(numberOfResults) {
      this.numberOfResults = numberOfResults;
    }
  }, {
    key: "Data",
    get: function get() {
      return this.data;
    },
    set: function set(data) {
      this.data = data;
    }
  }]);
  return DTO;
}();

exports.DTO = DTO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9EVE8udHMiXSwibmFtZXMiOlsiRFRPIiwiaHR0cENvZGUiLCJodHRwTWVzc2FnZSIsIm51bWJlck9mUmVzdWx0cyIsImRhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztJQUFhQSxHO0FBRVQ7QUFFQTtBQUVBO0FBRUE7QUFHQSxlQUFZQyxRQUFaLEVBQTZCQyxXQUE3QixFQUFpREMsZUFBakQsRUFBeUVDLElBQXpFLEVBQ0E7QUFBQTtBQUFBLG9EQVQwQixDQUFDLENBUzNCO0FBQUEsdURBUDZCLEVBTzdCO0FBQUEsMkRBTGlDLENBQUMsQ0FLbEM7QUFBQTtBQUNJLFNBQUtILFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxTQUFLQyxlQUFMLEdBQXVCQSxlQUF2QjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNIOzs7O1NBRUQsZUFBcUI7QUFDakIsYUFBTyxLQUFLSCxRQUFaO0FBQ0gsSztTQUNELGFBQWFBLFFBQWIsRUFBNkI7QUFDekIsV0FBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDSDs7O1NBRUQsZUFBd0I7QUFDcEIsYUFBTyxLQUFLQyxXQUFaO0FBQ0gsSztTQUNELGFBQWdCQSxXQUFoQixFQUFtQztBQUMvQixXQUFLQSxXQUFMLEdBQW1CQSxXQUFuQjtBQUNIOzs7U0FFRCxlQUE0QjtBQUN4QixhQUFPLEtBQUtDLGVBQVo7QUFDSCxLO1NBQ0QsYUFBb0JBLGVBQXBCLEVBQTJDO0FBQ3ZDLFdBQUtBLGVBQUwsR0FBdUJBLGVBQXZCO0FBQ0g7OztTQUVELGVBQWM7QUFDVixhQUFPLEtBQUtDLElBQVo7QUFDSCxLO1NBQ0QsYUFBU0EsSUFBVCxFQUFrQjtBQUNkLFdBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIERUT1xyXG57XHJcbiAgICAvLyoqIEB2YXIgaW50ICovXHJcbiAgICBwcml2YXRlIGh0dHBDb2RlOm51bWJlciA9IC0xO1xyXG4gICAgLy8qKiBAdmFyIHN0cmluZyAqL1xyXG4gICAgcHJpdmF0ZSBodHRwTWVzc2FnZTpzdHJpbmcgPSBcIlwiO1xyXG4gICAgLy8qKiBAdmFyIGludCAqL1xyXG4gICAgcHJpdmF0ZSBudW1iZXJPZlJlc3VsdHM6bnVtYmVyID0gLTE7XHJcbiAgICAvLyoqIEB2YXIgb2JqZWN0W10gKi9cclxuICAgIHByaXZhdGUgZGF0YTphbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaHR0cENvZGU6bnVtYmVyLCBodHRwTWVzc2FnZTpzdHJpbmcsIG51bWJlck9mUmVzdWx0czpudW1iZXIsIGRhdGE6YW55KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaHR0cENvZGUgPSBodHRwQ29kZTtcclxuICAgICAgICB0aGlzLmh0dHBNZXNzYWdlID0gaHR0cE1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy5udW1iZXJPZlJlc3VsdHMgPSBudW1iZXJPZlJlc3VsdHM7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgSHR0cENvZGUoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENvZGU7XHJcbiAgICB9XHJcbiAgICBzZXQgSHR0cENvZGUoaHR0cENvZGU6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLmh0dHBDb2RlID0gaHR0cENvZGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IEh0dHBNZXNzYWdlKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBNZXNzYWdlO1xyXG4gICAgfVxyXG4gICAgc2V0IEh0dHBNZXNzYWdlKGh0dHBNZXNzYWdlOnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5odHRwTWVzc2FnZSA9IGh0dHBNZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBOdW1iZXJPZlJlc3VsdHMoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtYmVyT2ZSZXN1bHRzO1xyXG4gICAgfVxyXG4gICAgc2V0IE51bWJlck9mUmVzdWx0cyhudW1iZXJPZlJlc3VsdHM6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLm51bWJlck9mUmVzdWx0cyA9IG51bWJlck9mUmVzdWx0cztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgRGF0YSgpOmFueXtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgfVxyXG4gICAgc2V0IERhdGEoZGF0YTphbnkpe1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcbn0iXX0=