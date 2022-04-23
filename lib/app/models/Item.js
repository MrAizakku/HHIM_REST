"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Item = /*#__PURE__*/function () {
  function Item(id, name, description, quantity, household_id, donation_flag, created_at, updated_at) {
    (0, _classCallCheck2.default)(this, Item);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "name", "");
    (0, _defineProperty2.default)(this, "description", "");
    (0, _defineProperty2.default)(this, "quantity", -1);
    (0, _defineProperty2.default)(this, "household_id", -1);
    (0, _defineProperty2.default)(this, "donation_flag", "");
    (0, _defineProperty2.default)(this, "created_at", "");
    (0, _defineProperty2.default)(this, "updated_at", "");
    this.id = id;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.household_id = household_id;
    this.donation_flag = donation_flag;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  (0, _createClass2.default)(Item, [{
    key: "Id",
    get: function get() {
      return this.id;
    },
    set: function set(id) {
      this.id = id;
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
    key: "Household_id",
    get: function get() {
      return this.household_id;
    },
    set: function set(household_id) {
      this.household_id = household_id;
    }
  }, {
    key: "Donation_flag",
    get: function get() {
      return this.donation_flag;
    },
    set: function set(donation_flag) {
      this.donation_flag = donation_flag;
    }
  }, {
    key: "Created_at",
    get: function get() {
      return this.created_at;
    },
    set: function set(created_at) {
      this.created_at = created_at;
    }
  }, {
    key: "Updated_at",
    get: function get() {
      return this.updated_at;
    },
    set: function set(updated_at) {
      this.updated_at = updated_at;
    }
  }]);
  return Item;
}();

