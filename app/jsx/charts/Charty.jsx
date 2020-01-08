import HighchartsReact from 'highcharts-react-official'
import React, {Component} from 'react'

class Charty extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        console.log('Charty', this.props.chartOpts);
        return (<HighchartsReact highcharts={this.props.Highcharts} options={this.props.chartOpts} />)
    }

}
export default Charty;
