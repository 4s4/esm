import React, {Component} from 'react'
import HighchartsReact from 'highcharts-react-official'
const addSunburst = require('highcharts/modules/sunburst');


class SunCharty extends Component {
    constructor(props) {
        super(props);
    }
    
      render (){
        addSunburst(this.props.Highcharts);        
        
            return (<HighchartsReact highcharts={this.props.Highcharts} options={this.props.chartOpts} />)
          }
}
export default SunCharty;
