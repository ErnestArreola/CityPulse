import React, { Component } from 'react';
import D3Chart from './d3-chart';

export default class ChartWrapper extends Component {
  componentDidMount() {
    this.setState({
      chart: new D3Chart(this.refs.chart, this.props.data),
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div ref="chart"></div>;
  }
}
