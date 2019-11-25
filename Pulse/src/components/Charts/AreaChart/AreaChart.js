import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';
import { Spin } from 'antd';

import AreaChart from './subcomponents/charts/area-chart/chart-wrapper';

export default class App extends Component {

    constructor(props) {
      super(props);
    }

    state = {
        barChartData: [],
        activeName: null
      };

    componentDidMount() {
        fetch(`http://localhost:8000/api/business/ZKPoAZPCmmx_FGLpPHjmMw/get_rev_data/`, {
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
                <AreaChart data={this.state.barChartData} />
                : <Spin />
            }
          </div>
      );
    }
}
