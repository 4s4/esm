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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DocumentField =
/*#__PURE__*/
function (_Component) {
  _inherits(DocumentField, _Component);

  function DocumentField(props) {
    var _this;

    _classCallCheck(this, DocumentField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DocumentField).call(this, props));
    _this.state = {
      liked: false,
      region: ''
    };
    _this.wow = _this.wow.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DocumentField, [{
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
        href: "#collapseDocument",
        "aria-expanded": "false",
        "aria-controls": "collapseDocument"
      }, _react["default"].createElement("span", {
        className: "glyphicon glyphicon-plus collap plus-minus",
        "aria-hidden": "true"
      })), _react["default"].createElement("a", {
        className: "",
        role: "button",
        "data-toggle": "collapse",
        href: "#collapseDocument",
        "aria-expanded": "false",
        "aria-controls": "collapseDocument"
      }, _react["default"].createElement("span", {
        className: "collapse-title"
      }, "Document field")), _react["default"].createElement("div", {
        className: "collapse collapseDiv row",
        id: "collapseDocument"
      }, _react["default"].createElement("div", {
        className: "col-xs-2"
      }), _react["default"].createElement("div", {
        className: "col-xs-3"
      }, _react["default"].createElement("div", {
        className: "form-group slider-ip",
        "data-toggle": "tooltip",
        title: ""
      }, _react["default"].createElement("label", {
        "for": "StrategyDate"
      }, "Implementation period"), _react["default"].createElement("br", null), _react["default"].createElement("input", {
        id: "StrategyDate",
        type: "text",
        className: "slider ",
        value: "",
        "data-range": "true",
        "data-slider-min": "2002",
        "data-slider-max": "2015",
        "data-slider-step": "1",
        "data-slider-value": "[2006,2010]",
        "data-slider-orientation": "horizontal",
        "data-slider-selection": "after",
        "data-slider-tooltip": "show"
      }), _react["default"].createElement("label", null, "2009"), _react["default"].createElement("label", null, "2015")), _react["default"].createElement("div", {
        "data-toggle": "tooltip",
        title: "Year."
      }, _react["default"].createElement("select", {
        className: "input-sm select-approval-Year",
        id: "Year"
      }, _react["default"].createElement("option", {
        value: ""
      }, "Year approval"), _react["default"].createElement("option", {
        value: "2015"
      }, "2016"), _react["default"].createElement("option", {
        value: "2015"
      }, "2015"), _react["default"].createElement("option", {
        value: "2014"
      }, "2014"), _react["default"].createElement("option", {
        value: "2013"
      }, "2013"), _react["default"].createElement("option", {
        value: "2012"
      }, "2012"), _react["default"].createElement("option", {
        value: "2011"
      }, "2011"), _react["default"].createElement("option", {
        value: "2010"
      }, "2010"), _react["default"].createElement("option", {
        value: "2009"
      }, "2009"), _react["default"].createElement("option", {
        value: "2008"
      }, "2008"), _react["default"].createElement("option", {
        value: "2007"
      }, "2007"), _react["default"].createElement("option", {
        value: "2006"
      }, "2006"), _react["default"].createElement("option", {
        value: "2005"
      }, "2005"), _react["default"].createElement("option", {
        value: "2004"
      }, "2004"), _react["default"].createElement("option", {
        value: "2003"
      }, "2003"), _react["default"].createElement("option", {
        value: "2002"
      }, "2002"), _react["default"].createElement("option", {
        value: "2001"
      }, "2001"), _react["default"].createElement("option", {
        value: "2000"
      }, "2000"))), _react["default"].createElement("div", {
        className: "sspace"
      })), _react["default"].createElement("div", {
        className: "col-xs-2"
      }, _react["default"].createElement("div", {
        className: "sspace"
      })), _react["default"].createElement("div", {
        className: "col-xs-2 s-last-document-field-column "
      })));
    }
  }]);

  return DocumentField;
}(_react.Component);

var _default = DocumentField;
exports["default"] = _default;
