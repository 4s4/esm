'use strict';

var _react = _interopRequireWildcard(require("react"));

var _MainSelectFilters = _interopRequireDefault(require("./MainSelectFilters"));

var _ThematicFocus = _interopRequireDefault(require("./ThematicFocus"));

var _DocumentField = _interopRequireDefault(require("./DocumentField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

require('es6-promise').polyfill();

require('isomorphic-fetch');

var SearchContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(SearchContainer, _Component);

  function SearchContainer(props) {
    var _this;

    _classCallCheck(this, SearchContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SearchContainer).call(this, props));
    _this.state = {
      qq: {},
      reports: null,
      initialReports: null,
      regions: null,
      countries: null,
      sectors: null,
      types: null,
      searchResults: null
    };
    _this.onSelectChange = _this.onSelectChange.bind(_assertThisInitialized(_this));
    _this.search = _this.search.bind(_assertThisInitialized(_this));
    _this.saveReports = _this.saveReports.bind(_assertThisInitialized(_this));
    _this.searchReports = _this.searchReports.bind(_assertThisInitialized(_this));
    _this.onCheckBoxChange = _this.onCheckBoxChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SearchContainer, [{
    key: "saveReports",
    value: function saveReports(r) {
      console.log('save reports!');
      this.setState({
        reports: r,
        initialReports: r
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log('componentWillMount');
      fetch('./js/data.json').then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }

        return response.json();
      }).then(this.saveReports);
    }
  }, {
    key: "onSelectChange",
    value: function onSelectChange(selectType, vals) {
      if (selectType === "Region") {
        this.setState({
          regions: vals
        });
      } else if (selectType === "Country") {
        this.setState({
          countries: vals
        });
      } else if (selectType === "Type") {
        this.setState({
          types: vals
        });

        var picked = _extends({}, this.state.qq);

        var dict = new Set(vals.map(function (o) {
          return o.value;
        }));
        console.log(dict, dict.has('Other'));

        picked['type'] = function (o) {
          return dict.has(o['type']);
        };

        this.searchReports(picked);
      } else if (selectType === "Sector") {
        this.setState({
          sectors: vals
        });
      }

      console.log(selectType, "Option selected:", vals);
    }
  }, {
    key: "searchReports",
    value: function searchReports(qqs) {
      var queries = Object.values(qqs);
      var reports;

      if (queries.length > 0) {
        reports = this.state.initialReports.filter(function (r) {
          return queries.reduce(function (c, f) {
            if (c) {
              return f(r);
            }

            return false;
          }, true);
        });
      } else {
        reports = this.state.initialReports;
      }

      this.setState({
        reports: reports,
        qq: qqs
      });
      console.log('current results....', reports.length);
    }
  }, {
    key: "onCheckBoxChange",
    value: function onCheckBoxChange(opt, v) {
      console.log('listening', opt, v);
      var q = v ? function (r) {
        return r[opt];
      } : null;

      var picked = _extends({}, this.state.qq);

      if (v) {
        picked[opt] = q;
      } else {
        delete picked[opt];
      }

      console.log('keys:', Object.keys(picked));
      this.searchReports(picked);
    }
  }, {
    key: "search",
    value: function search() {
      var reportsLength = this.state.reports.length;

      var _this$state = this.state,
          reports = _this$state.reports,
          initialReports = _this$state.initialReports,
          picked = _objectWithoutProperties(_this$state, ["reports", "initialReports"]);

      var search = _objectSpread({
        reportsLength: reportsLength
      }, picked);

      alert(JSON.stringify(search));
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("div", {
        className: "card-content"
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          marginBottom: '18px'
        }
      }, _react["default"].createElement("div", {
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
      }, _react["default"].createElement(_MainSelectFilters["default"], {
        onChange: this.onSelectChange,
        reports: this.state.reports,
        regions: this.state.regions,
        types: this.state.types,
        countries: this.state.countries,
        sectors: this.state.sectors
      }))))))), _react["default"].createElement("div", {
        className: "row "
      }, _react["default"].createElement(_DocumentField["default"], null), _react["default"].createElement(_ThematicFocus["default"], {
        reports: this.state.reports,
        onCheck: this.onCheckBoxChange
      })), _react["default"].createElement("div", {
        className: "row filters",
        style: {
          marginTop: '0px'
        }
      }, _react["default"].createElement("div", {
        className: "text-center search-controls-wrapper"
      }, _react["default"].createElement("button", {
        className: "btn btn-primary btn-filter",
        id: "apply_filters",
        onClick: this.search
      }, "Apply filters"), _react["default"].createElement("a", {
        id: "clear_filters",
        className: "btn-clear-filters",
        title: "Clear filters"
      }, _react["default"].createElement("i", {
        className: "fa fa-times-circle"
      }))))));
    }
  }]);

  return SearchContainer;
}(_react.Component);

global.window.SearchContainer = SearchContainer;
