import React, { Component, Fragment } from 'react';
import { Row, Col, Spin, Slider, Card } from 'antd';
import { notification } from 'antd';
import TimeChartWrapper from './subcomponents/charts/time-graph/chart-wrapper';
import BrushGraphWrapper from './subcomponents/charts/brush-graph/chart-wrapper';
import PieChartWrapper from './subcomponents/charts/pie-chart/chart-wrapper';
import ScatterPlotWrapper from '../../components/ScatterPlot/subcomponents/charts/scatterplot-chart/chart-wrapper';
import Table from '../../components/Table';
import BarChart from '../../components/BarChart/BarChart';

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default class App extends Component {

    constructor(props) {
      super(props);
    }

    state = {
        barChartData: [],
        scatterPlotData: {
          months: [],
          data: []
        },
        currCharSet: "one",
        activeName: null
      };

    componentDidMount() {
        fetch(`http://localhost:8000/api/business/ZKPoAZPCmmx_FGLpPHjmMw/get_rev_data/`, {
          method: 'GET',
        }).then(resp => resp.json())
          .then(res => this.setState({ barChartData: res.result }))
          .catch(error => console.log(error))

          fetch(`http://localhost:8000/api/business/ZzcLWjY0UjPb4_DLAQDVbQ/get_avg_data/`, {
            method: 'GET',
          }).then(resp => resp.json())
            .then(res => this.setState({ scatterPlotData: {
              months: months,
              data: res.result
            }}))
            .catch(error => console.log(error))
    }

    updateName = (activeName) => {
      notification.open({
        message: 'Data Available',
        description:
          'Word Cloud Data available for this month!',
        onClick: () => {
            console.log('Notification Clicked!');
        },
      });
      this.setState({activeName})
    }

    updateData = (graphsData) => {
            this.setState({ scatterPlotData: graphsData })
    }


    render() {
      return (
          <div>

            {(this.state.barChartData.length !== 0) ?
              <div>
              <Card >
                  <Row gutter={[8, 16]}>
                    <Col span={12}>
                        <Card>
                                <Slider
                                    range={true}
                                    max={new Date("12/10/2017").getTime()}
                                    min={new Date("12/5/2013").getTime()}
                                    style={{ paddingLeft: 50}}
                                    step={86400000}  // one day
                                    defaultValue={[new Date("12/5/2013").getTime(), new Date("12/10/2017").getTime()]}
                                    onChange={console.log("inOnCHnageforSlider")}>
                                </Slider>
                                <TimeChartWrapper data={this.state.barChartData} />
                                <BrushGraphWrapper data={this.state.barChartData} />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                          <Row gutter={[8, 16]}>
                            <Col span={12}>
                                {(this.state.scatterPlotData.data.length !== 0) ?
                                <ScatterPlotWrapper currCharSet={this.state.currCharSet} data={this.state.scatterPlotData} updateName={this.updateName}/>
                                : <Spin />
                                }
                            </Col>
                            <Col span={12}>
                                <BarChart/>
                            </Col>
                          </Row>
                          <Row gutter={[8, 16]}>
                          <Col> {(this.state.scatterPlotData.data.length !== 0) ?
                                <Table data={this.state.scatterPlotData} updateData={this.updateData} activeName={this.state.activeName} />
                                : <Spin />
                                }
                          </Col>
                          </Row>
                        </Card>
                     </Col>
                  </Row>
              </Card>
              </div>
                : <Spin />
            }
          </div>
      );
    }
}
