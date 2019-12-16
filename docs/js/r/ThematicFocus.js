'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactTooltip = _interopRequireDefault(require("react-tooltip"));

var _reactGridLayout = _interopRequireDefault(require("react-grid-layout"));

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

var cljs = require('../../js/cljs.js');

function CheckBox(props) {
  return _react["default"].createElement("div", {
    className: "checkbox"
  }, _react["default"].createElement(_reactTooltip["default"], {
    id: props.id,
    type: 'info',
    effect: 'solid'
  }, _react["default"].createElement("span", null, props.title)), _react["default"].createElement("label", {
    "data-tip": true,
    "data-for": props.id
  }, _react["default"].createElement("input", {
    type: "checkbox",
    id: props.id,
    onChange: props.onChange(props.id)
  }), props.name, " (", props.count.counter[props.id] ? props.count.counter[props.id] : 0, ")"));
}

var ThematicFocus =
/*#__PURE__*/
function (_Component) {
  _inherits(ThematicFocus, _Component);

  function ThematicFocus(props) {
    var _this;

    _classCallCheck(this, ThematicFocus);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ThematicFocus).call(this, props));
    _this.state = {
      reports: [],
      counter: {}
    };
    _this.check = _this.check.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ThematicFocus, [{
    key: "check",
    value: function check(kw) {
      var _this2 = this;

      return function (event) {
        return _this2.props.onCheck(kw, event.target.checked);
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

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
        className: "col-xs-10"
      }, _react["default"].createElement(_reactGridLayout["default"], {
        className: "layout",
        cols: 12,
        rowHeight: 30,
        width: 1200
      }, this.props.thematicsFocus && this.props.thematicsFocus.map(function (o) {
        return _react["default"].createElement("div", {
          key: "ks-".concat(o.kw),
          "data-grid": {
            x: o.col * 3,
            y: o.row,
            w: 3,
            h: 1,
            "static": true
          }
        }, _react["default"].createElement(CheckBox, {
          id: o.kw,
          name: o.name,
          onChange: _this3.check,
          count: _this3.state,
          title: o.description
        }));
      })))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.reports !== state.reports) {
        return {
          reports: props.reports,
          counter: cljs.countThematicFocus(props.reports, props.thematicsFocus)
        };
      }

      return state;
    }
  }]);

  return ThematicFocus;
}(_react.Component);

var _default = ThematicFocus;
exports["default"] = _default;
