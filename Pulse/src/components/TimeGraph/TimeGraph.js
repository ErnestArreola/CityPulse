import React, { Component, Fragment } from 'react';
import { Row, Col, Spin, Card, Modal, notification} from 'antd';

import TimeChartWrapper from './subcomponents/charts/time-graph/chart-wrapper';
import BrushGraphWrapper from './subcomponents/charts/brush-graph/chart-wrapper';
import PieChartWrapper from './subcomponents/charts/pie-chart/chart-wrapper';
import ScatterPlotWrapper from '../../components/ScatterPlot/subcomponents/charts/scatterplot-chart/chart-wrapper';
import Table from '../../components/Table';
import BarChart from '../../components/BarChart/BarChart';
import WordCloud from '../WordCloud/word-cloud';

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default class App extends Component {

    constructor(props) {
      super(props);
    }

    state = {
        barChartData: [],
        scatterPlotData: {
          months: [],
          data: ["10-20-2019"]
        },
        currCharSet: "one",
        activeName: null,
        visible: false,
        brushed: false,
        brushMinMax: {}
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

    handleChange = (event) => {
        this.setState({ [event.target.name]: this.props.data.data[parseInt(event.target.name)] })
    }

    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };

    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };

    updateModalShow = () => {
      this.setState({visible: true});
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

    updateBrushed = (set) => {
          this.setState({ barChartData: set })
    }

    render() {
      return (
          <div>
            {(this.state.barChartData.length !== 0) ?
              <div>
              <Card >
                  <Row gutter={[8, 16]}>
                    <Col span={12}>
                    {(this.state.scatterPlotData.data.length !== 0) ?
                        <Card>
                                <TimeChartWrapper data={this.state.barChartData} brushed={this.state.brushed} brushMinMax={this.state.brushMinMax}/>
                                <BrushGraphWrapper data={this.state.barChartData} updateBrushed={this.updateBrushed}/>
                                <Modal
                                   title="Basic Modal"
                                   visible={this.state.visible}
                                   onOk={this.handleOk}
                                   onCancel={this.handleCancel}
                                >
                                <p>Some contents...</p>
                                <WordCloud index={(this.state.activeName)-1}/>
                               </Modal>
                        </Card>
                        : <Spin />
                        }
                    </Col>
                    <Col span={12}>
                        <Card>
                          <Row gutter={[8, 16]}>
                            <Col span={12}>
                                {(this.state.scatterPlotData.data.length !== 0) ?
                                <ScatterPlotWrapper brushed={this.state.brushed} currCharSet={this.state.currCharSet} data={this.state.scatterPlotData} updateName={this.updateName} updateModalShow={this.updateModalShow}/>
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
