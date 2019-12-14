'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactMapGl = _interopRequireWildcard(require("react-map-gl"));

var _cityPin = _interopRequireDefault(require("./city-pin"));

var _reactHighcharts = _interopRequireDefault(require("react-highcharts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var thematicFocus = {
  'environment': 'Environment',
  'gender': 'Gender',
  'poverty_reduction': 'Poverty Reduction',
  'export_strategy': 'Export Strategy',
  'trade_focus': 'Focus on trade',
  'youth': 'Youth',
  'trade_facilitation': 'Trade Facilitation',
  'trade_finance': 'Trade Finance',
  'trade_information': 'Trade Information',
  'trade_promotion': 'Trade Promotion',
  'quality': 'Quality',
  'tvet': 'TVET',
  'regional': 'Regional Scope',
  'regional_integration': 'Regional Integration'
};
var thematicFocusKeys = Object.keys(thematicFocus);

function countProp(col, kw) {
  if (col) {
    return col.filter(function (o) {
      return o[kw];
    }).length;
  } else {
    return 0;
  }
}

var Map =
/*#__PURE__*/
function (_Component) {
  _inherits(Map, _Component);

  function Map(props) {
    var _this;

    _classCallCheck(this, Map);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Map).call(this, props));
    _this.state = {
      viewport: {
        attributionControl: false,
        scrollWheelZoom: true,
        zoom: 1,
        minZoom: 1,
        maxZoom: 16,
        continuousWorld: false,
        width: "100%",
        height: "300px",
        center: [15.505, 25.09]
      },
      popupInfo: null
    };
    _this._renderCityMarker = _this._renderCityMarker.bind(_assertThisInitialized(_this));
    _this._renderPopup = _this._renderPopup.bind(_assertThisInitialized(_this));
    _this._onClick = _this._onClick.bind(_assertThisInitialized(_this));
    _this.saveCountries = _this.saveCountries.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Map, [{
    key: "saveCountries",
    value: function saveCountries(cc) {
      console.log('countries', cc);
      this.setState({
        countries: cc.map(function (x) {
          x.GeoJSON = JSON.parse(x.GeoJSON);
          return x;
        })
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('componentDidMount');
      fetch('./js/countries.json').then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }

        return response.json();
      }).then(this.saveCountries);
    }
  }, {
    key: "_renderPopup",
    value: function _renderPopup() {
      var _this2 = this;

      var popupInfo = this.state.popupInfo;
      var xAxisCategories = popupInfo ? popupInfo.xAxisCategories : [];
      var seriesName = popupInfo ? popupInfo.seriesName : null;
      var seriesData = popupInfo ? popupInfo.seriesData : [];
      var config = {
        chart: {
          type: 'bar',
          height: 200,
          width: 400
        },
        title: {
          text: undefined
        },
        xAxis: {
          categories: xAxisCategories //['Apples', 'Bananas', 'Oranges']

        },
        yAxis: {
          title: {
            text: undefined
          }
        },
        series: [{
          name: seriesName,
          data: seriesData //[1, 0, 4]

        }]
      };
      return popupInfo && _react["default"].createElement(_reactMapGl.Popup, {
        tipSize: 5,
        anchor: "top",
        className: "YUPIE",
        longitude: popupInfo.longitude,
        latitude: popupInfo.latitude,
        closeOnClick: false,
        onClose: function onClose() {
          return _this2.setState({
            popupInfo: null
          });
        }
      }, _react["default"].createElement(_reactHighcharts["default"], {
        config: config
      }));
    }
  }, {
    key: "_renderCityMarker",
    value: function _renderCityMarker(city, index) {
      var _this3 = this;

      return _react["default"].createElement(_reactMapGl.Marker, {
        key: "marker-".concat(index),
        longitude: city.longitude,
        latitude: city.latitude
      }, _react["default"].createElement(_cityPin["default"], {
        size: 20,
        onClick: function onClick() {
          return _this3.setState({
            popupInfo: city
          });
        }
      }));
    }
  }, {
    key: "_renderCountry",
    value: function _renderCountry(country, idx) {
      var value = country.value,
          label = country.label,
          coords = country.coords;
      var conf = {
        id: "layer-".concat(idx),
        type: 'fill',
        key: "layer-".concat(idx),
        metadata: {
          value: value,
          label: label,
          coords: coords
        },
        source: {
          type: 'geojson',
          data: country.geoJSON
        },
        paint: {
          "fill-color": "#1FCB4A",
          "fill-opacity": 0.30
        }
      };
      return _react["default"].createElement(_reactMapGl.Layer, _extends({
        key: "layer-".concat(idx)
      }, conf));
    }
  }, {
    key: "_onClick",
    value: function _onClick(event) {
      var feature = event.features && event.features[0];

      if (feature) {
        console.log("layer", feature.layer);

        if (feature.layer.id.substring(0, 5) === "layer") {
          var _feature$layer$metada = feature.layer.metadata,
              label = _feature$layer$metada.label,
              value = _feature$layer$metada.value,
              coords = _feature$layer$metada.coords;
          console.log("selecting country value", value);
          var reportsFiltered = this.props.reports.filter(function (o) {
            return o.country === value;
          });
          var search = thematicFocusKeys.reduce(function (c, o) {
            c[o] = countProp(reportsFiltered, o);
            return c;
          }, {});
          var keysSorted = Object.keys(search).sort(function (a, b) {
            return search[b] - search[a];
          });
          console.log('sortedSearch', keysSorted); // bar,me,you,foo

          var dataChart = keysSorted.slice(0, keysSorted.length > 5 ? 5 : keysSorted.length);
          var xAxisCategories = dataChart.map(function (o) {
            return thematicFocus[o];
          });
          var seriesData = dataChart.reduce(function (c, o) {
            c.push(search[o]);
            return c;
          }, []);
          console.log('xAxisCategories', xAxisCategories, 'seriesData', seriesData);
          console.log('search', search); //        this.props.reports.filter( o => o.country === "010d6483-d82d-48de-88c4-030fc5e7f81e").map(o => console.log(o));

          this.setState({
            popupInfo: {
              country: value,
              latitude: coords[1],
              xAxisCategories: xAxisCategories,
              seriesName: label,
              seriesData: seriesData,
              longitude: coords[0]
            }
          });
        } //      window.alert(`Clicked layer ${feature.layer.id}`); // eslint-disable-line no-alert

      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      if (this.state.countries) {
        return _react["default"].createElement("div", {
          className: "container"
        }, _react["default"].createElement("ol", {
          className: "breadcrumb pull-right"
        }, _react["default"].createElement("li", null, _react["default"].createElement("a", {
          href: "#"
        }, "Home"))), _react["default"].createElement("h2", null, "Search documents"), _react["default"].createElement("section", {
          className: "map-container map-container-details"
        }, _react["default"].createElement("div", {
          className: "container"
        }, _react["default"].createElement("div", {
          id: "map"
        }, _react["default"].createElement(_reactMapGl["default"], _extends({}, this.state.viewport, {
          onClick: this._onClick,
          mapStyle: "mapbox://styles/mapbox/streets-v10",
          mapboxApiAccessToken: "pk.eyJ1IjoiZGViYWppdG11a2hlcmplZSIsImEiOiJjaWV2YzVlMWowd2N3czltMm43aGt5Z2t5In0.AeB5WR5Tl0bGXHr-A7iyJA",
          onViewportChange: function onViewportChange(viewport) {
            return _this4.setState({
              viewport: viewport
            });
          }
        }), _react["default"].createElement("div", {
          style: {
            position: 'absolute',
            left: "10px",
            top: "10px"
          }
        }, _react["default"].createElement(_reactMapGl.NavigationControl, null)), this.state.countries.map(function (o, idx) {
          var coords = o.GeoJSON.features ? o.GeoJSON.features[0].geometry.coordinates[0][0] : o.GeoJSON[0].geometry.coordinates[0][0];

          if (o.GeoJSON.features && !Array.isArray(coords[0])) {
            return _this4._renderCountry({
              geoJSON: o.GeoJSON,
              value: o.CountryID,
              label: o.CountryName,
              coords: coords
            }, idx);
          } else {// console.log("ahhhh", o.CountryName, coords, o.GeoJSON)
          }
        }), this._renderPopup())))));
      }

      return _react["default"].createElement("div", null);
    }
  }]);

  return Map;
}(_react.Component);

var _default = Map;
exports["default"] = _default;
