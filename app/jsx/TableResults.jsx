import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import List from 'semantic-ui-react/dist/commonjs/elements/List/List';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import Item from 'semantic-ui-react/dist/commonjs/views/Item/Item';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';

function rightOption (d, filters) {
  const type = filters.types.find( o => o.value === d.type);
  return (  
       
  <List>
  <List.Item><Label basic color='blue' as='b'>Type:<Label.Detail >{type.label}</Label.Detail></Label></List.Item>
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
export function centerOption(d, filters){ 
  const sectors = d.sectors.map(s => filters.sectors.find( o => o.value === s));
  const country = filters.countries.find( o => o.value === d.country);
  const region = filters.regions.find( o => o.value === d.region);

  return (
    <Item.Group>
    <Item>
    <Item.Content>
      <Item.Header >
      <Header as='h3' color='blue' ><a href={`./document/${d.id}/${toUrl(d.title)}`}> {d.title} </a></Header>
      <Popup key={d.value} inverted content={`Region: ${region.label}`} trigger={<Label as='b' color='blue' tag>{country.label} ({country.code})</Label>} />
      </Item.Header>
      <Item.Meta>{d.description}</Item.Meta>
      <Item.Extra>
      {sectors && sectors.length > 0 && <Header as='h5'>Sectors</Header>}
      {sectors.map((s, idx) => (<Label key={idx} size='tiny' basic >{s.label}</Label>))}
      </Item.Extra>
    </Item.Content>
  </Item> 
  </Item.Group> 
    
    );
  }
  


  export function leftOption(d, filters){ 
    const region = filters.regions.find( o => o.value === d.region);
    const dict = {"Africa": "Africa", "America": "Americas", "Asia": "Asia", "Europe": "Europe", "Oceania": "Southeast_Asia"};
    return (      
    <Popup key={d.value} inverted content={`Region: ${region.label}`} trigger={ <Image size='tiny' src={`../img/maps/${dict[region.label]}.png`} />} />      
      );
    }
    
  export function tableData (dd, filters) {
    return dd.map( d => ({ id:d.id,  le: leftOption(d, filters), co: centerOption(d, filters), ro: rightOption(d, filters) })
    );
  } 
  