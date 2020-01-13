import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import List from 'semantic-ui-react/dist/commonjs/elements/List/List';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';

const  intersection = (setA, setB) => {
  var _intersection = new Set();
  for (var elem of setB) {
      if (setA.has(elem)) {
          _intersection.add(elem);
      }
  }
  return _intersection;
};

function resultsIcon(col){
  return (<a><Icon name='bolt' />{col.length} docs</a>);
}

export function items (query, selections, results, thematicFocus, onChangeSelect, onYear, onCheck) {
  const geoItem = query.geoRegion && {
    header: `Geographical regions`,
    description: (<List >
                  {selections.geoRegions.map((o, idx) => 
                  (<List.Item  key={`geoReg-${idx}`} style={{paddingBottom:'2px'}}>
                    <Label as='a' color='blue'>{o.text || o.label} 
                    <Icon name='delete' onClick={() => onChangeSelect('geoRegion', {id:o.value})}/>
                    </Label>
                    </List.Item>))}
                  </List>),
    extra: <Popup trigger={resultsIcon(results.geoRegions)}
          content='Include all docs that match ANY of the selected regions'/>

  };
  const ecoItem = query.ecoRegion && {
    header: `Economical regions`,
    description: (<List >
      {selections.ecoRegions.map((o, idx) => 
      (<List.Item  key={`ecoReg-${idx}`} style={{paddingBottom:'2px'}}>
        <Label as='a' color='blue'>{o.text || o.label} 
        <Icon name='delete' onClick={() => onChangeSelect('ecoRegion', {id:o.value})}/>
        </Label>
        </List.Item>))}
      </List>),
    extra: <Popup trigger={resultsIcon(results.ecoRegions)}
          content='Include all docs that match ANY of the selected regions'/>

  };

  const countryItem = query.country && {
    header: `Countries`,
    description: (<List >
                  {selections.countries.map((o, idx) => 
                    (<List.Item key={`country-${idx}`} style={{paddingBottom:'2px'}}  >
                      <Label as='a' color='blue'>{o.text || o.label} 
                        <Icon name='delete' onClick={() => onChangeSelect('country', {id:o.value})}/>
                      </Label>
                    </List.Item>))}
                  </List>),
    extra: <Popup trigger={resultsIcon(results.countries)} 
            content='Include all docs that match ANY of the selected countries'/>
  };
  const sectorItem = query.sectors && {
    header: `Sectors`,
    description: (<List >{selections.sectors.map((o, idx) => 
      (<List.Item key={`sector-${idx}`} style={{paddingBottom:'2px'}} >
      <Label as='a' color='blue'>{o.text || o.label} 
        <Icon name='delete' onClick={() => onChangeSelect('sectors', {id:o.value})}/>
      </Label>
    </List.Item>))}
      </List>),
    extra: <Popup trigger={resultsIcon(results.sectors)}
      content='Include all docs that match ANY of the selected sectors'/>

  };
  const typeItem = query.type && {
    header: `Types`,
    description: (<List >{selections.types.map((o, idx) => 
      (<List.Item key={`type-${idx}`} style={{paddingBottom:'2px'}}   >
      <Label as='a' color='blue'>{o.text || o.label} 
        <Icon name='delete' onClick={() => onChangeSelect('type', {id:o.value})}/>
      </Label>
    </List.Item>))}
      </List>),
    extra: <Popup trigger={resultsIcon(results.types)}
          content='Include all docs that match ANY of the selected types'/>

  };
  const activeYearItem = query.active_year && {
    header: `Active year`,
    description: 
    <Label as='a' color='blue'  style={{marginTop:'5px'}}>{selections.active_year} 
    <Icon name='delete' onClick={() => onYear('active_year', null)}/>
    </Label>,
    extra: <Popup trigger={resultsIcon(results.active_year)}
          content='Include all docs were actived on the selected year'/>

  };
//  'approval_year', 'active_year'
  const approvalYearItem = query.approval_year && {
    header: `Approval year`,
    description: 
    <Label as='a' color='blue'  style={{marginTop:'5px'}}>{selections.approval_year} 
    <Icon name='delete' onClick={() => onYear('approval_year', null)}/>
    </Label>,
    extra: <Popup trigger={resultsIcon(results.approval_year)}
        content='Include all docs were approved on the selected year'/>


  };
  const qks= new Set(Object.keys(query));
  const them = new Set(thematicFocus.map(o => o.kw));
  const themIntersection = intersection(qks, them);
  const themIntersectionA = Array.from(themIntersection);
  const thematicFocusItem = themIntersection.size > 0 && {
    header: `Thematics Focus:`,
    description: (<List >{themIntersectionA.map((o, idx) => 
                    {
                      const it = thematicFocus.find(x => x.kw === o);
                      return (<List.Item key={`tm-${idx}`} style={{paddingBottom:'2px'}}  >
                      <Label as='a' color='blue'>{it.name}
                        <Icon name='delete' onClick={() => onCheck(it.kw, false)}/>
                      </Label>                    
                    </List.Item>);
                    }
                   )}</List>),
    extra:  <Popup trigger={resultsIcon(results.thematicFocus)}
    content='Include all docs that match ALL of the following focuses'/>

  };
 return [
    geoItem,
    ecoItem,
    countryItem,
    sectorItem,
    typeItem,
    activeYearItem,
    approvalYearItem,
    thematicFocusItem
  ].filter( o => o !== false && o !== undefined);
}
  