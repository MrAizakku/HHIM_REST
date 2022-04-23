"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Household = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Household = /*#__PURE__*/function () {
  function Household(id, name, street, city, state, zip, description, created_at, updated_at, items) {
    (0, _classCallCheck2.default)(this, Household);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "name", "");
    (0, _defineProperty2.default)(this, "street", "");
    (0, _defineProperty2.default)(this, "city", "");
    (0, _defineProperty2.default)(this, "state", "");
    (0, _defineProperty2.default)(this, "zip", "");
    (0, _defineProperty2.default)(this, "description", "");
    (0, _defineProperty2.default)(this, "created_at", "");
    (0, _defineProperty2.default)(this, "updated_at", "");
    (0, _defineProperty2.default)(this, "items", void 0);
    this.id = id;
    this.name = name;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.items = items;
  }

  (0, _createClass2.default)(Household, [{
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
    key: "Street",
    get: function get() {
      return this.street;
    },
    set: function set(street) {
      this.street = street;
    }
  }, {
    key: "City",
    get: function get() {
      return this.city;
    },
    set: function set(city) {
      this.city = city;
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
    key: "Zip",
    get: function get() {
      return this.zip;
    },
    set: function set(zip) {
      this.zip = zip;
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
  }, {
    key: "Items",
    get: function get() {
      return this.items;
    },
    set: function set(items) {
      this.items = items;
    }
  }]);
  return Household;
}();

exports.Household = Household;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvSG91c2Vob2xkLnRzIl0sIm5hbWVzIjpbIkhvdXNlaG9sZCIsImlkIiwibmFtZSIsInN0cmVldCIsImNpdHkiLCJzdGF0ZSIsInppcCIsImRlc2NyaXB0aW9uIiwiY3JlYXRlZF9hdCIsInVwZGF0ZWRfYXQiLCJpdGVtcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0lBRWFBLFM7QUFhVCxxQkFBWUMsRUFBWixFQUF1QkMsSUFBdkIsRUFBb0NDLE1BQXBDLEVBQW1EQyxJQUFuRCxFQUFnRUMsS0FBaEUsRUFBOEVDLEdBQTlFLEVBQTBGQyxXQUExRixFQUE4R0MsVUFBOUcsRUFBaUlDLFVBQWpJLEVBQW9KQyxLQUFwSixFQUFpSztBQUFBO0FBQUEsOENBWDdJLENBQUMsQ0FXNEk7QUFBQSxnREFWM0ksRUFVMkk7QUFBQSxrREFUekksRUFTeUk7QUFBQSxnREFSM0ksRUFRMkk7QUFBQSxpREFQMUksRUFPMEk7QUFBQSwrQ0FONUksRUFNNEk7QUFBQSx1REFMcEksRUFLb0k7QUFBQSxzREFKckksRUFJcUk7QUFBQSxzREFIckksRUFHcUk7QUFBQTtBQUM3SixTQUFLVCxFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDSDs7OztTQUVELGVBQWU7QUFDWCxhQUFPLEtBQUtULEVBQVo7QUFDSCxLO1NBQ0QsYUFBT0EsRUFBUCxFQUFpQjtBQUNiLFdBQUtBLEVBQUwsR0FBVUEsRUFBVjtBQUNIOzs7U0FFRCxlQUFpQjtBQUNiLGFBQU8sS0FBS0MsSUFBWjtBQUNILEs7U0FDRCxhQUFTQSxJQUFULEVBQXFCO0FBQ2pCLFdBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNIOzs7U0FFRCxlQUFtQjtBQUNmLGFBQU8sS0FBS0MsTUFBWjtBQUNILEs7U0FDRCxhQUFXQSxNQUFYLEVBQXlCO0FBQ3JCLFdBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNIOzs7U0FFRCxlQUFpQjtBQUNiLGFBQU8sS0FBS0MsSUFBWjtBQUNILEs7U0FDRCxhQUFTQSxJQUFULEVBQXFCO0FBQ2pCLFdBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNIOzs7U0FFRCxlQUFrQjtBQUNkLGFBQU8sS0FBS0MsS0FBWjtBQUNILEs7U0FDRCxhQUFVQSxLQUFWLEVBQXVCO0FBQ25CLFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNIOzs7U0FFRCxlQUFnQjtBQUNaLGFBQU8sS0FBS0MsR0FBWjtBQUNILEs7U0FDRCxhQUFRQSxHQUFSLEVBQW1CO0FBQ2YsV0FBS0EsR0FBTCxHQUFXQSxHQUFYO0FBQ0g7OztTQUVELGVBQXdCO0FBQ3BCLGFBQU8sS0FBS0MsV0FBWjtBQUNILEs7U0FDRCxhQUFnQkEsV0FBaEIsRUFBbUM7QUFDL0IsV0FBS0EsV0FBTCxHQUFtQkEsV0FBbkI7QUFDSDs7O1NBRUQsZUFBdUI7QUFDbkIsYUFBTyxLQUFLQyxVQUFaO0FBQ0gsSztTQUNELGFBQWVBLFVBQWYsRUFBaUM7QUFDN0IsV0FBS0EsVUFBTCxHQUFrQkEsVUFBbEI7QUFDSDs7O1NBRUQsZUFBdUI7QUFDbkIsYUFBTyxLQUFLQyxVQUFaO0FBQ0gsSztTQUNELGFBQWVBLFVBQWYsRUFBaUM7QUFDN0IsV0FBS0EsVUFBTCxHQUFrQkEsVUFBbEI7QUFDSDs7O1NBRUQsZUFBa0I7QUFDZCxhQUFPLEtBQUtDLEtBQVo7QUFDSCxLO1NBQ0QsYUFBVUEsS0FBVixFQUF1QjtBQUNuQixXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9JdGVtXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSG91c2Vob2xkXHJcbntcclxuICAgIHByaXZhdGUgaWQ6bnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIG5hbWU6c3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgc3RyZWV0OnN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIGNpdHk6c3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgc3RhdGU6c3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgemlwOnN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIGRlc2NyaXB0aW9uOnN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIGNyZWF0ZWRfYXQ6c3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgdXBkYXRlZF9hdDpzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBpdGVtczpJdGVtW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6bnVtYmVyLCBuYW1lOnN0cmluZywgc3RyZWV0OnN0cmluZywgY2l0eTpzdHJpbmcsIHN0YXRlOnN0cmluZywgemlwOnN0cmluZywgZGVzY3JpcHRpb246c3RyaW5nLCBjcmVhdGVkX2F0OnN0cmluZywgdXBkYXRlZF9hdDpzdHJpbmcsIGl0ZW1zOkl0ZW1bXSl7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5zdHJlZXQgPSBzdHJlZXQ7XHJcbiAgICAgICAgdGhpcy5jaXR5ID0gY2l0eTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgdGhpcy56aXAgPSB6aXA7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlZF9hdCA9IGNyZWF0ZWRfYXQ7XHJcbiAgICAgICAgdGhpcy51cGRhdGVkX2F0ID0gdXBkYXRlZF9hdDtcclxuICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IElkKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xyXG4gICAgfVxyXG4gICAgc2V0IElkKGlkOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBOYW1lKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAgICB9XHJcbiAgICBzZXQgTmFtZShuYW1lOnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgU3RyZWV0KCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0cmVldDtcclxuICAgIH1cclxuICAgIHNldCBTdHJlZXQoc3RyZWV0OnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5zdHJlZXQgPSBzdHJlZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IENpdHkoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2l0eTtcclxuICAgIH1cclxuICAgIHNldCBDaXR5KGNpdHk6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLmNpdHkgPSBjaXR5O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBTdGF0ZSgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcclxuICAgIH1cclxuICAgIHNldCBTdGF0ZShzdGF0ZTpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgWmlwKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLnppcDtcclxuICAgIH1cclxuICAgIHNldCBaaXAoemlwOnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy56aXAgPSB6aXA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IERlc2NyaXB0aW9uKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG4gICAgc2V0IERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uOnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBDcmVhdGVkX2F0KCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZWRfYXQ7XHJcbiAgICB9XHJcbiAgICBzZXQgQ3JlYXRlZF9hdChjcmVhdGVkX2F0OnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVkX2F0ID0gY3JlYXRlZF9hdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgVXBkYXRlZF9hdCgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVkX2F0O1xyXG4gICAgfVxyXG4gICAgc2V0IFVwZGF0ZWRfYXQodXBkYXRlZF9hdDpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMudXBkYXRlZF9hdCA9IHVwZGF0ZWRfYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IEl0ZW1zKCk6SXRlbVtde1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zO1xyXG4gICAgfVxyXG4gICAgc2V0IEl0ZW1zKGl0ZW1zOkl0ZW1bXSl7XHJcbiAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xyXG4gICAgfVxyXG59Il19