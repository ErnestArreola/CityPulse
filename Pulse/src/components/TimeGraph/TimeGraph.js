import React, { Component, Fragment } from 'react';
import { Row, Col, Spin, Slider } from 'antd';

import TimeChartWrapper from './subcomponents/charts/time-graph/chart-wrapper';
import BrushGraphWrapper from './subcomponents/charts/brush-graph/chart-wrapper';

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
            <Slider
              range={true}
              max={new Date("12/10/2017").getTime()}
              min={new Date("12/5/2013").getTime()}
              style={{width: 500, paddingLeft: 50}}
              step={86400000}  // one day
              defaultValue={[new Date("12/5/2013").getTime(), new Date("12/10/2017").getTime()]}
              onChange={console.log("inOnCHnageforSlider")}>
            </Slider>
            {(this.state.barChartData.length !== 0) ?
              <div>
                <TimeChartWrapper data={this.state.barChartData} />
                <BrushGraphWrapper data={this.state.barChartData} />
              </div>
                : <Spin />
            }
          </div>
      );
    }
}
