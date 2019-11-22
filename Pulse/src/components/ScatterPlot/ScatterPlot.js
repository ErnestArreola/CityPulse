import React, { Component, Fragment } from 'react';
import ScatterPlotWrapper from '../../components/ScatterPlot/subcomponents/charts/scatterplot-chart/chart-wrapper';
import Table from '../../components/Table';
import { Row, Col } from 'antd';



const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]


export default class ScatterPlot extends Component {


    constructor(props) {
      super(props);
    }
  
    state = {
      scatterPlotData: {
        months: [],
        data: []
      },
      currCharSet: "one",
      activeName: null
    };
  
    componentDidMount() {
        fetch(`http://localhost:8000/api/business/ZzcLWjY0UjPb4_DLAQDVbQ/get_avg_data/`, {
          method: 'GET',
        }).then(resp => resp.json())
          .then(res => this.setState({ scatterPlotData: {
            months: months,
            data: res.result
          }}))
          .catch(error => console.log(error))
    }
  
    updateData = (graphsData) => {
            this.setState({ scatterPlotData: graphsData })
        }
  
    updateName = (activeName) => this.setState({activeName})
  
    render() {
      console.log("in main app ")
      console.log(this.state.scatterPlotData)
      return (
        <div>
        <Row gutter={[32, 16]}>
                  <Col span={12}>
                    {(this.state.scatterPlotData.data.length !== 0) ?
                    <ScatterPlotWrapper currCharSet={this.state.currCharSet} data={this.state.scatterPlotData} updateName={this.updateName}/>
                    : <h3>Pending</h3>
                    }
                    </Col>
                    <Col span={12}>
                          {(this.state.scatterPlotData.data.length !== 0) ?
                              <Table data={this.state.scatterPlotData} updateData={this.updateData} activeName={this.state.activeName} />
                              : <h3>Pending</h3>
                          }
                    </Col>
            </Row>
        </div>
      );
    }
  }
  