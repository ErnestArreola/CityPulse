import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';
import { Slider, Card } from 'antd';
import { Divider } from 'antd';
import CompareTopBusiness from '../../components/TopBusinessGraph/CompareTopBusiness';
import SentimentAnalysis from '../../components/SentimentAnalysisGraph/SentimentAnalysis';

import ScatterPlotWrapper from './subcomponents/charts/scatterplot-chart/chart-wrapper';
import BarChart from '../../components/BarChart/BarChart';

export default class App extends Component {

  
  constructor(props) {
    super(props);
  }

  state = {
    scatterPlotData: [],
    currCharSet: "",
    activeName: null
  };

  componentDidMount() {
    fetch(`http://localhost:8000/api/business/ZzcLWjY0UjPb4_DLAQDVbQ/get_rev_data/`, {
      method: 'GET',
    }).then(resp => resp.json())
      .then(res => this.setState({ barChartData: res.result }))
      .catch(error => console.log(error))

      fetch(`http://localhost:8000/api/business/ZzcLWjY0UjPb4_DLAQDVbQ/get_avg_data/`, {
        method: 'GET',
      }).then(resp => resp.json())
        .then(res => this.setState({ scatterPlotData: res.result }))
        .catch(error => console.log(error))
        console.log("infetch")
        console.log(this.state.scatterPlotData)
  }

  updateName = (activeName) => this.setState({activeName})

  render() {
    return (
      <div>
        <Row gutter={[16, 16]}>
          
        <h3> Comparing to Top Business within One Mile Radius</h3>
        <h5> Top business is the business that is rated 4 stars or higher with largest number of review </h5>{' '}
          <Card>
            <CompareTopBusiness/>
          </Card>
          <Card>
            <SentimentAnalysis/>
          </Card>
          
        </Row>
        <Row gutter={[16, 16]}>
        <Col span={12}>
          
        </Col>

        </Row>
      </div>
    );
  }
}
