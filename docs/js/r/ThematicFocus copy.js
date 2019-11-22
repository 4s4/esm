'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Childo = _interopRequireDefault(require("./Childo"));

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ThematicFocus =
/*#__PURE__*/
function (_Component) {
  _inherits(ThematicFocus, _Component);

  function ThematicFocus(props) {
    var _this;

    _classCallCheck(this, ThematicFocus);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ThematicFocus).call(this, props));
    _this.state = {
      liked: false,
      region: ''
    };
    _this.wow = _this.wow.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ThematicFocus, [{
    key: "wow",
    value: function wow(e) {
      console.log('wow', e, this.state);
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "well search-tab"
      }, _react["default"].createElement("a", {
        className: "btn btn-primary",
        role: "button",
        "data-toggle": "collapse",
        href: "#collapseTheme",
        "aria-expanded": "false",
        "aria-controls": "collapseTheme"
      }, _react["default"].createElement("span", {
        className: "glyphicon glyphicon-plus collap plus-minus",
        "aria-hidden": "true"
      })), _react["default"].createElement("a", {
        className: "",
        role: "button",
        "data-toggle": "collapse",
        href: "#collapseTheme",
        "aria-expanded": "false",
        "aria-controls": "collapseTheme"
      }, _react["default"].createElement("span", {
        className: "collapse-title"
      }, "Thematic focus")), _react["default"].createElement("div", {
        className: "collapse collapseDiv row",
        id: "collapseTheme"
      }, _react["default"].createElement("div", {
        className: "col-xs-2"
      }), _react["default"].createElement("div", {
        className: "col-xs-2"
      }, _react["default"].createElement("div", {
        className: "form-group",
        "data-toggle": "tooltip",
        title: ""
      }, _react["default"].createElement("div", {
        className: "checkbox",
        "data-toggle": "tooltip",
        title: "The strategy focuses on environmental sustainability"
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        id: "environment"
      }), "Environment")), _react["default"].createElement("div", {
        className: "checkbox",
        "data-toggle": "tooltip",
        title: "The strategy focuses on gender equality"
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        id: "gender"
      }), "Gender")), _react["default"].createElement("div", {
        className: "checkbox",
        "data-toggle": "tooltip",
        title: "The strategy focuses on poverty reduction"
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        id: "poverty_reduction"
      }), "Poverty Reduction")))), _react["default"].createElement("div", {
        className: "col-xs-2"
      }, _react["default"].createElement("div", {
        className: "form-group",
        "data-toggle": "tooltip",
        title: ""
      }, _react["default"].createElement("div", {
        className: "checkbox",
        "data-toggle": "tooltip",
        title: "The trade export strategy "
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        id: "export_strategy"
      }), "Export Strategy")), _react["default"].createElement("div", {
        className: "checkbox",
        "data-toggle": "tooltip",
        title: "Trade focus"
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        id: "trade_focus"
      }), "Focus on trade")), _react["default"].createElement("div", {
        className: "checkbox",
        "data-toggle": "tooltip",
        title: "The strategy focuses on youth integration"
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        id: "youth"
      }), "Youth")))), _react["default"].createElement("div", {
        className: "col-xs-2"
      }, _react["default"].createElement("div", {
        className: "checkbox",
        "data-toggle": "tooltip",
        title: "The document focuses on trade facilitation."
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        id: "trade_facilitation"
      }), "Trade Facilitation")), _react["default"].createElement("div", {
        className: "checkbox",
        "data-toggle": "tooltip",
        title: "The document focuses on trade finance and/or access to credit."
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        id: "trade_finance"
      }), "Trade Finance")), _react["default"].createElement("div", {
        className: "checkbox",
        "data-toggle": "tooltip",
        title: "The document focuses on trade information and/or market intelligence."
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        id: "trade_information"
      }), "Trade Information"))), _react["default"].createElement("div", {
        className: "col-xs-2"
      }, _react["default"].createElement("div", {
        className: "checkbox",
        "data-toggle": "tooltip",
        title: "The document focuses on trade promotion."
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        id: "trade_promotion"
      }), "Trade Promotion")), _react["default"].createElement("div", {
        className: "checkbox",
        "data-toggle": "tooltip",
        title: "The document focuses on standards and/or quality management."
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        id: "quality"
      }), "Quality")), _react["default"].createElement("div", {
        className: "checkbox",
        "data-toggle": "tooltip",
        title: "The strategy focuses on Technical and Vocational Education and Training (TVET)."
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        id: "tvet"
      }), "TVET"))), _react["default"].createElement("div", {
        className: "col-xs-2"
      }, _react["default"].createElement("div", {
        className: "checkbox",
        "data-toggle": "tooltip",
        title: "The document has a regional scope. The information included applies to a group of countries."
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        id: "regional"
      }), "Regional Scope")), _react["default"].createElement("div", {
        className: "checkbox",
        "data-toggle": "tooltip",
        title: "The document focuses on regional integration."
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        id: "regional_integration"
      }), "Regional Integration")), _react["default"].createElement("div", {
        className: "checkbox",
        "data-toggle": "tooltip",
        title: "select all theme options"
      }, _react["default"].createElement("label", {
        style: {
          fontWeight: "bolder",
          textDecoration: "underline"
        }
      }, _react["default"].createElement("input", {
        type: "checkbox",
        id: "all_theme"
      }), "Select all")))));
    }
  }]);

  return ThematicFocus;
}(_react.Component);

var _default = ThematicFocus;
exports["default"] = _default;
