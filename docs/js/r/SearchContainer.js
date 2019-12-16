'use strict';

var _react = _interopRequireWildcard(require("react"));

var _MainSelectFilters = _interopRequireDefault(require("./MainSelectFilters"));

var _ThematicFocus = _interopRequireDefault(require("./ThematicFocus"));

var _DocumentField = _interopRequireDefault(require("./DocumentField"));

var _Map = _interopRequireDefault(require("./Map"));

var _Results = _interopRequireDefault(require("./Results"));

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

var cljs = require('../../js/cljs.js');

var intersection = function intersection(setA, setB) {
  var _intersection = new Set();

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = setB[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var elem = _step.value;

      if (setA.has(elem)) {
        _intersection.add(elem);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return _intersection;
};

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
      filters: {
        countries: null,
        regions: null,
        types: null
      },
      reports: null,
      initialReports: null,
      regions: null,
      countries: null,
      sectors: null,
      types: null,
      searchResults: null,
      approval_year: null,
      active_year: null
    };
    _this.onSelectChange = _this.onSelectChange.bind(_assertThisInitialized(_this));
    _this.search = _this.search.bind(_assertThisInitialized(_this));
    _this.saveReports = _this.saveReports.bind(_assertThisInitialized(_this));
    _this.saveFilters = _this.saveFilters.bind(_assertThisInitialized(_this));
    _this.searchReports = _this.searchReports.bind(_assertThisInitialized(_this));
    _this.onCheckBoxChange = _this.onCheckBoxChange.bind(_assertThisInitialized(_this));
    _this.onSelectYear = _this.onSelectYear.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SearchContainer, [{
    key: "saveReports",
    value: function saveReports(r) {
      console.log('save reports!');
      var rr = cljs.reports(this.state.thematicsFocus, r); //    console.log(rr.map(o => o.type));
      //    console.log('first report', rr[0]);

      this.setState({
        reports: rr,
        initialReports: rr
      });
    }
  }, {
    key: "saveFilters",
    value: function saveFilters(cc) {
      //    console.log('regions', cljs.regions(cc));
      var state = cljs.assocIn(this.state, [[["filters", "countries"], cljs.countries(cc)], [["filters", "types"], cljs.types(cc)], [["filters", "regions"], cljs.regions(cc)], [["filters", "sectors"], cljs.sectors(cc)], [["thematicsFocus"], cljs.thematicFocus(cc)]]);
      this.setState(state);
      fetch('./js/all-reports.json').then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }

        return response.json();
      }).then(this.saveReports);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('componentDidMount');
      fetch('./js/all-filters.json').then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }

        return response.json();
      }).then(this.saveFilters);
    }
  }, {
    key: "selectSelect",
    value: function selectSelect(col, vals, kw, isRecursive, isMultiple) {
      var picked = _extends({}, this.state.qq);

      if (vals !== undefined && vals !== null) {
        var selectedValues = vals.map(function (o) {
          return o.value;
        });
        var dict = new Set(selectedValues); //      console.log('initial values', selectedValues);

        if (isRecursive) {
          dict = new Set();
          selectedValues.map(function (x) {
            return cljs.findChildrenRec(col, x).map(function (y) {
              return dict.add(y);
            });
          }); //        console.log('recursive', dict);
        }

        if (isMultiple) {
          picked[kw] = function (o) {
            return intersection(dict, new Set(o[kw])).size > 0;
          };
        } else {
          picked[kw] = function (o) {
            return dict.has(o[kw]);
          };
        }
      } else {
        delete picked[kw];
      }

      this.searchReports(picked);
    }
  }, {
    key: "onSelectChange",
    value: function onSelectChange(selectType, vals) {
      if (selectType === "Region") {
        this.setState({
          regions: vals
        });
        this.selectSelect.bind(this)(this.state.filters.regions, vals, 'region', false);
      } else if (selectType === "Country") {
        this.setState({
          countries: vals
        });
        this.selectSelect.bind(this)(this.state.filters.countries, vals, 'country', false);
      } else if (selectType === "Type") {
        this.setState({
          types: vals
        });
        this.selectSelect.bind(this)(this.state.filters.types, vals, 'type', true, false);
      } else if (selectType === "Sector") {
        this.setState({
          sectors: vals
        });
        this.selectSelect.bind(this)(this.state.filters.sectors, vals, 'sectors', true, true);
      }

      console.log(selectType, "Option selected:", vals);
    }
  }, {
    key: "onSelectYear",
    value: function onSelectYear(selectType, val) {
      var v = val ? val.value : null;

      var picked = _extends({}, this.state.qq);

      if (selectType === "approval_year") {
        this.setState({
          approval_year: v
        });

        if (v) {
          var q = v ? function (r) {
            return r['year'] === v;
          } : null;
          picked['approval_year'] = q;
        } else {
          delete picked['approval_year'];
        }
      } else {
        this.setState({
          active_year: v
        });

        if (v) {
          var _q = v ? function (r) {
            var dates = r['implementationPeriod'].split('-').map(function (o) {
              return parseInt(o, 10);
            });
            return v >= dates[0] && v <= dates[1];
          } : null;

          picked['active_year'] = _q;
        } else {
          delete picked['active_year'];
        }
      }

      console.log(selectType, "Option selected:", val);
      this.searchReports(picked);
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
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "container"
      }, _react["default"].createElement("section", {
        className: "search-controls "
      }, _react["default"].createElement("div", {
        className: "overlay"
      }), _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("div", {
        className: "card-content"
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          marginBottom: '18px'
        }
      }, _react["default"].createElement(_MainSelectFilters["default"], {
        onChange: this.onSelectChange,
        reports: this.state.reports,
        initialReports: this.state.initialReports,
        regions: this.state.regions,
        types: this.state.types,
        filters: this.state.filters,
        countries: this.state.countries,
        sectors: this.state.sectors
      })), _react["default"].createElement("div", {
        className: "row "
      }, _react["default"].createElement(_DocumentField["default"], {
        reports: this.state.reports,
        onChange: this.onSelectYear,
        active_year: this.state.active_year,
        approval_year: this.state.approval_year
      }), _react["default"].createElement(_ThematicFocus["default"], {
        reports: this.state.reports,
        thematicsFocus: this.state.thematicsFocus,
        onCheck: this.onCheckBoxChange
      })))), _react["default"].createElement(_Results["default"], {
        reports: this.state.reports,
        filters: this.state.filters
      }))));
    }
  }]);

  return SearchContainer;
}(_react.Component);

global.window.SearchContainer = SearchContainer;
