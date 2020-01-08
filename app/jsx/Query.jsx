import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import List from 'semantic-ui-react/dist/commonjs/elements/List/List';

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

export function items (query, selections, results, thematicFocus) {
  const geoItem = query.geoRegion && {
    header: `Geographical regions`,
    description: (<List as='ul'>{selections.geoRegions.map((o, idx) => (<List.Item  key={`geoReg-${idx}`} as='li'>{o.text || o.label}</List.Item>))}</List>),
    extra: resultsIcon(results.geoRegions)
  };
  const ecoItem = query.ecoRegion && {
    header: `Economical regions`,
    description: (<List as='ul'>{selections.ecoRegions.map((o, idx) => (<List.Item  key={`ecoReg-${idx}`} as='li'>{o.text || o.label}</List.Item>))}</List>),
    extra: resultsIcon(results.ecoRegions)
  };
  const countryItem = query.country && selections.countries.length > 0 && {
    header: `Countries`,
    description: (<List as='ul'>{selections.countries.map((o, idx) => (<List.Item key={`country-${idx}`}  as='li'>{o.text || o.label}</List.Item>))}</List>),
    extra: resultsIcon(results.countries)
  };
  const sectorItem = query.sectors && {
    header: `Sectors`,
    description: (<List as='ul'>{selections.sectors.map((o, idx) => (<List.Item key={`sector-${idx}`}  as='li'>{o.text || o.label}</List.Item>))}</List>),
    extra: resultsIcon(results.sectors)
  };
  const typeItem = query.type && {
    header: `Types`,
    description: (<List as='ul'>{selections.types.map((o, idx) => (<List.Item key={`type-${idx}`}  as='li'>{o.text || o.label}</List.Item>))}</List>),
    extra: resultsIcon(results.types)
  };
  const activeYearItem = query.active_year && {
    header: `Active year`,
    description: selections.active_year,
    extra: resultsIcon(results.active_year) 
  };
  const approvalYearItem = query.approval_year && {
    header: `Approval year`,
    description: selections.approval_year,
    extra: resultsIcon(results.approval_year) 
  };
  const qks= new Set(Object.keys(query));
  const them = new Set(thematicFocus.map(o => o.kw));
  const themIntersection = intersection(qks, them);
  const themIntersectionA = Array.from(themIntersection);
  const thematicFocusItem = themIntersection.size > 0 && {
    header: `Thematics Focus: ${themIntersection.size}`,
    description: themIntersectionA.map(o => thematicFocus.find(x => x.kw === o).name).join(',')
//    extra: (<a><Icon name='user' />Results: {results.types.length}</a>)
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
  