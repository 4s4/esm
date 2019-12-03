'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrapTableNext = _interopRequireDefault(require("react-bootstrap-table-next"));

var _reactBootstrapTable2Paginator = _interopRequireDefault(require("react-bootstrap-table2-paginator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Results =
/*#__PURE__*/
function (_Component) {
  _inherits(Results, _Component);

  function Results(props) {
    _classCallCheck(this, Results);

    return _possibleConstructorReturn(this, _getPrototypeOf(Results).call(this, props));
  }

  _createClass(Results, [{
    key: "render",
    value: function render() {
      var country = function country(c, cc) {
        if (c.length < 7) {
          return _react["default"].createElement("div", {
            style: {
              marginTop: "8px"
            },
            className: "left-first-colum-first-row"
          }, _react["default"].createElement("span", {
            className: "left-table-row-title"
          }, "Country:"), _react["default"].createElement("div", {
            className: "div-country"
          }, _react["default"].createElement("span", {
            className: "table-value boldi"
          }, c), _react["default"].createElement("span", {
            style: {
              color: "black"
            },
            className: "table-value boldi"
          }, "(", cc, ")")));
        }

        return _react["default"].createElement("div", null, _react["default"].createElement("div", {
          style: {
            marginTop: "8px",
            borderBottom: "0px",
            marginBottom: "-17px"
          },
          className: "left-first-colum-first-row"
        }, _react["default"].createElement("span", {
          className: "left-table-row-title"
        }, "Country:"), _react["default"].createElement("div", {
          style: {
            "float": "right"
          },
          className: "hidden-div-country"
        }, _react["default"].createElement("span", {
          className: "table-value boldi"
        }, "\xA0"), _react["default"].createElement("span", {
          style: {
            color: "black"
          },
          className: "table-value boldi"
        }, "\xA0"))), _react["default"].createElement("div", {
          style: {
            marginTop: "8px"
          },
          className: "left-first-colum-first-row"
        }, _react["default"].createElement("span", {
          className: "left-table-row-title"
        }, "\xA0"), _react["default"].createElement("div", {
          className: "div-country"
        }, _react["default"].createElement("span", {
          className: "table-value boldi"
        }, c), _react["default"].createElement("span", {
          style: {
            color: "black"
          },
          className: "table-value boldi"
        }, "(", cc, ")"))));
      };

      var leftFormatter = function leftFormatter(c, o) {
        return _react["default"].createElement("div", null, _react["default"].createElement("div", {
          className: "left-first-colum-first-row"
        }, _react["default"].createElement("span", {
          className: "left-table-row-title"
        }, "Region:"), _react["default"].createElement("div", {
          className: "span-region table-value boldi"
        }, o.region)), country(o.country, o.countryCode), _react["default"].createElement("div", {
          style: {
            marginTop: "18px",
            padding: "10px",
            border: "1px solid rgb(187, 187, 187)",
            textAlign: "center"
          }
        }, _react["default"].createElement("img", {
          className: "world",
          src: "/img/maps/".concat(o.region, ".png")
        })));
      };

      var rightFormatter = function rightFormatter(c, o) {
        return _react["default"].createElement("div", null, _react["default"].createElement("div", {
          className: "first-colum-first-row first-colum-first-row-bis"
        }, _react["default"].createElement("span", {
          className: "table-row-title "
        }, "Type: "), _react["default"].createElement("span", {
          style: {
            "float": "right"
          },
          className: "table-value "
        }, o.type), _react["default"].createElement("hr", {
          className: "hr-table-column"
        })), _react["default"].createElement("div", {
          className: "left-first-colum-first-row"
        }, _react["default"].createElement("span", {
          className: "left-table-row-title"
        }, "Year:"), _react["default"].createElement("div", {
          className: "div-year"
        }, _react["default"].createElement("span", {
          className: "table-value boldi"
        }, o.year))), _react["default"].createElement("div", {
          className: "left-first-colum-first-row"
        }, _react["default"].createElement("span", {
          className: "left-table-row-title"
        }, "Period:"), _react["default"].createElement("div", {
          className: "div-ip"
        }, _react["default"].createElement("span", {
          className: "table-value boldi"
        }, o.implementationPeriod))));
      };

      var columns = [{
        formatter: leftFormatter,
        sort: false
      }, {
        dataField: 'title',
        sort: true
      }, {
        formatter: rightFormatter,
        sort: false
      }];
      var defaultSorted = [{
        dataField: 'title',
        order: 'desc'
      }];
      var results = this.props.reports || [];
      return _react["default"].createElement("div", {
        id: "card-table",
        className: "card",
        style: {
          display: "inherit"
        }
      }, _react["default"].createElement("div", {
        className: "card-content"
      }, _react["default"].createElement(_reactBootstrapTableNext["default"], {
        bootstrap4: true,
        keyField: "id",
        data: results,
        columns: columns,
        classes: "table-no-hover table-disable-hover search-table",
        defaultSorted: defaultSorted,
        pagination: (0, _reactBootstrapTable2Paginator["default"])()
      })));
    }
  }]);

  return Results;
}(_react.Component);

var _default = Results;
exports["default"] = _default;
