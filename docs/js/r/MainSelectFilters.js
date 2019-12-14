'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Childo = _interopRequireDefault(require("./Childo"));

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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var cljs = require('../../js/cljs.js');

function yup(filters, freqs, always_show) {
  if (filters && freqs) {
    return filters.reduce(function (c, o) {
      var picked = _extends({}, o);

      if (freqs[picked.value] || picked.level === 0 || always_show) {
        var cont = freqs[picked.value] ? freqs[picked.value] : 0;
        picked.label += " (".concat(cont, ")");
        c.push(picked);
      }

      return c;
    }, []);
  }
}

var MainSelectFilters =
/*#__PURE__*/
function (_Component) {
  _inherits(MainSelectFilters, _Component);

  function MainSelectFilters(props) {
    var _this;

    _classCallCheck(this, MainSelectFilters);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MainSelectFilters).call(this, props));
    _this.state = {
      reports: props.reports,
      initialReports: props.initialReports,
      filters: props.filters,
      frequencies: {},
      options: {}
    };
    return _this;
  }

  _createClass(MainSelectFilters, [{
    key: "render",
    value: function render() {
      var types = yup(this.state.filters.types, this.state.frequencies.types, true);
      var countries = yup(this.state.filters.countries, this.state.frequencies.countries, false);
      var regions = yup(this.state.filters.regions, this.state.frequencies.regions, false);
      var sectors = yup(this.state.filters.sectors, this.state.frequencies.sectors, false);
      return _react["default"].createElement("div", {
        className: "col-xs-12"
      }, _react["default"].createElement("div", {
        className: "search-controls-wrapper"
      }, _react["default"].createElement("div", {
        className: "search-controls"
      }, _react["default"].createElement("div", {
        className: "row",
        role: "form"
      }, _react["default"].createElement("div", {
        id: "main_select_filter"
      }, _react["default"].createElement("div", {
        className: "col-xs-12 col-md-12"
      }, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xs-12 col-sm-3",
        "data-toggle": "tooltip",
        title: "Geographic region where the country belongs."
      }, _react["default"].createElement(_Childo["default"], {
        options: regions,
        placeholder: "Region",
        onChange: this.props.onChange,
        value: this.props.regions,
        isMulti: true,
        isClearable: true
      })), _react["default"].createElement("div", {
        className: "col-xs-12 col-sm-3",
        "data-toggle": "tooltip",
        title: "Official country name."
      }, _react["default"].createElement(_Childo["default"], {
        options: countries,
        placeholder: "Country",
        onChange: this.props.onChange,
        value: this.props.countries,
        isMulti: true,
        isClearable: true
      })), _react["default"].createElement("div", {
        className: "col-xs-12 col-sm-3",
        "data-toggle": "tooltip",
        title: "Sector "
      }, _react["default"].createElement(_Childo["default"], {
        options: sectors,
        placeholder: "Sector",
        onChange: this.props.onChange,
        value: this.props.sectors,
        isMulti: true,
        isClearable: true
      })), _react["default"].createElement("div", {
        className: "col-xs-12 col-sm-3",
        "data-toggle": "tooltip",
        title: "Type of Document"
      }, _react["default"].createElement(_Childo["default"], {
        options: types,
        placeholder: "Type",
        onChange: this.props.onChange,
        value: this.props.types,
        defaultMenuIsOpen: false,
        isMulti: true,
        isClearable: false
      })))))))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var newState = state || {};

      if (props.reports !== state.reports) {
        newState.reports = props.reports;
        newState.initialReports = props.initialReports;
        newState.frequencies = cljs.countSelects(props.reports);
      }

      ;

      if (props.filters !== state.filters) {
        newState.filters = props.filters;
      }

      return newState;
    }
  }]);

  return MainSelectFilters;
}(_react.Component);

var _default = MainSelectFilters;
exports["default"] = _default;
