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

var MainSelectFilters =
/*#__PURE__*/
function (_Component) {
  _inherits(MainSelectFilters, _Component);

  function MainSelectFilters(props) {
    var _this;

    _classCallCheck(this, MainSelectFilters);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MainSelectFilters).call(this, props));
    _this.state = {
      liked: false,
      region: ''
    };
    _this.wow = _this.wow.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MainSelectFilters, [{
    key: "wow",
    value: function wow(e) {
      console.log('wow', e, this.state);
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "col-xs-12 col-md-12"
      }, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xs-12 col-sm-3",
        "data-toggle": "tooltip",
        title: "Geographic region where the country belongs."
      }, _react["default"].createElement(_Childo["default"], {
        options: _data.regions,
        placeholder: "Region"
      })), _react["default"].createElement("div", {
        className: "col-xs-12 col-sm-3",
        "data-toggle": "tooltip",
        title: "Official country name."
      }, _react["default"].createElement(_Childo["default"], {
        options: _data.countries,
        placeholder: "Country"
      })), _react["default"].createElement("div", {
        className: "col-xs-12 col-sm-3",
        "data-toggle": "tooltip",
        title: "Sector "
      }, _react["default"].createElement(_Childo["default"], {
        options: _data.sectors,
        placeholder: "Sector"
      })), _react["default"].createElement("div", {
        className: "col-xs-12 col-sm-3",
        "data-toggle": "tooltip",
        title: "Type of Document"
      }, _react["default"].createElement(_Childo["default"], {
        options: _data.types,
        placeholder: "Type"
      }))));
    }
  }]);

  return MainSelectFilters;
}(_react.Component);

var _default = MainSelectFilters;
exports["default"] = _default;