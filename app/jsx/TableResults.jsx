import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import List from 'semantic-ui-react/dist/commonjs/elements/List/List';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import Item from 'semantic-ui-react/dist/commonjs/views/Item/Item';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';

import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';
import CollapsableData from './CollapsableData';
import React, { Component } from 'react';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu/Menu';
import {summarise} from './utils';
import ShortContent from './ShortContent'

import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import download from 'downloadjs';

function downloadFile(url){
  console.log('before download');
  download(url);
  console.log('after download');
}

function rightOption (d, filters) {
  const type = filters.types.find( o => o.value === d.type);
  return (  
       
  <List>
  <List.Item><Label basic color='blue' as='b'>Type:<Label.Detail >{type && type.label}</Label.Detail></Label></List.Item>
  <List.Item><Label basic  as='b'>Year:<Label.Detail >{d.year}</Label.Detail></Label></List.Item>
  <List.Item><Label basic  as='b'>Period:<Label.Detail >{d.implementationPeriod}</Label.Detail></Label></List.Item>
  </List>
  );
}

const regexp = /[A-Za-z0-9]+/g;

function toUrl(s){
//  let str = 'Afghanistan; Country Partnership Strategy (2017-2021)';
  const res = [...s.matchAll(regexp)];
  return res.map(v => v[0]).join('-').toLowerCase();
}


 function centerOption(d, filters){ 
  const sectors = d.sectors.map(s => filters.sectors.find( o => o.value === s));
  const country = filters.countries.find( o => o.value === d.country);
  const region = filters.regions.find( o => o.value === d.region);

  return (
    <Item.Group>
    <Item>
    <Item.Content>
      <Item.Header >
      <Popup size='mini' key={`pop-up-detail-${d.value}`} inverted content='Go to document page detail' trigger={<Header as='h3' color='blue' ><a href={`./document/${d.id}/${toUrl(d.title)}`}> {d.title} </a></Header>} />
      <Popup key={d.value} inverted content={`Region: ${region.label}`} trigger={<Label as='b' color='blue' tag>{country.label} ({country.code})</Label>} />
      </Item.Header>
      <Item.Meta><CollapsableData collapsed={summarise(d.description, 30)} expanded={d.description}/></Item.Meta>
      <Item.Extra>
      {sectors && sectors.length > 0 && <Header as='h5'>Sectors</Header>}
      {sectors.map((s, idx) => (<ShortContent color='grey' key={idx} size='tiny' basic={true} v={s.label} maxWords="2" />))}
      </Item.Extra>
    </Item.Content>
  </Item> 
  </Item.Group> 
    
    );
  }

 function leftOption(d, filters){ 
  const region = filters.regions.find( o => o.value === d.region);
  const dict = {"Africa": "Africa", "America": "Americas", "Asia": "Asia", "Europe": "Europe", "Oceania": "Southeast_Asia"};
  return (      
  <Popup key={d.value} inverted content={`Region: ${region.label}`} trigger={ <Image size='tiny' src={`img/maps/${dict[region.label]}.png`} />} />      
    );
  }
  
 function tableData (dd, filters) {
  return dd.map( d => ({ id:d.id,  le: leftOption(d, filters), co: centerOption(d, filters), ro: rightOption(d, filters) })
  );
} 
  
const maxRows = 10;
const analytics = window.analytics;

