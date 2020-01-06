import { Label, Rail, List, Dropdown, Header, Icon, Image, Card, Menu, Segment, Sidebar, Accordion, Table, Container, Statistic, Divider } from 'semantic-ui-react'

export function items (query, selections, results) {
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
  const thematicFocusItem = visible && {
    header: 'Thematic Focus',
    description:
      'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    meta: 'ROI: 27%',
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
  