import { Component} from 'react';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader/Loader';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer/Dimmer';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';

import {look} from './utils';

import Arma from './Arma';
require('es6-promise').polyfill();
require('isomorphic-fetch');
import logLevel from 'loglevel';
var log = logLevel.getLogger("SearchContainer");
log.setLevel("INFO");

const cljs = require('../../js/cljs.js');
const  intersection = (setA, setB) => {
  var _intersection = new Set();
  for (var elem of setB) {
      if (setA.has(elem)) {
          _intersection.add(elem);
      }
  }
  return _intersection;
};
function assoc(o, k, v){
  o[k] = v;
  return o;
}


function doSearch ( queries){
  const t0 = performance.now();
//  log.debug(queries);
  const res = cljs.search(queries);
  look('SearchContainer/doSearch', t0);
  return res;
}
const analytics = window.analytics;

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      version: 0,
      qq:{}, 
      selections:{thematicFocus:[], ecoRegions: [], geoRegions: [], countries: [], sectors:[], types: []},
      results:{ecoRegions: [], geoRegions: [], countries: [], sectors:[], types: [], approval_year:[], active_year:[]},
      filters: {}, 
      reports: null, 
      regions:null, 
      searchResults: null, 
      };
    this.onSelectChange = this.onSelectChange.bind(this);
    this.saveReports = this.saveReports.bind(this);
    this.saveFilters = this.saveFilters.bind(this);
    this.searchReports = this.searchReports.bind(this);
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
    this.onSelectYear = this.onSelectYear.bind(this);
    this.updateStateWithVersion = this.updateStateWithVersion.bind(this);
  }

  updateStateWithVersion(m){
    m.version = ++this.state.version;
    this.setState(m);
  }


  saveReports(x){
    return (r) => {
      const t0 = performance.now();

      cljs.reportsToAtom(r);
      cljs.thematicFocus(); // thematics are necessary thus reports are transformed and stored in atom
      cljs.regions();
      cljs.reports();
//      log.debug(cljs.countCountries());


      const t1 = look('cljsreports', t0);
      x.reports = [];
      x.loading = false;
      this.updateStateWithVersion(x);
      
      
      look('cljsreports setState', t1);
    }
  } 


  saveFilters(cc){
    const t0 = performance.now();
    cljs.filtersToAtom(cc);
    const countries = cljs.countries();
    const filters = { }
    const state = this.state;
    state.filters = filters;
    state.dicts = {'countries': countries.reduce((c, x) => assoc(c, x.value, x),{}),
//                    'types': types.reduce((c, x) => assoc(c, x.value, x),{}),
//                    'regions': regions.reduce((c, x) => assoc(c, x.value, x),{}),
//                    'sectors': sectors.reduce((c, x) => assoc(c, x.value, x),{})
                  };      
    const t1 = look('cljs.filters... ', t0);
    log.debug('filters', state.filters);
    fetch(window.production ? '/home/GetAllRecords' : './js/all-records.json')
    .then(function(response) {
      look('fetch all records... ', t1);
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(this.saveReports(state));
  }

  componentDidMount() {
    analytics('appStart', {});
    const t0 = performance.now();
    fetch(window.production ? '/home/GetAllFilters' : './js/all-filters.json')
    .then(function(response) {
      look('fetch all filters', t0);
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(this.saveFilters);    
  }
  
  selectSelect(col, vals, qkw, kw, isRecursive, isMultiple){
    const { ...picked } = this.state.qq;
    if (vals !== undefined && vals !== null  && vals.length > 0  ){
      const selectedValues = vals.map(o => o.value);
      let dict = new Set(selectedValues);
//    log.debug('initial values', selectedValues);
      if (isRecursive){
        const t0 = performance.now();
        dict = new Set();
        selectedValues.map( x => cljs.findChildrenRec(col, x).map( y => dict.add(y)));
        look('selectSelect/recursive', t0);

//        log.debug('recursive', dict);
      }
      if(isMultiple){
        picked[qkw] = o => intersection(dict, new Set(o[kw])).size > 0;      
      } else{
        picked[qkw] = o => dict.has(o[kw]);
      }
      return [picked[qkw], picked];
    } else {
      delete picked[qkw];
      return [null, picked];
    }
  }

  fun(q, picked, vals, kw){
    const t0 = performance.now();
    const { ...sels } = this.state.selections;
    sels[kw] = vals;
    const { ...results } = this.state.results;
    if(q){
      results[kw] = doSearch([q]);      
    }else{
      results[kw] = [];      
    }

    const t1 = look('SearchContainer/fun beforeSetState', t0);
    this.searchReports(picked, { selections: sels, results});
    look('SearchContainer/fun afterSetState', t1);
  }

  onSelectChange (selectType, vals) {
    const t0 = performance.now();

    vals.length > 0 && analytics(`SelectChange-${selectType.toUpperCase()}`, {vals: vals.map(o => o.value)});

    if(selectType === "geoRegion"){
      const [q, picked] = this.selectSelect.bind(this)(cljs.regions().filter(o => o["parent-value"]==="0"), vals, 'geoRegion', 'region', false);
      this.fun.bind(this)(q, picked, vals, 'geoRegions');
    } else if(selectType === "ecoRegion"){
      const countryVals = vals.reduce((c, x) => c.concat(x.countries) ,[]).map( v => { return { value: v.id, text: v.name }});
      const [q, picked]  = this.selectSelect.bind(this)(cljs.regions().filter(o => o["parent-value"]==="1"), vals, 
      'ecoRegion', 'regions', false, true);
      this.fun.bind(this)(q, picked, vals, 'ecoRegions');
    } else if(selectType === "country") {
      const [q, picked] = this.selectSelect.bind(this)(cljs.countries(), vals, 'country', 'country', false);
      this.fun.bind(this)(q,picked, vals, 'countries');
    } else if(selectType === "type") {
      const [q, picked] = this.selectSelect.bind(this)(cljs.types(), vals, 'type', 'type', true, false);
      this.fun.bind(this)(q, picked, vals, 'types');
    } else if(selectType === "sectors") {
      const [q, picked] = this.selectSelect.bind(this)(cljs.sectors(), vals, 'sectors', 'sectors', true, true);
      this.fun.bind(this)(q, picked, vals, 'sectors');
    }
    look('onSelectChange', t0);
    log.debug(selectType, `Option selected:`, vals)
  };

  onSelectYear (selectType, val) {
    const t0 = performance.now();

    const v = val ? val.value : null ;
    const { ...picked } = this.state.qq;
    const { ...sels } =  this.state.selections;
    const { ...res } = this.state.results;
    if(selectType === "approval_year"){
      if(v){
        analytics(`approval_year`, {year: v});

        const q = v ?  r => r['year'] === v : null;
        picked['approval_year'] = q;
        res['approval_year'] = doSearch([q]);      
        sels['approval_year'] = v;      
      } else {
        delete picked['approval_year'];
        delete res['approval_year'];
        delete sels['approval_year'];
      }
    } else {
      const currentYear = new Date().getFullYear();
      if(v){
        analytics(`active_year`, {year: v});
        const q = v ?  (r) => { 
          const dates = r['implementationPeriod'].split('-').map(o => parseInt(o, 10));
          const end = isNaN(dates[1]) ? currentYear : dates[1];
          return v >= dates[0] && v <= end;
          } : null;
        picked['active_year'] = q;
        res['active_year'] = doSearch([q]);      
        sels['active_year'] = v;      
      } else {
        delete picked['active_year'];
        delete res['active_year'];
        delete sels['active_year'];
      }
    }
    log.debug(selectType, `Option selected:`, val)
    this.searchReports(picked, { selections: sels, results: res });
    look('onSelectYear', t0);
  };

  searchReports(qqs, extraState){
    const queries = Object.values(qqs); 
    let reports;
    if (queries.length > 0){
      reports = doSearch( queries);
    } else {
      reports = [];
    }
    extraState.reports = reports;
    extraState.qq = qqs; 
    this.updateStateWithVersion(extraState);
    log.debug('current results....' ,reports.length, qqs, queries);

  }

  onCheckBoxChange (opt, y){
    const t0 = performance.now();

    const v = y.checked;
    log.debug('listening' , opt, v);
    const q = v ?  r => r[opt] : null;

    const { ...picked } = this.state.qq;
    const { ...sels } = this.state.selections;
    const { ...res } = this.state.results;

    if (v){
      analytics('ThematicFocusSelected', {id: opt});

      picked[opt] = q;
      sels[opt] = true;
      res[opt] = doSearch([q]);      

    } else {
      delete sels[opt];      
      delete picked[opt];
    }

    const thematicsFocusSelected = cljs.thematicFocus().filter(t => sels[t.kw]);
    if(thematicsFocusSelected.length > 0){
      sels['thematicFocus'] = thematicsFocusSelected;
      res['thematicFocus'] = doSearch(thematicsFocusSelected.map(t => picked[t.kw]));
    } else {
      delete res['thematicFocus'];
      delete sels['thematicFocus'];
    }
    log.debug('keys:', Object.keys(picked));
    this.searchReports(picked, { selections: sels, results: res });
    look('onCheckBoxChange', t0);
  }
 

  render() {   
     return <Container style={{width:"100%", height:"100%"}}>
      {this.state.loading ?
             <Dimmer active={this.state.loading} inverted>
              <Loader inline='centered' inverted />
            </Dimmer>  : 
            <Arma filters={this.state.filters}
                  version={this.state.version}            
                  onCheck={this.onCheckBoxChange}
                  onYear={this.onSelectYear}
                  onSelectChange={this.onSelectChange}
                  world={this.state.world} 
                  query={this.state.qq}
                  selections={this.state.selections}
                  results={this.state.results}
                  dicts={this.state.dicts}
                  combinedResults={this.state.reports}
      />}
      </Container> ;
  }
}

export default SearchContainer;