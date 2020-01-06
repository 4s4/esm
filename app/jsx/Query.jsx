import { Label, Rail, List, Dropdown, Header, Icon, Image, Card, Menu, Segment, Sidebar, Accordion, Table, Container, Statistic, Divider } from 'semantic-ui-react'

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
  const visible = false;
  const geoItem = query.geoRegion && {
    header: `Geographical regions: ${selections.geoRegions.length}`,
    description: selections.geoRegions.map(o => o.text).join(','),
    extra: (<a><Icon name='user' />Results: {results.geoRegions.length}</a>)
  };
  const ecoItem = query.ecoRegion && {
    header: `Economical regions: ${selections.ecoRegions.length}`,
    description: selections.ecoRegions.map(o => o.text).join(','),
    extra: (<a><Icon name='user' />Results: {results.ecoRegions.length}</a>)
  };
  const countryItem = query.country && {
    header: `Countries selected: ${selections.countries.length}`,
    description: selections.countries.map(o => o.text).join(','),
    extra: (<a><Icon name='user' />Results: {results.countries.length}</a>)
  };
  const sectorItem = query.sectors && {
    header: `Sectors selected: ${selections.sectors.length}`,
    description: selections.sectors.map(o => o.text).join(','),
    extra: (<a><Icon name='user' />Results: {results.sectors.length}</a>)
  };
  const typeItem = query.type && {
    header: `Types selected: ${selections.types.length}`,
    description: selections.types.map(o => o.text).join(','),
    extra: (<a><Icon name='user' />Results: {results.types.length}</a>)
  };
  const activeYearItem = visible && {
    header: 'Active year',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    meta: 'ROI: 34%',
  };
  const approvalYearItem = visible && {
    header: 'Approval year',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    meta: 'ROI: 34%',
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
  