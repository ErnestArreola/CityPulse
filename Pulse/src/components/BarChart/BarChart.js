import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';
import { Spin } from 'antd';

import BarChartWrapper from '../BarChart/subcomponents/charts/bar-chart/chart-wrapper';

export default class App extends Component {

    constructor(props) {
      super(props);
    }

    state = {
        barChartData: [],
        activeName: null

      };

    componentDidMount() {
        fetch(`http://localhost:8000/api/business/ZzcLWjY0UjPb4_DLAQDVbQ/get_rev_data/`, {
          method: 'GET',
        }).then(resp => resp.json())
          .then(res => this.setState({ barChartData: res.result }))
          .catch(error => console.log(error))
    }

    updateName = (activeName) => this.setState({activeName})


    render() {
    return (
        <div>
                        {(this.state.barChartData.length !== 0) ?
                    <BarChartWrapper data={this.state.barChartData} />
                    : <Spin />
                }
        </div>
    );
    }
}
