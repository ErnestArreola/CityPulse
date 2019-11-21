import React, { Component } from 'react';
import D3Chart from './d3-chart';


export default class ChartWrapper extends Component {
    componentDidMount() {
        this.setState({
            chart: new D3Chart(this.refs.chart, this.props.data, this.props.updateName)
        })
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidUpdate(nextProps) {
         this.state.chart.update(nextProps.currCharSet)
         this.state.chart.update(nextProps.data)
     }


    render() {
        return <div className="chart-area" ref="chart"></div>
    }
}