exports.Item = Item;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvSXRlbS50cyJdLCJuYW1lcyI6WyJJdGVtIiwiaWQiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJxdWFudGl0eSIsImhvdXNlaG9sZF9pZCIsImRvbmF0aW9uX2ZsYWciLCJjcmVhdGVkX2F0IiwidXBkYXRlZF9hdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0lBQWFBLEk7QUFXVCxnQkFBWUMsRUFBWixFQUF1QkMsSUFBdkIsRUFBb0NDLFdBQXBDLEVBQXdEQyxRQUF4RCxFQUF5RUMsWUFBekUsRUFBOEZDLGFBQTlGLEVBQW9IQyxVQUFwSCxFQUF1SUMsVUFBdkksRUFBeUo7QUFBQTtBQUFBLDhDQVRySSxDQUFDLENBU29JO0FBQUEsZ0RBUm5JLEVBUW1JO0FBQUEsdURBUDVILEVBTzRIO0FBQUEsb0RBTi9ILENBQUMsQ0FNOEg7QUFBQSx3REFMM0gsQ0FBQyxDQUswSDtBQUFBLHlEQUoxSCxFQUkwSDtBQUFBLHNEQUg3SCxFQUc2SDtBQUFBLHNEQUY3SCxFQUU2SDtBQUNySixTQUFLUCxFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkEsVUFBbEI7QUFDSDs7OztTQUVELGVBQWU7QUFDWCxhQUFPLEtBQUtQLEVBQVo7QUFDSCxLO1NBQ0QsYUFBT0EsRUFBUCxFQUFpQjtBQUNiLFdBQUtBLEVBQUwsR0FBVUEsRUFBVjtBQUNIOzs7U0FFRCxlQUFpQjtBQUNiLGFBQU8sS0FBS0MsSUFBWjtBQUNILEs7U0FDRCxhQUFTQSxJQUFULEVBQXFCO0FBQ2pCLFdBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNIOzs7U0FFRCxlQUF3QjtBQUNwQixhQUFPLEtBQUtDLFdBQVo7QUFDSCxLO1NBQ0QsYUFBZ0JBLFdBQWhCLEVBQW1DO0FBQy9CLFdBQUtBLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0g7OztTQUVELGVBQXFCO0FBQ2pCLGFBQU8sS0FBS0MsUUFBWjtBQUNILEs7U0FDRCxhQUFhQSxRQUFiLEVBQTZCO0FBQ3pCLFdBQUtBLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0g7OztTQUVELGVBQXlCO0FBQ3JCLGFBQU8sS0FBS0MsWUFBWjtBQUNILEs7U0FDRCxhQUFpQkEsWUFBakIsRUFBcUM7QUFDakMsV0FBS0EsWUFBTCxHQUFvQkEsWUFBcEI7QUFDSDs7O1NBRUQsZUFBMEI7QUFDdEIsYUFBTyxLQUFLQyxhQUFaO0FBQ0gsSztTQUNELGFBQWtCQSxhQUFsQixFQUF1QztBQUNuQyxXQUFLQSxhQUFMLEdBQXFCQSxhQUFyQjtBQUNIOzs7U0FFRCxlQUF1QjtBQUNuQixhQUFPLEtBQUtDLFVBQVo7QUFDSCxLO1NBQ0QsYUFBZUEsVUFBZixFQUFpQztBQUM3QixXQUFLQSxVQUFMLEdBQWtCQSxVQUFsQjtBQUNIOzs7U0FFRCxlQUF1QjtBQUNuQixhQUFPLEtBQUtDLFVBQVo7QUFDSCxLO1NBQ0QsYUFBZUEsVUFBZixFQUFpQztBQUM3QixXQUFLQSxVQUFMLEdBQWtCQSxVQUFsQjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEl0ZW1cclxue1xyXG4gICAgcHJpdmF0ZSBpZDpudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgbmFtZTpzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBkZXNjcmlwdGlvbjpzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBxdWFudGl0eTpudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgaG91c2Vob2xkX2lkOm51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBkb25hdGlvbl9mbGFnOnN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIGNyZWF0ZWRfYXQ6c3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgdXBkYXRlZF9hdDpzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOm51bWJlciwgbmFtZTpzdHJpbmcsIGRlc2NyaXB0aW9uOnN0cmluZywgcXVhbnRpdHk6bnVtYmVyLCBob3VzZWhvbGRfaWQ6bnVtYmVyLCBkb25hdGlvbl9mbGFnOnN0cmluZywgY3JlYXRlZF9hdDpzdHJpbmcsIHVwZGF0ZWRfYXQ6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IHF1YW50aXR5O1xyXG4gICAgICAgIHRoaXMuaG91c2Vob2xkX2lkID0gaG91c2Vob2xkX2lkO1xyXG4gICAgICAgIHRoaXMuZG9uYXRpb25fZmxhZyA9IGRvbmF0aW9uX2ZsYWc7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVkX2F0ID0gY3JlYXRlZF9hdDtcclxuICAgICAgICB0aGlzLnVwZGF0ZWRfYXQgPSB1cGRhdGVkX2F0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBJZCgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5pZDtcclxuICAgIH1cclxuICAgIHNldCBJZChpZDpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgTmFtZSgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gICAgfVxyXG4gICAgc2V0IE5hbWUobmFtZTpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IERlc2NyaXB0aW9uKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG4gICAgc2V0IERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uOnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBRdWFudGl0eSgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5xdWFudGl0eTtcclxuICAgIH1cclxuICAgIHNldCBRdWFudGl0eShxdWFudGl0eTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMucXVhbnRpdHkgPSBxdWFudGl0eTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgSG91c2Vob2xkX2lkKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhvdXNlaG9sZF9pZDtcclxuICAgIH1cclxuICAgIHNldCBIb3VzZWhvbGRfaWQoaG91c2Vob2xkX2lkOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5ob3VzZWhvbGRfaWQgPSBob3VzZWhvbGRfaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IERvbmF0aW9uX2ZsYWcoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9uYXRpb25fZmxhZztcclxuICAgIH1cclxuICAgIHNldCBEb25hdGlvbl9mbGFnKGRvbmF0aW9uX2ZsYWc6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLmRvbmF0aW9uX2ZsYWcgPSBkb25hdGlvbl9mbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBDcmVhdGVkX2F0KCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZWRfYXQ7XHJcbiAgICB9XHJcbiAgICBzZXQgQ3JlYXRlZF9hdChjcmVhdGVkX2F0OnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVkX2F0ID0gY3JlYXRlZF9hdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgVXBkYXRlZF9hdCgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVkX2F0O1xyXG4gICAgfVxyXG4gICAgc2V0IFVwZGF0ZWRfYXQodXBkYXRlZF9hdDpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMudXBkYXRlZF9hdCA9IHVwZGF0ZWRfYXQ7XHJcbiAgICB9XHJcbn0iXX0=