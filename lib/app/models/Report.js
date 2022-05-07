"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Report = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Report = /*#__PURE__*/function () {
  function Report(item_id, name, description, quantity, updated_at, state, email) {
    (0, _classCallCheck2.default)(this, Report);
    (0, _defineProperty2.default)(this, "item_id", -1);
    (0, _defineProperty2.default)(this, "name", "");
    (0, _defineProperty2.default)(this, "description", "");
    (0, _defineProperty2.default)(this, "quantity", -1);
    (0, _defineProperty2.default)(this, "updated_at", "");
    (0, _defineProperty2.default)(this, "state", "");
    (0, _defineProperty2.default)(this, "email", "");
    this.item_id = item_id;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.updated_at = updated_at;
    this.state = state;
    this.email = email;
  }

  (0, _createClass2.default)(Report, [{
    key: "Item_id",
    get: function get() {
      return this.item_id;
    },
    set: function set(item_id) {
      this.item_id = item_id;
    }
  }, {
    key: "Name",
    get: function get() {
      return this.name;
    },
    set: function set(name) {
      this.name = name;
    }
  }, {
    key: "Description",
    get: function get() {
      return this.description;
    },
    set: function set(description) {
      this.description = description;
    }
  }, {
    key: "Quantity",
    get: function get() {
      return this.quantity;
    },
    set: function set(quantity) {
      this.quantity = quantity;
    }
  }, {
    key: "Updated_at",
    get: function get() {
      return this.updated_at;
    },
    set: function set(updated_at) {
      this.updated_at = updated_at;
    }
  }, {
    key: "State",
    get: function get() {
      return this.state;
    },
    set: function set(state) {
      this.state = state;
    }
  }, {
    key: "Email",
    get: function get() {
      return this.email;
    },
    set: function set(email) {
      this.email = email;
    }
  }]);
  return Report;
}();

exports.Report = Report;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvUmVwb3J0LnRzIl0sIm5hbWVzIjpbIlJlcG9ydCIsIml0ZW1faWQiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJxdWFudGl0eSIsInVwZGF0ZWRfYXQiLCJzdGF0ZSIsImVtYWlsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7SUFBYUEsTTtBQVVULGtCQUFZQyxPQUFaLEVBQTRCQyxJQUE1QixFQUF5Q0MsV0FBekMsRUFBNkRDLFFBQTdELEVBQThFQyxVQUE5RSxFQUFpR0MsS0FBakcsRUFBK0dDLEtBQS9HLEVBQTRIO0FBQUE7QUFBQSxtREFSbkcsQ0FBQyxDQVFrRztBQUFBLGdEQVB0RyxFQU9zRztBQUFBLHVEQU4vRixFQU0rRjtBQUFBLG9EQUxsRyxDQUFDLENBS2lHO0FBQUEsc0RBSmhHLEVBSWdHO0FBQUEsaURBSHJHLEVBR3FHO0FBQUEsaURBRnJHLEVBRXFHO0FBQ3hILFNBQUtOLE9BQUwsR0FBZUEsT0FBZjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLFNBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNIOzs7O1NBRUQsZUFBb0I7QUFDaEIsYUFBTyxLQUFLTixPQUFaO0FBQ0gsSztTQUNELGFBQVlBLE9BQVosRUFBMkI7QUFDdkIsV0FBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0g7OztTQUVELGVBQWlCO0FBQ2IsYUFBTyxLQUFLQyxJQUFaO0FBQ0gsSztTQUNELGFBQVNBLElBQVQsRUFBcUI7QUFDakIsV0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0g7OztTQUVELGVBQXdCO0FBQ3BCLGFBQU8sS0FBS0MsV0FBWjtBQUNILEs7U0FDRCxhQUFnQkEsV0FBaEIsRUFBbUM7QUFDL0IsV0FBS0EsV0FBTCxHQUFtQkEsV0FBbkI7QUFDSDs7O1NBRUQsZUFBcUI7QUFDakIsYUFBTyxLQUFLQyxRQUFaO0FBQ0gsSztTQUNELGFBQWFBLFFBQWIsRUFBNkI7QUFDekIsV0FBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDSDs7O1NBRUQsZUFBdUI7QUFDbkIsYUFBTyxLQUFLQyxVQUFaO0FBQ0gsSztTQUNELGFBQWVBLFVBQWYsRUFBaUM7QUFDN0IsV0FBS0EsVUFBTCxHQUFrQkEsVUFBbEI7QUFDSDs7O1NBRUQsZUFBa0I7QUFDZCxhQUFPLEtBQUtDLEtBQVo7QUFDSCxLO1NBQ0QsYUFBVUEsS0FBVixFQUF1QjtBQUNuQixXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDSDs7O1NBRUQsZUFBa0I7QUFDZCxhQUFPLEtBQUtDLEtBQVo7QUFDSCxLO1NBQ0QsYUFBVUEsS0FBVixFQUF1QjtBQUNuQixXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBSZXBvcnRcclxue1xyXG4gICAgcHJpdmF0ZSBpdGVtX2lkOm51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBuYW1lOnN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIGRlc2NyaXB0aW9uOnN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIHF1YW50aXR5Om51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVkX2F0OnN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIHN0YXRlOnN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIGVtYWlsOnN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaXRlbV9pZDpudW1iZXIsIG5hbWU6c3RyaW5nLCBkZXNjcmlwdGlvbjpzdHJpbmcsIHF1YW50aXR5Om51bWJlciwgdXBkYXRlZF9hdDpzdHJpbmcsIHN0YXRlOnN0cmluZywgZW1haWw6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLml0ZW1faWQgPSBpdGVtX2lkO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMucXVhbnRpdHkgPSBxdWFudGl0eTtcclxuICAgICAgICB0aGlzLnVwZGF0ZWRfYXQgPSB1cGRhdGVkX2F0O1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICB0aGlzLmVtYWlsID0gZW1haWw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IEl0ZW1faWQoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbV9pZDtcclxuICAgIH1cclxuICAgIHNldCBJdGVtX2lkKGl0ZW1faWQ6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLml0ZW1faWQgPSBpdGVtX2lkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBOYW1lKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAgICB9XHJcbiAgICBzZXQgTmFtZShuYW1lOnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgRGVzY3JpcHRpb24oKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247XHJcbiAgICB9XHJcbiAgICBzZXQgRGVzY3JpcHRpb24oZGVzY3JpcHRpb246c3RyaW5nKXtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFF1YW50aXR5KCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnF1YW50aXR5O1xyXG4gICAgfVxyXG4gICAgc2V0IFF1YW50aXR5KHF1YW50aXR5Om51bWJlcil7XHJcbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IHF1YW50aXR5O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBVcGRhdGVkX2F0KCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZWRfYXQ7XHJcbiAgICB9XHJcbiAgICBzZXQgVXBkYXRlZF9hdCh1cGRhdGVkX2F0OnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy51cGRhdGVkX2F0ID0gdXBkYXRlZF9hdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgU3RhdGUoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XHJcbiAgICB9XHJcbiAgICBzZXQgU3RhdGUoc3RhdGU6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IEVtYWlsKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVtYWlsO1xyXG4gICAgfVxyXG4gICAgc2V0IEVtYWlsKGVtYWlsOnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5lbWFpbCA9IGVtYWlsO1xyXG4gICAgfVxyXG59Il19