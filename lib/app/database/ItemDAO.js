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
    } //Route::get('/items/{item}', [ItemApiController::class, 'isolateById']);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9JdGVtREFPLnRzIl0sIm5hbWVzIjpbIkl0ZW1EQU8iLCJwb29sIiwiY2FsbGJhY2siLCJpdGVtcyIsImdldENvbm5lY3Rpb24iLCJlcnIiLCJjb25uZWN0aW9uIiwicXVlcnkiLCJ1dGlsIiwicHJvbWlzaWZ5IiwicmVzdWx0MSIsIngiLCJsZW5ndGgiLCJwdXNoIiwiSXRlbSIsImlkIiwibmFtZSIsImRlc2NyaXB0aW9uIiwicXVhbnRpdHkiLCJob3VzZWhvbGRfaWQiLCJkb25hdGlvbl9mbGFnIiwiY3JlYXRlZF9hdCIsInVwZGF0ZWRfYXQiLCJkdG8iLCJEVE8iLCJyZWxlYXNlIiwiaXRlbSIsIk5hbWUiLCJEZXNjcmlwdGlvbiIsIlF1YW50aXR5IiwiSG91c2Vob2xkX2lkIiwiRGF0ZSIsImFmZmVjdGVkUm93cyIsImluc2VydElkIiwicmVzdWx0MiIsIkRvbmF0aW9uX2ZsYWciLCJJZCIsImNoYW5nZWRSb3dzIiwiaXRlbV9pZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBR0E7Ozs7OztBQUxBO0FBSUE7SUFHYUEsTztBQUtULG1CQUFZQyxJQUFaLEVBQ0E7QUFBQTtBQUFBO0FBQ0ksU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0g7QUFDRDtBQUNKO0FBQ0E7Ozs7O1dBQ0ksaUJBQWVDLFFBQWYsRUFDQTtBQUNJLFVBQUlDLEtBQVksR0FBRyxFQUFuQjtBQUNBLFdBQUtGLElBQUwsQ0FBVUcsYUFBVjtBQUFBLDJGQUF3QixpQkFBZUMsR0FBZixFQUF3QkMsVUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRWhCRCxHQUZnQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSx3QkFFTEEsR0FGSzs7QUFBQTtBQUdwQjtBQUNBQyxrQkFBQUEsVUFBVSxDQUFDQyxLQUFYLEdBQW1CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUgsVUFBVSxDQUFDQyxLQUExQixDQUFu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SUFBSUMsUUFBSixDQUFRLENBQUMsQ0FBVCxFQUFZLEVBQVosRUFBZ0IsQ0FBQyxDQUFqQixFQUFvQixFQUFwQixDQVZVOztBQVdwQixzQkFBR2QsT0FBTyxDQUFDc0IsWUFBUixJQUF3QixDQUEzQixFQUE4QjtBQUMxQlQsb0JBQUFBLEdBQUcsR0FBRyxJQUFJQyxRQUFKLENBQVEsR0FBUixFQUFhLGdCQUFiLEVBQStCLENBQS9CLEVBQWtDLElBQUlWLFVBQUosQ0FBU29CLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBV25CLEVBQXBCLEVBQ0ltQixPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdsQixJQURmLEVBRUlrQixPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdqQixXQUZmLEVBR0lpQixPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdoQixRQUhmLEVBSUlnQixPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdmLFlBSmYsRUFLSWUsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXZCxhQUxmLEVBTUljLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBV2IsVUFOZixFQU9JYSxPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdaLFVBUGYsQ0FBbEMsQ0FBTjtBQVFILG1CQVRELE1BU087QUFDSEMsb0JBQUFBLEdBQUcsR0FBRyxJQUFJQyxRQUFKLENBQVEsR0FBUixFQUFhLGdCQUFiLEVBQStCLENBQS9CLEVBQWtDLEVBQWxDLENBQU47QUFDSDs7QUFDRCxzQkFBSWxCLFVBQUosRUFBZ0JBLFVBQVUsQ0FBQ21CLE9BQVg7QUFDaEJ2QixrQkFBQUEsUUFBUSxDQUFDcUIsR0FBRCxDQUFSOztBQXhCb0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBeEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUEwQkgiLCJzb3VyY2VzQ29udGVudCI6WyIvL09iamVjdCBNb2RlbCBEZXBlbmRlbmNpZXNcclxuaW1wb3J0IHsgSXRlbSB9ICAgICAgZnJvbSBcIi4uL21vZGVscy9JdGVtXCI7XHJcbmltcG9ydCB7IERUTyB9ICAgICAgIGZyb20gXCIuLi9kYXRhYmFzZS9EVE9cIjtcclxuXHJcbi8vVXRpbCBNb2R1bGUgRGVwZW5kZW5jeSBmb3IgUHJvbWlzaWZ5XHJcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBJdGVtREFPIFxyXG57XHJcbiAgICBwcml2YXRlIHBvb2w7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvb2w6IGFueSkgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wb29sID0gcG9vbDtcclxuICAgIH1cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAqICAgICAgICBJVEVNUyAgICAgICAgICpcclxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBwdWJsaWMgcmVhZEFsbChjYWxsYmFjazogYW55KSBcclxuICAgIHtcclxuICAgICAgICBsZXQgaXRlbXM6SXRlbVtdID0gW107XHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcbiAgICAgICAgICAgIC8vdXNlIFByb21pc2Z5XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIElURU1TJyk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2gobmV3IEl0ZW0ocmVzdWx0MVt4XS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5xdWFudGl0eSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5ob3VzZWhvbGRfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uZG9uYXRpb25fZmxhZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5jcmVhdGVkX2F0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnVwZGF0ZWRfYXQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2NhbGxiYWNrIHRvIHJldHVybiByZXN1bHRzXHJcbiAgICAgICAgICAgIGxldCBkdG8gPSBuZXcgRFRPKC0xLCBcIlwiLCAtMSwgW10pO1xyXG4gICAgICAgICAgICBpZihpdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDIwMCwgXCJHZXQgU3VjY2Vzc1wiLCBpdGVtcy5sZW5ndGgsIGl0ZW1zKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oNDA0LCBcIkdldCBTdWNjZXNzOiBObyBSZXN1bHRzXCIsIGl0ZW1zLmxlbmd0aCwgW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uKSBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soZHRvKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vUm91dGU6OmdldCgnL2l0ZW1zL3tpdGVtfScsIFtJdGVtQXBpQ29udHJvbGxlcjo6Y2xhc3MsICdpc29sYXRlQnlJZCddKTtcclxuICAgIHB1YmxpYyByZWFkQnlJZChpZDpzdHJpbmcsIGNhbGxiYWNrOiBhbnkpIFxyXG4gICAge1xyXG4gICAgICAgIGxldCBpdGVtczpJdGVtW10gPSBbXTtcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuXHJcbiAgICAgICAgICAgIC8vdXNlIFByb21pc2Z5XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBJVEVNUyBXSEVSRSBJRCA9ID8gT1JERVIgQlkgTkFNRVwiLCBpZCk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2gobmV3IEl0ZW0ocmVzdWx0MVt4XS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5xdWFudGl0eSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmhvdXNlaG9sZF9pZCxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmRvbmF0aW9uX2ZsYWcsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5jcmVhdGVkX2F0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0udXBkYXRlZF9hdCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIHJlc3VsdHNcclxuICAgICAgICAgICAgbGV0IGR0byA9IG5ldyBEVE8oLTEsIFwiXCIsIC0xLCBbXSk7XHJcbiAgICAgICAgICAgIGlmKGl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oMjAwLCBcIkdldCBTdWNjZXNzXCIsIGl0ZW1zLmxlbmd0aCwgaXRlbXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTyg0MDQsIFwiR2V0IFN1Y2Nlc3M6IE5vIFJlc3VsdHNcIiwgaXRlbXMubGVuZ3RoLCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24pIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhkdG8pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy9Sb3V0ZTo6Z2V0KCcvaXRlbXMvaG91c2Vob2xkL3toaGlkfScsIFtJdGVtQXBpQ29udHJvbGxlcjo6Y2xhc3MsICdpc29sYXRlQnlIaGlkJ10pO1xyXG4gICAgcHVibGljIHJlYWRCeUhoaWQoaWQ6c3RyaW5nLCBjYWxsYmFjazogYW55KSBcclxuICAgIHtcclxuICAgICAgICBsZXQgaXRlbXM6SXRlbVtdID0gW107XHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgICAvL3VzZSBQcm9taXNmeVxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gSVRFTVMgV0hFUkUgSE9VU0VIT0xEX0lEID0gPyBPUkRFUiBCWSBOQU1FXCIsIGlkKTtcclxuICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJlc3VsdDEubGVuZ3RoOysreClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaChuZXcgSXRlbShyZXN1bHQxW3hdLmlkLCBcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnF1YW50aXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uaG91c2Vob2xkX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uZG9uYXRpb25fZmxhZyxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmNyZWF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS51cGRhdGVkX2F0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9yZXR1cm4gaXRlbXNcclxuICAgICAgICAgICAgbGV0IGR0byA9IG5ldyBEVE8oLTEsIFwiXCIsIC0xLCBbXSk7XHJcbiAgICAgICAgICAgIGlmKGl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oMjAwLCBcIkdldCBTdWNjZXNzXCIsIGl0ZW1zLmxlbmd0aCwgaXRlbXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZHRvID0gbmV3IERUTyg0MDQsIFwiR2V0IFN1Y2Nlc3M6IE5vIFJlc3VsdHNcIiwgaXRlbXMubGVuZ3RoLCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24pIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhkdG8pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy9Sb3V0ZTo6cG9zdCgnL2l0ZW1zJywgW0l0ZW1BcGlDb250cm9sbGVyOjpjbGFzcywgJ3N0b3JlJ10pO1xyXG4gICAgcHVibGljIGNyZWF0ZShpdGVtOkl0ZW0sIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgLy9jb25uZWN0aW9uICBcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuXHJcbiAgICAgICAgICAgIC8vdXNlIFByb21pc2Z5XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdJTlNFUlQgSU5UTyBJVEVNUyAoTkFNRSwgREVTQ1JJUFRJT04sIFFVQU5USVRZLCBIT1VTRUhPTERfSUQsIENSRUFURURfQVQsIFVQREFURURfQVQpIFZBTFVFUyg/LD8sPyw/LD8sPyknLCBbaXRlbS5OYW1lLCBpdGVtLkRlc2NyaXB0aW9uLCBpdGVtLlF1YW50aXR5LCBpdGVtLkhvdXNlaG9sZF9pZCwgbmV3IERhdGUoKSwgbmV3IERhdGUoKV0pO1xyXG4gICAgICAgICAgICAvL3JldHVybiByZXN1bHRzXHJcbiAgICAgICAgICAgIGxldCBkdG8gPSBuZXcgRFRPKC0xLCBcIlwiLCAtMSwgW10pO1xyXG4gICAgICAgICAgICBpZihyZXN1bHQxLmFmZmVjdGVkUm93cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MiA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIElURU1TIFdIRVJFIElEID0gPyBPUkRFUiBCWSBOQU1FXCIsIHJlc3VsdDEuaW5zZXJ0SWQpOyAgICAgICBcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oMjAwLCBcIlBvc3QgU3VjY2Vzc1wiLCAxLCBuZXcgSXRlbShyZXN1bHQyWzBdLmlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLnF1YW50aXR5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0uaG91c2Vob2xkX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0uZG9uYXRpb25fZmxhZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLmNyZWF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS51cGRhdGVkX2F0KSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDQwMCwgXCJQb3N0IEZhaWx1cmVcIiwgMCwgW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uKSBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soZHRvKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL1JvdXRlOjpwdXQoJy9pdGVtcy97aXRlbX0nLCBbSXRlbUFwaUNvbnRyb2xsZXI6OmNsYXNzLCAndXBkYXRlJ10pO1xyXG4gICAgcHVibGljIHVwZGF0ZShpdGVtOmFueSwgY2FsbGJhY2s6IGFueSlcclxuICAgIHtcclxuICAgICAgICAvL3RoZSBjb25uZWN0aW9uIFxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG4gICAgICAgICAgICAvL3VzZSBQcm9taXNmeVxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnVVBEQVRFIElURU1TIFNFVCBOQU1FPT8sIERFU0NSSVBUSU9OPT8sIFFVQU5USVRZPT8sIERPTkFUSU9OX0ZMQUc9PywgVVBEQVRFRF9BVD0/IFdIRVJFIElEPT8nLCBbaXRlbS5OYW1lLCBpdGVtLkRlc2NyaXB0aW9uLCBpdGVtLlF1YW50aXR5LCBpdGVtLkRvbmF0aW9uX2ZsYWcsIG5ldyBEYXRlKCksIGl0ZW0uSWRdKTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gcmVzdWx0c1xyXG4gICAgICAgICAgICBsZXQgZHRvID0gbmV3IERUTygtMSwgXCJcIiwgLTEsIFtdKTtcclxuICAgICAgICAgICAgaWYocmVzdWx0MS5jaGFuZ2VkUm93cyAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MiA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIElURU1TIFdIRVJFIElEID0gP1wiLCBpdGVtLklkKTtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oMjAwLCBcIlVwZGF0ZSBTdWNjZXNzXCIsIDEsIG5ldyBJdGVtKHJlc3VsdDJbMF0uaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0ucXVhbnRpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0uaG91c2Vob2xkX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLmRvbmF0aW9uX2ZsYWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0uY3JlYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS51cGRhdGVkX2F0KSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDQwNCwgXCJVcGRhdGUgRmFpbHVyZVwiLCAwLCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24pIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhkdG8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vUm91dGU6OmRlbGV0ZSgnL2l0ZW1zL3tpdGVtfScsIFtJdGVtQXBpQ29udHJvbGxlcjo6Y2xhc3MsICdkZXN0cm95J10pO1xyXG4gICAgcHVibGljIGRlbGV0ZShpdGVtX2lkOm51bWJlciwgY2FsbGJhY2s6IGFueSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuXHJcbiAgICAgICAgICAgIC8vdXNlIFByb21pc2Z5XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgLy9nZXQgb2JqZWN0IGJlZm9yZSBkZWxldGluZ1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MiA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIElURU1TIFdIRVJFIElEID0gPyBPUkRFUiBCWSBOQU1FXCIsIGl0ZW1faWQpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0RFTEVURSBGUk9NIElURU1TIFdIRVJFIElEPT8nLCBpdGVtX2lkKTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gcmVzdWx0cyBpbiBEVE9cclxuICAgICAgICAgICAgbGV0IGR0byA9IG5ldyBEVE8oLTEsIFwiXCIsIC0xLCBbXSk7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdDEuYWZmZWN0ZWRSb3dzID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oMjAwLCBcIkRlbGV0ZSBTdWNjZXNzXCIsIDEsIG5ldyBJdGVtKHJlc3VsdDJbMF0uaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0ucXVhbnRpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0uaG91c2Vob2xkX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQyWzBdLmRvbmF0aW9uX2ZsYWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDJbMF0uY3JlYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MlswXS51cGRhdGVkX2F0KSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDQwMCwgXCJEZWxldGUgRmFpbHVyZVwiLCAwLCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24pIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhkdG8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19