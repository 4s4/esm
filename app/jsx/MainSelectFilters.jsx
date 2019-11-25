'use strict';
import React, { Component, createElement } from 'react';
import Childo from './Childo';
import {regions, countries, types, sectors} from './data';

function countBy(col){
  return col.reduce(function (acc, curr) {
    acc[curr] ? acc[curr]++ : acc[curr] = 1;
    return acc
  }, {});
}
function countIt(reports, prop){
  //    console.log(this.props.reports.shift()); 
      return countBy(reports.map(r => r[prop]));
    }
class MainSelectFilters extends Component {
  constructor(props) {
    super(props);
    this.state = { liked: false, reports: props.reports };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.reports !== state.reports 
    ) {
      return {
        reports: props.reports,
        types: countIt(props.reports, 'type')
      };
    }
    return null;
  }

  render() { 
    console.log('types', this.state.types);
    let tt = [];
    if (this.state.types){
      tt = types.map(o => {
      const {...picked} = o;
      console.log(picked);
      picked.label+=" ("+this.state.types[picked.value]+")";
      return picked;
    })
    
    console.log('data-types', types);
    
    console.log('tt-types', tt);
  }
    return <div className="col-xs-12 col-md-12">
            <div className="row">
              <div className="col-xs-12 col-sm-3" data-toggle="tooltip" title="Geographic region where the country belongs.">
                <Childo options={regions} placeholder="Region" onChange={this.props.onChange} value={this.props.regions}/>
              </div>
              <div className="col-xs-12 col-sm-3" data-toggle="tooltip" title="Official country name.">
                <Childo options={countries} placeholder="Country" onChange={this.props.onChange} value={this.props.countrie}/>
              </div>
              <div className="col-xs-12 col-sm-3"  data-toggle="tooltip" title="Sector " >
                <Childo options={sectors} placeholder="Sector" onChange={this.props.onChange} value={this.props.sectors}/>
              </div>
              <div className="col-xs-12 col-sm-3" data-toggle="tooltip" title="Type of Document" >
              <Childo 
              options={tt} 
              placeholder="Type" onChange={this.props.onChange} value={this.props.types}/>
              </div>
            </div>
          </div>;
  }
}
export default MainSelectFilters;