class TableResults extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], 
                   pagination: false, 
                   pages:0, 
                   currentPage:0,
                   sortColumn:null,
                   sortDirection:null,
                   downloadSelection:null
                  };
    this.setPage = this.setPage.bind(this);
    this.sortTable = this.sortTable.bind(this);
    this.downloadData = this.downloadData.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (
      props.version !== state.version
    ) {
      const totalRows = props.data.length;
      const pagination = totalRows > maxRows;

      const quotient = Math.floor(totalRows/maxRows);
      const remainder = totalRows % maxRows;
      const pages = quotient + (remainder > 0 ? 1 : 0 );
      const currentPage = 0;
      return { version:props.version, selections: props.selections , dicts: props.dicts, data: props.data, pagination, pages, currentPage, filters: props.filters, processedData: tableData(props.data, props.filters) };
    }
    return state;
  }

  sortTable(t){
    const { data, filters, dicts } = this.state;
    console.log('sortTable:', t);
    let sorted = [];
    if (t) {
      if (t === 'title'){
      sorted = data.sort((a, b) =>{
        const i = a[t] || '';
        return i.localeCompare(b[t]);});
      } else if (t === 'year'){
        sorted = data.sort((a, b) =>{
          const i = a[t] || 0;
          return i.localeCompare(b[t]);});
      } else if (t === 'regions' || t === 'countries' || t === 'types' ){
        let kw;
        if(t === 'regions') {
          kw = 'region';
        }else if(t === 'countries'){
          kw = 'country';
        }else if(t === 'types'){
          kw = 'type';
        }
        const d = dicts[t];
          sorted = data.sort((a, b) =>{
            const i = a[kw] ? d[a[kw]].label : '';
            return i.localeCompare(b[kw] ? d[b[kw]].label : '');});
      }

    } else {
      sorted = data;
    }

    this.setState({
      currentPage:0,
      processedData: tableData(sorted, filters) 
    });
  }

  handleSort(clickedColumn) {
    return function() {
      const { column, data, direction } = this.state
  
      if (column !== clickedColumn) {
        this.setState({
          column: clickedColumn,
          data: data, //_.sortBy(data, [clickedColumn]),
          direction: 'ascending',
        })
        return
      }
  
      this.setState({
        data: data.reverse(),
        direction: direction === 'ascending' ? 'descending' : 'ascending',
      })
    }
    }
  
  setPage(x){
    this.setState({currentPage: x});  
  }
  downloadData(d) {
    // region[]: uuid , 
    // country[]: uuid, 
    // Sector[]:uuid, 
    // document[]: typeLabel, 


    // year: int, 
    // period: int, int
    // thematicCheckboxData[]: uuid, 
    // sortColumnIndex:0->N, 
    // page:0->N, 
    // sortDirection: 0:1

    // decoded => "region[]=d380856d-ddca-4995-9cc5-51179abc00f6&region[]=3f5ceef1-92b1-4378-b9d9-8b6486154219&country[]=c709fae3-f171-4185-8990-1ecc3b076f83&country[]=34a881a1-3438-46e8-8ef3-3b7f5e80bec2&Sector[]=831fe888-5e70-4d2f-8cd1-37d68b6ab8cf&Sector[]=5f13d462-d292-4340-9295-1673e0c2b781&document[]=NES-ITC&document[]=PRSP&year=2013&period=2001%2C2023&last_Update=&counterpart=&thematicCheckboxData[]=f0d58caa-196e-4f43-bfda-c33d4366221a&thematicCheckboxData[]=9b26e5d5-a4e7-4160-8674-0bcaaf5809b0&thematicCheckboxData[]=de0cd883-9619-44df-871d-af45b413d6ec&designProcessCheckboxData[]=de6323d2-c464-432a-9693-7eb66956b39d&designProcessCheckboxData[]=ac882c5a-7294-4527-bc04-c2c3e12a7c83&sortColumnIndex=&page=&sortDirection="
    // decodeURI(u) or encodeURI(u)
    // encoded "region%5B%5D=d380856d-ddca-4995-9cc5-51179abc00f6&region%5B%5D=3f5ceef1-92b1-4378-b9d9-8b6486154219&country%5B%5D=c709fae3-f171-4185-8990-1ecc3b076f83&country%5B%5D=34a881a1-3438-46e8-8ef3-3b7f5e80bec2&Sector%5B%5D=831fe888-5e70-4d2f-8cd1-37d68b6ab8cf&Sector%5B%5D=5f13d462-d292-4340-9295-1673e0c2b781&document%5B%5D=NES-ITC&document%5B%5D=PRSP&year=2013&period=2001%2C2023&last_Update=&counterpart=&thematicCheckboxData%5B%5D=f0d58caa-196e-4f43-bfda-c33d4366221a&thematicCheckboxData%5B%5D=9b26e5d5-a4e7-4160-8674-0bcaaf5809b0&thematicCheckboxData%5B%5D=de0cd883-9619-44df-871d-af45b413d6ec&designProcessCheckboxData%5B%5D=de6323d2-c464-432a-9693-7eb66956b39d&designProcessCheckboxData%5B%5D=ac882c5a-7294-4527-bc04-c2c3e12a7c83&sortColumnIndex=&page=&sortDirection=";
    if(d !== ""){
      const selections = this.state.selections;
      let churro="filetype="+d.value;
      function extractColection(col, urlKw){
        if(col.length > 0) { churro += col.map( o => urlKw+"="+o.value).join("&"); } 

      }
      extractColection(selections.ecoRegions, "region[]");
      extractColection(selections.geoRegions, "region[]");
      extractColection(selections.countries, "country[]");
      extractColection(selections.sectors, "Sector[]");
      if(selections.types.length > 0) { churro += selections.types.map( o => "document[]="+o.label).join("&"); } 
      if(selections.thematicFocus.length > 0) { churro += selections.thematicFocus.map( o => "thematicCheckboxData[]="+o.id).join("&"); } 
      if(selections.active_year){ 
        const active_year= parseInt(selections.active_year, 10);
        churro += "period="+active_year+","+(active_year + 1);}
      if(selections.approval_year){ churro += "year="+selections.approval_year;}
      console.log('churro', churro, encodeURI(churro));
      console.log('donwloading type', d);
      let opts = {};
      if (window.production){
        opts = {
          method: 'POST', 
        body:encodeURI(churro),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }; 
      }
      fetch(window.production ? '/Search/ExportPDF' : './js/download/response.js', opts)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.text();
      }.bind(this))
      .then(function(responseText){
        console.log('responseText', responseText);
        const ext = window.production ? '' : d.value;
        const file = `${responseText}.${ext}`;
        analytics('donwloading', {file: file});
        downloadFile(file);
        this.setState({downloadSelection: d.value});
      }.bind(this));  
    }
  }

  render(){
    const {column, direction} = this.props;
    const {processedData, pagination, pages, currentPage, downloadSelection} = this.state;
    const tooMuchPages = pages > 10;
    let leftNavigator = false;
    let rightNavigator = false;
    if (tooMuchPages){
      if(currentPage > 0){
        leftNavigator = true;
      }
      if((pages - (currentPage + 1 ))  > 0){
        rightNavigator = true;
      }
    }
    let currentData;
    if (pagination){
      const init = currentPage * maxRows;
      currentData = processedData.slice(init, init + maxRows);
    } else {
      currentData = processedData;
    }
    const options = [
      { key: 1, text: 'Document Name', value: 'title' },
      { key: 2, text: 'Type', value: 'types' },
      { key: 3, text: 'Year', value: 'year' },
      { key: 4, text: 'Country', value: 'countries' },
      { key: 5, text: 'Region', value: 'regions' },
    ];
    return ( <Segment>
        <Header as='h3' block color='blue'>Listing {processedData.length} documents:</Header>

        <Dropdown text='Sort Results by ...' onChange={ (o, d) => { console.log('searching by:', d.value); this.sortTable(d.value)}} clearable options={options} selection />
        <Dropdown  onChange={ (o, d) => {this.downloadData(d); }}  options={[{label:'EXCEL', value:'xlsx'}, {label:'CSV', value:'csv'}]} text='Download File' selection />

              <Table sortable fixed striped basic='very'>
              <Table.Header >
              <Table.Row style={{visibility:'hidden'}}>
                <Table.HeaderCell width='2'  />

                  <Table.HeaderCell width='10' 
                    sorted={column === 'age' ? direction : null}
                  >
                    Document
                  </Table.HeaderCell>
                  <Table.HeaderCell width='4' 
                    sorted={column === 'gender' ? direction : null}
                  >
                    Type/Year/Period/Region/Country
                  </Table.HeaderCell>
                </Table.Row>                   
              </Table.Header>
              <Table.Body>
                {currentData.map(({id, le, co, ro }) => (
                  <Table.Row key={id}>
                    <Table.Cell>{le}</Table.Cell>
                    <Table.Cell>{co}</Table.Cell>
                    <Table.Cell textAlign='right'>{ro}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer>
                { pagination && <Table.Row>
                  <Table.HeaderCell colSpan='3'>
                    <Menu floated='right' pagination>
                    {leftNavigator && currentPage > 4 && <Menu.Item as='a' icon onClick={() => this.setPage(0)}>
                        <Icon name='angle double left' />
                      </Menu.Item>}
                      {leftNavigator && <Menu.Item as='a' icon onClick={() => this.setPage((currentPage - 1) < 0 ? 0 : (currentPage - 1))}>
                        <Icon name='chevron left' />
                      </Menu.Item>}
                      {[...Array(pages).keys()].filter(x => ( x === currentPage ||((currentPage - x < 5) && x < currentPage)) || ((x - currentPage < 4)  && x > currentPage) ).map( x => (<Menu.Item as='a' active={x === currentPage} key={x} onClick={() => this.setPage(x)}>{x+1}</Menu.Item>))}                
                      { rightNavigator && <Menu.Item as='a' icon onClick={() => this.setPage((currentPage + 1) > (pages - 1) ? (pages - 1) : (currentPage + 1) )}>
                        <Icon name='chevron right' />
                      </Menu.Item>}
                      { rightNavigator && pages - currentPage  > 4 && <Menu.Item as='a' icon onClick={() => this.setPage(pages - 1)}>
                        <Icon name='angle double right' />
                      </Menu.Item>}
                    </Menu>
                  </Table.HeaderCell>
                </Table.Row>}
              </Table.Footer>
            </Table>
            </Segment>);

  }


}

export default TableResults;
