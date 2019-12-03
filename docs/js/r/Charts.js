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

var Charts =
/*#__PURE__*/
function (_Component) {
  _inherits(Charts, _Component);

  function Charts(props) {
    _classCallCheck(this, Charts);

    return _possibleConstructorReturn(this, _getPrototypeOf(Charts).call(this, props));
  }

  _createClass(Charts, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "row "
      }, _react["default"].createElement("div", {
        className: "col-xs-12"
      }, _react["default"].createElement("div", {
        className: "charts"
      }, _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("span", {
        className: "card-title"
      }, "Charts"), _react["default"].createElement("div", {
        className: "card-content "
      }, _react["default"].createElement("div", {
        id: "charts-carousel",
        className: "charts-carousel carousel slide",
        "data-ride": "carousel",
        "data-interval": "0"
      }, _react["default"].createElement("div", {
        className: "carousel-inner",
        role: "listbox"
      }, _react["default"].createElement("div", {
        className: "item active"
      }, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xs-12 col-sm-4"
      }, _react["default"].createElement("img", {
        src: "placeholders/2014-09-15_08432.png",
        className: "img-responsive",
        alt: ""
      })), _react["default"].createElement("div", {
        className: "col-xs-12 col-sm-4"
      }, _react["default"].createElement("img", {
        src: "placeholders/2014-09-15_08432.png",
        className: "img-responsive",
        alt: ""
      })), _react["default"].createElement("div", {
        className: "col-xs-12 col-sm-4"
      }, _react["default"].createElement("img", {
        src: "placeholders/2014-09-15_08432.png",
        className: "img-responsive",
        alt: ""
      })))), _react["default"].createElement("div", {
        className: "item"
      }, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xs-12 col-sm-4"
      }, _react["default"].createElement("img", {
        src: "placeholders/2014-09-15_08432.png",
        className: "img-responsive",
        alt: ""
      })), _react["default"].createElement("div", {
        className: "col-xs-12 col-sm-4"
      }, _react["default"].createElement("img", {
        src: "placeholders/2014-09-15_08432.png",
        className: "img-responsive",
        alt: ""
      })), _react["default"].createElement("div", {
        className: "col-xs-12 col-sm-4"
      }, _react["default"].createElement("img", {
        src: "placeholders/2014-09-15_08432.png",
        className: "img-responsive",
        alt: ""
      })))), _react["default"].createElement("div", {
        className: "item"
      }, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xs-12 col-sm-4"
      }, _react["default"].createElement("img", {
        src: "placeholders/2014-09-15_08432.png",
        className: "img-responsive",
        alt: ""
      })), _react["default"].createElement("div", {
        className: "col-xs-12 col-sm-4"
      }, _react["default"].createElement("img", {
        src: "placeholders/2014-09-15_08432.png",
        className: "img-responsive",
        alt: ""
      })), _react["default"].createElement("div", {
        className: "col-xs-12 col-sm-4"
      }, _react["default"].createElement("img", {
        src: "placeholders/2014-09-15_08432.png",
        className: "img-responsive",
        alt: ""
      }))))), _react["default"].createElement("a", {
        className: "left carousel-control",
        href: "#charts-carousel",
        role: "button",
        "data-slide": "prev"
      }, _react["default"].createElement("span", {
        className: "fa fa-chevron-left",
        "aria-hidden": "true"
      }), _react["default"].createElement("span", {
        className: "sr-only"
      }, "Previous")), _react["default"].createElement("a", {
        className: "right carousel-control",
        href: "#charts-carousel",
        role: "button",
        "data-slide": "next"
      }, _react["default"].createElement("span", {
        className: "fa fa-chevron-right",
        "aria-hidden": "true"
      }), _react["default"].createElement("span", {
        className: "sr-only"
      }, "Next")), _react["default"].createElement("ol", {
        className: "carousel-indicators"
      }, _react["default"].createElement("li", {
        "data-target": "#charts-carousel",
        "data-slide-to": "0",
        className: "active"
      }), _react["default"].createElement("li", {
        "data-target": "#charts-carousel",
        "data-slide-to": "1"
      }), _react["default"].createElement("li", {
        "data-target": "#charts-carousel",
        "data-slide-to": "2"
      }))))))));
    }
  }]);

  return Charts;
}(_react.Component);

var _default = Charts;
exports["default"] = _default;
