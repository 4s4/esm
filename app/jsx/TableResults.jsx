import { Label, Rail, List, Dropdown, Header, Icon, Image, Card, Menu, Segment, Sidebar, Accordion, Table, Container, Statistic, Divider } from 'semantic-ui-react'

const rightOption = (  
       
  <List>
  <List.Item>
        <List horizontal link>
          <List.Item><Label color='blue' basic as='b'>Oceania:<Label.Detail >Thailand(THA)</Label.Detail></Label></List.Item>
        </List>
      </List.Item>
  
      <List.Item>
        <List horizontal link>
          <List.Item><Label basic color='blue' as='b'>Year:<Label.Detail >2014</Label.Detail></Label></List.Item>
        </List>
      </List.Item>
      <List.Item>
        <List horizontal link>
        <List.Item><Label basic color='blue' as='b'>Period:<Label.Detail >2016-2020</Label.Detail></Label></List.Item>
        </List>
      </List.Item>
      <List.Item>
        <List horizontal link>
          <List.Item><Label color='blue' as='b'>Type:<Label.Detail >Terms and Conditions</Label.Detail></Label></List.Item>
        </List>
      </List.Item>
    </List>
  );
  export const centerOption = (  
      <List>
          <List.Item>
            <List.Header>
            <Header as='h3' dividing>
            UNPAF Thailand 2012-2016
            </Header>
            </List.Header>
            The ADB presents the business plan for 2015-2017 with the country partnership strategy, updated country partnership strategy results framework and summary of changes to lending and nonlending programs in the country.
  
          </List.Item>
          <List.Item>
            <List.Header>Sectors:</List.Header>
            <List horizontal link>
              <List.Item><Label basic color='blue'>Terms and Conditions</Label></List.Item>
              <List.Item><Label basic color='blue'>Privacy Policy</Label></List.Item>
              <List.Item><Label basic color='blue'>Contact Us</Label></List.Item>
            </List>
          </List.Item>
        </List>
      );
    
  export const tableData = [
    { id:1,  co: centerOption, ro: rightOption },
    { id:2,  co: centerOption, ro: rightOption },
    { id:3, co: centerOption, ro: rightOption },
    { id:4, co: centerOption, ro: rightOption },
  ]
  