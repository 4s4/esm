'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

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
      return _react["default"].createElement("div", {
        id: "card-table",
        className: "card",
        style: {
          display: "none"
        }
      }, _react["default"].createElement("div", {
        className: "card-content"
      }, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "control-group",
        style: {
          "float": "right",
          textAlign: "right",
          width: "100%",
          marginRight: "5px",
          paddingLeft: "10px"
        }
      }, _react["default"].createElement("label", {
        htmlFor: "show-columns"
      }, "Show extra columns"), _react["default"].createElement("br", null), _react["default"].createElement("select", {
        id: "show-columns",
        name: "state[]",
        multiple: true,
        className: "demo-default",
        placeholder: "Include extra column..."
      }))), _react["default"].createElement("div", {
        id: "custom-toolbar",
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-md-3"
      }, _react["default"].createElement("ul", {
        className: "custom-table-toolbar"
      }, _react["default"].createElement("li", null, _react["default"].createElement("span", {
        className: "dropdown pull-right"
      }, _react["default"].createElement("button", {
        href: "#",
        title: "Export data",
        "data-toggle": "dropdown",
        className: "btn btn-default"
      }, _react["default"].createElement("i", {
        className: "fa fa-download fa-fw"
      }), " Export results", _react["default"].createElement("i", {
        className: "fa fa-caret-down"
      })), _react["default"].createElement("ul", {
        className: "dropdown-menu dropdown-menu-right"
      }, _react["default"].createElement("li", null, _react["default"].createElement("a", {
        href: "#"
      }, _react["default"].createElement("i", {
        className: "fa fa-file-excel-o"
      }), " XLS")), _react["default"].createElement("li", null, _react["default"].createElement("a", {
        href: "#"
      }, _react["default"].createElement("i", {
        className: "fa fa-file-pdf-o"
      }), " PDF")), _react["default"].createElement("li", null, _react["default"].createElement("a", {
        href: "#"
      }, _react["default"].createElement("i", {
        className: "fa fa-file-text-o"
      }), " CSV"))))), _react["default"].createElement("li", null, _react["default"].createElement("a", {
        href: "#",
        title: "Print chart",
        className: "btn btn-default",
        "data-toggle": "tooltip"
      }, _react["default"].createElement("i", {
        className: "fa fa-print"
      }))))), _react["default"].createElement("div", {
        className: "col-md-5"
      }, _react["default"].createElement("select", {
        id: "sorter"
      }, _react["default"].createElement("option", {
        value: "region left",
        defaultValue: "true"
      }, "Order by: Region"), _react["default"].createElement("option", {
        value: "country left"
      }, "Order by: Country"), _react["default"].createElement("option", {
        value: "countryCode left"
      }, "Order by: Country Code"), _react["default"].createElement("option", {
        value: "title middle"
      }, "Order by: Title"), _react["default"].createElement("option", {
        value: "year right"
      }, "Order by: Year"), _react["default"].createElement("option", {
        value: "lastUpdate right"
      }, "Order by: Last Update"))), _react["default"].createElement("div", {
        className: "col-md-4"
      }, _react["default"].createElement("select", {
        id: "sorter-how"
      }, _react["default"].createElement("option", {
        value: "asc",
        defaultValue: "selected"
      }, "Ascending"), _react["default"].createElement("option", {
        value: "desc"
      }, "Descending")))), _react["default"].createElement("table", {
        id: "juan",
        className: " table-no-hover table-disable-hover search-table"
      }, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        className: "col-xs-4"
      }), _react["default"].createElement("th", {
        className: "col-xs-4"
      }), _react["default"].createElement("th", {
        className: "col-xs-4"
      }))), _react["default"].createElement("tbody", null), _react["default"].createElement("tfoot", null))));
    }
  }]);

  return Results;
}(_react.Component);

var _default = Results;
exports["default"] = _default;
