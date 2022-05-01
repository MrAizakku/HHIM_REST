"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserDAO = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _User = require("../models/User");

var _DTO = require("../database/DTO");

var util = _interopRequireWildcard(require("util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//Object Model Dependencies
//Util Module Dependency for Promisify
var UserDAO = /*#__PURE__*/function () {
  function UserDAO(pool) {
    (0, _classCallCheck2.default)(this, UserDAO);
    (0, _defineProperty2.default)(this, "pool", void 0);
    this.pool = pool;
  }
  /************************
   *         USER         *
   ************************/


  (0, _createClass2.default)(UserDAO, [{
    key: "authenticate",
    value: function authenticate(e, p, callback) {
      var pass = false;
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(err, connection) {
          var result1;
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
                  return connection.query('SELECT * FROM USERS WHERE EMAIL = ? AND PASSWORD = ?', [e, p]);

                case 5:
                  result1 = _context.sent;

                  //callback to return results
                  if (result1.length > 0) {
                    pass = true;
                  }

                  if (connection) {
                    connection.release();
                  }

                  callback(pass);

                case 9:
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
    key: "readAll",
    value: function readAll(callback) {
      var users = [];
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
                  return connection.query('SELECT * FROM USERS');

                case 5:
                  result1 = _context2.sent;

                  for (x = 0; x < result1.length; ++x) {
                    users.push(new _User.User(result1[x].id, result1[x].first_name, result1[x].last_name, result1[x].email, "HIDDEN", result1[x].created_at, result1[x].updated_at));
                  } //callback to return results


                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (users.length > 0) {
                    dto = new _DTO.DTO(200, "Get Success", users.length, users);
                  } else {
                    dto = new _DTO.DTO(404, "Get Success: No Results", users.length, []);
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
    key: "readById",
    value: function readById(id, callback) {
      var users = [];
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
                  return connection.query("SELECT * FROM USERS WHERE ID = ?", id);

                case 5:
                  result1 = _context3.sent;

                  for (x = 0; x < result1.length; ++x) {
                    users.push(new _User.User(result1[x].id, result1[x].first_name, result1[x].last_name, result1[x].email, "HIDDEN", result1[x].created_at, result1[x].updated_at));
                  } //return results


                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (users.length > 0) {
                    dto = new _DTO.DTO(200, "Get Success", users.length, users);
                  } else {
                    dto = new _DTO.DTO(404, "Get Success: No Results", users.length, []);
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
    key: "readByEmail",
    value: function readByEmail(email, callback) {
      var users = [];
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(err, connection) {
          var result1, x, dto;
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
                  return connection.query("SELECT * FROM USERS WHERE EMAIL = ?", email);

                case 5:
                  result1 = _context4.sent;

                  for (x = 0; x < result1.length; ++x) {
                    users.push(new _User.User(result1[x].id, result1[x].first_name, result1[x].last_name, result1[x].email, "HIDDEN", result1[x].created_at, result1[x].updated_at));
                  } //return results


                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (users.length > 0) {
                    dto = new _DTO.DTO(200, "Get Success", users.length, users);
                  } else {
                    dto = new _DTO.DTO(404, "Get Success: No Results", users.length, []);
                  }

                  if (connection) connection.release();
                  callback(dto);

                case 11:
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
    key: "create",
    value: function create(user, callback) {
      //connection  
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(err, connection) {
          var result1, dto, result2;
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
                  connection.query = util.promisify(connection.query);
                  _context5.next = 5;
                  return connection.query('INSERT INTO USERS (FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, CREATED_AT, UPDATED_AT) VALUES(?,?,?,?,?,?)', [user.First_name, user.Last_name, user.Email, user.Password, new Date(), new Date()]);

                case 5:
                  result1 = _context5.sent;
                  //return results
                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (!(result1.affectedRows == 1)) {
                    _context5.next = 14;
                    break;
                  }

                  _context5.next = 10;
                  return connection.query("SELECT * FROM USERS WHERE ID = ?", result1.insertId);

                case 10:
                  result2 = _context5.sent;
                  dto = new _DTO.DTO(200, "Post Success", 1, new _User.User(result2[0].id, result2[0].first_name, result2[0].last_name, result2[0].email, "HIDDEN", result2[0].created_at, result2[0].updated_at));
                  _context5.next = 15;
                  break;

                case 14:
                  dto = new _DTO.DTO(400, "Post Failure", 0, []);

                case 15:
                  if (connection) connection.release();
                  callback(dto);

                case 17:
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
  }, {
    key: "update",
    value: function update(user, callback) {
      //the connection 
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(err, connection) {
          var result1, dto, result2;
          return _regenerator.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  if (!err) {
                    _context6.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  //use Promisfy
                  connection.query = util.promisify(connection.query);
                  _context6.next = 5;
                  return connection.query('UPDATE USERS SET FIRST_NAME=?, LAST_NAME=?, EMAIL=?, PASSWORD=?, UPDATED_AT=? WHERE ID=?', [user.First_name, user.Last_name, user.Email, user.Password, new Date(), user.Id]);

                case 5:
                  result1 = _context6.sent;
                  //return results
                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (!(result1.changedRows != 0)) {
                    _context6.next = 14;
                    break;
                  }

                  _context6.next = 10;
                  return connection.query("SELECT * FROM USERS WHERE ID = ?", user.Id);

                case 10:
                  result2 = _context6.sent;
                  dto = new _DTO.DTO(200, "Update Success", 1, new _User.User(result2[0].id, result2[0].first_name, result2[0].last_name, result2[0].email, "HIDDEN", result2[0].created_at, result2[0].updated_at));
                  _context6.next = 15;
                  break;

                case 14:
                  dto = new _DTO.DTO(404, "Update Failure", 0, []);

                case 15:
                  if (connection) connection.release();
                  callback(dto);

                case 17:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        return function (_x11, _x12) {
          return _ref6.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "delete",
    value: function _delete(id, callback) {
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(err, connection) {
          var result2, result1, dto;
          return _regenerator.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  if (!err) {
                    _context7.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  //use Promisfy
                  connection.query = util.promisify(connection.query); //get object before deleting

                  _context7.next = 5;
                  return connection.query("SELECT * FROM USERS WHERE ID = ?", id);

                case 5:
                  result2 = _context7.sent;
                  _context7.next = 8;
                  return connection.query('DELETE FROM USERS WHERE ID=?', id);

                case 8:
                  result1 = _context7.sent;
                  //return results in DTO
                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (result1.affectedRows == 1) {
                    dto = new _DTO.DTO(200, "Delete Success", 1, new _User.User(result2[0].id, result2[0].first_name, result2[0].last_name, result2[0].email, "HIDDEN", result2[0].created_at, result2[0].updated_at));
                  } else {
                    dto = new _DTO.DTO(400, "Delete Failure", 0, []);
                  }

                  if (connection) connection.release();
                  callback(dto);

                case 13:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7);
        }));

        return function (_x13, _x14) {
          return _ref7.apply(this, arguments);
        };
      }());
    }
  }]);
  return UserDAO;
}();

exports.UserDAO = UserDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9Vc2VyREFPLnRzIl0sIm5hbWVzIjpbIlVzZXJEQU8iLCJwb29sIiwiZSIsInAiLCJjYWxsYmFjayIsInBhc3MiLCJnZXRDb25uZWN0aW9uIiwiZXJyIiwiY29ubmVjdGlvbiIsInF1ZXJ5IiwidXRpbCIsInByb21pc2lmeSIsInJlc3VsdDEiLCJsZW5ndGgiLCJyZWxlYXNlIiwidXNlcnMiLCJ4IiwicHVzaCIsIlVzZXIiLCJpZCIsImZpcnN0X25hbWUiLCJsYXN0X25hbWUiLCJlbWFpbCIsImNyZWF0ZWRfYXQiLCJ1cGRhdGVkX2F0IiwiZHRvIiwiRFRPIiwidXNlciIsIkZpcnN0X25hbWUiLCJMYXN0X25hbWUiLCJFbWFpbCIsIlBhc3N3b3JkIiwiRGF0ZSIsImFmZmVjdGVkUm93cyIsImluc2VydElkIiwicmVzdWx0MiIsIklkIiwiY2hhbmdlZFJvd3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOztBQUNBOztBQUdBOzs7Ozs7QUFMQTtBQUlBO0lBR2FBLE87QUFJVCxtQkFBWUMsSUFBWixFQUNBO0FBQUE7QUFBQTtBQUNJLFNBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNIO0FBRUQ7QUFDSjtBQUNBOzs7OztXQUNLLHNCQUFvQkMsQ0FBcEIsRUFBMkJDLENBQTNCLEVBQWtDQyxRQUFsQyxFQUNBO0FBQ0ksVUFBSUMsSUFBWSxHQUFHLEtBQW5CO0FBQ0EsV0FBS0osSUFBTCxDQUFVSyxhQUFWO0FBQUEsMkZBQXdCLGlCQUFlQyxHQUFmLEVBQXdCQyxVQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFaEJELEdBRmdCO0FBQUE7QUFBQTtBQUFBOztBQUFBLHdCQUVMQSxHQUZLOztBQUFBO0FBR3BCO0FBQ0FDLGtCQUFBQSxVQUFVLENBQUNDLEtBQVgsR0FBbUJDLElBQUksQ0FBQ0MsU0FBTCxDQUFlSCxVQUFVLENBQUNDLEtBQTFCLENBQW5CO0FBSm9CO0FBQUEseUJB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O0FBQUE7QUFBQTtBQUFBLFNBQXhCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUJIIiwic291cmNlc0NvbnRlbnQiOlsiLy9PYmplY3QgTW9kZWwgRGVwZW5kZW5jaWVzXHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vbW9kZWxzL1VzZXJcIjtcclxuaW1wb3J0IHsgRFRPIH0gIGZyb20gXCIuLi9kYXRhYmFzZS9EVE9cIjtcclxuXHJcbi8vVXRpbCBNb2R1bGUgRGVwZW5kZW5jeSBmb3IgUHJvbWlzaWZ5XHJcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBVc2VyREFPIFxyXG57XHJcbiAgICBwcml2YXRlIHBvb2w7XHJcblxyXG4gICAgY29uc3RydWN0b3IocG9vbDogYW55KSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLnBvb2wgPSBwb29sO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAqICAgICAgICAgVVNFUiAgICAgICAgICpcclxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAgcHVibGljIGF1dGhlbnRpY2F0ZShlOmFueSwgcDphbnksIGNhbGxiYWNrOiBhbnkpIFxyXG4gICAgIHtcclxuICAgICAgICAgbGV0IHBhc3M6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICAge1xyXG4gICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG4gICAgICAgICAgICAgLy91c2UgUHJvbWlzZnlcclxuICAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBVU0VSUyBXSEVSRSBFTUFJTCA9ID8gQU5EIFBBU1NXT1JEID0gPycsIFtlLCBwXSk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIC8vY2FsbGJhY2sgdG8gcmV0dXJuIHJlc3VsdHNcclxuICAgICAgICAgICAgIGlmKHJlc3VsdDEubGVuZ3RoID4gMCkgeyBwYXNzID0gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24pIHsgY29ubmVjdGlvbi5yZWxlYXNlKCk7IH1cclxuICAgICAgICAgICAgIGNhbGxiYWNrKHBhc3MpO1xyXG4gICAgICAgICB9KVxyXG4gICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVhZEFsbChjYWxsYmFjazogYW55KSBcclxuICAgIHtcclxuICAgICAgICBsZXQgdXNlcnM6VXNlcltdID0gW107XHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcbiAgICAgICAgICAgIC8vdXNlIFByb21pc2Z5XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIFVTRVJTJyk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHVzZXJzLnB1c2gobmV3IFVzZXIocmVzdWx0MVt4XS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uZmlyc3RfbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5sYXN0X25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiSElEREVOXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uY3JlYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS51cGRhdGVkX2F0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jYWxsYmFjayB0byByZXR1cm4gcmVzdWx0c1xyXG4gICAgICAgICAgICBsZXQgZHRvID0gbmV3IERUTygtMSwgXCJcIiwgLTEsIFtdKTtcclxuICAgICAgICAgICAgaWYodXNlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTygyMDAsIFwiR2V0IFN1Y2Nlc3NcIiwgdXNlcnMubGVuZ3RoLCB1c2Vycyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDQwNCwgXCJHZXQgU3VjY2VzczogTm8gUmVzdWx0c1wiLCB1c2Vycy5sZW5ndGgsIFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbikgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGR0byk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVhZEJ5SWQoaWQ6c3RyaW5nLCBjYWxsYmFjazogYW55KSBcclxuICAgIHtcclxuICAgICAgICBsZXQgdXNlcnM6VXNlcltdID0gW107XHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgICAvL3VzZSBQcm9taXNmeVxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gVVNFUlMgV0hFUkUgSUQgPSA/XCIsIGlkKTtcclxuICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJlc3VsdDEubGVuZ3RoOysreClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdXNlcnMucHVzaChuZXcgVXNlcihyZXN1bHQxW3hdLmlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5maXJzdF9uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmxhc3RfbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5lbWFpbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJISURERU5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5jcmVhdGVkX2F0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnVwZGF0ZWRfYXQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3JldHVybiByZXN1bHRzXHJcbiAgICAgICAgICAgIGxldCBkdG8gPSBuZXcgRFRPKC0xLCBcIlwiLCAtMSwgW10pO1xyXG4gICAgICAgICAgICBpZih1c2Vycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDIwMCwgXCJHZXQgU3VjY2Vzc1wiLCB1c2Vycy5sZW5ndGgsIHVzZXJzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oNDA0LCBcIkdldCBTdWNjZXNzOiBObyBSZXN1bHRzXCIsIHVzZXJzLmxlbmd0aCwgW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uKSBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soZHRvKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWFkQnlFbWFpbChlbWFpbDpzdHJpbmcsIGNhbGxiYWNrOiBhbnkpIFxyXG4gICAge1xyXG4gICAgICAgIGxldCB1c2VyczpVc2VyW10gPSBbXTtcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuXHJcbiAgICAgICAgICAgIC8vdXNlIFByb21pc2Z5XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBVU0VSUyBXSEVSRSBFTUFJTCA9ID9cIiwgZW1haWwpO1xyXG4gICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB1c2Vycy5wdXNoKG5ldyBVc2VyKHJlc3VsdDFbeF0uaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmZpcnN0X25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0ubGFzdF9uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkhJRERFTlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmNyZWF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0udXBkYXRlZF9hdCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIHJlc3VsdHNcclxuICAgICAgICAgICAgbGV0IGR0byA9IG5ldyBEVE8oLTEsIFwiXCIsIC0xLCBbXSk7XHJcbiAgICAgICAgICAgIGlmKHVzZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oMjAwLCBcIkdldCBTdWNjZXNzXCIsIHVzZXJzLmxlbmd0aCwgdXNlcnMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTyg0MDQsIFwiR2V0IFN1Y2Nlc3M6IE5vIFJlc3VsdHNcIiwgdXNlcnMubGVuZ3RoLCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24pIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhkdG8pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZSh1c2VyOlVzZXIsIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgLy9jb25uZWN0aW9uICBcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuXHJcbiAgICAgICAgICAgIC8vdXNlIFByb21pc2Z5XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdJTlNFUlQgSU5UTyBVU0VSUyAoRklSU1RfTkFNRSwgTEFTVF9OQU1FLCBFTUFJTCwgUEFTU1dPUkQsIENSRUFURURfQVQsIFVQREFURURfQVQpIFZBTFVFUyg/LD8sPyw/LD8sPyknLCBbdXNlci5GaXJzdF9uYW1lLCB1c2VyLkxhc3RfbmFtZSwgdXNlci5FbWFpbCwgdXNlci5QYXNzd29yZCwgbmV3IERhdGUoKSwgbmV3IERhdGUoKV0pO1xyXG4gICAgICAgICAgICAvL3JldHVybiByZXN1bHRzXHJcbiAgICAgICAgICAgIGxldCBkdG8gPSBuZXcgRFRPKC0xLCBcIlwiLCAtMSwgW10pO1xyXG4gICAgICAgICAgICBpZihyZXN1bHQxLmFmZmVjdGVkUm93cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MiA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIFVTRVJTIFdIRVJFIElEID0gP1wiLCByZXN1bHQxLmluc2VydElkKTsgICAgICAgXHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDIwMCwgXCJQb3N0IFN1Y2Nlc3NcIiwgMSwgbmV3IFVzZXIocmVzdWx0MlswXS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLmZpcnN0X25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLmxhc3RfbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0uZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkhJRERFTlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS5jcmVhdGVkX2F0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS51cGRhdGVkX2F0KSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDQwMCwgXCJQb3N0IEZhaWx1cmVcIiwgMCwgW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uKSBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soZHRvKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKHVzZXI6YW55LCBjYWxsYmFjazogYW55KVxyXG4gICAge1xyXG4gICAgICAgIC8vdGhlIGNvbm5lY3Rpb24gXHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcbiAgICAgICAgICAgIC8vdXNlIFByb21pc2Z5XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdVUERBVEUgVVNFUlMgU0VUIEZJUlNUX05BTUU9PywgTEFTVF9OQU1FPT8sIEVNQUlMPT8sIFBBU1NXT1JEPT8sIFVQREFURURfQVQ9PyBXSEVSRSBJRD0/JywgW3VzZXIuRmlyc3RfbmFtZSwgdXNlci5MYXN0X25hbWUsIHVzZXIuRW1haWwsIHVzZXIuUGFzc3dvcmQsIG5ldyBEYXRlKCksIHVzZXIuSWRdKTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gcmVzdWx0c1xyXG4gICAgICAgICAgICBsZXQgZHRvID0gbmV3IERUTygtMSwgXCJcIiwgLTEsIFtdKTtcclxuICAgICAgICAgICAgaWYocmVzdWx0MS5jaGFuZ2VkUm93cyAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MiA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIFVTRVJTIFdIRVJFIElEID0gP1wiLCB1c2VyLklkKTtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oMjAwLCBcIlVwZGF0ZSBTdWNjZXNzXCIsIDEsIG5ldyBVc2VyKHJlc3VsdDJbMF0uaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLmZpcnN0X25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0ubGFzdF9uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkhJRERFTlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0uY3JlYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS51cGRhdGVkX2F0KSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDQwNCwgXCJVcGRhdGUgRmFpbHVyZVwiLCAwLCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24pIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhkdG8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxldGUoaWQ6bnVtYmVyLCBjYWxsYmFjazogYW55KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG5cclxuICAgICAgICAgICAgLy91c2UgUHJvbWlzZnlcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICAvL2dldCBvYmplY3QgYmVmb3JlIGRlbGV0aW5nXHJcbiAgICAgICAgICAgIGxldCByZXN1bHQyID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gVVNFUlMgV0hFUkUgSUQgPSA/XCIsIGlkKTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdERUxFVEUgRlJPTSBVU0VSUyBXSEVSRSBJRD0/JywgaWQpO1xyXG4gICAgICAgICAgICAvL3JldHVybiByZXN1bHRzIGluIERUT1xyXG4gICAgICAgICAgICBsZXQgZHRvID0gbmV3IERUTygtMSwgXCJcIiwgLTEsIFtdKTtcclxuICAgICAgICAgICAgaWYocmVzdWx0MS5hZmZlY3RlZFJvd3MgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTygyMDAsIFwiRGVsZXRlIFN1Y2Nlc3NcIiwgMSwgbmV3IFVzZXIocmVzdWx0MlswXS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0uZmlyc3RfbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS5sYXN0X25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0uZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiSElEREVOXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0uY3JlYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS51cGRhdGVkX2F0KSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDQwMCwgXCJEZWxldGUgRmFpbHVyZVwiLCAwLCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24pIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhkdG8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19