import HighchartsReact from 'highcharts-react-official'
import React, {Component} from 'react'
import logLevel from 'loglevel';
var log = logLevel.getLogger("Charty");
log.setLevel("WARN");

class Charty extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        log.debug('Charty', this.props.chartOpts);
        return (<HighchartsReact highcharts={this.props.Highcharts} options={this.props.chartOpts} />)
    }

}
export default Charty;
