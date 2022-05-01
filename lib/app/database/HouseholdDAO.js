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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9Ib3VzZWhvbGREQU8udHMiXSwibmFtZXMiOlsiSG91c2Vob2xkREFPIiwicG9vbCIsImNhbGxiYWNrIiwiaG91c2Vob2xkcyIsImdldENvbm5lY3Rpb24iLCJlcnIiLCJjb25uZWN0aW9uIiwicXVlcnkiLCJ1dGlsIiwicHJvbWlzaWZ5IiwicmVzdWx0MSIsIngiLCJsZW5ndGgiLCJISElEIiwiaWQiLCJpdGVtcyIsInJlc3VsdDIiLCJ5IiwicHVzaCIsIkl0ZW0iLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJxdWFudGl0eSIsImhvdXNlaG9sZF9pZCIsImRvbmF0aW9uX2ZsYWciLCJjcmVhdGVkX2F0IiwidXBkYXRlZF9hdCIsIkhvdXNlaG9sZCIsInN0cmVldCIsImNpdHkiLCJzdGF0ZSIsInppcCIsImR0byIsIkRUTyIsInJlbGVhc2UiLCJob3VzZWhvbGQiLCJOYW1lIiwiU3RyZWV0IiwiQ2l0eSIsIlN0YXRlIiwiWmlwIiwiRGVzY3JpcHRpb24iLCJEYXRlIiwiYWZmZWN0ZWRSb3dzIiwiaW5zZXJ0SWQiLCJJdGVtcyIsIlF1YW50aXR5IiwicmVzdWx0MyIsInJlc3VsdDQiLCJjaGFuZ2VzIiwiSWQiLCJjaGFuZ2VkUm93cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7Ozs7OztBQU5BO0FBS0E7SUFHYUEsWTtBQUlULHdCQUFZQyxJQUFaLEVBQ0E7QUFBQTtBQUFBO0FBQ0ksU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0gsRyxDQUVEOzs7OztXQUNBLGlCQUFlQyxRQUFmLEVBQ0E7QUFDSSxVQUFJQyxVQUFzQixHQUFHLEVBQTdCO0FBQ0EsV0FBS0YsSUFBTCxDQUFVRyxhQUFWO0FBQUEsMkZBQXdCLGlCQUFlQyxHQUFmLEVBQXdCQyxVQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFaEJELEdBRmdCO0FBQUE7QUFBQTtBQUFBOztB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QUNELHNCQUFJM0IsVUFBSixFQUFnQkEsVUFBVSxDQUFDNEIsT0FBWDtBQUNoQmhDLGtCQUFBQSxRQUFRLENBQUM4QixHQUFELENBQVI7O0FBbkNvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXFDSCIsInNvdXJjZXNDb250ZW50IjpbIi8vT2JqZWN0IE1vZGVsIERlcGVuZGVuY2llc1xyXG5pbXBvcnQgeyBIb3VzZWhvbGQgfSBmcm9tIFwiLi4vbW9kZWxzL0hvdXNlaG9sZFwiO1xyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4uL21vZGVscy9JdGVtXCI7XHJcbmltcG9ydCB7IERUTyB9ICAgICAgIGZyb20gXCIuLi9kYXRhYmFzZS9EVE9cIjtcclxuXHJcbi8vVXRpbCBNb2R1bGUgRGVwZW5kZW5jeSBmb3IgUHJvbWlzaWZ5XHJcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBIb3VzZWhvbGREQU8gXHJcbntcclxuICAgIHByaXZhdGUgcG9vbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb29sOiBhbnkpIFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucG9vbCA9IHBvb2w7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vUm91dGU6OmdldCgnL2hvdXNlaG9sZHMnKTtcclxuICAgIHB1YmxpYyByZWFkQWxsKGNhbGxiYWNrOiBhbnkpIFxyXG4gICAge1xyXG4gICAgICAgIGxldCBob3VzZWhvbGRzOkhvdXNlaG9sZFtdID0gW107XHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcbiAgICAgICAgICAgIC8vdXNlIFByb21pc2Z5XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIEhPVVNFSE9MRFMnKTtcclxuICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJlc3VsdDEubGVuZ3RoOysreClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IEhISUQgPSByZXN1bHQxW3hdLmlkO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zOkl0ZW1bXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDIgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBJVEVNUyBXSEVSRSBIT1VTRUhPTERfSUQ9P1wiLCBbSEhJRF0pO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCB5PTA7eSA8IHJlc3VsdDIubGVuZ3RoOysreSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKG5ldyBJdGVtKHJlc3VsdDJbeV0uaWQsIHJlc3VsdDJbeV0ubmFtZSwgcmVzdWx0Mlt5XS5kZXNjcmlwdGlvbiwgcmVzdWx0Mlt5XS5xdWFudGl0eSwgcmVzdWx0Mlt5XS5ob3VzZWhvbGRfaWQsIHJlc3VsdDJbeV0uZG9uYXRpb25fZmxhZywgcmVzdWx0Mlt5XS5jcmVhdGVkX2F0LCByZXN1bHQyW3ldLnVwZGF0ZWRfYXQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGhvdXNlaG9sZHMucHVzaChuZXcgSG91c2Vob2xkKHJlc3VsdDFbeF0uaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnN0cmVldCxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmNpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnppcCxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uY3JlYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnVwZGF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2NhbGxiYWNrIHRvIHJldHVybiByZXN1bHRzXHJcbiAgICAgICAgICAgIGxldCBkdG8gPSBuZXcgRFRPKC0xLCBcIlwiLCAtMSwgW10pO1xyXG4gICAgICAgICAgICBpZihob3VzZWhvbGRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oMjAwLCBcIkdldCBTdWNjZXNzXCIsIGhvdXNlaG9sZHMubGVuZ3RoLCBob3VzZWhvbGRzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oNDA0LCBcIkdldCBTdWNjZXNzOiBObyBSZXN1bHRzXCIsIGhvdXNlaG9sZHMubGVuZ3RoLCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24pIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhkdG8pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy9Sb3V0ZTo6Z2V0KCcvaG91c2Vob2xkcy97aG91c2Vob2xkfSlcclxuICAgIHB1YmxpYyByZWFkQnlJZChpZDpzdHJpbmcsIGNhbGxiYWNrOiBhbnkpIFxyXG4gICAge1xyXG4gICAgICAgIGxldCBob3VzZWhvbGRzOkhvdXNlaG9sZFtdID0gW107XHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgICAvL3VzZSBQcm9taXNmeVxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gSE9VU0VIT0xEUyBXSEVSRSBJRCA9ID8gT1JERVIgQlkgTkFNRVwiLCBpZCk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtczpJdGVtW10gPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQyID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gSVRFTVMgV0hFUkUgSE9VU0VIT0xEX0lEPT9cIiwgaWQpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCB5PTA7eSA8IHJlc3VsdDIubGVuZ3RoOysreSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKG5ldyBJdGVtKHJlc3VsdDJbeV0uaWQsIHJlc3VsdDJbeV0ubmFtZSwgcmVzdWx0Mlt5XS5kZXNjcmlwdGlvbiwgcmVzdWx0Mlt5XS5xdWFudGl0eSwgcmVzdWx0Mlt5XS5ob3VzZWhvbGRfaWQsIHJlc3VsdDJbeV0uZG9uYXRpb25fZmxhZywgcmVzdWx0Mlt5XS5jcmVhdGVkX2F0LCByZXN1bHQyW3ldLnVwZGF0ZWRfYXQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGhvdXNlaG9sZHMucHVzaChuZXcgSG91c2Vob2xkKHJlc3VsdDFbeF0uaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnN0cmVldCxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmNpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnppcCxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uY3JlYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnVwZGF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9jYWxsYmFjayB0byByZXR1cm4gcmVzdWx0c1xyXG4gICAgICAgICAgICBsZXQgZHRvID0gbmV3IERUTygtMSwgXCJcIiwgLTEsIFtdKTtcclxuICAgICAgICAgICAgaWYoaG91c2Vob2xkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDIwMCwgXCJHZXQgU3VjY2Vzc1wiLCBob3VzZWhvbGRzLmxlbmd0aCwgaG91c2Vob2xkcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDQwNCwgXCJHZXQgU3VjY2VzczogTm8gUmVzdWx0c1wiLCBob3VzZWhvbGRzLmxlbmd0aCwgW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uKSBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soZHRvKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vUm91dGU6OnBvc3QoJy9ob3VzZWhvbGRzJywgW0hvdXNlaG9sZEFwaUNvbnRyb2xsZXI6OmNsYXNzLCAnc3RvcmUnXSk7XHJcbiAgICBwdWJsaWMgY3JlYXRlKGhvdXNlaG9sZDpIb3VzZWhvbGQsIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgLy9jb25uZWN0aW9uICBcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuXHJcbiAgICAgICAgICAgIC8vZHRvIGZvciBjYWxsYmFja1xyXG4gICAgICAgICAgICBsZXQgZHRvID0gbmV3IERUTygtMSwgXCJcIiwgLTEsIFtdKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vSW5zZXQgVGhlIEhvdXNlaG9sZCB0aGVuIEl0ZW1zXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdJTlNFUlQgSU5UTyBIT1VTRUhPTERTIChOQU1FLCBTVFJFRVQsIENJVFksIFNUQVRFLCBaSVAsIERFU0NSSVBUSU9OLCBDUkVBVEVEX0FULCBVUERBVEVEX0FUKSBWQUxVRVMoPyw/LD8sPyw/LD8sPyw/KScsIFtob3VzZWhvbGQuTmFtZSwgaG91c2Vob2xkLlN0cmVldCwgaG91c2Vob2xkLkNpdHksIGhvdXNlaG9sZC5TdGF0ZSwgaG91c2Vob2xkLlppcCwgaG91c2Vob2xkLkRlc2NyaXB0aW9uLCBuZXcgRGF0ZSgpLCBuZXcgRGF0ZSgpXSk7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdDEuYWZmZWN0ZWRSb3dzICE9IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oNDAwLCBcIlBvc3QgRmFpbHVyZVwiLCAwLCBbXSk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhkdG8pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaG91c2Vob2xkX2lkID0gcmVzdWx0MS5pbnNlcnRJZDtcclxuICAgICAgICAgICAgZm9yKGxldCB5PTA7eSA8IGhvdXNlaG9sZC5JdGVtcy5sZW5ndGg7Kyt5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MiA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0lOU0VSVCBJTlRPIElURU1TIChOQU1FLCBERVNDUklQVElPTiwgUVVBTlRJVFksIEhPVVNFSE9MRF9JRCwgQ1JFQVRFRF9BVCwgVVBEQVRFRF9BVCkgVkFMVUVTKD8sPyw/LD8sPyw/KScsIFtob3VzZWhvbGQuSXRlbXNbeV0uTmFtZSwgaG91c2Vob2xkLkl0ZW1zW3ldLkRlc2NyaXB0aW9uLCBob3VzZWhvbGQuSXRlbXNbeV0uUXVhbnRpdHksIGhvdXNlaG9sZF9pZCwgbmV3IERhdGUoKSwgbmV3IERhdGUoKV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2dldCBuZXcgaXRlbXMgYW5kIGNhbGxiYWNrIHJlc3VsdHNcclxuICAgICAgICAgICAgaWYocmVzdWx0MS5hZmZlY3RlZFJvd3MgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDMgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBIT1VTRUhPTERTIFdIRVJFIElEPT9cIiwgaG91c2Vob2xkX2lkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXM6SXRlbVtdID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0NCA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIElURU1TIFdIRVJFIEhPVVNFSE9MRF9JRD0/XCIsIGhvdXNlaG9sZF9pZCk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IHk9MDt5IDwgcmVzdWx0NC5sZW5ndGg7Kyt5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2gobmV3IEl0ZW0ocmVzdWx0NFt5XS5pZCwgcmVzdWx0NFt5XS5uYW1lLCByZXN1bHQ0W3ldLmRlc2NyaXB0aW9uLCByZXN1bHQ0W3ldLnF1YW50aXR5LCByZXN1bHQ0W3ldLmhvdXNlaG9sZF9pZCwgcmVzdWx0NFt5XS5kb25hdGlvbl9mbGFnLCByZXN1bHQ0W3ldLmNyZWF0ZWRfYXQsIHJlc3VsdDRbeV0udXBkYXRlZF9hdCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTygyMDAsIFwiUG9zdCBTdWNjZXNzXCIsIDEsIG5ldyBIb3VzZWhvbGQocmVzdWx0M1swXS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLnN0cmVldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0uY2l0eSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLnppcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLmNyZWF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLnVwZGF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcykpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTyg0MDAsIFwiUG9zdCBGYWlsdXJlXCIsIDAsIFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbikgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGR0byk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9Sb3V0ZTo6cHV0KCcvaG91c2Vob2xkcy97aG91c2Vob2xkfScsIFtIb3VzZWhvbGRBcGlDb250cm9sbGVyOjpjbGFzcywgJ3VwZGF0ZSddKTtcclxuICAgIHB1YmxpYyB1cGRhdGUoaG91c2Vob2xkOmFueSwgY2FsbGJhY2s6IGFueSlcclxuICAgIHtcclxuICAgICAgICAvL3RoZSBjb25uZWN0aW9uIFxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG4gICAgICAgICAgICAvL3VzZSBQcm9taXNmeVxyXG4gICAgICAgICAgICBsZXQgY2hhbmdlcyA9IDA7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdVUERBVEUgSE9VU0VIT0xEUyBTRVQgTkFNRT0/LCBTVFJFRVQ9PywgQ0lUWT0/LCBTVEFURT0/LCBaSVA9PywgREVTQ1JJUFRJT049PywgVVBEQVRFRF9BVD0/IFdIRVJFIElEPT8nLCBbaG91c2Vob2xkLk5hbWUsIGhvdXNlaG9sZC5TdHJlZXQsIGhvdXNlaG9sZC5DaXR5LCBob3VzZWhvbGQuU3RhdGUsIGhvdXNlaG9sZC5aaXAsIGhvdXNlaG9sZC5EZXNjcmlwdGlvbiwgbmV3IERhdGUoKSwgaG91c2Vob2xkLklkXSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3JldHVybiByZXN1bHRzXHJcbiAgICAgICAgICAgIGxldCBkdG8gPSBuZXcgRFRPKC0xLCBcIlwiLCAtMSwgW10pO1xyXG4gICAgICAgICAgICBpZihyZXN1bHQxLmNoYW5nZWRSb3dzICE9IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQzID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gSE9VU0VIT0xEUyBXSEVSRSBJRCA9ID8gT1JERVIgQlkgTkFNRVwiLCBob3VzZWhvbGQuSWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpdGVtczpJdGVtW10gPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ0ID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gSVRFTVMgV0hFUkUgSE9VU0VIT0xEX0lEPT9cIiwgaG91c2Vob2xkLklkKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgeT0wO3kgPCByZXN1bHQ0Lmxlbmd0aDsrK3kpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaChuZXcgSXRlbShyZXN1bHQ0W3ldLmlkLCByZXN1bHQ0W3ldLm5hbWUsIHJlc3VsdDRbeV0uZGVzY3JpcHRpb24sIHJlc3VsdDRbeV0ucXVhbnRpdHksIHJlc3VsdDRbeV0uaG91c2Vob2xkX2lkLCByZXN1bHQ0W3ldLmRvbmF0aW9uX2ZsYWcsIHJlc3VsdDRbeV0uY3JlYXRlZF9hdCwgcmVzdWx0NFt5XS51cGRhdGVkX2F0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDIwMCwgXCJQdXQgU3VjY2Vzc1wiLCAxLCBuZXcgSG91c2Vob2xkKHJlc3VsdDNbMF0uaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLnN0cmVldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLmNpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0M1swXS5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLnppcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0uY3JlYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLnVwZGF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oNDAwLCBcIlB1dCBGYWlsdXJlXCIsIDAsIFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbikgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGR0byk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9Sb3V0ZTo6ZGVsZXRlKCcvaG91c2Vob2xkcy97aG91c2Vob2xkfScsIFtIb3VzZWhvbGRBcGlDb250cm9sbGVyOjpjbGFzcywgJ2Rlc3Ryb3knXSk7XHJcbiAgICBwdWJsaWMgZGVsZXRlKGhvdXNlaG9sZF9pZDpudW1iZXIsIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgICAvL3VzZSBQcm9taXNmeVxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIC8vZ2V0IG9iamVjdHMgYmVmb3JlIGRlbGV0aW5nXHJcbiAgICAgICAgICAgIGxldCBpdGVtczpJdGVtW10gPSBbXTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDQgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBJVEVNUyBXSEVSRSBIT1VTRUhPTERfSUQ9P1wiLCBob3VzZWhvbGRfaWQpO1xyXG4gICAgICAgICAgICBmb3IobGV0IHk9MDt5IDwgcmVzdWx0NC5sZW5ndGg7Kyt5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKG5ldyBJdGVtKHJlc3VsdDRbeV0uaWQsIHJlc3VsdDRbeV0ubmFtZSwgcmVzdWx0NFt5XS5kZXNjcmlwdGlvbiwgcmVzdWx0NFt5XS5xdWFudGl0eSwgcmVzdWx0NFt5XS5ob3VzZWhvbGRfaWQsIHJlc3VsdDRbeV0uZG9uYXRpb25fZmxhZywgcmVzdWx0NFt5XS5jcmVhdGVkX2F0LCByZXN1bHQ0W3ldLnVwZGF0ZWRfYXQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MyA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIEhPVVNFSE9MRFMgV0hFUkUgSUQ9P1wiLCBob3VzZWhvbGRfaWQpO1xyXG5cclxuICAgICAgICAgICAgLy9kZWxldGUgSEhcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdERUxFVEUgRlJPTSBIT1VTRUhPTERTIFdIRVJFIElEPT8nLCBob3VzZWhvbGRfaWQpO1xyXG5cclxuICAgICAgICAgICAgLy9yZXR1cm4gcmVzdWx0c1xyXG4gICAgICAgICAgICBsZXQgZHRvID0gbmV3IERUTygtMSwgXCJcIiwgLTEsIFtdKTtcclxuICAgICAgICAgICAgaWYocmVzdWx0MS5hZmZlY3RlZFJvd3MgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTygyMDAsIFwiRGVsZXRlIFN1Y2Nlc3NcIiwgMSwgbmV3IEhvdXNlaG9sZChyZXN1bHQzWzBdLmlkLCBcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0M1swXS5zdHJlZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0M1swXS5jaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDNbMF0uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0M1swXS56aXAsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0M1swXS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQzWzBdLmNyZWF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0M1swXS51cGRhdGVkX2F0LFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDQwMCwgXCJEZWxldGUgRmFpbHVyZVwiLCAwLCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24pIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhkdG8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19