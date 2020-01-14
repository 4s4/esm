import { Component} from 'react';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';

import Arma from './Arma';
require('es6-promise').polyfill();
require('isomorphic-fetch');

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
function doSearch (reports, queries){
  return reports.filter(
    function (r) {
     return queries.reduce(
      function (c, f){
        if(c){
          return f(r);
        }
        return false;
      }, true
      );
    }
  );
}


class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex:0 , 
      qq:{}, 
      selections:{ecoRegions: [], geoRegions: [], countries: [], sectors:[], types: []},
      results:{ecoRegions: [], geoRegions: [], countries: [], sectors:[], types: [], approval_year:[], active_year:[]},
      filters: {countries:null, regions:null, types: null, sectors: null}, 
      reports: null, 
      initialReports:null, 
      regions:null, 
      searchResults: null, 
       
       };
    this.onSelectChange = this.onSelectChange.bind(this);
    this.saveReports = this.saveReports.bind(this);
    this.saveFilters = this.saveFilters.bind(this);
    this.saveWorld = this.saveWorld.bind(this);
    this.searchReports = this.searchReports.bind(this);
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
    this.onSelectYear = this.onSelectYear.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  saveReports(r){
    console.log('save reports!');
    const rr = cljs.reports(this.state.filters.thematicsFocus, r);
//    console.log(rr.map(o => o.type));
     console.log('first report', rr[0]);
    this.setState( { reports: rr, initialReports: rr});
  }

  saveFilters(cc){
    console.log('economical Regions', cc.regionGroups[1]);
    const countries = cljs.countries(cc);
    const types = cljs.types(cc);
    const regions = cljs.regions(cc);
    const sectors = cljs.sectors(cc);
    const state = cljs.assocIn(this.state, 
      [
        [["filters", "countries"], countries],
        [["filters", "types"], types],
        [["filters", "regions"], regions],
        [["filters", "sectors"], sectors],
        [["filters", "thematicsFocus"], cljs.thematicFocus(cc)]
      ]); 
      console.log('filters', state.filters);
      state.dicts = {'countries': countries.reduce((c, x) => assoc(c, x.value, x),{}),
                     'types': types.reduce((c, x) => assoc(c, x.value, x),{}),
                     'regions': regions.reduce((c, x) => assoc(c, x.value, x),{}),
                     'sectors': sectors.reduce((c, x) => assoc(c, x.value, x),{})
                    };
      this.setState( state);   
    fetch(window.production ? '/home/GetAllRecords' : './js/all-records.json')
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(this.saveReports);
  }

  saveWorld(cc){
        console.log('world', cc);
    this.setState({world:cc});
    }
    

  componentDidMount() {
    console.log('window.production', window.production);
    console.log('componentDidMount');
    fetch(window.production ? '/home/GetAllFilters' : './js/all-filters.json')
    .then(function(response) {
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
//    console.log('initial values', selectedValues);

      if (isRecursive){
        dict = new Set();
        selectedValues.map( x => cljs.findChildrenRec(col, x).map( y => dict.add(y)));
//        console.log('recursive', dict);
      }
      if(isMultiple){
        picked[qkw] = o => intersection(dict, new Set(o[kw])).size > 0;      
      } else{
        picked[qkw] = o => dict.has(o[kw]);
      }
      this.searchReports(picked);
      return picked[qkw];
    } else {
      delete picked[qkw];
      this.searchReports(picked);
      return null;
    }
  }

  fun(q, vals, kw){
    const { ...sels } = this.state.selections;
    sels[kw] = vals;
    const { ...res } = this.state.results;
    if(q){
      res[kw] = doSearch(this.state.initialReports, [q]);      
    }else{
      res[kw] = [];      
    }
    this.setState({ selections: sels, results: res });
  }

  onSelectChange (selectType, vals) {
    if(selectType === "geoRegion"){
      const q = this.selectSelect.bind(this)(this.state.filters.regions.filter(o => o["parent-value"]==="0"), vals, 'geoRegion', 'region', false);
      this.fun.bind(this)(q, vals, 'geoRegions');
    } else if(selectType === "ecoRegion"){
      const countryVals = vals.reduce((c, x) => c.concat(x.countries) ,[]).map( v => { return { value: v.id, text: v.name }});
      const q = this.selectSelect.bind(this)(this.state.filters.regions.filter(o => o["parent-value"]==="1"), countryVals, 'ecoRegion', 'country', false);
      this.fun.bind(this)(q, vals, 'ecoRegions');
    } else if(selectType === "country") {
      const q = this.selectSelect.bind(this)(this.state.filters.countries, vals, 'country', 'country', false);
      this.fun.bind(this)(q, vals, 'countries');
    } else if(selectType === "type") {
      const q = this.selectSelect.bind(this)(this.state.filters.types, vals, 'type', 'type', true, false);
      this.fun.bind(this)(q, vals, 'types');
    } else if(selectType === "sectors") {
      const q = this.selectSelect.bind(this)(this.state.filters.sectors, vals, 'sectors', 'sectors', true, true);
      this.fun.bind(this)(q, vals, 'sectors');
    }
    console.log(selectType, `Option selected:`, vals)
  };

  onSelectYear (selectType, val) {
    const v = val ? val.value : null ;
    const { ...picked } = this.state.qq;
    const { ...sels } =  this.state.selections;
    const { ...res } = this.state.results;
    if(selectType === "approval_year"){
      if(v){
        const q = v ?  r => r['year'] === v : null;
        picked['approval_year'] = q;
        res['approval_year'] = doSearch(this.state.initialReports, [q]);      
        sels['approval_year'] = v;      
      } else {
        delete picked['approval_year'];
        delete res['approval_year'];
        delete sels['approval_year'];
      }
    } else {
      const currentYear = new Date().getFullYear();
      if(v){
        const q = v ?  (r) => { 
          const dates = r['implementationPeriod'].split('-').map(o => parseInt(o, 10));
          const end = isNaN(dates[1]) ? currentYear : dates[1];
          return v >= dates[0] && v <= end;
          } : null;
        picked['active_year'] = q;
        res['active_year'] = doSearch(this.state.initialReports, [q]);      
        sels['active_year'] = v;      
      } else {
        delete picked['active_year'];
        delete res['active_year'];
        delete sels['active_year'];
      }
    }
    this.setState({ selections: sels, results: res });
    console.log(selectType, `Option selected:`, val)
    this.searchReports(picked);
  };

  searchReports(qqs){
    const queries = Object.values(qqs); 
    let reports;
    if (queries.length > 0){
      reports = doSearch(this.state.initialReports, queries);
    } else {
      reports = this.state.initialReports;
    }
    this.setState({reports, qq: qqs});
    console.log('current results....' ,reports.length, qqs, queries);

  }

  onCheckBoxChange (opt, y){
    const v = y.checked;
    console.log('listening' , opt, v);
    const q = v ?  r => r[opt] : null;
    const { ...picked } = this.state.qq;
    const { ...sels } = this.state.selections;
    const { ...res } = this.state.results;

    if (v){
      picked[opt] = q;
      sels[opt] = true;
      res[opt] = doSearch(this.state.initialReports, [q]);      

    } else {
      delete sels[opt];      
      delete picked[opt];
    }

    const thematicsFocusSelected = this.state.filters.thematicsFocus.filter(t => sels[t.kw]);
    if(thematicsFocusSelected.length > 0){
      sels['thematicFocus'] = thematicsFocusSelected;
      res['thematicFocus'] = doSearch(this.state.initialReports, thematicsFocusSelected.map(t => picked[t.kw]));
    } else {
      delete res['thematicFocus'];
      delete sels['thematicFocus'];
    }
    console.log('keys:', Object.keys(picked));
    this.setState({ selections: sels, results: res });
    this.searchReports(picked);
  }

  handleClick (e, titleProps) {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }
 
  render() {   
    return <Container style={{width:"100%", height:"100%"}}>
            <Arma filters={this.state.filters} 
                  onCheck={this.onCheckBoxChange}
                  onYear={this.onSelectYear}
                  onSelectChange={this.onSelectChange}
                  reports={this.state.initialReports} 
                  world={this.state.world} 
                  query={this.state.qq}
                  selections={this.state.selections}
                  results={this.state.results}
                  dicts={this.state.dicts}
                  combinedResults={this.state.reports}
            />
            </Container>;
  }
}

export default SearchContainer;