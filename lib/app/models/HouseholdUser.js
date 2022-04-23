"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HouseholdUser = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var HouseholdUser = /*#__PURE__*/function () {
  function HouseholdUser(id, user_id, household_id, created_at, updated_at) {
    (0, _classCallCheck2.default)(this, HouseholdUser);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "user_id", -1);
    (0, _defineProperty2.default)(this, "household_id", -1);
    (0, _defineProperty2.default)(this, "created_at", "");
    (0, _defineProperty2.default)(this, "updated_at", "");
    this.id = id;
    this.user_id = user_id;
    this.household_id = household_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  (0, _createClass2.default)(HouseholdUser, [{
    key: "Id",
    get: function get() {
      return this.id;
    },
    set: function set(id) {
      this.id = id;
    }
  }, {
    key: "User_id",
    get: function get() {
      return this.user_id;
    },
    set: function set(user_id) {
      this.user_id = user_id;
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
  return HouseholdUser;
}();

exports.HouseholdUser = HouseholdUser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvSG91c2Vob2xkVXNlci50cyJdLCJuYW1lcyI6WyJIb3VzZWhvbGRVc2VyIiwiaWQiLCJ1c2VyX2lkIiwiaG91c2Vob2xkX2lkIiwiY3JlYXRlZF9hdCIsInVwZGF0ZWRfYXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztJQUFhQSxhO0FBUVQseUJBQVlDLEVBQVosRUFBdUJDLE9BQXZCLEVBQXVDQyxZQUF2QyxFQUE0REMsVUFBNUQsRUFBK0VDLFVBQS9FLEVBQWlHO0FBQUE7QUFBQSw4Q0FON0UsQ0FBQyxDQU00RTtBQUFBLG1EQUx4RSxDQUFDLENBS3VFO0FBQUEsd0RBSm5FLENBQUMsQ0FJa0U7QUFBQSxzREFIckUsRUFHcUU7QUFBQSxzREFGckUsRUFFcUU7QUFDN0YsU0FBS0osRUFBTCxHQUFVQSxFQUFWO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0g7Ozs7U0FFRCxlQUFlO0FBQ1gsYUFBTyxLQUFLSixFQUFaO0FBQ0gsSztTQUNELGFBQU9BLEVBQVAsRUFBaUI7QUFDYixXQUFLQSxFQUFMLEdBQVVBLEVBQVY7QUFDSDs7O1NBRUQsZUFBb0I7QUFDaEIsYUFBTyxLQUFLQyxPQUFaO0FBQ0gsSztTQUNELGFBQVlBLE9BQVosRUFBMkI7QUFDdkIsV0FBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0g7OztTQUVELGVBQXlCO0FBQ3JCLGFBQU8sS0FBS0MsWUFBWjtBQUNILEs7U0FDRCxhQUFpQkEsWUFBakIsRUFBcUM7QUFDakMsV0FBS0EsWUFBTCxHQUFvQkEsWUFBcEI7QUFDSDs7O1NBRUQsZUFBdUI7QUFDbkIsYUFBTyxLQUFLQyxVQUFaO0FBQ0gsSztTQUNELGFBQWVBLFVBQWYsRUFBaUM7QUFDN0IsV0FBS0EsVUFBTCxHQUFrQkEsVUFBbEI7QUFDSDs7O1NBRUQsZUFBdUI7QUFDbkIsYUFBTyxLQUFLQyxVQUFaO0FBQ0gsSztTQUNELGFBQWVBLFVBQWYsRUFBaUM7QUFDN0IsV0FBS0EsVUFBTCxHQUFrQkEsVUFBbEI7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBIb3VzZWhvbGRVc2VyXHJcbntcclxuICAgIHByaXZhdGUgaWQ6bnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIHVzZXJfaWQ6bnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIGhvdXNlaG9sZF9pZDpudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgY3JlYXRlZF9hdDpzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVkX2F0OnN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6bnVtYmVyLCB1c2VyX2lkOm51bWJlciwgaG91c2Vob2xkX2lkOm51bWJlciwgY3JlYXRlZF9hdDpzdHJpbmcsIHVwZGF0ZWRfYXQ6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy51c2VyX2lkID0gdXNlcl9pZDtcclxuICAgICAgICB0aGlzLmhvdXNlaG9sZF9pZCA9IGhvdXNlaG9sZF9pZDtcclxuICAgICAgICB0aGlzLmNyZWF0ZWRfYXQgPSBjcmVhdGVkX2F0O1xyXG4gICAgICAgIHRoaXMudXBkYXRlZF9hdCA9IHVwZGF0ZWRfYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IElkKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xyXG4gICAgfVxyXG4gICAgc2V0IElkKGlkOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBVc2VyX2lkKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJfaWQ7XHJcbiAgICB9XHJcbiAgICBzZXQgVXNlcl9pZCh1c2VyX2lkOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy51c2VyX2lkID0gdXNlcl9pZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgSG91c2Vob2xkX2lkKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhvdXNlaG9sZF9pZDtcclxuICAgIH1cclxuICAgIHNldCBIb3VzZWhvbGRfaWQoaG91c2Vob2xkX2lkOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5ob3VzZWhvbGRfaWQgPSBob3VzZWhvbGRfaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IENyZWF0ZWRfYXQoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlZF9hdDtcclxuICAgIH1cclxuICAgIHNldCBDcmVhdGVkX2F0KGNyZWF0ZWRfYXQ6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLmNyZWF0ZWRfYXQgPSBjcmVhdGVkX2F0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBVcGRhdGVkX2F0KCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZWRfYXQ7XHJcbiAgICB9XHJcbiAgICBzZXQgVXBkYXRlZF9hdCh1cGRhdGVkX2F0OnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy51cGRhdGVkX2F0ID0gdXBkYXRlZF9hdDtcclxuICAgIH1cclxufSJdfQ==