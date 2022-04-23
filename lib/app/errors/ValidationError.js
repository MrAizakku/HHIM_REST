"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ValidationError = /*#__PURE__*/function (_Error) {
  (0, _inherits2.default)(ValidationError, _Error);

  var _super = _createSuper(ValidationError);

  function ValidationError(message, validationErrors) {
    var _this;

    (0, _classCallCheck2.default)(this, ValidationError);
    _this = _super.call(this, message);
    _this.validationErrors = validationErrors;
    _this.name = 'ValidationError';
    return _this;
  }

  return (0, _createClass2.default)(ValidationError);
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9lcnJvcnMvVmFsaWRhdGlvbkVycm9yLnRzIl0sIm5hbWVzIjpbIlZhbGlkYXRpb25FcnJvciIsIm1lc3NhZ2UiLCJ2YWxpZGF0aW9uRXJyb3JzIiwibmFtZSIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFNQSxlOzs7OztBQUNGLDJCQUFZQyxPQUFaLEVBQXlCQyxnQkFBekIsRUFBK0M7QUFBQTs7QUFBQTtBQUM3Qyw4QkFBTUQsT0FBTjtBQUNBLFVBQUtDLGdCQUFMLEdBQXdCQSxnQkFBeEI7QUFDQSxVQUFLQyxJQUFMLEdBQVksaUJBQVo7QUFINkM7QUFJOUM7OzsrQ0FMeUJDLEsiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBWYWxpZGF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlOmFueSwgdmFsaWRhdGlvbkVycm9yczphbnkpIHtcclxuICAgICAgc3VwZXIobWVzc2FnZSk7XHJcbiAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9ycyA9IHZhbGlkYXRpb25FcnJvcnM7XHJcbiAgICAgIHRoaXMubmFtZSA9ICdWYWxpZGF0aW9uRXJyb3InXHJcbiAgICB9XHJcbiAgfSJdfQ==