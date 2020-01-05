import HighchartsReact from 'highcharts-react-official'
import React, {Component} from 'react'

class Charty extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (<HighchartsReact highcharts={this.props.Highcharts} options={this.props.chartOpts} />)
    }

}
export default Charty;
