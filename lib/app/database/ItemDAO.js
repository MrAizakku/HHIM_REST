"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemDAO = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Item = require("../models/Item");

var _DTO = require("../database/DTO");

var util = _interopRequireWildcard(require("util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//Object Model Dependencies
//Util Module Dependency for Promisify
var ItemDAO = /*#__PURE__*/function () {
  function ItemDAO(pool) {
    (0, _classCallCheck2.default)(this, ItemDAO);
    (0, _defineProperty2.default)(this, "pool", void 0);
    this.pool = pool;
  }
  /************************
   *        ITEMS         *
   ************************/


  (0, _createClass2.default)(ItemDAO, [{
    key: "readAll",
    value: function readAll(callback) {
      var items = [];
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
                  return connection.query('SELECT * FROM ITEMS');

                case 5:
                  result1 = _context.sent;

                  for (x = 0; x < result1.length; ++x) {
                    items.push(new _Item.Item(result1[x].id, result1[x].name, result1[x].description, result1[x].quantity, result1[x].household_id, result1[x].donation_flag, result1[x].created_at, result1[x].updated_at));
                  } //callback to return results


                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (items.length > 0) {
                    dto = new _DTO.DTO(200, "Get Success", items.length, items);
                  } else {
                    dto = new _DTO.DTO(404, "Get Success: No Results", items.length, []);
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
    key: "readById",
    value: function readById(id, callback) {
      var items = [];
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
                  return connection.query("SELECT * FROM ITEMS WHERE ID = ? ORDER BY NAME", id);

                case 5:
                  result1 = _context2.sent;

                  for (x = 0; x < result1.length; ++x) {
                    items.push(new _Item.Item(result1[x].id, result1[x].name, result1[x].description, result1[x].quantity, result1[x].household_id, result1[x].donation_flag, result1[x].created_at, result1[x].updated_at));
                  } //return results


                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (items.length > 0) {
                    dto = new _DTO.DTO(200, "Get Success", items.length, items);
                  } else {
                    dto = new _DTO.DTO(404, "Get Success: No Results", items.length, []);
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
    } //Route::get('/items/household/{hhid}', [ItemApiController::class, 'isolateByHhid']);

  }, {
    key: "readByHhid",
    value: function readByHhid(id, callback) {
      var items = [];
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
                  return connection.query("SELECT * FROM ITEMS WHERE HOUSEHOLD_ID = ? ORDER BY NAME", id);

                case 5:
                  result1 = _context3.sent;

                  for (x = 0; x < result1.length; ++x) {
                    items.push(new _Item.Item(result1[x].id, result1[x].name, result1[x].description, result1[x].quantity, result1[x].household_id, result1[x].donation_flag, result1[x].created_at, result1[x].updated_at));
                  } //return items


                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (items.length > 0) {
                    dto = new _DTO.DTO(200, "Get Success", items.length, items);
                  } else {
                    dto = new _DTO.DTO(404, "Get Success: No Results", items.length, []);
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
    } //Route::post('/items', [ItemApiController::class, 'store']);

  }, {
    key: "create",
    value: function create(item, callback) {
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
                  return connection.query('INSERT INTO ITEMS (NAME, DESCRIPTION, QUANTITY, HOUSEHOLD_ID, CREATED_AT, UPDATED_AT) VALUES(?,?,?,?,?,?)', [item.Name, item.Description, item.Quantity, item.Household_id, new Date(), new Date()]);

                case 5:
                  result1 = _context4.sent;
                  //return results
                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (!(result1.affectedRows == 1)) {
                    _context4.next = 14;
                    break;
                  }

                  _context4.next = 10;
                  return connection.query("SELECT * FROM ITEMS WHERE ID = ? ORDER BY NAME", result1.insertId);

                case 10:
                  result2 = _context4.sent;
                  dto = new _DTO.DTO(200, "Post Success", 1, new _Item.Item(result2[0].id, result2[0].name, result2[0].description, result2[0].quantity, result2[0].household_id, result2[0].donation_flag, result2[0].created_at, result2[0].updated_at));
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
    } //Route::put('/items/{item}', [ItemApiController::class, 'update']);

  }, {
    key: "update",
    value: function update(item, callback) {
      //the connection 
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
                  return connection.query('UPDATE ITEMS SET NAME=?, DESCRIPTION=?, QUANTITY=?, DONATION_FLAG=?, UPDATED_AT=? WHERE ID=?', [item.Name, item.Description, item.Quantity, item.Donation_flag, new Date(), item.Id]);

                case 5:
                  result1 = _context5.sent;
                  //return results
                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (!(result1.changedRows != 0)) {
                    _context5.next = 14;
                    break;
                  }

                  _context5.next = 10;
                  return connection.query("SELECT * FROM ITEMS WHERE ID = ?", item.Id);

                case 10:
                  result2 = _context5.sent;
                  dto = new _DTO.DTO(200, "Update Success", 1, new _Item.Item(result2[0].id, result2[0].name, result2[0].description, result2[0].quantity, result2[0].household_id, result2[0].donation_flag, result2[0].created_at, result2[0].updated_at));
                  _context5.next = 15;
                  break;

                case 14:
                  dto = new _DTO.DTO(404, "Update Failure", 0, []);

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
    } //Route::delete('/items/{item}', [ItemApiController::class, 'destroy']);

  }, {
    key: "delete",
    value: function _delete(item_id, callback) {
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(err, connection) {
          var result2, result1, dto;
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
                  connection.query = util.promisify(connection.query); //get object before deleting

                  _context6.next = 5;
                  return connection.query("SELECT * FROM ITEMS WHERE ID = ? ORDER BY NAME", item_id);

                case 5:
                  result2 = _context6.sent;
                  _context6.next = 8;
                  return connection.query('DELETE FROM ITEMS WHERE ID=?', item_id);

                case 8:
                  result1 = _context6.sent;
                  //return results in DTO
                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (result1.affectedRows == 1) {
                    dto = new _DTO.DTO(200, "Delete Success", 1, new _Item.Item(result2[0].id, result2[0].name, result2[0].description, result2[0].quantity, result2[0].household_id, result2[0].donation_flag, result2[0].created_at, result2[0].updated_at));
                  } else {
                    dto = new _DTO.DTO(400, "Delete Failure", 0, []);
                  }

                  if (connection) connection.release();
                  callback(dto);

                case 13:
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
  return ItemDAO;
}();

exports.ItemDAO = ItemDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9JdGVtREFPLnRzIl0sIm5hbWVzIjpbIkl0ZW1EQU8iLCJwb29sIiwiY2FsbGJhY2siLCJpdGVtcyIsImdldENvbm5lY3Rpb24iLCJlcnIiLCJjb25uZWN0aW9uIiwicXVlcnkiLCJ1dGlsIiwicHJvbWlzaWZ5IiwicmVzdWx0MSIsIngiLCJsZW5ndGgiLCJwdXNoIiwiSXRlbSIsImlkIiwibmFtZSIsImRlc2NyaXB0aW9uIiwicXVhbnRpdHkiLCJob3VzZWhvbGRfaWQiLCJkb25hdGlvbl9mbGFnIiwiY3JlYXRlZF9hdCIsInVwZGF0ZWRfYXQiLCJkdG8iLCJEVE8iLCJyZWxlYXNlIiwiaXRlbSIsIk5hbWUiLCJEZXNjcmlwdGlvbiIsIlF1YW50aXR5IiwiSG91c2Vob2xkX2lkIiwiRGF0ZSIsImFmZmVjdGVkUm93cyIsImluc2VydElkIiwicmVzdWx0MiIsIkRvbmF0aW9uX2ZsYWciLCJJZCIsImNoYW5nZWRSb3dzIiwiaXRlbV9pZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBR0E7Ozs7OztBQUxBO0FBSUE7SUFHYUEsTztBQUtULG1CQUFZQyxJQUFaLEVBQ0E7QUFBQTtBQUFBO0FBQ0ksU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0g7QUFDRDtBQUNKO0FBQ0E7Ozs7O1dBQ0ksaUJBQWVDLFFBQWYsRUFDQTtBQUNJLFVBQUlDLEtBQVksR0FBRyxFQUFuQjtBQUNBLFdBQUtGLElBQUwsQ0FBVUcsYUFBVjtBQUFBLDJGQUF3QixpQkFBZUMsR0FBZixFQUF3QkMsVUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRWhCRCxHQUZnQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSx3QkFFTEEsR0FGSzs7QUFBQTtBQUdwQjtBQUNBQyxrQkFBQUEsVUFBVSxDQUFDQyxLQUFYLEdBQW1CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUgsVUFBVSxDQUFDQyxLQUExQixDQUFu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QUosQ0FBUSxDQUFDLENBQVQsRUFBWSxFQUFaLEVBQWdCLENBQUMsQ0FBakIsRUFBb0IsRUFBcEIsQ0FWVTs7QUFXcEIsc0JBQUdkLE9BQU8sQ0FBQ3NCLFlBQVIsSUFBd0IsQ0FBM0IsRUFBOEI7QUFDMUJULG9CQUFBQSxHQUFHLEdBQUcsSUFBSUMsUUFBSixDQUFRLEdBQVIsRUFBYSxnQkFBYixFQUErQixDQUEvQixFQUFrQyxJQUFJVixVQUFKLENBQVNvQixPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVduQixFQUFwQixFQUNJbUIsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXbEIsSUFEZixFQUVJa0IsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXakIsV0FGZixFQUdJaUIsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXaEIsUUFIZixFQUlJZ0IsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXZixZQUpmLEVBS0llLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBV2QsYUFMZixFQU1JYyxPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdiLFVBTmYsRUFPSWEsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXWixVQVBmLENBQWxDLENBQU47QUFRSCxtQkFURCxNQVNPO0FBQ0hDLG9CQUFBQSxHQUFHLEdBQUcsSUFBSUMsUUFBSixDQUFRLEdBQVIsRUFBYSxnQkFBYixFQUErQixDQUEvQixFQUFrQyxFQUFsQyxDQUFOO0FBQ0g7O0FBQ0Qsc0JBQUlsQixVQUFKLEVBQWdCQSxVQUFVLENBQUNtQixPQUFYO0FBQ2hCdkIsa0JBQUFBLFFBQVEsQ0FBQ3FCLEdBQUQsQ0FBUjs7QUF4Qm9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQXhCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBMEJIIiwic291cmNlc0NvbnRlbnQiOlsiLy9PYmplY3QgTW9kZWwgRGVwZW5kZW5jaWVzXHJcbmltcG9ydCB7IEl0ZW0gfSAgICAgIGZyb20gXCIuLi9tb2RlbHMvSXRlbVwiO1xyXG5pbXBvcnQgeyBEVE8gfSAgICAgICBmcm9tIFwiLi4vZGF0YWJhc2UvRFRPXCI7XHJcblxyXG4vL1V0aWwgTW9kdWxlIERlcGVuZGVuY3kgZm9yIFByb21pc2lmeVxyXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSXRlbURBTyBcclxue1xyXG4gICAgcHJpdmF0ZSBwb29sO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb29sOiBhbnkpIFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucG9vbCA9IHBvb2w7XHJcbiAgICB9XHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgKiAgICAgICAgSVRFTVMgICAgICAgICAqXHJcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgcHVibGljIHJlYWRBbGwoY2FsbGJhY2s6IGFueSkgXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGl0ZW1zOkl0ZW1bXSA9IFtdO1xyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG4gICAgICAgICAgICAvL3VzZSBQcm9taXNmeVxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBJVEVNUycpO1xyXG4gICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKG5ldyBJdGVtKHJlc3VsdDFbeF0uaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0ucXVhbnRpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uaG91c2Vob2xkX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmRvbmF0aW9uX2ZsYWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uY3JlYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS51cGRhdGVkX2F0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jYWxsYmFjayB0byByZXR1cm4gcmVzdWx0c1xyXG4gICAgICAgICAgICBsZXQgZHRvID0gbmV3IERUTygtMSwgXCJcIiwgLTEsIFtdKTtcclxuICAgICAgICAgICAgaWYoaXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTygyMDAsIFwiR2V0IFN1Y2Nlc3NcIiwgaXRlbXMubGVuZ3RoLCBpdGVtcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDQwNCwgXCJHZXQgU3VjY2VzczogTm8gUmVzdWx0c1wiLCBpdGVtcy5sZW5ndGgsIFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbikgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGR0byk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVhZEJ5SWQoaWQ6c3RyaW5nLCBjYWxsYmFjazogYW55KSBcclxuICAgIHtcclxuICAgICAgICBsZXQgaXRlbXM6SXRlbVtdID0gW107XHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgICAvL3VzZSBQcm9taXNmeVxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gSVRFTVMgV0hFUkUgSUQgPSA/IE9SREVSIEJZIE5BTUVcIiwgaWQpO1xyXG4gICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKG5ldyBJdGVtKHJlc3VsdDFbeF0uaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0ucXVhbnRpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5ob3VzZWhvbGRfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5kb25hdGlvbl9mbGFnLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uY3JlYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnVwZGF0ZWRfYXQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3JldHVybiByZXN1bHRzXHJcbiAgICAgICAgICAgIGxldCBkdG8gPSBuZXcgRFRPKC0xLCBcIlwiLCAtMSwgW10pO1xyXG4gICAgICAgICAgICBpZihpdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDIwMCwgXCJHZXQgU3VjY2Vzc1wiLCBpdGVtcy5sZW5ndGgsIGl0ZW1zKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oNDA0LCBcIkdldCBTdWNjZXNzOiBObyBSZXN1bHRzXCIsIGl0ZW1zLmxlbmd0aCwgW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uKSBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soZHRvKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vUm91dGU6OmdldCgnL2l0ZW1zL2hvdXNlaG9sZC97aGhpZH0nLCBbSXRlbUFwaUNvbnRyb2xsZXI6OmNsYXNzLCAnaXNvbGF0ZUJ5SGhpZCddKTtcclxuICAgIHB1YmxpYyByZWFkQnlIaGlkKGlkOnN0cmluZywgY2FsbGJhY2s6IGFueSkgXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGl0ZW1zOkl0ZW1bXSA9IFtdO1xyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG5cclxuICAgICAgICAgICAgLy91c2UgUHJvbWlzZnlcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIElURU1TIFdIRVJFIEhPVVNFSE9MRF9JRCA9ID8gT1JERVIgQlkgTkFNRVwiLCBpZCk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2gobmV3IEl0ZW0ocmVzdWx0MVt4XS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5xdWFudGl0eSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmhvdXNlaG9sZF9pZCxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmRvbmF0aW9uX2ZsYWcsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5jcmVhdGVkX2F0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0udXBkYXRlZF9hdCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIGl0ZW1zXHJcbiAgICAgICAgICAgIGxldCBkdG8gPSBuZXcgRFRPKC0xLCBcIlwiLCAtMSwgW10pO1xyXG4gICAgICAgICAgICBpZihpdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDIwMCwgXCJHZXQgU3VjY2Vzc1wiLCBpdGVtcy5sZW5ndGgsIGl0ZW1zKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oNDA0LCBcIkdldCBTdWNjZXNzOiBObyBSZXN1bHRzXCIsIGl0ZW1zLmxlbmd0aCwgW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uKSBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soZHRvKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vUm91dGU6OnBvc3QoJy9pdGVtcycsIFtJdGVtQXBpQ29udHJvbGxlcjo6Y2xhc3MsICdzdG9yZSddKTtcclxuICAgIHB1YmxpYyBjcmVhdGUoaXRlbTpJdGVtLCBjYWxsYmFjazogYW55KVxyXG4gICAge1xyXG4gICAgICAgIC8vY29ubmVjdGlvbiAgXHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgICAvL3VzZSBQcm9taXNmeVxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnSU5TRVJUIElOVE8gSVRFTVMgKE5BTUUsIERFU0NSSVBUSU9OLCBRVUFOVElUWSwgSE9VU0VIT0xEX0lELCBDUkVBVEVEX0FULCBVUERBVEVEX0FUKSBWQUxVRVMoPyw/LD8sPyw/LD8pJywgW2l0ZW0uTmFtZSwgaXRlbS5EZXNjcmlwdGlvbiwgaXRlbS5RdWFudGl0eSwgaXRlbS5Ib3VzZWhvbGRfaWQsIG5ldyBEYXRlKCksIG5ldyBEYXRlKCldKTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gcmVzdWx0c1xyXG4gICAgICAgICAgICBsZXQgZHRvID0gbmV3IERUTygtMSwgXCJcIiwgLTEsIFtdKTtcclxuICAgICAgICAgICAgaWYocmVzdWx0MS5hZmZlY3RlZFJvd3MgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDIgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBJVEVNUyBXSEVSRSBJRCA9ID8gT1JERVIgQlkgTkFNRVwiLCByZXN1bHQxLmluc2VydElkKTsgICAgICAgXHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDIwMCwgXCJQb3N0IFN1Y2Nlc3NcIiwgMSwgbmV3IEl0ZW0ocmVzdWx0MlswXS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS5xdWFudGl0eSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLmhvdXNlaG9sZF9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLmRvbmF0aW9uX2ZsYWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS5jcmVhdGVkX2F0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0udXBkYXRlZF9hdCkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTyg0MDAsIFwiUG9zdCBGYWlsdXJlXCIsIDAsIFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbikgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGR0byk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9Sb3V0ZTo6cHV0KCcvaXRlbXMve2l0ZW19JywgW0l0ZW1BcGlDb250cm9sbGVyOjpjbGFzcywgJ3VwZGF0ZSddKTtcclxuICAgIHB1YmxpYyB1cGRhdGUoaXRlbTphbnksIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgLy90aGUgY29ubmVjdGlvbiBcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuICAgICAgICAgICAgLy91c2UgUHJvbWlzZnlcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1VQREFURSBJVEVNUyBTRVQgTkFNRT0/LCBERVNDUklQVElPTj0/LCBRVUFOVElUWT0/LCBET05BVElPTl9GTEFHPT8sIFVQREFURURfQVQ9PyBXSEVSRSBJRD0/JywgW2l0ZW0uTmFtZSwgaXRlbS5EZXNjcmlwdGlvbiwgaXRlbS5RdWFudGl0eSwgaXRlbS5Eb25hdGlvbl9mbGFnLCBuZXcgRGF0ZSgpLCBpdGVtLklkXSk7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIHJlc3VsdHNcclxuICAgICAgICAgICAgbGV0IGR0byA9IG5ldyBEVE8oLTEsIFwiXCIsIC0xLCBbXSk7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdDEuY2hhbmdlZFJvd3MgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDIgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBJVEVNUyBXSEVSRSBJRCA9ID9cIiwgaXRlbS5JZCk7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDIwMCwgXCJVcGRhdGUgU3VjY2Vzc1wiLCAxLCBuZXcgSXRlbShyZXN1bHQyWzBdLmlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLnF1YW50aXR5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLmhvdXNlaG9sZF9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS5kb25hdGlvbl9mbGFnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLmNyZWF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0udXBkYXRlZF9hdCkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTyg0MDQsIFwiVXBkYXRlIEZhaWx1cmVcIiwgMCwgW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uKSBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soZHRvKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL1JvdXRlOjpkZWxldGUoJy9pdGVtcy97aXRlbX0nLCBbSXRlbUFwaUNvbnRyb2xsZXI6OmNsYXNzLCAnZGVzdHJveSddKTtcclxuICAgIHB1YmxpYyBkZWxldGUoaXRlbV9pZDpudW1iZXIsIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgICAvL3VzZSBQcm9taXNmeVxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIC8vZ2V0IG9iamVjdCBiZWZvcmUgZGVsZXRpbmdcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDIgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBJVEVNUyBXSEVSRSBJRCA9ID8gT1JERVIgQlkgTkFNRVwiLCBpdGVtX2lkKTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdERUxFVEUgRlJPTSBJVEVNUyBXSEVSRSBJRD0/JywgaXRlbV9pZCk7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIHJlc3VsdHMgaW4gRFRPXHJcbiAgICAgICAgICAgIGxldCBkdG8gPSBuZXcgRFRPKC0xLCBcIlwiLCAtMSwgW10pO1xyXG4gICAgICAgICAgICBpZihyZXN1bHQxLmFmZmVjdGVkUm93cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDIwMCwgXCJEZWxldGUgU3VjY2Vzc1wiLCAxLCBuZXcgSXRlbShyZXN1bHQyWzBdLmlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLnF1YW50aXR5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLmhvdXNlaG9sZF9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS5kb25hdGlvbl9mbGFnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLmNyZWF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0udXBkYXRlZF9hdCkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTyg0MDAsIFwiRGVsZXRlIEZhaWx1cmVcIiwgMCwgW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uKSBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soZHRvKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==