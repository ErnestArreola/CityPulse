import React, { Component } from 'react';
import D3Chart from './d3-chart';

export default class ChartWrapper extends Component {

  componentDidMount() {
        this.props.data.sort((a, b) => {

          var now = new Date(a.date);
          var start = new Date(now.getFullYear(), 0, 0);
          var diff = now - start;
          var oneDay = 1000 * 60 * 60 * 24;
          var day = Math.floor(diff / oneDay);
          var target = (now.getYear()-100)  + day;

          var now0 = new Date(b.date);
          var start0 = new Date(now.getFullYear(), 0, 0);
          var diff0 = now0 - start0;
          var oneDay0 = 1000 * 60 * 60 * 24;
          var day0 = Math.floor(diff0 / oneDay);

          var target0 = (now.getYear()-100)  + day0;
            return target - target0
        })

        this.props.data.forEach(d => {
          d.date = new Date(d.date)
          d.rating = d.rating
        })
    this.setState({
      chart: new D3Chart(this.refs.chart, this.props.data, this.props.brushed, this.props.brushMinMax),
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
       this.state.chart.update(nextProps.data)
   }

  render() {
    return <div ref="chart"></div>;
  }
}
