"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HouseholdUserDAO = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _HouseholdUser = require("../models/HouseholdUser");

var _DTO = require("../database/DTO");

var mysql = _interopRequireWildcard(require("mysql"));

var util = _interopRequireWildcard(require("util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//Object Model Dependencies
//MySQL Module Dependency
//Util Module Dependency for Promisify
var HouseholdUserDAO = /*#__PURE__*/function () {
  function HouseholdUserDAO(host, port, schema, username, password) {
    (0, _classCallCheck2.default)(this, HouseholdUserDAO);
    (0, _defineProperty2.default)(this, "host", "");
    (0, _defineProperty2.default)(this, "port", 3306);
    (0, _defineProperty2.default)(this, "username", "");
    (0, _defineProperty2.default)(this, "password", "");
    (0, _defineProperty2.default)(this, "schema", "");
    (0, _defineProperty2.default)(this, "pool", void 0);
    this.host = host;
    this.port = port;
    this.schema = schema;
    this.username = username;
    this.password = password;
    this.pool = mysql.createPool({
      host: this.host,
      port: this.port,
      user: this.username,
      password: this.password,
      database: this.schema,
      connectionLimit: 10
    });
  }
  /************************
   *   HOUSEHOLD USERS    *
   ************************/


  (0, _createClass2.default)(HouseholdUserDAO, [{
    key: "readAll",
    value: function readAll(callback) {
      var householdusers = [];
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(err, connection) {
          var result1, x, dto;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!err) {
                    _context.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  //use Promisfy
                  connection.query = util.promisify(connection.query);
                  _context.next = 5;
                  return connection.query('SELECT * FROM HOUSEHOLD_USERS');

                case 5:
                  result1 = _context.sent;

                  for (x = 0; x < result1.length; ++x) {
                    householdusers.push(new _HouseholdUser.HouseholdUser(result1[x].id, result1[x].user_id, result1[x].household_id, result1[x].created_at, result1[x].updated_at));
                  } //callback to return results


                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (householdusers.length > 0) {
                    dto = new _DTO.DTO(200, "Get Success", householdusers.length, householdusers);
                  } else {
                    dto = new _DTO.DTO(404, "Get Success: No Results", householdusers.length, []);
                  }

                  if (connection) connection.release();
                  callback(dto);

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "readByHouseholdId",
    value: function readByHouseholdId(household_id, callback) {
      var householdusers = [];
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(err, connection) {
          var result1, x, dto;
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!err) {
                    _context2.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  //use Promisfy
                  connection.query = util.promisify(connection.query);
                  _context2.next = 5;
                  return connection.query("SELECT * FROM HOUSEHOLD_USERS WHERE HOUSEHOLD_ID = ?", household_id);

                case 5:
                  result1 = _context2.sent;

                  for (x = 0; x < result1.length; ++x) {
                    householdusers.push(new _HouseholdUser.HouseholdUser(result1[x].id, result1[x].user_id, result1[x].household_id, result1[x].created_at, result1[x].updated_at));
                  } //return results


                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (householdusers.length > 0) {
                    dto = new _DTO.DTO(200, "Get Success", householdusers.length, householdusers);
                  } else {
                    dto = new _DTO.DTO(404, "Get Success: No Results", householdusers.length, []);
                  }

                  if (connection) connection.release();
                  callback(dto);

                case 11:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "readByUserId",
    value: function readByUserId(user_id, callback) {
      var householdusers = [];
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(err, connection) {
          var result1, x, dto;
          return _regenerator.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!err) {
                    _context3.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  //use Promisfy
                  connection.query = util.promisify(connection.query);
                  _context3.next = 5;
                  return connection.query("SELECT * FROM HOUSEHOLD_USERS WHERE USER_ID = ?", user_id);

                case 5:
                  result1 = _context3.sent;

                  for (x = 0; x < result1.length; ++x) {
                    householdusers.push(new _HouseholdUser.HouseholdUser(result1[x].id, result1[x].user_id, result1[x].household_id, result1[x].created_at, result1[x].updated_at));
                  } //return results


                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (householdusers.length > 0) {
                    dto = new _DTO.DTO(200, "Get Success", householdusers.length, householdusers);
                  } else {
                    dto = new _DTO.DTO(404, "Get Success: No Results", householdusers.length, []);
                  }

                  if (connection) connection.release();
                  callback(dto);

                case 11:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "create",
    value: function create(householduser, callback) {
      //connection  
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(err, connection) {
          var result1, dto, result2;
          return _regenerator.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (!err) {
                    _context4.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  //use Promisfy
                  connection.query = util.promisify(connection.query);
                  _context4.next = 5;
                  return connection.query('INSERT INTO HOUSEHOLD_USERS (USER_ID, HOUSEHOLD_ID, CREATED_AT, UPDATED_AT) VALUES(?,?,?,?)', [householduser.User_id, householduser.Household_id, new Date(), new Date()]);

                case 5:
                  result1 = _context4.sent;
                  //return results
                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (!(result1.affectedRows == 1)) {
                    _context4.next = 14;
                    break;
                  }

                  _context4.next = 10;
                  return connection.query("SELECT * FROM HOUSEHOLD_USERS WHERE ID = ?", result1.insertId);

                case 10:
                  result2 = _context4.sent;
                  dto = new _DTO.DTO(200, "Post Success", 1, new _HouseholdUser.HouseholdUser(result2[0].id, result2[0].user_id, result2[0].household_id, result2[0].created_at, result2[0].updated_at));
                  _context4.next = 15;
                  break;

                case 14:
                  dto = new _DTO.DTO(400, "Post Failure", 0, []);

                case 15:
                  if (connection) connection.release();
                  callback(dto);

                case 17:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function (_x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "delete",
    value: function _delete(id, callback) {
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(err, connection) {
          var result2, result1, dto;
          return _regenerator.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  if (!err) {
                    _context5.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  //use Promisfy
                  connection.query = util.promisify(connection.query); //get object before deleting

                  _context5.next = 5;
                  return connection.query("SELECT * FROM HOUSEHOLD_USERS WHERE ID = ?", id);

                case 5:
                  result2 = _context5.sent;
                  _context5.next = 8;
                  return connection.query('DELETE FROM HOUSEHOLD_USERS WHERE ID=?', id);

                case 8:
                  result1 = _context5.sent;
                  //return results in DTO
                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (result1.affectedRows == 1) {
                    dto = new _DTO.DTO(200, "Delete Success", 1, new _HouseholdUser.HouseholdUser(result2[0].id, result2[0].user_id, result2[0].household_id, result2[0].created_at, result2[0].updated_at));
                  } else {
                    dto = new _DTO.DTO(400, "Delete Failure", 0, []);
                  }

                  if (connection) connection.release();
                  callback(dto);

                case 13:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x9, _x10) {
          return _ref5.apply(this, arguments);
        };
      }());
    }
  }]);
  return HouseholdUserDAO;
}();

exports.HouseholdUserDAO = HouseholdUserDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9Ib3VzZWhvbGRVc2VyREFPLnRzIl0sIm5hbWVzIjpbIkhvdXNlaG9sZFVzZXJEQU8iLCJob3N0IiwicG9ydCIsInNjaGVtYSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJwb29sIiwibXlzcWwiLCJjcmVhdGVQb29sIiwidXNlciIsImRhdGFiYXNlIiwiY29ubmVjdGlvbkxpbWl0IiwiY2FsbGJhY2siLCJob3VzZWhvbGR1c2VycyIsImdldENvbm5lY3Rpb24iLCJlcnIiLCJjb25uZWN0aW9uIiwicXVlcnkiLCJ1dGlsIiwicHJvbWlzaWZ5IiwicmVzdWx0MSIsIngiLCJsZW5ndGgiLCJwdXNoIiwiSG91c2Vob2xkVXNlciIsImlkIiwidXNlcl9pZCIsImhvdXNlaG9sZF9pZCIsImNyZWF0ZWRfYXQiLCJ1cGRhdGVkX2F0IiwiZHRvIiwiRFRPIiwicmVsZWFzZSIsImhvdXNlaG9sZHVzZXIiLCJVc2VyX2lkIiwiSG91c2Vob2xkX2lkIiwiRGF0ZSIsImFmZmVjdGVkUm93cyIsImluc2VydElkIiwicmVzdWx0MiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBRUE7O0FBR0E7O0FBR0E7Ozs7OztBQVZBO0FBTUE7QUFHQTtJQUdhQSxnQjtBQVNULDRCQUFZQyxJQUFaLEVBQXlCQyxJQUF6QixFQUFzQ0MsTUFBdEMsRUFBcURDLFFBQXJELEVBQXNFQyxRQUF0RSxFQUNBO0FBQUE7QUFBQSxnREFSc0IsRUFRdEI7QUFBQSxnREFQc0IsSUFPdEI7QUFBQSxvREFOMEIsRUFNMUI7QUFBQSxvREFMMEIsRUFLMUI7QUFBQSxrREFKd0IsRUFJeEI7QUFBQTtBQUNJLFNBQUtKLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFB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QUNELHNCQUFJZixVQUFKLEVBQWdCQSxVQUFVLENBQUNnQixPQUFYO0FBQ2hCcEIsa0JBQUFBLFFBQVEsQ0FBQ2tCLEdBQUQsQ0FBUjs7QUFyQm9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQXhCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBdUJIIiwic291cmNlc0NvbnRlbnQiOlsiLy9PYmplY3QgTW9kZWwgRGVwZW5kZW5jaWVzXHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vbW9kZWxzL1VzZXJcIjtcclxuaW1wb3J0IHsgSG91c2Vob2xkVXNlciB9IGZyb20gXCIuLi9tb2RlbHMvSG91c2Vob2xkVXNlclwiO1xyXG5pbXBvcnQgeyBIb3VzZWhvbGQgfSBmcm9tIFwiLi4vbW9kZWxzL0hvdXNlaG9sZFwiO1xyXG5pbXBvcnQgeyBEVE8gfSAgZnJvbSBcIi4uL2RhdGFiYXNlL0RUT1wiO1xyXG5cclxuLy9NeVNRTCBNb2R1bGUgRGVwZW5kZW5jeVxyXG5pbXBvcnQgKiBhcyBteXNxbCBmcm9tIFwibXlzcWxcIjtcclxuXHJcbi8vVXRpbCBNb2R1bGUgRGVwZW5kZW5jeSBmb3IgUHJvbWlzaWZ5XHJcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBIb3VzZWhvbGRVc2VyREFPIFxyXG57XHJcbiAgICBwcml2YXRlIGhvc3Q6c3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgcG9ydDpudW1iZXIgPSAzMzA2O1xyXG4gICAgcHJpdmF0ZSB1c2VybmFtZTpzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBwYXNzd29yZDpzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBzY2hlbWE6c3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgcG9vbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihob3N0OnN0cmluZywgcG9ydDpudW1iZXIsIHNjaGVtYTpzdHJpbmcsIHVzZXJuYW1lOnN0cmluZywgcGFzc3dvcmQ6c3RyaW5nKSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xyXG4gICAgICAgIHRoaXMucG9ydCA9IHBvcnQ7XHJcbiAgICAgICAgdGhpcy5zY2hlbWEgPSBzY2hlbWE7XHJcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcclxuICAgICAgICB0aGlzLnBvb2wgPSBteXNxbC5jcmVhdGVQb29sKHtob3N0OiB0aGlzLmhvc3QsIHBvcnQ6IHRoaXMucG9ydCwgdXNlcjogdGhpcy51c2VybmFtZSwgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsIGRhdGFiYXNlOiB0aGlzLnNjaGVtYSwgY29ubmVjdGlvbkxpbWl0OiAxMH0pO1xyXG4gICAgfVxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICogICBIT1VTRUhPTEQgVVNFUlMgICAgKlxyXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIHB1YmxpYyByZWFkQWxsKGNhbGxiYWNrOiBhbnkpIFxyXG4gICAge1xyXG4gICAgICAgIGxldCBob3VzZWhvbGR1c2VyczpIb3VzZWhvbGRVc2VyW10gPSBbXTtcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuICAgICAgICAgICAgLy91c2UgUHJvbWlzZnlcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gSE9VU0VIT0xEX1VTRVJTJyk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGhvdXNlaG9sZHVzZXJzLnB1c2gobmV3IEhvdXNlaG9sZFVzZXIocmVzdWx0MVt4XS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0udXNlcl9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5ob3VzZWhvbGRfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uY3JlYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS51cGRhdGVkX2F0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jYWxsYmFjayB0byByZXR1cm4gcmVzdWx0c1xyXG4gICAgICAgICAgICBsZXQgZHRvID0gbmV3IERUTygtMSwgXCJcIiwgLTEsIFtdKTtcclxuICAgICAgICAgICAgaWYoaG91c2Vob2xkdXNlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTygyMDAsIFwiR2V0IFN1Y2Nlc3NcIiwgaG91c2Vob2xkdXNlcnMubGVuZ3RoLCBob3VzZWhvbGR1c2Vycyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDQwNCwgXCJHZXQgU3VjY2VzczogTm8gUmVzdWx0c1wiLCBob3VzZWhvbGR1c2Vycy5sZW5ndGgsIFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbikgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGR0byk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVhZEJ5SG91c2Vob2xkSWQoaG91c2Vob2xkX2lkOnN0cmluZywgY2FsbGJhY2s6IGFueSkgXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGhvdXNlaG9sZHVzZXJzOkhvdXNlaG9sZFVzZXJbXSA9IFtdO1xyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG5cclxuICAgICAgICAgICAgLy91c2UgUHJvbWlzZnlcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIEhPVVNFSE9MRF9VU0VSUyBXSEVSRSBIT1VTRUhPTERfSUQgPSA/XCIsIGhvdXNlaG9sZF9pZCk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGhvdXNlaG9sZHVzZXJzLnB1c2gobmV3IEhvdXNlaG9sZFVzZXIocmVzdWx0MVt4XS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0udXNlcl9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5ob3VzZWhvbGRfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uY3JlYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS51cGRhdGVkX2F0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9yZXR1cm4gcmVzdWx0c1xyXG4gICAgICAgICAgICBsZXQgZHRvID0gbmV3IERUTygtMSwgXCJcIiwgLTEsIFtdKTtcclxuICAgICAgICAgICAgaWYoaG91c2Vob2xkdXNlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTygyMDAsIFwiR2V0IFN1Y2Nlc3NcIiwgaG91c2Vob2xkdXNlcnMubGVuZ3RoLCBob3VzZWhvbGR1c2Vycyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDQwNCwgXCJHZXQgU3VjY2VzczogTm8gUmVzdWx0c1wiLCBob3VzZWhvbGR1c2Vycy5sZW5ndGgsIFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbikgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGR0byk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVhZEJ5VXNlcklkKHVzZXJfaWQ6c3RyaW5nLCBjYWxsYmFjazogYW55KSBcclxuICAgIHtcclxuICAgICAgICBsZXQgaG91c2Vob2xkdXNlcnM6SG91c2Vob2xkVXNlcltdID0gW107XHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgICAvL3VzZSBQcm9taXNmeVxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gSE9VU0VIT0xEX1VTRVJTIFdIRVJFIFVTRVJfSUQgPSA/XCIsIHVzZXJfaWQpO1xyXG4gICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBob3VzZWhvbGR1c2Vycy5wdXNoKG5ldyBIb3VzZWhvbGRVc2VyKHJlc3VsdDFbeF0uaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnVzZXJfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uaG91c2Vob2xkX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmNyZWF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0udXBkYXRlZF9hdCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIHJlc3VsdHNcclxuICAgICAgICAgICAgbGV0IGR0byA9IG5ldyBEVE8oLTEsIFwiXCIsIC0xLCBbXSk7XHJcbiAgICAgICAgICAgIGlmKGhvdXNlaG9sZHVzZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oMjAwLCBcIkdldCBTdWNjZXNzXCIsIGhvdXNlaG9sZHVzZXJzLmxlbmd0aCwgaG91c2Vob2xkdXNlcnMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTyg0MDQsIFwiR2V0IFN1Y2Nlc3M6IE5vIFJlc3VsdHNcIiwgaG91c2Vob2xkdXNlcnMubGVuZ3RoLCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24pIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhkdG8pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZShob3VzZWhvbGR1c2VyOkhvdXNlaG9sZFVzZXIsIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgLy9jb25uZWN0aW9uICBcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuXHJcbiAgICAgICAgICAgIC8vdXNlIFByb21pc2Z5XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdJTlNFUlQgSU5UTyBIT1VTRUhPTERfVVNFUlMgKFVTRVJfSUQsIEhPVVNFSE9MRF9JRCwgQ1JFQVRFRF9BVCwgVVBEQVRFRF9BVCkgVkFMVUVTKD8sPyw/LD8pJywgW2hvdXNlaG9sZHVzZXIuVXNlcl9pZCwgaG91c2Vob2xkdXNlci5Ib3VzZWhvbGRfaWQsIG5ldyBEYXRlKCksIG5ldyBEYXRlKCldKTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gcmVzdWx0c1xyXG4gICAgICAgICAgICBsZXQgZHRvID0gbmV3IERUTygtMSwgXCJcIiwgLTEsIFtdKTtcclxuICAgICAgICAgICAgaWYocmVzdWx0MS5hZmZlY3RlZFJvd3MgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDIgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBIT1VTRUhPTERfVVNFUlMgV0hFUkUgSUQgPSA/XCIsIHJlc3VsdDEuaW5zZXJ0SWQpOyAgICAgICBcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oMjAwLCBcIlBvc3QgU3VjY2Vzc1wiLCAxLCBuZXcgSG91c2Vob2xkVXNlcihyZXN1bHQyWzBdLmlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS51c2VyX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLmhvdXNlaG9sZF9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS5jcmVhdGVkX2F0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLnVwZGF0ZWRfYXQpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oNDAwLCBcIlBvc3QgRmFpbHVyZVwiLCAwLCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24pIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhkdG8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxldGUoaWQ6bnVtYmVyLCBjYWxsYmFjazogYW55KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG5cclxuICAgICAgICAgICAgLy91c2UgUHJvbWlzZnlcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICAvL2dldCBvYmplY3QgYmVmb3JlIGRlbGV0aW5nXHJcbiAgICAgICAgICAgIGxldCByZXN1bHQyID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gSE9VU0VIT0xEX1VTRVJTIFdIRVJFIElEID0gP1wiLCBpZCk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnREVMRVRFIEZST00gSE9VU0VIT0xEX1VTRVJTIFdIRVJFIElEPT8nLCBpZCk7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIHJlc3VsdHMgaW4gRFRPXHJcbiAgICAgICAgICAgIGxldCBkdG8gPSBuZXcgRFRPKC0xLCBcIlwiLCAtMSwgW10pO1xyXG4gICAgICAgICAgICBpZihyZXN1bHQxLmFmZmVjdGVkUm93cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDIwMCwgXCJEZWxldGUgU3VjY2Vzc1wiLCAxLCBuZXcgSG91c2Vob2xkVXNlcihyZXN1bHQyWzBdLmlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS51c2VyX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLmhvdXNlaG9sZF9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS5jcmVhdGVkX2F0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLnVwZGF0ZWRfYXQpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oNDAwLCBcIkRlbGV0ZSBGYWlsdXJlXCIsIDAsIFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbikgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGR0byk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=