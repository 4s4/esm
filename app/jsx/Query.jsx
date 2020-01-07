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



export function items (query, selections, results, thematicFocus) {
  const geoItem = query.geoRegion && {
    header: `Geographical regions`,
    description: (<List as='ul'>{selections.geoRegions.map((o, idx) => (<List.Item  key={`geoReg-${idx}`} as='li'>{o.text || o.label}</List.Item>))}</List>),
    extra: (<a><Icon name='user' />Results: {results.geoRegions.length}</a>)
  };
  const ecoItem = query.ecoRegion && {
    header: `Economical regions`,
    description: (<List as='ul'>{selections.ecoRegions.map((o, idx) => (<List.Item  key={`ecoReg-${idx}`} as='li'>{o.text || o.label}</List.Item>))}</List>),
    extra: (<a><Icon name='user' />Results: {results.ecoRegions.length}</a>)
  };
  const countryItem = query.country && {
    header: `Countries`,
    description: (<List as='ul'>{selections.countries.map((o, idx) => (<List.Item key={`country-${idx}`}  as='li'>{o.text || o.label}</List.Item>))}</List>),
    extra: (<a><Icon name='user' />Results: {results.countries.length}</a>)
  };
  const sectorItem = query.sectors && {
    header: `Sectors`,
    description: (<List as='ul'>{selections.sectors.map((o, idx) => (<List.Item key={`sector-${idx}`}  as='li'>{o.text || o.label}</List.Item>))}</List>),
    extra: (<a><Icon name='user' />Results: {results.sectors.length}</a>)
  };
  const typeItem = query.type && {
    header: `Types`,
    description: (<List as='ul'>{selections.types.map((o, idx) => (<List.Item key={`type-${idx}`}  as='li'>{o.text || o.label}</List.Item>))}</List>),
    extra: (<a><Icon name='user' />Results: {results.types.length}</a>)
  };
  const activeYearItem = query.active_year && {
    header: `Active year`,
    description: selections.active_year,
    extra: (<a><Icon name='user' />Results: {results.active_year.length}</a>)
  };
  const approvalYearItem = query.approval_year && {
    header: `Approval year`,
    description: selections.approval_year,
    extra: (<a><Icon name='user' />Results: {results.approval_year.length}</a>)
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
  