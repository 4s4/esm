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

import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';

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

function summarise(str, wordMax){
  if(str === null) return "";
  const descReg = /[^\s]+/g;
  const res = [...str.matchAll(descReg)];
  if(res.length > wordMax){
    return res.slice(0, wordMax).map(v => v[0]).join(' ')+' ...';
  }else{
    return str;
  }
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
      {sectors.map((s, idx) => (<Label key={idx} size='tiny' basic >{s.label}</Label>))}
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

class TableResults extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], 
                   pagination: false, 
                   pages:0, 
                   currentPage:0,
                   sortColumn:null,
                   sortDirection:null
                  };
    this.setPage = this.setPage.bind(this);
    this.sortTable = this.sortTable.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.data !== state.data || props.filters !== state.filters
    ) {
      const totalRows = props.data.length;
      const pagination = totalRows > maxRows;

      const quotient = Math.floor(totalRows/maxRows);
      const remainder = totalRows % maxRows;
      const pages = quotient + (remainder > 0 ? 1 : 0 );
      const currentPage = 0;
      return { dicts: props.dicts, data: props.data, pagination, pages, currentPage, filters: props.filters, processedData: tableData(props.data, props.filters) };
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

  render(){
    const {column, direction} = this.props;
    const {processedData, pagination, pages, currentPage} = this.state;
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

        <Dropdown placeholder='Sort Results by ... ' onChange={ (o, d) => { console.log('searching by:', d.value); this.sortTable(d.value)}} clearable options={options} selection />

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
