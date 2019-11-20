import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';

import BarChartWrapper from '../BarChart/subcomponents/charts/bar-chart/chart-wrapper';

export default class App extends Component {

    constructor(props) {
      super(props);
    }

    state = {
        barChartData: [],
      };

    componentDidMount() {
        fetch(`http://localhost:8000/api/business/ZzcLWjY0UjPb4_DLAQDVbQ/get_rev_data/`, {
          method: 'GET',
        }).then(resp => resp.json())
          .then(res => this.setState({ barChartData: res.result }))
          .catch(error => console.log(error))
    }

    render() {
    return (
        <div>        
          <h3>Month of January</h3>
        <BarChartWrapper data={this.state.barChartData} />
        </div>
    );
    }
}
