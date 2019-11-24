'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactSelect = _interopRequireDefault(require("react-select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Childo =
/*#__PURE__*/
function (_Component) {
  _inherits(Childo, _Component);

  function Childo(props) {
    var _this;

    _classCallCheck(this, Childo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Childo).call(this, props));
    _this.state = {
      selectedOption: null
    };
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Childo, [{
    key: "onChange",
    value: function onChange(selectedOption) {
      this.props.onChange(this.props.placeholder, selectedOption);
    }
  }, {
    key: "render",
    value: function render() {
      var dot = function dot() {
        var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#ccc';
        return {
          alignItems: 'center',
          display: 'flex',
          ':before': {
            backgroundColor: color,
            borderRadius: 10,
            content: '" "',
            display: 'block',
            marginRight: 8,
            height: 10,
            width: 10
          }
        };
      };

      var colourStyles = {
        control: function control(styles) {
          return _objectSpread({}, styles, {
            backgroundColor: 'white'
          });
        },
        option: function option(styles, _ref) {
          var data = _ref.data,
              isDisabled = _ref.isDisabled,
              isFocused = _ref.isFocused,
              isSelected = _ref.isSelected;

          //    const color = data.color ? '#ff69b4' : "#EFEFEF";
          if (data.level === 1) {
            console.log(data);
            return _objectSpread({}, styles, {
              backgroundColor: 'red',
              marginLeft: '20px'
            });
          } else {
            return styles;
          }
          /*        return {
                    ...styles,
                    backgroundColor: isDisabled
                      ? null
                      : isSelected
                      ? data.color
                      : isFocused
                      ? color.alpha(0.1).css()
                      : null,
                    color: isDisabled
                      ? '#ccc'
                      : isSelected
                      ? chroma.contrast(color, 'white') > 2
                        ? 'white'
                        : 'black'
                      : data.color,
                    cursor: isDisabled ? 'not-allowed' : 'default',
              
                    ':active': {
                      ...styles[':active'],
                      backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
                    },
                  }; */

        },
        input: function input(styles) {
          return _objectSpread({}, styles, {}, dot());
        },
        placeholder: function placeholder(styles) {
          return _objectSpread({}, styles, {}, dot());
        },
        singleValue: function singleValue(styles, _ref2) {
          var data = _ref2.data;
          return _objectSpread({}, styles, {}, dot(data.color));
        }
      };
      var options = this.props.options;
      return _react["default"].createElement("div", null, _react["default"].createElement(_reactSelect["default"], {
        value: this.props.value,
        onChange: this.onChange,
        options: options,
        defaultMenuIsOpen: false,
        placeholder: this.props.placeholder,
        styles: colourStyles,
        isMulti: true
      }));
    }
  }]);

  return Childo;
}(_react.Component);

var _default = Childo;
exports["default"] = _default;
