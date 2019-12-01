'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Childo = _interopRequireDefault(require("./Childo"));

var _MainSelectFilters = require("./MainSelectFilters");

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

var range = function range(start, stop) {
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return Array(Math.ceil((stop - start) / step)).fill(start).map(function (x, y) {
    return x + y * step;
  });
};

var DocumentField =
/*#__PURE__*/
function (_Component) {
  _inherits(DocumentField, _Component);

  function DocumentField(props) {
    var _this;

    _classCallCheck(this, DocumentField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DocumentField).call(this, props));
    _this.state = {
      reports: []
    };
    return _this;
  }

  _createClass(DocumentField, [{
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
      }, _react["default"].createElement("label", {
        "for": "StrategyDate"
      }, "Active year"), _react["default"].createElement(_Childo["default"], {
        id: "active_year",
        options: this.state.actives,
        placeholder: "Select year ...",
        onChange: this.props.onChange,
        value: this.state.active_year,
        isMulti: false,
        isClearable: true
      }), _react["default"].createElement("label", {
        "for": "StrategyDate"
      }, "Approval year"), _react["default"].createElement(_Childo["default"], {
        id: "approval_year",
        options: this.state.approvals,
        placeholder: "Select year ...",
        onChange: this.props.onChange,
        value: this.state.approval_year,
        isMulti: false,
        isClearable: true
      }), _react["default"].createElement("div", {
        className: "sspace"
      })), _react["default"].createElement("div", {
        className: "col-xs-2"
      }, _react["default"].createElement("div", {
        className: "sspace"
      })), _react["default"].createElement("div", {
        className: "col-xs-2 s-last-document-field-column "
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.reports && props.reports !== state.reports) {
        var approvals = props.reports.reduce(function (c, o) {
          c.add(o['year']);
          return c;
        }, new Set());
        var approvals_counts = (0, _MainSelectFilters.countIt)(props.reports, 'year');
        approvals = Array.from(approvals).sort().map(function (o) {
          return {
            value: o,
            label: "".concat(o, " (").concat(approvals_counts[o], ")"),
            level: 0
          };
        });
        var approval_year = approvals.filter(function (o) {
          return o.value === props.approval_year;
        });
        var actives = props.reports.map(function (r) {
          return r['implementationPeriod'].split("-");
        }).reduce(function (c, o) {
          range(parseInt(o[0], 10), parseInt(o[1], 10)).map(function (x) {
            c.add(x);
          });
          return c;
        }, new Set());
        actives = Array.from(actives).sort().reduce(function (c, x) {
          c[x] = 0;
          return c;
        }, {});
        props.reports.map(function (r) {
          var dates = r['implementationPeriod'].split("-");
          range(parseInt(dates[0], 10), parseInt(dates[1], 10)).map(function (x) {
            actives[x]++;
          });
        });
        actives = Object.keys(actives).map(function (o) {
          return {
            value: o,
            label: "".concat(o, " (").concat(actives[o], ")"),
            level: 0
          };
        });
        var active_year = actives.filter(function (o) {
          return o.value === props.active_year;
        });
        return {
          reports: props.reports,
          approvals: approvals,
          actives: actives,
          active_year: active_year,
          approval_year: approval_year
        };
      }

      return null;
    }
  }]);

  return DocumentField;
}(_react.Component);

var _default = DocumentField;
exports["default"] = _default;
