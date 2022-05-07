"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReportDAO = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Report = require("../models/Report");

var _DTO = require("../database/DTO");

var util = _interopRequireWildcard(require("util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//Object Model Dependencies
//Util Module Dependency for Promisify
var ReportDAO = /*#__PURE__*/function () {
  function ReportDAO(pool) {
    (0, _classCallCheck2.default)(this, ReportDAO);
    (0, _defineProperty2.default)(this, "pool", void 0);
    this.pool = pool;
  }

  (0, _createClass2.default)(ReportDAO, [{
    key: "readByFlag",
    value: function readByFlag(callback) {
      var report = [];
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
                  return connection.query("SELECT  i.id, i.name, i.description, i.quantity, i.updated_at, h.state, u.email FROM items i JOIN households h ON h.id = i.household_id JOIN household_users hu on hu.household_id = h.id JOIN users u ON u.id = hu.user_id where donation_flag IS NOT NULL ORDER BY NAME");

                case 5:
                  result1 = _context.sent;

                  for (x = 0; x < result1.length; ++x) {
                    report.push(new _Report.Report(result1[x].id, result1[x].name, result1[x].description, result1[x].quantity, result1[x].updated_at, result1[x].state, result1[x].email));
                  } //return results


                  dto = new _DTO.DTO(-1, "", -1, []);

                  if (report.length > 0) {
                    dto = new _DTO.DTO(200, "Get Success", report.length, report);
                  } else {
                    dto = new _DTO.DTO(404, "Get Success: No Results", report.length, []);
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
  }]);
  return ReportDAO;
}();

exports.ReportDAO = ReportDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9SZXBvcnREQU8udHMiXSwibmFtZXMiOlsiUmVwb3J0REFPIiwicG9vbCIsImNhbGxiYWNrIiwicmVwb3J0IiwiZ2V0Q29ubmVjdGlvbiIsImVyciIsImNvbm5lY3Rpb24iLCJxdWVyeSIsInV0aWwiLCJwcm9taXNpZnkiLCJyZXN1bHQxIiwieCIsImxlbmd0aCIsInB1c2giLCJSZXBvcnQiLCJpZCIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsInF1YW50aXR5IiwidXBkYXRlZF9hdCIsInN0YXRlIiwiZW1haWwiLCJkdG8iLCJEVE8iLCJyZWxlYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFHQTs7Ozs7O0FBTEk7QUFJSjtJQUdhQSxTO0FBSVQscUJBQVlDLElBQVosRUFDQTtBQUFBO0FBQUE7QUFDSSxTQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDSDs7OztXQUVELG9CQUFrQkMsUUFBbEIsRUFDQTtBQUNJLFVBQUlDLE1BQWUsR0FBRyxFQUF0QjtBQUNBLFdBQUtGLElBQUwsQ0FBVUcsYUFBVjtBQUFBLDJGQUF3QixpQkFBZUMsR0FBZixFQUF3QkMsVUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRWhCRCxHQUZnQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSx3QkFFTEEsR0FGSzs7QUFBQTtBQUlwQjtBQUNBQyxrQkFBQUEsVUFBVSxDQUFDQyxLQUFYLEdBQW1CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUgsVUFBVSxDQUFDQyxLQUExQixDQUFuQjtBQUxvQjtBQUFBLHlCQU1BRCxVQUFVLENBQUNDLEtBQVgsQ0FBaUIsMlFBQWpCLENBTkE7O0FBQUE7QUFNaEJHLGtCQUFBQSxPQU5nQjs7QUFPcEIsdUJBQVFDLENBQVIsR0FBVSxDQUFWLEVBQVlBLENBQUMsR0FBR0QsT0FBTyxDQUFDRSxNQUF4QixFQUErQixFQUFFRCxDQUFqQyxFQUNBO0FBQ0lSLG9CQUFBQSxNQUFNLENBQUNVLElBQVAsQ0FBWSxJQUFJQyxjQUFKLENBQVdKLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdJLEVBQXRCLEVBQ1JMLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdLLElBREgsRUFFUk4sT0FBTyxDQUFDQyxDQUFELENBQVAsQ0FBV00sV0FGSCxFQUdSUCxPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXTyxRQUhILEVBSVJSLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFQLENBQVdRLFVBSkgsRUFLUlQsT0FBTyxDQUFDQyxDQUFELENBQVAsQ0FBV1MsS0FMSCxFQU1SVixPQUFPLENBQUNDLENBQUQsQ0FBUCxDQUFXVSxLQU5ILENBQVo7QUFPSCxtQkFoQm1CLENBaUJwQjs7O0FBQ0lDLGtCQUFBQSxHQWxCZ0IsR0FrQlYsSUFBSUMsUUFBSixDQUFRLENBQUMsQ0FBVCxFQUFZLEVBQVosRUFBZ0IsQ0FBQyxDQUFqQixFQUFvQixFQUFwQixDQWxCVTs7QUFtQnBCLHNCQUFHcEIsTUFBTSxDQUFDUyxNQUFQLEdBQWdCLENBQW5CLEVBQXNCO0FBQ2xCVSxvQkFBQUEsR0FBRyxHQUFHLElBQUlDLFFBQUosQ0FBUSxHQUFSLEVBQWEsYUFBYixFQUE0QnBCLE1BQU0sQ0FBQ1MsTUFBbkMsRUFBMkNULE1BQTNDLENBQU47QUFDSCxtQkFGRCxNQUVPO0FBQ0htQixvQkFBQUEsR0FBRyxHQUFHLElBQUlDLFFBQUosQ0FBUSxHQUFSLEVBQWEseUJBQWIsRUFBd0NwQixNQUFNLENBQUNTLE1BQS9DLEVBQXVELEVBQXZELENBQU47QUFDSDs7QUFDRCxzQkFBSU4sVUFBSixFQUFnQkEsVUFBVSxDQUFDa0IsT0FBWDtBQUNoQnRCLGtCQUFBQSxRQUFRLENBQUNvQixHQUFELENBQVI7O0FBekJvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTJCSCIsInNvdXJjZXNDb250ZW50IjpbIiAgICBcclxuICAgIC8vT2JqZWN0IE1vZGVsIERlcGVuZGVuY2llc1xyXG5pbXBvcnQgeyBSZXBvcnQgfSAgICBmcm9tIFwiLi4vbW9kZWxzL1JlcG9ydFwiO1xyXG5pbXBvcnQgeyBEVE8gfSAgICAgICBmcm9tIFwiLi4vZGF0YWJhc2UvRFRPXCI7XHJcblxyXG4vL1V0aWwgTW9kdWxlIERlcGVuZGVuY3kgZm9yIFByb21pc2lmeVxyXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVwb3J0REFPIFxyXG57XHJcbiAgICBwcml2YXRlIHBvb2w7XHJcblxyXG4gICAgY29uc3RydWN0b3IocG9vbDogYW55KSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLnBvb2wgPSBwb29sO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgcmVhZEJ5RmxhZyhjYWxsYmFjazogYW55KSBcclxuICAgIHtcclxuICAgICAgICBsZXQgcmVwb3J0OlJlcG9ydFtdID0gW107XHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgICAvL3VzZSBQcm9taXNmeVxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAgaS5pZCwgaS5uYW1lLCBpLmRlc2NyaXB0aW9uLCBpLnF1YW50aXR5LCBpLnVwZGF0ZWRfYXQsIGguc3RhdGUsIHUuZW1haWwgRlJPTSBpdGVtcyBpIEpPSU4gaG91c2Vob2xkcyBoIE9OIGguaWQgPSBpLmhvdXNlaG9sZF9pZCBKT0lOIGhvdXNlaG9sZF91c2VycyBodSBvbiBodS5ob3VzZWhvbGRfaWQgPSBoLmlkIEpPSU4gdXNlcnMgdSBPTiB1LmlkID0gaHUudXNlcl9pZCB3aGVyZSBkb25hdGlvbl9mbGFnIElTIE5PVCBOVUxMIE9SREVSIEJZIE5BTUVcIik7XHJcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJlcG9ydC5wdXNoKG5ldyBSZXBvcnQocmVzdWx0MVt4XS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5xdWFudGl0eSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLnVwZGF0ZWRfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQxW3hdLmVtYWlsKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9yZXR1cm4gcmVzdWx0c1xyXG4gICAgICAgICAgICBsZXQgZHRvID0gbmV3IERUTygtMSwgXCJcIiwgLTEsIFtdKTtcclxuICAgICAgICAgICAgaWYocmVwb3J0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGR0byA9IG5ldyBEVE8oMjAwLCBcIkdldCBTdWNjZXNzXCIsIHJlcG9ydC5sZW5ndGgsIHJlcG9ydCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkdG8gPSBuZXcgRFRPKDQwNCwgXCJHZXQgU3VjY2VzczogTm8gUmVzdWx0c1wiLCByZXBvcnQubGVuZ3RoLCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24pIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhkdG8pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iXX0=