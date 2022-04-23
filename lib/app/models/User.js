"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var User = /*#__PURE__*/function () {
  function User(id, first_name, last_name, email, password, created_at, updated_at) {
    (0, _classCallCheck2.default)(this, User);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "first_name", "");
    (0, _defineProperty2.default)(this, "last_name", "");
    (0, _defineProperty2.default)(this, "email", "");
    (0, _defineProperty2.default)(this, "password", "");
    (0, _defineProperty2.default)(this, "created_at", "");
    (0, _defineProperty2.default)(this, "updated_at", "");
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  (0, _createClass2.default)(User, [{
    key: "Id",
    get: function get() {
      return this.id;
    },
    set: function set(id) {
      this.id = id;
    }
  }, {
    key: "First_name",
    get: function get() {
      return this.first_name;
    },
    set: function set(first_name) {
      this.first_name = first_name;
    }
  }, {
    key: "Last_name",
    get: function get() {
      return this.last_name;
    },
    set: function set(last_name) {
      this.last_name = last_name;
    }
  }, {
    key: "Email",
    get: function get() {
      return this.email;
    },
    set: function set(email) {
      this.email = email;
    }
  }, {
    key: "Password",
    get: function get() {
      return this.password;
    },
    set: function set(password) {
      this.password = password;
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
  return User;
}();

exports.User = User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvVXNlci50cyJdLCJuYW1lcyI6WyJVc2VyIiwiaWQiLCJmaXJzdF9uYW1lIiwibGFzdF9uYW1lIiwiZW1haWwiLCJwYXNzd29yZCIsImNyZWF0ZWRfYXQiLCJ1cGRhdGVkX2F0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7SUFBYUEsSTtBQVVULGdCQUFZQyxFQUFaLEVBQXVCQyxVQUF2QixFQUEwQ0MsU0FBMUMsRUFBNERDLEtBQTVELEVBQTBFQyxRQUExRSxFQUEyRkMsVUFBM0YsRUFBOEdDLFVBQTlHLEVBQWdJO0FBQUE7QUFBQSw4Q0FSNUcsQ0FBQyxDQVEyRztBQUFBLHNEQVBwRyxFQU9vRztBQUFBLHFEQU5yRyxFQU1xRztBQUFBLGlEQUx6RyxFQUt5RztBQUFBLG9EQUp0RyxFQUlzRztBQUFBLHNEQUhwRyxFQUdvRztBQUFBLHNEQUZwRyxFQUVvRztBQUM1SCxTQUFLTixFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLQyxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0g7Ozs7U0FFRCxlQUFlO0FBQ1gsYUFBTyxLQUFLTixFQUFaO0FBQ0gsSztTQUNELGFBQU9BLEVBQVAsRUFBaUI7QUFDYixXQUFLQSxFQUFMLEdBQVVBLEVBQVY7QUFDSDs7O1NBRUQsZUFBdUI7QUFDbkIsYUFBTyxLQUFLQyxVQUFaO0FBQ0gsSztTQUNELGFBQWVBLFVBQWYsRUFBaUM7QUFDN0IsV0FBS0EsVUFBTCxHQUFrQkEsVUFBbEI7QUFDSDs7O1NBRUQsZUFBc0I7QUFDbEIsYUFBTyxLQUFLQyxTQUFaO0FBQ0gsSztTQUNELGFBQWNBLFNBQWQsRUFBK0I7QUFDM0IsV0FBS0EsU0FBTCxHQUFpQkEsU0FBakI7QUFDSDs7O1NBRUQsZUFBa0I7QUFDZCxhQUFPLEtBQUtDLEtBQVo7QUFDSCxLO1NBQ0QsYUFBVUEsS0FBVixFQUF1QjtBQUNuQixXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDSDs7O1NBRUQsZUFBcUI7QUFDakIsYUFBTyxLQUFLQyxRQUFaO0FBQ0gsSztTQUNELGFBQWFBLFFBQWIsRUFBNkI7QUFDekIsV0FBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDSDs7O1NBRUQsZUFBdUI7QUFDbkIsYUFBTyxLQUFLQyxVQUFaO0FBQ0gsSztTQUNELGFBQWVBLFVBQWYsRUFBaUM7QUFDN0IsV0FBS0EsVUFBTCxHQUFrQkEsVUFBbEI7QUFDSDs7O1NBRUQsZUFBdUI7QUFDbkIsYUFBTyxLQUFLQyxVQUFaO0FBQ0gsSztTQUNELGFBQWVBLFVBQWYsRUFBaUM7QUFDN0IsV0FBS0EsVUFBTCxHQUFrQkEsVUFBbEI7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBVc2VyXHJcbntcclxuICAgIHByaXZhdGUgaWQ6bnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIGZpcnN0X25hbWU6c3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgbGFzdF9uYW1lOnN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIGVtYWlsOnN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIHBhc3N3b3JkOnN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIGNyZWF0ZWRfYXQ6c3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgdXBkYXRlZF9hdDpzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOm51bWJlciwgZmlyc3RfbmFtZTpzdHJpbmcsIGxhc3RfbmFtZTpzdHJpbmcsIGVtYWlsOnN0cmluZywgcGFzc3dvcmQ6c3RyaW5nLCBjcmVhdGVkX2F0OnN0cmluZywgdXBkYXRlZF9hdDpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLmZpcnN0X25hbWUgPSBmaXJzdF9uYW1lO1xyXG4gICAgICAgIHRoaXMubGFzdF9uYW1lID0gbGFzdF9uYW1lO1xyXG4gICAgICAgIHRoaXMuZW1haWwgPSBlbWFpbDtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVkX2F0ID0gY3JlYXRlZF9hdDtcclxuICAgICAgICB0aGlzLnVwZGF0ZWRfYXQgPSB1cGRhdGVkX2F0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBJZCgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5pZDtcclxuICAgIH1cclxuICAgIHNldCBJZChpZDpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgRmlyc3RfbmFtZSgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5maXJzdF9uYW1lO1xyXG4gICAgfVxyXG4gICAgc2V0IEZpcnN0X25hbWUoZmlyc3RfbmFtZTpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuZmlyc3RfbmFtZSA9IGZpcnN0X25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IExhc3RfbmFtZSgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXN0X25hbWU7XHJcbiAgICB9XHJcbiAgICBzZXQgTGFzdF9uYW1lKGxhc3RfbmFtZTpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMubGFzdF9uYW1lID0gbGFzdF9uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBFbWFpbCgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5lbWFpbDtcclxuICAgIH1cclxuICAgIHNldCBFbWFpbChlbWFpbDpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuZW1haWwgPSBlbWFpbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgUGFzc3dvcmQoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFzc3dvcmQ7XHJcbiAgICB9XHJcbiAgICBzZXQgUGFzc3dvcmQocGFzc3dvcmQ6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IENyZWF0ZWRfYXQoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlZF9hdDtcclxuICAgIH1cclxuICAgIHNldCBDcmVhdGVkX2F0KGNyZWF0ZWRfYXQ6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLmNyZWF0ZWRfYXQgPSBjcmVhdGVkX2F0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBVcGRhdGVkX2F0KCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZWRfYXQ7XHJcbiAgICB9XHJcbiAgICBzZXQgVXBkYXRlZF9hdCh1cGRhdGVkX2F0OnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy51cGRhdGVkX2F0ID0gdXBkYXRlZF9hdDtcclxuICAgIH1cclxufSJdfQ==