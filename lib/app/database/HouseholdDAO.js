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

var util = _interopRequireWildcard(require("util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//Object Model Dependencies
//Util Module Dependency for Promisify
var HouseholdDAO = /*#__PURE__*/function () {
  function HouseholdDAO(pool) {
    (0, _classCallCheck2.default)(this, HouseholdDAO);
    (0, _defineProperty2.default)(this, "pool", void 0);
    this.pool = pool;
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
    }
  }, {
    key: "readAllByUserId",
    value: function readAllByUserId(id, callback) {
      var households = [];
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(err, connection) {
          var result1, x, HHID, items, result2, y, dto;
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
                  return connection.query('SELECT HOUSEHOLDS.*, HOUSEHOLD_USERS.USER_ID FROM HOUSEHOLDS JOIN HOUSEHOLD_USERS ON HOUSEHOLD_USERS.HOUSEHOLD_ID = HOUSEHOLDS.ID WHERE HOUSEHOLD_USERS.USER_ID=' + id);

                case 5:
                  result1 = _context2.sent;
                  x = 0;

                case 7:
                  if (!(x < result1.length)) {
                    _context2.next = 18;
                    break;
                  }

                  HHID = result1[x].id;
                  items = [];
                  _context2.next = 12;
                  return connection.query("SELECT * FROM ITEMS WHERE HOUSEHOLD_ID=?", [HHID]);

                case 12:
                  result2 = _context2.sent;

                  for (y = 0; y < result2.length; ++y) {
                    items.push(new _Item.Item(result2[y].id, result2[y].name, result2[y].description, result2[y].quantity, result2[y].household_id, result2[y].donation_flag, result2[y].created_at, result2[y].updated_at));
                  }

                  households.push(new _Household.Household(result1[x].id, result1[x].name, result1[x].street, result1[x].city, result1[x].state, result1[x].zip, result1[x].description, result1[x].created_at, result1[x].updated_at, items));

                case 15:
                  ++x;
                  _context2.next = 7;
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
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    } //Route::get('/households/{household})

  }, {
    key: "readById",
    value: function readById(id, callback) {
      var households = [];
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(err, connection) {
          var result1, x, items, result2, y, dto;
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
                  return connection.query("SELECT * FROM HOUSEHOLDS WHERE ID = ? ORDER BY NAME", id);

                case 5:
                  result1 = _context3.sent;
                  x = 0;

                case 7:
                  if (!(x < result1.length)) {
                    _context3.next = 17;
                    break;
                  }

                  items = [];
                  _context3.next = 11;
                  return connection.query("SELECT * FROM ITEMS WHERE HOUSEHOLD_ID=?", id);

                case 11:
                  result2 = _context3.sent;

                  for (y = 0; y < result2.length; ++y) {
                    items.push(new _Item.Item(result2[y].id, result2[y].name, result2[y].description, result2[y].quantity, result2[y].household_id, result2[y].donation_flag, result2[y].created_at, result2[y].updated_at));
                  }

                  households.push(new _Household.Household(result1[x].id, result1[x].name, result1[x].street, result1[x].city, result1[x].state, result1[x].zip, result1[x].description, result1[x].created_at, result1[x].updated_at, items));

                case 14:
                  ++x;
                  _context3.next = 7;
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
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());
    } //Route::post('/households', [HouseholdApiController::class, 'store']);

  }, {
    key: "create",
    value: function create(household, callback) {
      //connection  
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(err, connection) {
          var dto, result1, household_id, y, result2, result3, items, result4, _y;

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
                  //dto for callback
                  dto = new _DTO.DTO(-1, "", -1, []); //Inset The Household then Items

                  connection.query = util.promisify(connection.query);
                  _context4.next = 6;
                  return connection.query('INSERT INTO HOUSEHOLDS (NAME, STREET, CITY, STATE, ZIP, DESCRIPTION, CREATED_AT, UPDATED_AT) VALUES(?,?,?,?,?,?,?,?)', [household.Name, household.Street, household.City, household.State, household.Zip, household.Description, new Date(), new Date()]);

                case 6:
                  result1 = _context4.sent;

                  if (result1.affectedRows != 1) {
                    dto = new _DTO.DTO(400, "Post Failure", 0, []);
                    callback(dto);
                  }

                  household_id = result1.insertId;
                  y = 0;

                case 10:
                  if (!(y < household.Items.length)) {
                    _context4.next = 17;
                    break;
                  }

                  _context4.next = 13;
                  return connection.query('INSERT INTO ITEMS (NAME, DESCRIPTION, QUANTITY, HOUSEHOLD_ID, CREATED_AT, UPDATED_AT) VALUES(?,?,?,?,?,?)', [household.Items[y].Name, household.Items[y].Description, household.Items[y].Quantity, household_id, new Date(), new Date()]);

                case 13:
                  result2 = _context4.sent;

                case 14:
                  ++y;
                  _context4.next = 10;
                  break;

                case 17:
                  if (!(result1.affectedRows == 1)) {
                    _context4.next = 29;
                    break;
                  }

                  _context4.next = 20;
                  return connection.query("SELECT * FROM HOUSEHOLDS WHERE ID=?", household_id);

                case 20:
                  result3 = _context4.sent;
                  items = [];
                  _context4.next = 24;
                  return connection.query("SELECT * FROM ITEMS WHERE HOUSEHOLD_ID=?", household_id);

                case 24:
                  result4 = _context4.sent;

                  for (_y = 0; _y < result4.length; ++_y) {
                    items.push(new _Item.Item(result4[_y].id, result4[_y].name, result4[_y].description, result4[_y].quantity, result4[_y].household_id, result4[_y].donation_flag, result4[_y].created_at, result4[_y].updated_at));
                  }

                  dto = new _DTO.DTO(200, "Post Success", 1, new _Household.Household(result3[0].id, result3[0].name, result3[0].street, result3[0].city, result3[0].state, result3[0].zip, result3[0].description, result3[0].created_at, result3[0].updated_at, items));
                  _context4.next = 30;
                  break;

                case 29:
                  dto = new _DTO.DTO(400, "Post Failure", 0, []);

                case 30:
                  if (connection) connection.release();
                  callback(dto);

                case 32:
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
    } //Route::put('/households/{household}', [HouseholdApiController::class, 'update']);

  }, {
    key: "update",
    value: function update(household, callback) {
      //the connection 
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(err, connection) {
          var changes, result1, dto, result3, items, result4, y;
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
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context5.next = 6;
                  return connection.query('UPDATE HOUSEHOLDS SET NAME=?, STREET=?, CITY=?, STATE=?, ZIP=?, DESCRIPTION=?, UPDATED_AT=? WHERE ID=?', [household.Name, household.Street, household.City, household.State, household.Zip, household.Description, new Date(), household.Id]);

                case 6:
                  result1 = _context5.sent;
                  //return results
                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (!(result1.changedRows != 0)) {
                    _context5.next = 20;
                    break;
                  }

                  _context5.next = 11;
                  return connection.query("SELECT * FROM HOUSEHOLDS WHERE ID = ? ORDER BY NAME", household.Id);

                case 11:
                  result3 = _context5.sent;
                  items = [];
                  _context5.next = 15;
                  return connection.query("SELECT * FROM ITEMS WHERE HOUSEHOLD_ID=?", household.Id);

                case 15:
                  result4 = _context5.sent;

                  for (y = 0; y < result4.length; ++y) {
                    items.push(new _Item.Item(result4[y].id, result4[y].name, result4[y].description, result4[y].quantity, result4[y].household_id, result4[y].donation_flag, result4[y].created_at, result4[y].updated_at));
                  }

                  dto = new _DTO.DTO(200, "Put Success", 1, new _Household.Household(result3[0].id, result3[0].name, result3[0].street, result3[0].city, result3[0].state, result3[0].zip, result3[0].description, result3[0].created_at, result3[0].updated_at, items));
                  _context5.next = 21;
                  break;

                case 20:
                  dto = new _DTO.DTO(400, "Put Failure", 0, []);

                case 21:
                  if (connection) connection.release();
                  callback(dto);

                case 23:
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
    } //Route::delete('/households/{household}', [HouseholdApiController::class, 'destroy']);

  }, {
    key: "delete",
    value: function _delete(household_id, callback) {
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(err, connection) {
          var items, result4, y, result3, result1, dto;
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
                  connection.query = util.promisify(connection.query); //get objects before deleting

                  items = [];
                  _context6.next = 6;
                  return connection.query("SELECT * FROM ITEMS WHERE HOUSEHOLD_ID=?", household_id);

                case 6:
                  result4 = _context6.sent;

                  for (y = 0; y < result4.length; ++y) {
                    items.push(new _Item.Item(result4[y].id, result4[y].name, result4[y].description, result4[y].quantity, result4[y].household_id, result4[y].donation_flag, result4[y].created_at, result4[y].updated_at));
                  }

                  _context6.next = 10;
                  return connection.query("SELECT * FROM HOUSEHOLDS WHERE ID=?", household_id);

                case 10:
                  result3 = _context6.sent;
                  _context6.next = 13;
                  return connection.query('DELETE FROM HOUSEHOLDS WHERE ID=?', household_id);

                case 13:
                  result1 = _context6.sent;
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
  }]);
  return HouseholdDAO;
}();

exports.HouseholdDAO = HouseholdDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9Ib3VzZWhvbGREQU8udHMiXSwibmFtZXMiOlsiSG91c2Vob2xkREFPIiwicG9vbCIsImNhbGxiYWNrIiwiaG91c2Vob2xkcyIsImdldENvbm5lY3Rpb24iLCJlcnIiLCJjb25uZWN0aW9uIiwicXVlcnkiLCJ1dGlsIiwicHJvbWlzaWZ5IiwicmVzdWx0MSIsIngiLCJsZW5ndGgiLCJISElEIiwiaWQiLCJpdGVtcyIsInJlc3VsdDIiLCJ5IiwicHVzaCIsIkl0ZW0iLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJxdWFudGl0eSIsImhvdXNlaG9sZF9pZCIsImRvbmF0aW9uX2ZsYWciLCJjcmVhdGVkX2F0IiwidXBkYXRlZF9hdCIsIkhvdXNlaG9sZCIsInN0cmVldCIsImNpdHkiLCJzdGF0ZSIsInppcCIsImR0byIsIkRUTyIsInJlbGVhc2UiLCJob3VzZWhvbGQiLCJOYW1lIiwiU3RyZWV0IiwiQ2l0eSIsIlN0YXRlIiwiWmlwIiwiRGVzY3JpcHRpb24iLCJEYXRlIiwiYWZmZWN0ZWRSb3dzIiwiaW5zZXJ0SWQiLCJJdGVtcyIsIlF1YW50aXR5IiwicmVzdWx0MyIsInJlc3VsdDQiLCJjaGFuZ2VzIiwiSWQiLCJjaGFuZ2VkUm93cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7Ozs7OztBQU5BO0FBS0E7SUFHYUEsWTtBQUlULHdCQUFZQyxJQUFaLEVBQ0E7QUFBQTtBQUFBO0FBQ0ksU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0gsRyxDQUVEOzs7OztXQUNBLGlCQUFlQyxRQUFmLEVBQ0E7QUFDSSxVQUFJQyxVQUFzQixHQUFHLEVBQTdCO0FBQ0EsV0FBS0YsSUFBTCxDQUFVRyxhQUFWO0FBQUEsMkZBQXdCLGlCQUFlQyxHQUFmLEVBQXdCQyxVQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFaEJELEdBRmdCO0FBQUE7QUFBQTtBQUFBOztBQUFBLHdCQUVMQSxHQUZLOztBQUFBO0FBR3BCO0FBQ0FDLGtCQUFBQSxVQUFVLENBQUNDLEtBQVgsR0FBbUJDLElBQUksQ0FBQ0MsU0FBTCxDQUFlSCxVQUFVLENBQUNDLEtBQTFCLENBQW5CO0FBSm9CO0FBQUEseUJBS0FELFVBQVUsQ0FBQ0MsS0FBWCxDQUFpQiwwQkFBakIsQ0FMQTs7QUFBQTtBQUtoQkcsa0JBQUFBLE9BTGdCO0FBTVpDLGtCQUFBQSxDQU5ZLEdBTVYsQ0FOVTs7QUFBQTtBQUFBLHdCQU1SQSxDQUFDLEdBQUdELE9BQU8sQ0FBQ0UsTUFOSjtBQUFBO0FBQUE7QUFBQTs7QUFRWkMsa0JBQUFBLElBUlksR0FRTEgsT0FBTyxDQUFDQyxDQUFELENBQVAsQ0FBV0csRUFSTjtBQVNaQyxrQkFBQUEsS0FUWSxHQVNHLEVBVEg7QUFBQTtBQUFBLHlCQVVJVCxVQUFVLENBQUNDLEtBQVgsQ0FBaUIsMENBQWpCLEVBQTZELENBQUNNLElBQUQsQ0FBN0QsQ0FWSjs7QUFBQTtBQVVaRyxrQkFBQUEsT0FWWTs7QUFXaEIsdUJBQVFDLENBQVIsR0FBVSxDQUFWLEVBQVlBLENBQUMsR0FBR0QsT0FBTyxDQUFDSixNQUF4QixFQUErQixFQUFFSyxDQUFqQyxFQUNBO0FBQ0lGLG9CQUFBQSxLQUFLLENBQUNHLElBQU4sQ0FBVyxJQUFJQyxVQUFKLENBQVNILE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdILEVBQXBCLEVBQXdCRSxPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXRyxJQUFuQyxFQUF5Q0osT0FBTyxDQUFDQyxDQUFELENBQVAsQ0FBV0ksV0FBcEQsRUFBaUVMLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdLLFFBQTVFLEVBQXNGTixPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXTSxZQUFqRyxFQUErR1AsT0FBTyxDQUFDQyxDQUFELENBQVAsQ0FBV08sYUFBMUgsRUFBeUlSLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdRLFVBQXBKLEVBQWdLVCxPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXUyxVQUEzSyxDQUFYO0FBQ0g7O0FBQ0R2QixrQkFBQUEsVUFBVSxDQUFDZSxJQUFYLENBQWdCLElBQUlTLG9CQUFKLENBQWNqQixPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXRyxFQUF6QixFQUNaSixPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXUyxJQURDLEVBRVpWLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdpQixNQUZDLEVBR1psQixPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXa0IsSUFIQyxFQUlabkIsT0FBTyxDQUFDQyxDQUFELENBQVAsQ0FBV21CLEtBSkMsRUFLWnBCLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdvQixHQUxDLEVBTVpyQixPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXVSxXQU5DLEVBT1pYLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdjLFVBUEMsRUFRWmYsT0FBTyxDQUFDQyxDQUFELENBQVAsQ0FBV2UsVUFSQyxFQVNaWCxLQVRZLENBQWhCOztBQWZnQjtBQU1XLG9CQUFFSixDQU5iO0FBQUE7QUFBQTs7QUFBQTtBQTBCcEI7QUFDSXFCLGtCQUFBQSxHQTNCZ0IsR0EyQlYsSUFBSUMsUUFBSixDQUFRLENBQUMsQ0FBVCxFQUFZLEVBQVosRUFBZ0IsQ0FBQyxDQUFqQixFQUFvQixFQUFwQixDQTNCVTs7QUE0QnBCLHNCQUFHOUIsVUFBVSxDQUFDUyxNQUFYLEdBQW9CLENBQXZCLEVBQTBCO0FBQ3RCb0Isb0JBQUFBLEdBQUcsR0FBRyxJQUFJQyxRQUFKLENBQVEsR0FBUixFQUFhLGFBQWIsRUFBNEI5QixVQUFVLENBQUNTLE1BQXZDLEVBQStDVCxVQUEvQyxDQUFOO0FBQ0gsbUJBRkQsTUFFTztBQUNINkIsb0JBQUFBLEdBQUcsR0FBRyxJQUFJQyxRQUFKLENBQVEsR0FBUixFQUFhLHlCQUFiLEVBQXdDOUIsVUFBVSxDQUFDUyxNQUFuRCxFQUEyRCxFQUEzRCxDQUFOO0FBQ0g7O0FBQ0Qsc0JBQUlOLFVBQUosRUFBZ0JBLFVBQVUsQ0FBQzRCLE9BQVg7QUFDaEJoQyxrQkFBQUEsUUFBUSxDQUFDOEIsR0FBRCxDQUFSOztBQWxDb0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBeEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFvQ0g7OztXQUVELHlCQUF1QmxCLEVBQXZCLEVBQWtDWixRQUFsQyxFQUNBO0FBQ0ksVUFBSUMsVUFBc0IsR0FBRyxFQUE3QjtBQUNBLFdBQUtGLElBQUwsQ0FBVUcsYUFBVjtBQUFBLDRGQUF3QixrQkFBZUMsR0FBZixFQUF3QkMsVUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRWhCRCxHQUZnQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSx3QkFFTEEsR0FGSzs7QUFBQTtBQUdwQjtBQUNBQyxrQkFBQUEsVUFBVSxDQUFDQyxLQUFYLEdBQW1CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUgsVUFBVSxDQUFDQyxLQUExQixDQUFuQjtBQUpvQjtBQUFBLHlCQUtBRCxVQUFVLENBQUNDLEtBQVgsQ0FBaUIscUtBQW9LTyxFQUFyTCxDQUxBOztBQUFBO0FBS2hCSixrQkFBQUEsT0FMZ0I7QUFNWkMsa0JBQUFBLENBTlksR0FNVixDQU5VOztBQUFBO0FBQUEsd0JBTVJBLENBQUMsR0FBR0QsT0FBTyxDQUFDRSxNQU5KO0FBQUE7QUFBQTtBQUFBOztBQVFaQyxrQkFBQUEsSUFSWSxHQVFMSCxPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXRyxFQVJOO0FBU1pDLGtCQUFBQSxLQVRZLEdBU0csRUFUSDtBQUFBO0FBQUEseUJBVUlULFVBQVUsQ0FBQ0MsS0FBWCxDQUFpQiwwQ0FBakIsRUFBNkQsQ0FBQ00sSUFBRCxDQUE3RCxDQVZKOztBQUFBO0FBVVpHLGtCQUFBQSxPQVZZOztBQVdoQix1QkFBUUMsQ0FBUixHQUFVLENBQVYsRUFBWUEsQ0FBQyxHQUFHRCxPQUFPLENBQUNKLE1BQXhCLEVBQStCLEVBQUVLLENBQWpDLEVBQ0E7QUFDSUYsb0JBQUFBLEtBQUssQ0FBQ0csSUFBTixDQUFXLElBQUlDLFVBQUosQ0FBU0gsT0FBTyxDQUFDQyxDQUFELENBQVAsQ0FBV0gsRUFBcEIsRUFBd0JFLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdHLElBQW5DLEVBQXlDSixPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXSSxXQUFwRCxFQUFpRUwsT0FBTyxDQUFDQyxDQUFELENBQVAsQ0FBV0ssUUFBNUUsRUFBc0ZOLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdNLFlBQWpHLEVBQStHUCxPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXTyxhQUExSCxFQUF5SVIsT0FBTyxDQUFDQyxDQUFELENBQVAsQ0FBV1EsVUFBcEosRUFBZ0tULE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdTLFVBQTNLLENBQVg7QUFDSDs7QUFDRHZCLGtCQUFBQSxVQUFVLENBQUNlLElBQVgsQ0FBZ0IsSUFBSVMsb0JBQUosQ0FBY2pCLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdHLEVBQXpCLEVBQ1pKLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdTLElBREMsRUFFWlYsT0FBTyxDQUFDQyxDQUFELENBQVAsQ0FBV2lCLE1BRkMsRUFHWmxCLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdrQixJQUhDLEVBSVpuQixPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXbUIsS0FKQyxFQUtacEIsT0FBTyxDQUFDQyxDQUFELENBQVAsQ0FBV29CLEdBTEMsRUFNWnJCLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdVLFdBTkMsRUFPWlgsT0FBTyxDQUFDQyxDQUFELENBQVAsQ0FBV2MsVUFQQyxFQVFaZixPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXZSxVQVJDLEVBU1pYLEtBVFksQ0FBaEI7O0FBZmdCO0FBTVcsb0JBQUVKLENBTmI7QUFBQTtBQUFBOztBQUFBO0FBMEJwQjtBQUNJcUIsa0JBQUFBLEdBM0JnQixHQTJCVixJQUFJQyxRQUFKLENBQVEsQ0FBQyxDQUFULEVBQVksRUFBWixFQUFnQixDQUFDLENBQWpCLEVBQW9CLEVBQXBCLENBM0JVOztBQTRCcEIsc0JBQUc5QixVQUFVLENBQUNTLE1BQVgsR0FBb0IsQ0FBdkIsRUFBMEI7QUFDdEJvQixvQkFBQUEsR0FBRyxHQUFHLElBQUlDLFFBQUosQ0FBUSxHQUFSLEVBQWEsYUFBYixFQUE0QjlCLFVBQVUsQ0FBQ1MsTUFBdkMsRUFBK0NULFVBQS9DLENBQU47QUFDSCxtQkFGRCxNQUVPO0FBQ0g2QixvQkFBQUEsR0FBRyxHQUFHLElBQUlDLFFBQUosQ0FBUSxHQUFSLEVBQWEseUJBQWIsRUFBd0M5QixVQUFVLENBQUNTLE1BQW5ELEVBQTJELEVBQTNELENBQU47QUFDSDs7QUFDRCxzQkFBSU4sVUFBSixFQUFnQkEsVUFBVSxDQUFDNEIsT0FBWDtBQUNoQmhDLGtCQUFBQSxRQUFRLENBQUM4QixHQUFELENBQVI7O0FBbENvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQW9DSCxLLENBRUQ7Ozs7V0FDQSxrQkFBZ0JsQixFQUFoQixFQUEyQlosUUFBM0IsRUFDQTtBQUNJLFVBQUlDLFVBQXNCLEdBQUcsRUFBN0I7QUFDQSxXQUFLRixJQUFMLENBQVVHLGFBQVY7QUFBQSw0RkFBd0Isa0JBQWVDLEdBQWYsRUFBd0JDLFVBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUVoQkQsR0FGZ0I7QUFBQTtBQUFBO0FBQUE7O0FBQUEsd0JBRUxBLEdBRks7O0FBQUE7QUFJcEI7QUFDQUMsa0JBQUFBLFVBQVUsQ0FBQ0MsS0FBWCxHQUFtQkMsSUFBSSxDQUFDQyxTQUFMLENBQWVILFVBQVUsQ0FBQ0MsS0FBMUIsQ0FBbkI7QUFMb0I7QUFBQSx5QkFNQUQsVUFBVSxDQUFDQyxLQUFYLENBQWlCLHFEQUFqQixFQUF3RU8sRUFBeEUsQ0FOQTs7QUFBQTtBQU1oQkosa0JBQUFBLE9BTmdCO0FBT1pDLGtCQUFBQSxDQVBZLEdBT1YsQ0FQVTs7QUFBQTtBQUFBLHdCQU9SQSxDQUFDLEdBQUdELE9BQU8sQ0FBQ0UsTUFQSjtBQUFBO0FBQUE7QUFBQTs7QUFTWkcsa0JBQUFBLEtBVFksR0FTRyxFQVRIO0FBQUE7QUFBQSx5QkFVSVQsVUFBVSxDQUFDQyxLQUFYLENBQWlCLDBDQUFqQixFQUE2RE8sRUFBN0QsQ0FWSjs7QUFBQTtBQVVaRSxrQkFBQUEsT0FWWTs7QUFXaEIsdUJBQVFDLENBQVIsR0FBVSxDQUFWLEVBQVlBLENBQUMsR0FBR0QsT0FBTyxDQUFDSixNQUF4QixFQUErQixFQUFFSyxDQUFqQyxFQUNBO0FBQ0lGLG9CQUFBQSxLQUFLLENBQUNHLElBQU4sQ0FBVyxJQUFJQyxVQUFKLENBQVNILE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdILEVBQXBCLEVBQXdCRSxPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXRyxJQUFuQyxFQUF5Q0osT0FBTyxDQUFDQyxDQUFELENBQVAsQ0FBV0ksV0FBcEQsRUFBaUVMLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdLLFFBQTVFLEVBQXNGTixPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXTSxZQUFqRyxFQUErR1AsT0FBTyxDQUFDQyxDQUFELENBQVAsQ0FBV08sYUFBMUgsRUFBeUlSLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdRLFVBQXBKLEVBQWdLVCxPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXUyxVQUEzSyxDQUFYO0FBQ0g7O0FBQ0R2QixrQkFBQUEsVUFBVSxDQUFDZSxJQUFYLENBQWdCLElBQUlTLG9CQUFKLENBQWNqQixPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXRyxFQUF6QixFQUNaSixPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXUyxJQURDLEVBRVpWLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdpQixNQUZDLEVBR1psQixPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXa0IsSUFIQyxFQUlabkIsT0FBTyxDQUFDQyxDQUFELENBQVAsQ0FBV21CLEtBSkMsRUFLWnBCLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdvQixHQUxDLEVBTVpyQixPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXVSxXQU5DLEVBT1pYLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdjLFVBUEMsRUFRWmYsT0FBTyxDQUFDQyxDQUFELENBQVAsQ0FBV2UsVUFSQyxFQVNaWCxLQVRZLENBQWhCOztBQWZnQjtBQU9XLG9CQUFFSixDQVBiO0FBQUE7QUFBQTs7QUFBQTtBQTJCcEI7QUFDSXFCLGtCQUFBQSxHQTVCZ0IsR0E0QlYsSUFBSUMsUUFBSixDQUFRLENBQUMsQ0FBVCxFQUFZLEVBQVosRUFBZ0IsQ0FBQyxDQUFqQixFQUFvQixFQUFwQixDQTVCVTs7QUE2QnBCLHNCQUFHOUIsVUFBVSxDQUFDUyxNQUFYLEdBQW9CLENBQXZCLEVBQTBCO0FBQ3RCb0Isb0JBQUFBLEdBQUcsR0FBRyxJQUFJQyxRQUFKLENBQVEsR0FBUixFQUFhLGFBQWIsRUFBNEI5QixVQUFVLENBQUNTLE1BQXZDLEVBQStDVCxVQUEvQyxDQUFOO0FBQ0gsbUJBRkQsTUFFTztBQUNINkIsb0JBQUFBLEdBQUcsR0FBRyxJQUFJQyxRQUFKLENBQVEsR0FBUixFQUFhLHlCQUFiLEVBQXdDOUIsVUFBVSxDQUFDUyxNQUFuRCxFQUEyRCxFQUEzRCxDQUFOO0FBQ0g7O0FBQ0Qsc0JBQUlOLFVBQUosRUFBZ0JBLFVBQVUsQ0FBQzRCLE9BQVg7QUFDaEJoQyxrQkFBQUEsUUFBUSxDQUFDOEIsR0FBRCxDQUFSOztBQW5Db0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBeEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFxQ0gsSyxDQUVEOzs7O1dBQ0EsZ0JBQWNHLFNBQWQsRUFBbUNqQyxRQUFuQyxFQUNBO0FBQ0k7QUFDQSxXQUFLRCxJQUFMLENBQVVHLGFBQVY7QUFBQSw0RkFBd0Isa0JBQWVDLEdBQWYsRUFBd0JDLFVBQXhCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFaEJELEdBRmdCO0FBQUE7QUFBQTtBQUFBOztBQUFBLHdCQUVMQSxHQUZLOztBQUFBO0FBSXBCO0FBQ0kyQixrQkFBQUEsR0FMZ0IsR0FLVixJQUFJQyxRQUFKLENBQVEsQ0FBQyxDQUFULEVBQVksRUFBWixFQUFnQixDQUFDLENBQWpCLEVBQW9CLEVBQXBCLENBTFUsRUFPcEI7O0FBQ0EzQixrQkFBQUEsVUFBVSxDQUFDQyxLQUFYLEdBQW1CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUgsVUFBVSxDQUFDQyxLQUExQixDQUFuQjtBQVJvQjtBQUFBLHlCQVNBRCxVQUFVLENBQUNDLEtBQVgsQ0FBaUIsc0hBQWpCLEVBQXlJLENBQUM0QixTQUFTLENBQUNDLElBQVgsRUFBaUJELFNBQVMsQ0FBQ0UsTUFBM0IsRUFBbUNGLFNBQVMsQ0FBQ0csSUFBN0MsRUFBbURILFNBQVMsQ0FBQ0ksS0FBN0QsRUFBb0VKLFNBQVMsQ0FBQ0ssR0FBOUUsRUFBbUZMLFNBQVMsQ0FBQ00sV0FBN0YsRUFBMEcsSUFBSUMsSUFBSixFQUExRyxFQUFzSCxJQUFJQSxJQUFKLEVBQXRILENBQXpJLENBVEE7O0FBQUE7QUFTaEJoQyxrQkFBQUEsT0FUZ0I7O0FBVXBCLHNCQUFHQSxPQUFPLENBQUNpQyxZQUFSLElBQXdCLENBQTNCLEVBQ0E7QUFDSVgsb0JBQUFBLEdBQUcsR0FBRyxJQUFJQyxRQUFKLENBQVEsR0FBUixFQUFhLGNBQWIsRUFBNkIsQ0FBN0IsRUFBZ0MsRUFBaEMsQ0FBTjtBQUNBL0Isb0JBQUFBLFFBQVEsQ0FBQzhCLEdBQUQsQ0FBUjtBQUNIOztBQUVHVCxrQkFBQUEsWUFoQmdCLEdBZ0JEYixPQUFPLENBQUNrQyxRQWhCUDtBQWlCWjNCLGtCQUFBQSxDQWpCWSxHQWlCVixDQWpCVTs7QUFBQTtBQUFBLHdCQWlCUkEsQ0FBQyxHQUFHa0IsU0FBUyxDQUFDVSxLQUFWLENBQWdCakMsTUFqQlo7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSx5QkFtQklOLFVBQVUsQ0FBQ0MsS0FBWCxDQUFpQiwyR0FBakIsRUFBOEgsQ0FBQzRCLFNBQVMsQ0FBQ1UsS0FBVixDQUFnQjVCLENBQWhCLEVBQW1CbUIsSUFBcEIsRUFBMEJELFNBQVMsQ0FBQ1UsS0FBVixDQUFnQjVCLENBQWhCLEVBQW1Cd0IsV0FBN0MsRUFBMEROLFNBQVMsQ0FBQ1UsS0FBVixDQUFnQjVCLENBQWhCLEVBQW1CNkIsUUFBN0UsRUFBdUZ2QixZQUF2RixFQUFxRyxJQUFJbUIsSUFBSixFQUFyRyxFQUFpSCxJQUFJQSxJQUFKLEVBQWpILENBQTlILENBbkJKOztBQUFBO0FBbUJaMUIsa0JBQUFBLE9BbkJZOztBQUFBO0FBaUJtQixvQkFBRUMsQ0FqQnJCO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHdCQXVCakJQLE9BQU8sQ0FBQ2lDLFlBQVIsSUFBd0IsQ0F2QlA7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSx5QkF3QklyQyxVQUFVLENBQUNDLEtBQVgsQ0FBaUIscUNBQWpCLEVBQXdEZ0IsWUFBeEQsQ0F4Qko7O0FBQUE7QUF3Qlp3QixrQkFBQUEsT0F4Qlk7QUEwQlpoQyxrQkFBQUEsS0ExQlksR0EwQkcsRUExQkg7QUFBQTtBQUFBLHlCQTJCSVQsVUFBVSxDQUFDQyxLQUFYLENBQWlCLDBDQUFqQixFQUE2RGdCLFlBQTdELENBM0JKOztBQUFBO0FBMkJaeUIsa0JBQUFBLE9BM0JZOztBQTRCaEIsdUJBQVEvQixFQUFSLEdBQVUsQ0FBVixFQUFZQSxFQUFDLEdBQUcrQixPQUFPLENBQUNwQyxNQUF4QixFQUErQixFQUFFSyxFQUFqQyxFQUNBO0FBQ0lGLG9CQUFBQSxLQUFLLENBQUNHLElBQU4sQ0FBVyxJQUFJQyxVQUFKLENBQVM2QixPQUFPLENBQUMvQixFQUFELENBQVAsQ0FBV0gsRUFBcEIsRUFBd0JrQyxPQUFPLENBQUMvQixFQUFELENBQVAsQ0FBV0csSUFBbkMsRUFBeUM0QixPQUFPLENBQUMvQixFQUFELENBQVAsQ0FBV0ksV0FBcEQsRUFBaUUyQixPQUFPLENBQUMvQixFQUFELENBQVAsQ0FBV0ssUUFBNUUsRUFBc0YwQixPQUFPLENBQUMvQixFQUFELENBQVAsQ0FBV00sWUFBakcsRUFBK0d5QixPQUFPLENBQUMvQixFQUFELENBQVAsQ0FBV08sYUFBMUgsRUFBeUl3QixPQUFPLENBQUMvQixFQUFELENBQVAsQ0FBV1EsVUFBcEosRUFBZ0t1QixPQUFPLENBQUMvQixFQUFELENBQVAsQ0FBV1MsVUFBM0ssQ0FBWDtBQUNIOztBQUNETSxrQkFBQUEsR0FBRyxHQUFHLElBQUlDLFFBQUosQ0FBUSxHQUFSLEVBQWEsY0FBYixFQUE2QixDQUE3QixFQUFnQyxJQUFJTixvQkFBSixDQUFjb0IsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXakMsRUFBekIsRUFDVWlDLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBVzNCLElBRHJCLEVBRVUyQixPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVduQixNQUZyQixFQUdVbUIsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXbEIsSUFIckIsRUFJVWtCLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBV2pCLEtBSnJCLEVBS1VpQixPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdoQixHQUxyQixFQU1VZ0IsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXMUIsV0FOckIsRUFPVTBCLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBV3RCLFVBUHJCLEVBUVVzQixPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdyQixVQVJyQixFQVNVWCxLQVRWLENBQWhDLENBQU47QUFoQ2dCO0FBQUE7O0FBQUE7QUEyQ2hCaUIsa0JBQUFBLEdBQUcsR0FBRyxJQUFJQyxRQUFKLENBQVEsR0FBUixFQUFhLGNBQWIsRUFBNkIsQ0FBN0IsRUFBZ0MsRUFBaEMsQ0FBTjs7QUEzQ2dCO0FBNkNwQixzQkFBSTNCLFVBQUosRUFBZ0JBLFVBQVUsQ0FBQzRCLE9BQVg7QUFDaEJoQyxrQkFBQUEsUUFBUSxDQUFDOEIsR0FBRCxDQUFSOztBQTlDb0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBeEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFnREgsSyxDQUVEOzs7O1dBQ0EsZ0JBQWNHLFNBQWQsRUFBNkJqQyxRQUE3QixFQUNBO0FBQ0k7QUFDQSxXQUFLRCxJQUFMLENBQVVHLGFBQVY7QUFBQSw0RkFBd0Isa0JBQWVDLEdBQWYsRUFBd0JDLFVBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUVoQkQsR0FGZ0I7QUFBQTtBQUFBO0FBQUE7O0FBQUEsd0JBRUxBLEdBRks7O0FBQUE7QUFHcEI7QUFDSTRDLGtCQUFBQSxPQUpnQixHQUlOLENBSk07QUFLcEIzQyxrQkFBQUEsVUFBVSxDQUFDQyxLQUFYLEdBQW1CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUgsVUFBVSxDQUFDQyxLQUExQixDQUFuQjtBQUxvQjtBQUFBLHlCQU1BRCxVQUFVLENBQUNDLEtBQVgsQ0FBaUIsd0dBQWpCLEVBQTJILENBQUM0QixTQUFTLENBQUNDLElBQVgsRUFBaUJELFNBQVMsQ0FBQ0UsTUFBM0IsRUFBbUNGLFNBQVMsQ0FBQ0csSUFBN0MsRUFBbURILFNBQVMsQ0FBQ0ksS0FBN0QsRUFBb0VKLFNBQVMsQ0FBQ0ssR0FBOUUsRUFBbUZMLFNBQVMsQ0FBQ00sV0FBN0YsRUFBMEcsSUFBSUMsSUFBSixFQUExRyxFQUFzSFAsU0FBUyxDQUFDZSxFQUFoSSxDQUEzSCxDQU5BOztBQUFBO0FBTWhCeEMsa0JBQUFBLE9BTmdCO0FBUXBCO0FBQ0lzQixrQkFBQUEsR0FUZ0IsR0FTVixJQUFJQyxRQUFKLENBQVEsQ0FBQyxDQUFULEVBQVksRUFBWixFQUFnQixDQUFDLENBQWpCLEVBQW9CLEVBQXBCLENBVFU7O0FBQUEsd0JBVWpCdkIsT0FBTyxDQUFDeUMsV0FBUixJQUF1QixDQVZOO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEseUJBV0k3QyxVQUFVLENBQUNDLEtBQVgsQ0FBaUIscURBQWpCLEVBQXdFNEIsU0FBUyxDQUFDZSxFQUFsRixDQVhKOztBQUFBO0FBV1pILGtCQUFBQSxPQVhZO0FBYVpoQyxrQkFBQUEsS0FiWSxHQWFHLEVBYkg7QUFBQTtBQUFBLHlCQWNJVCxVQUFVLENBQUNDLEtBQVgsQ0FBaUIsMENBQWpCLEVBQTZENEIsU0FBUyxDQUFDZSxFQUF2RSxDQWRKOztBQUFBO0FBY1pGLGtCQUFBQSxPQWRZOztBQWVoQix1QkFBUS9CLENBQVIsR0FBVSxDQUFWLEVBQVlBLENBQUMsR0FBRytCLE9BQU8sQ0FBQ3BDLE1BQXhCLEVBQStCLEVBQUVLLENBQWpDLEVBQ0E7QUFDSUYsb0JBQUFBLEtBQUssQ0FBQ0csSUFBTixDQUFXLElBQUlDLFVBQUosQ0FBUzZCLE9BQU8sQ0FBQy9CLENBQUQsQ0FBUCxDQUFXSCxFQUFwQixFQUF3QmtDLE9BQU8sQ0FBQy9CLENBQUQsQ0FBUCxDQUFXRyxJQUFuQyxFQUF5QzRCLE9BQU8sQ0FBQy9CLENBQUQsQ0FBUCxDQUFXSSxXQUFwRCxFQUFpRTJCLE9BQU8sQ0FBQy9CLENBQUQsQ0FBUCxDQUFXSyxRQUE1RSxFQUFzRjBCLE9BQU8sQ0FBQy9CLENBQUQsQ0FBUCxDQUFXTSxZQUFqRyxFQUErR3lCLE9BQU8sQ0FBQy9CLENBQUQsQ0FBUCxDQUFXTyxhQUExSCxFQUF5SXdCLE9BQU8sQ0FBQy9CLENBQUQsQ0FBUCxDQUFXUSxVQUFwSixFQUFnS3VCLE9BQU8sQ0FBQy9CLENBQUQsQ0FBUCxDQUFXUyxVQUEzSyxDQUFYO0FBQ0g7O0FBQ0RNLGtCQUFBQSxHQUFHLEdBQUcsSUFBSUMsUUFBSixDQUFRLEdBQVIsRUFBYSxhQUFiLEVBQTRCLENBQTVCLEVBQStCLElBQUlOLG9CQUFKLENBQWNvQixPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdqQyxFQUF6QixFQUNHaUMsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXM0IsSUFEZCxFQUVHMkIsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXbkIsTUFGZCxFQUdHbUIsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXbEIsSUFIZCxFQUlHa0IsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXakIsS0FKZCxFQUtHaUIsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXaEIsR0FMZCxFQU1HZ0IsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXMUIsV0FOZCxFQU9HMEIsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXdEIsVUFQZCxFQVFHc0IsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXckIsVUFSZCxFQVNHWCxLQVRILENBQS9CLENBQU47QUFuQmdCO0FBQUE7O0FBQUE7QUE4QmhCaUIsa0JBQUFBLEdBQUcsR0FBRyxJQUFJQyxRQUFKLENBQVEsR0FBUixFQUFhLGFBQWIsRUFBNEIsQ0FBNUIsRUFBK0IsRUFBL0IsQ0FBTjs7QUE5QmdCO0FBZ0NwQixzQkFBSTNCLFVBQUosRUFBZ0JBLFVBQVUsQ0FBQzRCLE9BQVg7QUFDaEJoQyxrQkFBQUEsUUFBUSxDQUFDOEIsR0FBRCxDQUFSOztBQWpDb0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBeEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFtQ0gsSyxDQUVEOzs7O1dBQ0EsaUJBQWNULFlBQWQsRUFBbUNyQixRQUFuQyxFQUNBO0FBQ0ksV0FBS0QsSUFBTCxDQUFVRyxhQUFWO0FBQUEsNEZBQXdCLGtCQUFlQyxHQUFmLEVBQXdCQyxVQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFaEJELEdBRmdCO0FBQUE7QUFBQTtBQUFBOztBQUFBLHdCQUVMQSxHQUZLOztBQUFBO0FBSXBCO0FBQ0FDLGtCQUFBQSxVQUFVLENBQUNDLEtBQVgsR0FBbUJDLElBQUksQ0FBQ0MsU0FBTCxDQUFlSCxVQUFVLENBQUNDLEtBQTFCLENBQW5CLENBTG9CLENBTXBCOztBQUNJUSxrQkFBQUEsS0FQZ0IsR0FPRCxFQVBDO0FBQUE7QUFBQSx5QkFRQVQsVUFBVSxDQUFDQyxLQUFYLENBQWlCLDBDQUFqQixFQUE2RGdCLFlBQTdELENBUkE7O0FBQUE7QUFRaEJ5QixrQkFBQUEsT0FSZ0I7O0FBU3BCLHVCQUFRL0IsQ0FBUixHQUFVLENBQVYsRUFBWUEsQ0FBQyxHQUFHK0IsT0FBTyxDQUFDcEMsTUFBeEIsRUFBK0IsRUFBRUssQ0FBakMsRUFDQTtBQUNJRixvQkFBQUEsS0FBSyxDQUFDRyxJQUFOLENBQVcsSUFBSUMsVUFBSixDQUFTNkIsT0FBTyxDQUFDL0IsQ0FBRCxDQUFQLENBQVdILEVBQXBCLEVBQXdCa0MsT0FBTyxDQUFDL0IsQ0FBRCxDQUFQLENBQVdHLElBQW5DLEVBQXlDNEIsT0FBTyxDQUFDL0IsQ0FBRCxDQUFQLENBQVdJLFdBQXBELEVBQWlFMkIsT0FBTyxDQUFDL0IsQ0FBRCxDQUFQLENBQVdLLFFBQTVFLEVBQXNGMEIsT0FBTyxDQUFDL0IsQ0FBRCxDQUFQLENBQVdNLFlBQWpHLEVBQStHeUIsT0FBTyxDQUFDL0IsQ0FBRCxDQUFQLENBQVdPLGFBQTFILEVBQXlJd0IsT0FBTyxDQUFDL0IsQ0FBRCxDQUFQLENBQVdRLFVBQXBKLEVBQWdLdUIsT0FBTyxDQUFDL0IsQ0FBRCxDQUFQLENBQVdTLFVBQTNLLENBQVg7QUFDSDs7QUFabUI7QUFBQSx5QkFhQXBCLFVBQVUsQ0FBQ0MsS0FBWCxDQUFpQixxQ0FBakIsRUFBd0RnQixZQUF4RCxDQWJBOztBQUFBO0FBYWhCd0Isa0JBQUFBLE9BYmdCO0FBQUE7QUFBQSx5QkFnQkF6QyxVQUFVLENBQUNDLEtBQVgsQ0FBaUIsbUNBQWpCLEVBQXNEZ0IsWUFBdEQsQ0FoQkE7O0FBQUE7QUFnQmhCYixrQkFBQUEsT0FoQmdCO0FBa0JwQjtBQUNJc0Isa0JBQUFBLEdBbkJnQixHQW1CVixJQUFJQyxRQUFKLENBQVEsQ0FBQyxDQUFULEVBQVksRUFBWixFQUFnQixDQUFDLENBQWpCLEVBQW9CLEVBQXBCLENBbkJVOztBQW9CcEIsc0JBQUd2QixPQUFPLENBQUNpQyxZQUFSLElBQXdCLENBQTNCLEVBQThCO0FBQzFCWCxvQkFBQUEsR0FBRyxHQUFHLElBQUlDLFFBQUosQ0FBUSxHQUFSLEVBQWEsZ0JBQWIsRUFBK0IsQ0FBL0IsRUFBa0MsSUFBSU4sb0JBQUosQ0FBY29CLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBV2pDLEVBQXpCLEVBQ3BDaUMsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXM0IsSUFEeUIsRUFFcEMyQixPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVduQixNQUZ5QixFQUdwQ21CLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBV2xCLElBSHlCLEVBSXBDa0IsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXakIsS0FKeUIsRUFLcENpQixPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdoQixHQUx5QixFQU1wQ2dCLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBVzFCLFdBTnlCLEVBT3BDMEIsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXdEIsVUFQeUIsRUFRcENzQixPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdyQixVQVJ5QixFQVNwQ1gsS0FUb0MsQ0FBbEMsQ0FBTjtBQVVILG1CQVhELE1BV087QUFDSGlCLG9CQUFBQSxHQUFHLEdBQUcsSUFBSUMsUUFBSixDQUFRLEdBQVIsRUFBYSxnQkFBYixFQUErQixDQUEvQixFQUFrQyxFQUFsQyxDQUFOO0FBQ0g7O0FBQ0Qsc0JBQUkzQixVQUFKLEVBQWdCQSxVQUFVLENBQUM0QixPQUFYO0FBQ2hCaEMsa0JBQUFBLFFBQVEsQ0FBQzhCLEdBQUQsQ0FBUjs7QUFuQ29CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQXhCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBcUNIIiwic291cmNlc0NvbnRlbnQiOlsiLy9PYmplY3QgTW9kZWwgRGVwZW5kZW5jaWVzXHJcbmltcG9ydCB7IEhvdXNlaG9sZCB9IGZyb20gXCIuLi9tb2RlbHMvSG91c2Vob2xkXCI7XHJcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi4vbW9kZWxzL0l0ZW1cIjtcclxuaW1wb3J0IHsgRFRPIH0gICAgICAgZnJvbSBcIi4uL2RhdGFiYXNlL0RUT1wiO1xyXG5cclxuLy9VdGlsIE1vZHVsZSBEZXBlbmRlbmN5IGZvciBQcm9taXNpZnlcclxuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwidXRpbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhvdXNlaG9sZERBTyBcclxue1xyXG4gICAgcHJpdmF0ZSBwb29sO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvb2w6IGFueSkgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wb29sID0gcG9vbDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9Sb3V0ZTo6Z2V0KCcvaG91c2Vob2xkcycpO1xyXG4gICAgcHVibGljIHJlYWRBbGwoY2FsbGJhY2s6IGFueSkgXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGhvdXNlaG9sZHM6SG91c2Vob2xkW10gPSBbXTtcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuICAgICAgICAgICAgLy91c2UgUHJvbWlzZnlcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gSE9VU0VIT0xEUycpO1xyXG4gICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgSEhJRCA9IHJlc3VsdDFbeF0uaWQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXM6SXRlbVtdID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MiA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIElURU1TIFdIRVJFIEhPVVNFSE9MRF9JRD0/XCIsIFtISElEXSk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IHk9MDt5IDwgcmVzdWx0Mi5sZW5ndGg7Kyt5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2gobmV3IEl0ZW0ocmVzdWx0Mlt5XS5pZCwgcmVzdWx0Mlt5XS5uYW1lLCByZXN1bHQyW3ldLmRlc2NyaXB0aW9uLCByZXN1bHQyW3ldLnF1YW50aXR5LCByZXN1bHQyW3ldLmhvdXNlaG9sZF9pZCwgcmVzdWx0Mlt5XS5kb25hdGlvbl9mbGFnLCByZXN1bHQyW3ldLmNyZWF0ZWRfYXQsIHJlc3VsdDJbeV0udXBkYXRlZF9hdCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaG91c2Vob2xkcy5wdXNoKG5ldyBIb3VzZWhvbGQocmVzdWx0MVt4XS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uc3RyZWV0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uY2l0eSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uemlwLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5jcmVhdGVkX2F0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0udXBkYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY2FsbGJhY2sgdG8gcmV0dXJuIHJlc3VsdHNcclxuICAgICAgICAgICAgbGV0IGR0byA9IG5ldyBEVE8oLTEsIFwiXCIsIC0xLCBbXSk7XHJcbiAgICAgICAgICAgIGlmKGhvdXNlaG9sZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTygyMDAsIFwiR2V0IFN1Y2Nlc3NcIiwgaG91c2Vob2xkcy5sZW5ndGgsIGhvdXNlaG9sZHMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTyg0MDQsIFwiR2V0IFN1Y2Nlc3M6IE5vIFJlc3VsdHNcIiwgaG91c2Vob2xkcy5sZW5ndGgsIFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbikgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGR0byk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVhZEFsbEJ5VXNlcklkKGlkOnN0cmluZywgY2FsbGJhY2s6IGFueSkgXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGhvdXNlaG9sZHM6SG91c2Vob2xkW10gPSBbXTtcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuICAgICAgICAgICAgLy91c2UgUHJvbWlzZnlcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCBIT1VTRUhPTERTLiosIEhPVVNFSE9MRF9VU0VSUy5VU0VSX0lEIEZST00gSE9VU0VIT0xEUyBKT0lOIEhPVVNFSE9MRF9VU0VSUyBPTiBIT1VTRUhPTERfVVNFUlMuSE9VU0VIT0xEX0lEID0gSE9VU0VIT0xEUy5JRCBXSEVSRSBIT1VTRUhPTERfVVNFUlMuVVNFUl9JRD0nKyBpZCk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBISElEID0gcmVzdWx0MVt4XS5pZDtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtczpJdGVtW10gPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQyID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gSVRFTVMgV0hFUkUgSE9VU0VIT0xEX0lEPT9cIiwgW0hISURdKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgeT0wO3kgPCByZXN1bHQyLmxlbmd0aDsrK3kpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaChuZXcgSXRlbShyZXN1bHQyW3ldLmlkLCByZXN1bHQyW3ldLm5hbWUsIHJlc3VsdDJbeV0uZGVzY3JpcHRpb24sIHJlc3VsdDJbeV0ucXVhbnRpdHksIHJlc3VsdDJbeV0uaG91c2Vob2xkX2lkLCByZXN1bHQyW3ldLmRvbmF0aW9uX2ZsYWcsIHJlc3VsdDJbeV0uY3JlYXRlZF9hdCwgcmVzdWx0Mlt5XS51cGRhdGVkX2F0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBob3VzZWhvbGRzLnB1c2gobmV3IEhvdXNlaG9sZChyZXN1bHQxW3hdLmlkLCBcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5zdHJlZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5jaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS56aXAsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmNyZWF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS51cGRhdGVkX2F0LFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jYWxsYmFjayB0byByZXR1cm4gcmVzdWx0c1xyXG4gICAgICAgICAgICBsZXQgZHRvID0gbmV3IERUTygtMSwgXCJcIiwgLTEsIFtdKTtcclxuICAgICAgICAgICAgaWYoaG91c2Vob2xkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDIwMCwgXCJHZXQgU3VjY2Vzc1wiLCBob3VzZWhvbGRzLmxlbmd0aCwgaG91c2Vob2xkcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDQwNCwgXCJHZXQgU3VjY2VzczogTm8gUmVzdWx0c1wiLCBob3VzZWhvbGRzLmxlbmd0aCwgW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uKSBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soZHRvKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL1JvdXRlOjpnZXQoJy9ob3VzZWhvbGRzL3tob3VzZWhvbGR9KVxyXG4gICAgcHVibGljIHJlYWRCeUlkKGlkOnN0cmluZywgY2FsbGJhY2s6IGFueSkgXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGhvdXNlaG9sZHM6SG91c2Vob2xkW10gPSBbXTtcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuXHJcbiAgICAgICAgICAgIC8vdXNlIFByb21pc2Z5XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBIT1VTRUhPTERTIFdIRVJFIElEID0gPyBPUkRFUiBCWSBOQU1FXCIsIGlkKTtcclxuICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJlc3VsdDEubGVuZ3RoOysreClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zOkl0ZW1bXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDIgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBJVEVNUyBXSEVSRSBIT1VTRUhPTERfSUQ9P1wiLCBpZCk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IHk9MDt5IDwgcmVzdWx0Mi5sZW5ndGg7Kyt5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2gobmV3IEl0ZW0ocmVzdWx0Mlt5XS5pZCwgcmVzdWx0Mlt5XS5uYW1lLCByZXN1bHQyW3ldLmRlc2NyaXB0aW9uLCByZXN1bHQyW3ldLnF1YW50aXR5LCByZXN1bHQyW3ldLmhvdXNlaG9sZF9pZCwgcmVzdWx0Mlt5XS5kb25hdGlvbl9mbGFnLCByZXN1bHQyW3ldLmNyZWF0ZWRfYXQsIHJlc3VsdDJbeV0udXBkYXRlZF9hdCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaG91c2Vob2xkcy5wdXNoKG5ldyBIb3VzZWhvbGQocmVzdWx0MVt4XS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uc3RyZWV0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uY2l0eSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uemlwLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5jcmVhdGVkX2F0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0udXBkYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2NhbGxiYWNrIHRvIHJldHVybiByZXN1bHRzXHJcbiAgICAgICAgICAgIGxldCBkdG8gPSBuZXcgRFRPKC0xLCBcIlwiLCAtMSwgW10pO1xyXG4gICAgICAgICAgICBpZihob3VzZWhvbGRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oMjAwLCBcIkdldCBTdWNjZXNzXCIsIGhvdXNlaG9sZHMubGVuZ3RoLCBob3VzZWhvbGRzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oNDA0LCBcIkdldCBTdWNjZXNzOiBObyBSZXN1bHRzXCIsIGhvdXNlaG9sZHMubGVuZ3RoLCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24pIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhkdG8pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy9Sb3V0ZTo6cG9zdCgnL2hvdXNlaG9sZHMnLCBbSG91c2Vob2xkQXBpQ29udHJvbGxlcjo6Y2xhc3MsICdzdG9yZSddKTtcclxuICAgIHB1YmxpYyBjcmVhdGUoaG91c2Vob2xkOkhvdXNlaG9sZCwgY2FsbGJhY2s6IGFueSlcclxuICAgIHtcclxuICAgICAgICAvL2Nvbm5lY3Rpb24gIFxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG5cclxuICAgICAgICAgICAgLy9kdG8gZm9yIGNhbGxiYWNrXHJcbiAgICAgICAgICAgIGxldCBkdG8gPSBuZXcgRFRPKC0xLCBcIlwiLCAtMSwgW10pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9JbnNldCBUaGUgSG91c2Vob2xkIHRoZW4gSXRlbXNcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0lOU0VSVCBJTlRPIEhPVVNFSE9MRFMgKE5BTUUsIFNUUkVFVCwgQ0lUWSwgU1RBVEUsIFpJUCwgREVTQ1JJUFRJT04sIENSRUFURURfQVQsIFVQREFURURfQVQpIFZBTFVFUyg/LD8sPyw/LD8sPyw/LD8pJywgW2hvdXNlaG9sZC5OYW1lLCBob3VzZWhvbGQuU3RyZWV0LCBob3VzZWhvbGQuQ2l0eSwgaG91c2Vob2xkLlN0YXRlLCBob3VzZWhvbGQuWmlwLCBob3VzZWhvbGQuRGVzY3JpcHRpb24sIG5ldyBEYXRlKCksIG5ldyBEYXRlKCldKTtcclxuICAgICAgICAgICAgaWYocmVzdWx0MS5hZmZlY3RlZFJvd3MgIT0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTyg0MDAsIFwiUG9zdCBGYWlsdXJlXCIsIDAsIFtdKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGR0byk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBob3VzZWhvbGRfaWQgPSByZXN1bHQxLmluc2VydElkO1xyXG4gICAgICAgICAgICBmb3IobGV0IHk9MDt5IDwgaG91c2Vob2xkLkl0ZW1zLmxlbmd0aDsrK3kpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQyID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnSU5TRVJUIElOVE8gSVRFTVMgKE5BTUUsIERFU0NSSVBUSU9OLCBRVUFOVElUWSwgSE9VU0VIT0xEX0lELCBDUkVBVEVEX0FULCBVUERBVEVEX0FUKSBWQUxVRVMoPyw/LD8sPyw/LD8pJywgW2hvdXNlaG9sZC5JdGVtc1t5XS5OYW1lLCBob3VzZWhvbGQuSXRlbXNbeV0uRGVzY3JpcHRpb24sIGhvdXNlaG9sZC5JdGVtc1t5XS5RdWFudGl0eSwgaG91c2Vob2xkX2lkLCBuZXcgRGF0ZSgpLCBuZXcgRGF0ZSgpXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vZ2V0IG5ldyBpdGVtcyBhbmQgY2FsbGJhY2sgcmVzdWx0c1xyXG4gICAgICAgICAgICBpZihyZXN1bHQxLmFmZmVjdGVkUm93cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MyA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIEhPVVNFSE9MRFMgV0hFUkUgSUQ9P1wiLCBob3VzZWhvbGRfaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpdGVtczpJdGVtW10gPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ0ID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gSVRFTVMgV0hFUkUgSE9VU0VIT0xEX0lEPT9cIiwgaG91c2Vob2xkX2lkKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgeT0wO3kgPCByZXN1bHQ0Lmxlbmd0aDsrK3kpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaChuZXcgSXRlbShyZXN1bHQ0W3ldLmlkLCByZXN1bHQ0W3ldLm5hbWUsIHJlc3VsdDRbeV0uZGVzY3JpcHRpb24sIHJlc3VsdDRbeV0ucXVhbnRpdHksIHJlc3VsdDRbeV0uaG91c2Vob2xkX2lkLCByZXN1bHQ0W3ldLmRvbmF0aW9uX2ZsYWcsIHJlc3VsdDRbeV0uY3JlYXRlZF9hdCwgcmVzdWx0NFt5XS51cGRhdGVkX2F0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDIwMCwgXCJQb3N0IFN1Y2Nlc3NcIiwgMSwgbmV3IEhvdXNlaG9sZChyZXN1bHQzWzBdLmlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0uc3RyZWV0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0M1swXS5jaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0M1swXS5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0uemlwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0M1swXS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0uY3JlYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0udXBkYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDQwMCwgXCJQb3N0IEZhaWx1cmVcIiwgMCwgW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uKSBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soZHRvKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL1JvdXRlOjpwdXQoJy9ob3VzZWhvbGRzL3tob3VzZWhvbGR9JywgW0hvdXNlaG9sZEFwaUNvbnRyb2xsZXI6OmNsYXNzLCAndXBkYXRlJ10pO1xyXG4gICAgcHVibGljIHVwZGF0ZShob3VzZWhvbGQ6YW55LCBjYWxsYmFjazogYW55KVxyXG4gICAge1xyXG4gICAgICAgIC8vdGhlIGNvbm5lY3Rpb24gXHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcbiAgICAgICAgICAgIC8vdXNlIFByb21pc2Z5XHJcbiAgICAgICAgICAgIGxldCBjaGFuZ2VzID0gMDtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1VQREFURSBIT1VTRUhPTERTIFNFVCBOQU1FPT8sIFNUUkVFVD0/LCBDSVRZPT8sIFNUQVRFPT8sIFpJUD0/LCBERVNDUklQVElPTj0/LCBVUERBVEVEX0FUPT8gV0hFUkUgSUQ9PycsIFtob3VzZWhvbGQuTmFtZSwgaG91c2Vob2xkLlN0cmVldCwgaG91c2Vob2xkLkNpdHksIGhvdXNlaG9sZC5TdGF0ZSwgaG91c2Vob2xkLlppcCwgaG91c2Vob2xkLkRlc2NyaXB0aW9uLCBuZXcgRGF0ZSgpLCBob3VzZWhvbGQuSWRdKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vcmV0dXJuIHJlc3VsdHNcclxuICAgICAgICAgICAgbGV0IGR0byA9IG5ldyBEVE8oLTEsIFwiXCIsIC0xLCBbXSk7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdDEuY2hhbmdlZFJvd3MgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDMgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBIT1VTRUhPTERTIFdIRVJFIElEID0gPyBPUkRFUiBCWSBOQU1FXCIsIGhvdXNlaG9sZC5JZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zOkl0ZW1bXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDQgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBJVEVNUyBXSEVSRSBIT1VTRUhPTERfSUQ9P1wiLCBob3VzZWhvbGQuSWQpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCB5PTA7eSA8IHJlc3VsdDQubGVuZ3RoOysreSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKG5ldyBJdGVtKHJlc3VsdDRbeV0uaWQsIHJlc3VsdDRbeV0ubmFtZSwgcmVzdWx0NFt5XS5kZXNjcmlwdGlvbiwgcmVzdWx0NFt5XS5xdWFudGl0eSwgcmVzdWx0NFt5XS5ob3VzZWhvbGRfaWQsIHJlc3VsdDRbeV0uZG9uYXRpb25fZmxhZywgcmVzdWx0NFt5XS5jcmVhdGVkX2F0LCByZXN1bHQ0W3ldLnVwZGF0ZWRfYXQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oMjAwLCBcIlB1dCBTdWNjZXNzXCIsIDEsIG5ldyBIb3VzZWhvbGQocmVzdWx0M1swXS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0M1swXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0uc3RyZWV0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0uY2l0eSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0uemlwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0M1swXS5jcmVhdGVkX2F0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0udXBkYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcykpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTyg0MDAsIFwiUHV0IEZhaWx1cmVcIiwgMCwgW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uKSBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soZHRvKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL1JvdXRlOjpkZWxldGUoJy9ob3VzZWhvbGRzL3tob3VzZWhvbGR9JywgW0hvdXNlaG9sZEFwaUNvbnRyb2xsZXI6OmNsYXNzLCAnZGVzdHJveSddKTtcclxuICAgIHB1YmxpYyBkZWxldGUoaG91c2Vob2xkX2lkOm51bWJlciwgY2FsbGJhY2s6IGFueSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuXHJcbiAgICAgICAgICAgIC8vdXNlIFByb21pc2Z5XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgLy9nZXQgb2JqZWN0cyBiZWZvcmUgZGVsZXRpbmdcclxuICAgICAgICAgICAgbGV0IGl0ZW1zOkl0ZW1bXSA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0NCA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIElURU1TIFdIRVJFIEhPVVNFSE9MRF9JRD0/XCIsIGhvdXNlaG9sZF9pZCk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgeT0wO3kgPCByZXN1bHQ0Lmxlbmd0aDsrK3kpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2gobmV3IEl0ZW0ocmVzdWx0NFt5XS5pZCwgcmVzdWx0NFt5XS5uYW1lLCByZXN1bHQ0W3ldLmRlc2NyaXB0aW9uLCByZXN1bHQ0W3ldLnF1YW50aXR5LCByZXN1bHQ0W3ldLmhvdXNlaG9sZF9pZCwgcmVzdWx0NFt5XS5kb25hdGlvbl9mbGFnLCByZXN1bHQ0W3ldLmNyZWF0ZWRfYXQsIHJlc3VsdDRbeV0udXBkYXRlZF9hdCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQzID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gSE9VU0VIT0xEUyBXSEVSRSBJRD0/XCIsIGhvdXNlaG9sZF9pZCk7XHJcblxyXG4gICAgICAgICAgICAvL2RlbGV0ZSBISFxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0RFTEVURSBGUk9NIEhPVVNFSE9MRFMgV0hFUkUgSUQ9PycsIGhvdXNlaG9sZF9pZCk7XHJcblxyXG4gICAgICAgICAgICAvL3JldHVybiByZXN1bHRzXHJcbiAgICAgICAgICAgIGxldCBkdG8gPSBuZXcgRFRPKC0xLCBcIlwiLCAtMSwgW10pO1xyXG4gICAgICAgICAgICBpZihyZXN1bHQxLmFmZmVjdGVkUm93cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDIwMCwgXCJEZWxldGUgU3VjY2Vzc1wiLCAxLCBuZXcgSG91c2Vob2xkKHJlc3VsdDNbMF0uaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLnN0cmVldCxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLmNpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0M1swXS5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLnppcCxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0uY3JlYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLnVwZGF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oNDAwLCBcIkRlbGV0ZSBGYWlsdXJlXCIsIDAsIFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbikgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGR0byk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=