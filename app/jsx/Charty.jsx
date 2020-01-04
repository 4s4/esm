import Highcharts from 'highcharts/highmaps'
import HighchartsReact from 'highcharts-react-official'
import React, {Component} from 'react'

class Charty extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (<HighchartsReact highcharts={Highcharts} options={this.props.chartOpts} />)
    }

}
export default Charty;
