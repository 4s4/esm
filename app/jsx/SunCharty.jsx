import Highcharts from 'highcharts/highmaps'
const addSunburst = require('highcharts/modules/sunburst');
import HighchartsReact from 'highcharts-react-official'
import React, {Component} from 'react'


class SunCharty extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        addSunburst(Highcharts)        
      }
    
      render (){
        addSunburst(Highcharts)        

            return (<HighchartsReact highcharts={Highcharts} options={this.props.chartOpts} />)
          }
}
export default SunCharty;
