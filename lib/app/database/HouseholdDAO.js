"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HouseholdDAO = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Household = require("../models/Household");

var _Item = require("../models/Item");

var _DTO = require("../database/DTO");

var mysql = _interopRequireWildcard(require("mysql"));

var util = _interopRequireWildcard(require("util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//Object Model Dependencies
//MySQL Module Dependency
//Util Module Dependency for Promisify
var HouseholdDAO = /*#__PURE__*/function () {
  function HouseholdDAO(host, port, schema, username, password) {
    (0, _classCallCheck2.default)(this, HouseholdDAO);
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
    }); //console.log(this.pool);
  } //Route::get('/households');


  (0, _createClass2.default)(HouseholdDAO, [{
    key: "readAll",
    value: function readAll(callback) {
      var households = [];
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(err, connection) {
          var result1, x, HHID, items, result2, y, dto;
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
                  return connection.query('SELECT * FROM HOUSEHOLDS');

                case 5:
                  result1 = _context.sent;
                  x = 0;

                case 7:
                  if (!(x < result1.length)) {
                    _context.next = 18;
                    break;
                  }

                  HHID = result1[x].id;
                  items = [];
                  _context.next = 12;
                  return connection.query("SELECT * FROM ITEMS WHERE HOUSEHOLD_ID=?", [HHID]);

                case 12:
                  result2 = _context.sent;

                  for (y = 0; y < result2.length; ++y) {
                    items.push(new _Item.Item(result2[y].id, result2[y].name, result2[y].description, result2[y].quantity, result2[y].household_id, result2[y].donation_flag, result2[y].created_at, result2[y].updated_at));
                  }

                  households.push(new _Household.Household(result1[x].id, result1[x].name, result1[x].street, result1[x].city, result1[x].state, result1[x].zip, result1[x].description, result1[x].created_at, result1[x].updated_at, items));

                case 15:
                  ++x;
                  _context.next = 7;
                  break;

                case 18:
                  //callback to return results
                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (households.length > 0) {
                    dto = new _DTO.DTO(200, "Get Success", households.length, households);
                  } else {
                    dto = new _DTO.DTO(404, "Get Success: No Results", households.length, []);
                  }

                  if (connection) connection.release();
                  callback(dto);

                case 22:
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
    } //Route::get('/households/{household})

  }, {
    key: "readById",
    value: function readById(id, callback) {
      var households = [];
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(err, connection) {
          var result1, x, items, result2, y, dto;
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
                  return connection.query("SELECT * FROM HOUSEHOLDS WHERE ID = ? ORDER BY NAME", id);

                case 5:
                  result1 = _context2.sent;
                  x = 0;

                case 7:
                  if (!(x < result1.length)) {
                    _context2.next = 17;
                    break;
                  }

                  items = [];
                  _context2.next = 11;
                  return connection.query("SELECT * FROM ITEMS WHERE HOUSEHOLD_ID=?", id);

                case 11:
                  result2 = _context2.sent;

                  for (y = 0; y < result2.length; ++y) {
                    items.push(new _Item.Item(result2[y].id, result2[y].name, result2[y].description, result2[y].quantity, result2[y].household_id, result2[y].donation_flag, result2[y].created_at, result2[y].updated_at));
                  }

                  households.push(new _Household.Household(result1[x].id, result1[x].name, result1[x].street, result1[x].city, result1[x].state, result1[x].zip, result1[x].description, result1[x].created_at, result1[x].updated_at, items));

                case 14:
                  ++x;
                  _context2.next = 7;
                  break;

                case 17:
                  //callback to return results
                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (households.length > 0) {
                    dto = new _DTO.DTO(200, "Get Success", households.length, households);
                  } else {
                    dto = new _DTO.DTO(404, "Get Success: No Results", households.length, []);
                  }

                  if (connection) connection.release();
                  callback(dto);

                case 21:
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
    } //Route::post('/households', [HouseholdApiController::class, 'store']);

  }, {
    key: "create",
    value: function create(household, callback) {
      //connection  
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(err, connection) {
          var dto, result1, household_id, y, result2, result3, items, result4, _y;

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
                  //dto for callback
                  dto = new _DTO.DTO(-1, "", -1, []); //Inset The Household then Items

                  connection.query = util.promisify(connection.query);
                  _context3.next = 6;
                  return connection.query('INSERT INTO HOUSEHOLDS (NAME, STREET, CITY, STATE, ZIP, DESCRIPTION, CREATED_AT, UPDATED_AT) VALUES(?,?,?,?,?,?,?,?)', [household.Name, household.Street, household.City, household.State, household.Zip, household.Description, new Date(), new Date()]);

                case 6:
                  result1 = _context3.sent;

                  if (result1.affectedRows != 1) {
                    dto = new _DTO.DTO(400, "Post Failure", 0, []);
                    callback(dto);
                  }

                  household_id = result1.insertId;
                  y = 0;

                case 10:
                  if (!(y < household.Items.length)) {
                    _context3.next = 17;
                    break;
                  }

                  _context3.next = 13;
                  return connection.query('INSERT INTO ITEMS (NAME, DESCRIPTION, QUANTITY, HOUSEHOLD_ID, CREATED_AT, UPDATED_AT) VALUES(?,?,?,?,?,?)', [household.Items[y].Name, household.Items[y].Description, household.Items[y].Quantity, household_id, new Date(), new Date()]);

                case 13:
                  result2 = _context3.sent;

                case 14:
                  ++y;
                  _context3.next = 10;
                  break;

                case 17:
                  if (!(result1.affectedRows == 1)) {
                    _context3.next = 29;
                    break;
                  }

                  _context3.next = 20;
                  return connection.query("SELECT * FROM HOUSEHOLDS WHERE ID=?", household_id);

                case 20:
                  result3 = _context3.sent;
                  items = [];
                  _context3.next = 24;
                  return connection.query("SELECT * FROM ITEMS WHERE HOUSEHOLD_ID=?", household_id);

                case 24:
                  result4 = _context3.sent;

                  for (_y = 0; _y < result4.length; ++_y) {
                    items.push(new _Item.Item(result4[_y].id, result4[_y].name, result4[_y].description, result4[_y].quantity, result4[_y].household_id, result4[_y].donation_flag, result4[_y].created_at, result4[_y].updated_at));
                  }

                  dto = new _DTO.DTO(200, "Post Success", 1, new _Household.Household(result3[0].id, result3[0].name, result3[0].street, result3[0].city, result3[0].state, result3[0].zip, result3[0].description, result3[0].created_at, result3[0].updated_at, items));
                  _context3.next = 30;
                  break;

                case 29:
                  dto = new _DTO.DTO(400, "Post Failure", 0, []);

                case 30:
                  if (connection) connection.release();
                  callback(dto);

                case 32:
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
    } //Route::put('/households/{household}', [HouseholdApiController::class, 'update']);

  }, {
    key: "update",
    value: function update(household, callback) {
      //the connection 
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(err, connection) {
          var changes, result1, dto, result3, items, result4, y;
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
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context4.next = 6;
                  return connection.query('UPDATE HOUSEHOLDS SET NAME=?, STREET=?, CITY=?, STATE=?, ZIP=?, DESCRIPTION=?, UPDATED_AT=? WHERE ID=?', [household.Name, household.Street, household.City, household.State, household.Zip, household.Description, new Date(), household.Id]);

                case 6:
                  result1 = _context4.sent;
                  //return results
                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (!(result1.changedRows != 0)) {
                    _context4.next = 20;
                    break;
                  }

                  _context4.next = 11;
                  return connection.query("SELECT * FROM HOUSEHOLDS WHERE ID = ? ORDER BY NAME", household.Id);

                case 11:
                  result3 = _context4.sent;
                  items = [];
                  _context4.next = 15;
                  return connection.query("SELECT * FROM ITEMS WHERE HOUSEHOLD_ID=?", household.Id);

                case 15:
                  result4 = _context4.sent;

                  for (y = 0; y < result4.length; ++y) {
                    items.push(new _Item.Item(result4[y].id, result4[y].name, result4[y].description, result4[y].quantity, result4[y].household_id, result4[y].donation_flag, result4[y].created_at, result4[y].updated_at));
                  }

                  dto = new _DTO.DTO(200, "Put Success", 1, new _Household.Household(result3[0].id, result3[0].name, result3[0].street, result3[0].city, result3[0].state, result3[0].zip, result3[0].description, result3[0].created_at, result3[0].updated_at, items));
                  _context4.next = 21;
                  break;

                case 20:
                  dto = new _DTO.DTO(400, "Put Failure", 0, []);

                case 21:
                  if (connection) connection.release();
                  callback(dto);

                case 23:
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
    } //Route::delete('/households/{household}', [HouseholdApiController::class, 'destroy']);

  }, {
    key: "delete",
    value: function _delete(household_id, callback) {
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(err, connection) {
          var items, result4, y, result3, result1, dto;
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
                  connection.query = util.promisify(connection.query); //get objects before deleting

                  items = [];
                  _context5.next = 6;
                  return connection.query("SELECT * FROM ITEMS WHERE HOUSEHOLD_ID=?", household_id);

                case 6:
                  result4 = _context5.sent;

                  for (y = 0; y < result4.length; ++y) {
                    items.push(new _Item.Item(result4[y].id, result4[y].name, result4[y].description, result4[y].quantity, result4[y].household_id, result4[y].donation_flag, result4[y].created_at, result4[y].updated_at));
                  }

                  _context5.next = 10;
                  return connection.query("SELECT * FROM HOUSEHOLDS WHERE ID=?", household_id);

                case 10:
                  result3 = _context5.sent;
                  _context5.next = 13;
                  return connection.query('DELETE FROM HOUSEHOLDS WHERE ID=?', household_id);

                case 13:
                  result1 = _context5.sent;
                  //return results
                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (result1.affectedRows == 1) {
                    dto = new _DTO.DTO(200, "Delete Success", 1, new _Household.Household(result3[0].id, result3[0].name, result3[0].street, result3[0].city, result3[0].state, result3[0].zip, result3[0].description, result3[0].created_at, result3[0].updated_at, items));
                  } else {
                    dto = new _DTO.DTO(400, "Delete Failure", 0, []);
                  }

                  if (connection) connection.release();
                  callback(dto);

                case 18:
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
  return HouseholdDAO;
}();

exports.HouseholdDAO = HouseholdDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9Ib3VzZWhvbGREQU8udHMiXSwibmFtZXMiOlsiSG91c2Vob2xkREFPIiwiaG9zdCIsInBvcnQiLCJzY2hlbWEiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwicG9vbCIsIm15c3FsIiwiY3JlYXRlUG9vbCIsInVzZXIiLCJkYXRhYmFzZSIsImNvbm5lY3Rpb25MaW1pdCIsImNhbGxiYWNrIiwiaG91c2Vob2xkcyIsImdldENvbm5lY3Rpb24iLCJlcnIiLCJjb25uZWN0aW9uIiwicXVlcnkiLCJ1dGlsIiwicHJvbWlzaWZ5IiwicmVzdWx0MSIsIngiLCJsZW5ndGgiLCJISElEIiwiaWQiLCJpdGVtcyIsInJlc3VsdDIiLCJ5IiwicHVzaCIsIkl0ZW0iLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJxdWFudGl0eSIsImhvdXNlaG9sZF9pZCIsImRvbmF0aW9uX2ZsYWciLCJjcmVhdGVkX2F0IiwidXBkYXRlZF9hdCIsIkhvdXNlaG9sZCIsInN0cmVldCIsImNpdHkiLCJzdGF0ZSIsInppcCIsImR0byIsIkRUTyIsInJlbGVhc2UiLCJob3VzZWhvbGQiLCJOYW1lIiwiU3RyZWV0IiwiQ2l0eSIsIlN0YXRlIiwiWmlwIiwiRGVzY3JpcHRpb24iLCJEYXRlIiwiYWZmZWN0ZWRSb3dzIiwiaW5zZXJ0SWQiLCJJdGVtcyIsIlF1YW50aXR5IiwicmVzdWx0MyIsInJlc3VsdDQiLCJjaGFuZ2VzIiwiSWQiLCJjaGFuZ2VkUm93cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7O0FBR0E7Ozs7OztBQVRBO0FBS0E7QUFHQTtJQUdhQSxZO0FBU1Qsd0JBQVlDLElBQVosRUFBeUJDLElBQXpCLEVBQXNDQyxNQUF0QyxFQUFxREMsUUFBckQsRUFBc0VDLFFBQXRFLEVBQ0E7QUFBQTtBQUFBLGdEQVJzQixFQVF0QjtBQUFBLGdEQVBzQixJQU90QjtBQUFBLG9EQU4wQixFQU0xQjtBQUFB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b0JwQixzQkFBR3ZCLE9BQU8sQ0FBQ2lDLFlBQVIsSUFBd0IsQ0FBM0IsRUFBOEI7QUFDMUJYLG9CQUFBQSxHQUFHLEdBQUcsSUFBSUMsUUFBSixDQUFRLEdBQVIsRUFBYSxnQkFBYixFQUErQixDQUEvQixFQUFrQyxJQUFJTixvQkFBSixDQUFjb0IsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXakMsRUFBekIsRUFDcENpQyxPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVczQixJQUR5QixFQUVwQzJCLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBV25CLE1BRnlCLEVBR3BDbUIsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXbEIsSUFIeUIsRUFJcENrQixPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdqQixLQUp5QixFQUtwQ2lCLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBV2hCLEdBTHlCLEVBTXBDZ0IsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXMUIsV0FOeUIsRUFPcEMwQixPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVd0QixVQVB5QixFQVFwQ3NCLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBV3JCLFVBUnlCLEVBU3BDWCxLQVRvQyxDQUFsQyxDQUFOO0FBVUgsbUJBWEQsTUFXTztBQUNIaUIsb0JBQUFBLEdBQUcsR0FBRyxJQUFJQyxRQUFKLENBQVEsR0FBUixFQUFhLGdCQUFiLEVBQStCLENBQS9CLEVBQWtDLEVBQWxDLENBQU47QUFDSDs7QUFDRCxzQkFBSTNCLFVBQUosRUFBZ0JBLFVBQVUsQ0FBQzRCLE9BQVg7QUFDaEJoQyxrQkFBQUEsUUFBUSxDQUFDOEIsR0FBRCxDQUFSOztBQW5Db0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBeEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFxQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvL09iamVjdCBNb2RlbCBEZXBlbmRlbmNpZXNcclxuaW1wb3J0IHsgSG91c2Vob2xkIH0gZnJvbSBcIi4uL21vZGVscy9Ib3VzZWhvbGRcIjtcclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuLi9tb2RlbHMvSXRlbVwiO1xyXG5pbXBvcnQgeyBEVE8gfSAgICAgICBmcm9tIFwiLi4vZGF0YWJhc2UvRFRPXCI7XHJcblxyXG4vL015U1FMIE1vZHVsZSBEZXBlbmRlbmN5XHJcbmltcG9ydCAqIGFzIG15c3FsIGZyb20gXCJteXNxbFwiO1xyXG5cclxuLy9VdGlsIE1vZHVsZSBEZXBlbmRlbmN5IGZvciBQcm9taXNpZnlcclxuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwidXRpbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhvdXNlaG9sZERBTyBcclxue1xyXG4gICAgcHJpdmF0ZSBob3N0OnN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIHBvcnQ6bnVtYmVyID0gMzMwNjtcclxuICAgIHByaXZhdGUgdXNlcm5hbWU6c3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgcGFzc3dvcmQ6c3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgc2NoZW1hOnN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIHBvb2w7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaG9zdDpzdHJpbmcsIHBvcnQ6bnVtYmVyLCBzY2hlbWE6c3RyaW5nLCB1c2VybmFtZTpzdHJpbmcsIHBhc3N3b3JkOnN0cmluZykgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5ob3N0ID0gaG9zdDtcclxuICAgICAgICB0aGlzLnBvcnQgPSBwb3J0O1xyXG4gICAgICAgIHRoaXMuc2NoZW1hID0gc2NoZW1hO1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XHJcbiAgICAgICAgdGhpcy5wb29sID0gbXlzcWwuY3JlYXRlUG9vbCh7aG9zdDogdGhpcy5ob3N0LCBwb3J0OiB0aGlzLnBvcnQsIHVzZXI6IHRoaXMudXNlcm5hbWUsIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLCBkYXRhYmFzZTogdGhpcy5zY2hlbWEsIGNvbm5lY3Rpb25MaW1pdDogMTB9KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucG9vbCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vUm91dGU6OmdldCgnL2hvdXNlaG9sZHMnKTtcclxuICAgIHB1YmxpYyByZWFkQWxsKGNhbGxiYWNrOiBhbnkpIFxyXG4gICAge1xyXG4gICAgICAgIGxldCBob3VzZWhvbGRzOkhvdXNlaG9sZFtdID0gW107XHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcbiAgICAgICAgICAgIC8vdXNlIFByb21pc2Z5XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIEhPVVNFSE9MRFMnKTtcclxuICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJlc3VsdDEubGVuZ3RoOysreClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IEhISUQgPSByZXN1bHQxW3hdLmlkO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zOkl0ZW1bXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDIgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBJVEVNUyBXSEVSRSBIT1VTRUhPTERfSUQ9P1wiLCBbSEhJRF0pO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCB5PTA7eSA8IHJlc3VsdDIubGVuZ3RoOysreSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKG5ldyBJdGVtKHJlc3VsdDJbeV0uaWQsIHJlc3VsdDJbeV0ubmFtZSwgcmVzdWx0Mlt5XS5kZXNjcmlwdGlvbiwgcmVzdWx0Mlt5XS5xdWFudGl0eSwgcmVzdWx0Mlt5XS5ob3VzZWhvbGRfaWQsIHJlc3VsdDJbeV0uZG9uYXRpb25fZmxhZywgcmVzdWx0Mlt5XS5jcmVhdGVkX2F0LCByZXN1bHQyW3ldLnVwZGF0ZWRfYXQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGhvdXNlaG9sZHMucHVzaChuZXcgSG91c2Vob2xkKHJlc3VsdDFbeF0uaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnN0cmVldCxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmNpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnppcCxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uY3JlYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnVwZGF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2NhbGxiYWNrIHRvIHJldHVybiByZXN1bHRzXHJcbiAgICAgICAgICAgIGxldCBkdG8gPSBuZXcgRFRPKC0xLCBcIlwiLCAtMSwgW10pO1xyXG4gICAgICAgICAgICBpZihob3VzZWhvbGRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oMjAwLCBcIkdldCBTdWNjZXNzXCIsIGhvdXNlaG9sZHMubGVuZ3RoLCBob3VzZWhvbGRzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oNDA0LCBcIkdldCBTdWNjZXNzOiBObyBSZXN1bHRzXCIsIGhvdXNlaG9sZHMubGVuZ3RoLCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24pIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhkdG8pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy9Sb3V0ZTo6Z2V0KCcvaG91c2Vob2xkcy97aG91c2Vob2xkfSlcclxuICAgIHB1YmxpYyByZWFkQnlJZChpZDpzdHJpbmcsIGNhbGxiYWNrOiBhbnkpIFxyXG4gICAge1xyXG4gICAgICAgIGxldCBob3VzZWhvbGRzOkhvdXNlaG9sZFtdID0gW107XHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgICAvL3VzZSBQcm9taXNmeVxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gSE9VU0VIT0xEUyBXSEVSRSBJRCA9ID8gT1JERVIgQlkgTkFNRVwiLCBpZCk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtczpJdGVtW10gPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQyID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gSVRFTVMgV0hFUkUgSE9VU0VIT0xEX0lEPT9cIiwgaWQpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCB5PTA7eSA8IHJlc3VsdDIubGVuZ3RoOysreSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKG5ldyBJdGVtKHJlc3VsdDJbeV0uaWQsIHJlc3VsdDJbeV0ubmFtZSwgcmVzdWx0Mlt5XS5kZXNjcmlwdGlvbiwgcmVzdWx0Mlt5XS5xdWFudGl0eSwgcmVzdWx0Mlt5XS5ob3VzZWhvbGRfaWQsIHJlc3VsdDJbeV0uZG9uYXRpb25fZmxhZywgcmVzdWx0Mlt5XS5jcmVhdGVkX2F0LCByZXN1bHQyW3ldLnVwZGF0ZWRfYXQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGhvdXNlaG9sZHMucHVzaChuZXcgSG91c2Vob2xkKHJlc3VsdDFbeF0uaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnN0cmVldCxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmNpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnppcCxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uY3JlYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnVwZGF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9jYWxsYmFjayB0byByZXR1cm4gcmVzdWx0c1xyXG4gICAgICAgICAgICBsZXQgZHRvID0gbmV3IERUTygtMSwgXCJcIiwgLTEsIFtdKTtcclxuICAgICAgICAgICAgaWYoaG91c2Vob2xkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDIwMCwgXCJHZXQgU3VjY2Vzc1wiLCBob3VzZWhvbGRzLmxlbmd0aCwgaG91c2Vob2xkcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDQwNCwgXCJHZXQgU3VjY2VzczogTm8gUmVzdWx0c1wiLCBob3VzZWhvbGRzLmxlbmd0aCwgW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uKSBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soZHRvKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vUm91dGU6OnBvc3QoJy9ob3VzZWhvbGRzJywgW0hvdXNlaG9sZEFwaUNvbnRyb2xsZXI6OmNsYXNzLCAnc3RvcmUnXSk7XHJcbiAgICBwdWJsaWMgY3JlYXRlKGhvdXNlaG9sZDpIb3VzZWhvbGQsIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgLy9jb25uZWN0aW9uICBcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuXHJcbiAgICAgICAgICAgIC8vZHRvIGZvciBjYWxsYmFja1xyXG4gICAgICAgICAgICBsZXQgZHRvID0gbmV3IERUTygtMSwgXCJcIiwgLTEsIFtdKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vSW5zZXQgVGhlIEhvdXNlaG9sZCB0aGVuIEl0ZW1zXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdJTlNFUlQgSU5UTyBIT1VTRUhPTERTIChOQU1FLCBTVFJFRVQsIENJVFksIFNUQVRFLCBaSVAsIERFU0NSSVBUSU9OLCBDUkVBVEVEX0FULCBVUERBVEVEX0FUKSBWQUxVRVMoPyw/LD8sPyw/LD8sPyw/KScsIFtob3VzZWhvbGQuTmFtZSwgaG91c2Vob2xkLlN0cmVldCwgaG91c2Vob2xkLkNpdHksIGhvdXNlaG9sZC5TdGF0ZSwgaG91c2Vob2xkLlppcCwgaG91c2Vob2xkLkRlc2NyaXB0aW9uLCBuZXcgRGF0ZSgpLCBuZXcgRGF0ZSgpXSk7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdDEuYWZmZWN0ZWRSb3dzICE9IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oNDAwLCBcIlBvc3QgRmFpbHVyZVwiLCAwLCBbXSk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhkdG8pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaG91c2Vob2xkX2lkID0gcmVzdWx0MS5pbnNlcnRJZDtcclxuICAgICAgICAgICAgZm9yKGxldCB5PTA7eSA8IGhvdXNlaG9sZC5JdGVtcy5sZW5ndGg7Kyt5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MiA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0lOU0VSVCBJTlRPIElURU1TIChOQU1FLCBERVNDUklQVElPTiwgUVVBTlRJVFksIEhPVVNFSE9MRF9JRCwgQ1JFQVRFRF9BVCwgVVBEQVRFRF9BVCkgVkFMVUVTKD8sPyw/LD8sPyw/KScsIFtob3VzZWhvbGQuSXRlbXNbeV0uTmFtZSwgaG91c2Vob2xkLkl0ZW1zW3ldLkRlc2NyaXB0aW9uLCBob3VzZWhvbGQuSXRlbXNbeV0uUXVhbnRpdHksIGhvdXNlaG9sZF9pZCwgbmV3IERhdGUoKSwgbmV3IERhdGUoKV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2dldCBuZXcgaXRlbXMgYW5kIGNhbGxiYWNrIHJlc3VsdHNcclxuICAgICAgICAgICAgaWYocmVzdWx0MS5hZmZlY3RlZFJvd3MgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDMgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBIT1VTRUhPTERTIFdIRVJFIElEPT9cIiwgaG91c2Vob2xkX2lkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXM6SXRlbVtdID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0NCA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIElURU1TIFdIRVJFIEhPVVNFSE9MRF9JRD0/XCIsIGhvdXNlaG9sZF9pZCk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IHk9MDt5IDwgcmVzdWx0NC5sZW5ndGg7Kyt5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2gobmV3IEl0ZW0ocmVzdWx0NFt5XS5pZCwgcmVzdWx0NFt5XS5uYW1lLCByZXN1bHQ0W3ldLmRlc2NyaXB0aW9uLCByZXN1bHQ0W3ldLnF1YW50aXR5LCByZXN1bHQ0W3ldLmhvdXNlaG9sZF9pZCwgcmVzdWx0NFt5XS5kb25hdGlvbl9mbGFnLCByZXN1bHQ0W3ldLmNyZWF0ZWRfYXQsIHJlc3VsdDRbeV0udXBkYXRlZF9hdCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTygyMDAsIFwiUG9zdCBTdWNjZXNzXCIsIDEsIG5ldyBIb3VzZWhvbGQocmVzdWx0M1swXS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLnN0cmVldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0uY2l0eSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLnppcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLmNyZWF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLnVwZGF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcykpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTyg0MDAsIFwiUG9zdCBGYWlsdXJlXCIsIDAsIFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbikgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGR0byk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9Sb3V0ZTo6cHV0KCcvaG91c2Vob2xkcy97aG91c2Vob2xkfScsIFtIb3VzZWhvbGRBcGlDb250cm9sbGVyOjpjbGFzcywgJ3VwZGF0ZSddKTtcclxuICAgIHB1YmxpYyB1cGRhdGUoaG91c2Vob2xkOmFueSwgY2FsbGJhY2s6IGFueSlcclxuICAgIHtcclxuICAgICAgICAvL3RoZSBjb25uZWN0aW9uIFxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG4gICAgICAgICAgICAvL3VzZSBQcm9taXNmeVxyXG4gICAgICAgICAgICBsZXQgY2hhbmdlcyA9IDA7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdVUERBVEUgSE9VU0VIT0xEUyBTRVQgTkFNRT0/LCBTVFJFRVQ9PywgQ0lUWT0/LCBTVEFURT0/LCBaSVA9PywgREVTQ1JJUFRJT049PywgVVBEQVRFRF9BVD0/IFdIRVJFIElEPT8nLCBbaG91c2Vob2xkLk5hbWUsIGhvdXNlaG9sZC5TdHJlZXQsIGhvdXNlaG9sZC5DaXR5LCBob3VzZWhvbGQuU3RhdGUsIGhvdXNlaG9sZC5aaXAsIGhvdXNlaG9sZC5EZXNjcmlwdGlvbiwgbmV3IERhdGUoKSwgaG91c2Vob2xkLklkXSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3JldHVybiByZXN1bHRzXHJcbiAgICAgICAgICAgIGxldCBkdG8gPSBuZXcgRFRPKC0xLCBcIlwiLCAtMSwgW10pO1xyXG4gICAgICAgICAgICBpZihyZXN1bHQxLmNoYW5nZWRSb3dzICE9IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQzID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gSE9VU0VIT0xEUyBXSEVSRSBJRCA9ID8gT1JERVIgQlkgTkFNRVwiLCBob3VzZWhvbGQuSWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpdGVtczpJdGVtW10gPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ0ID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gSVRFTVMgV0hFUkUgSE9VU0VIT0xEX0lEPT9cIiwgaG91c2Vob2xkLklkKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgeT0wO3kgPCByZXN1bHQ0Lmxlbmd0aDsrK3kpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaChuZXcgSXRlbShyZXN1bHQ0W3ldLmlkLCByZXN1bHQ0W3ldLm5hbWUsIHJlc3VsdDRbeV0uZGVzY3JpcHRpb24sIHJlc3VsdDRbeV0ucXVhbnRpdHksIHJlc3VsdDRbeV0uaG91c2Vob2xkX2lkLCByZXN1bHQ0W3ldLmRvbmF0aW9uX2ZsYWcsIHJlc3VsdDRbeV0uY3JlYXRlZF9hdCwgcmVzdWx0NFt5XS51cGRhdGVkX2F0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDIwMCwgXCJQdXQgU3VjY2Vzc1wiLCAxLCBuZXcgSG91c2Vob2xkKHJlc3VsdDNbMF0uaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLnN0cmVldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLmNpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0M1swXS5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLnppcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0uY3JlYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLnVwZGF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oNDAwLCBcIlB1dCBGYWlsdXJlXCIsIDAsIFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbikgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGR0byk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9Sb3V0ZTo6ZGVsZXRlKCcvaG91c2Vob2xkcy97aG91c2Vob2xkfScsIFtIb3VzZWhvbGRBcGlDb250cm9sbGVyOjpjbGFzcywgJ2Rlc3Ryb3knXSk7XHJcbiAgICBwdWJsaWMgZGVsZXRlKGhvdXNlaG9sZF9pZDpudW1iZXIsIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgICAvL3VzZSBQcm9taXNmeVxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIC8vZ2V0IG9iamVjdHMgYmVmb3JlIGRlbGV0aW5nXHJcbiAgICAgICAgICAgIGxldCBpdGVtczpJdGVtW10gPSBbXTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDQgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBJVEVNUyBXSEVSRSBIT1VTRUhPTERfSUQ9P1wiLCBob3VzZWhvbGRfaWQpO1xyXG4gICAgICAgICAgICBmb3IobGV0IHk9MDt5IDwgcmVzdWx0NC5sZW5ndGg7Kyt5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKG5ldyBJdGVtKHJlc3VsdDRbeV0uaWQsIHJlc3VsdDRbeV0ubmFtZSwgcmVzdWx0NFt5XS5kZXNjcmlwdGlvbiwgcmVzdWx0NFt5XS5xdWFudGl0eSwgcmVzdWx0NFt5XS5ob3VzZWhvbGRfaWQsIHJlc3VsdDRbeV0uZG9uYXRpb25fZmxhZywgcmVzdWx0NFt5XS5jcmVhdGVkX2F0LCByZXN1bHQ0W3ldLnVwZGF0ZWRfYXQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MyA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIEhPVVNFSE9MRFMgV0hFUkUgSUQ9P1wiLCBob3VzZWhvbGRfaWQpO1xyXG5cclxuICAgICAgICAgICAgLy9kZWxldGUgSEhcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdERUxFVEUgRlJPTSBIT1VTRUhPTERTIFdIRVJFIElEPT8nLCBob3VzZWhvbGRfaWQpO1xyXG5cclxuICAgICAgICAgICAgLy9yZXR1cm4gcmVzdWx0c1xyXG4gICAgICAgICAgICBsZXQgZHRvID0gbmV3IERUTygtMSwgXCJcIiwgLTEsIFtdKTtcclxuICAgICAgICAgICAgaWYocmVzdWx0MS5hZmZlY3RlZFJvd3MgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTygyMDAsIFwiRGVsZXRlIFN1Y2Nlc3NcIiwgMSwgbmV3IEhvdXNlaG9sZChyZXN1bHQzWzBdLmlkLCBcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0M1swXS5zdHJlZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0M1swXS5jaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0M1swXS56aXAsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0M1swXS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLmNyZWF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0M1swXS51cGRhdGVkX2F0LFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDQwMCwgXCJEZWxldGUgRmFpbHVyZVwiLCAwLCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24pIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhkdG8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19