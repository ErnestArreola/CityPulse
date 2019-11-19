import React, { Component, Fragment } from 'react';
import { Line } from 'react-chartjs-2';
import { Row, Col } from 'antd';
import { Slider } from 'antd';
import { Divider } from 'antd';

import BarChartWrapper from './subcomponents/charts/bar-chart/chart-wrapper';
import ScatterPlotWrapper from './subcomponents/charts/scatterplot-chart/chart-wrapper';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct'],
      datasets: [
        {
          label: '',
          backgroundColor: 'rgba(46, 232, 53, 0.75)',
          data: [],
        },
        {
          label: '',
          backgroundColor: 'rgba(78, 190, 242, 0.75)',
          data: [],
        },
      ],
    },
    barChartData: [],
    scatterPlotData: [],
    currCharSet: "",
    activeName: null
  };

  bus = [
    {
      month: 1,
      reviewCount: 3,
      rating: '4.7',
    },
    {
      month: 2,
      reviewCount: 1,
      rating: '5.0',
    },
    {
      month: 3,
      reviewCount: 1,
      rating: '5.0',
    },
    {
      month: 4,
      reviewCount: 3,
      rating: '3.7',
    },
    {
      month: 5,
      reviewCount: 4,
      rating: '5.0',
    },
    {
      month: 6,
      reviewCount: 1,
      rating: '5.0',
    },
    {
      month: 7,
      reviewCount: 3,
      rating: '3.7',
    },
    {
      month: 8,
      reviewCount: 4,
      rating: '4.5',
    },
    {
      month: 9,
      reviewCount: 5,
      rating: '5.0',
    },
  ];

  topBus = [
    {
      month: 1,
      reviewCount: 3,
      rating: '4.3',
    },
    {
      month: 2,
      reviewCount: 4,
      rating: '4.8',
    },
    {
      month: 3,
      reviewCount: 3,
      rating: '5.0',
    },
    {
      month: 4,
      reviewCount: 4,
      rating: '4.0',
    },
    {
      month: 5,
      reviewCount: 11,
      rating: '3.9',
    },
    {
      month: 6,
      reviewCount: 6,
      rating: '4.2',
    },
    {
      month: 7,
      reviewCount: 5,
      rating: '3.6',
    },
    {
      month: 8,
      reviewCount: 4,
      rating: '3.8',
    },
    {
      month: 9,
      reviewCount: 4,
      rating: '3.0',
    },
    {
      month: 10,
      reviewCount: 2,
      rating: '4.5',
    },
  ];

  setBusinessData = () => {
    var thisBusData = [];
    var topBusData = [];
    var i;
    for (i = 0; i < 12; i++) {
      if (this.bus[i]) {
        thisBusData.push(this.bus[i].reviewCount);
      } else {
        thisBusData.push(0);
      }
      if (this.topBus[i]) {
        topBusData.push(this.topBus[i].reviewCount);
      } else {
        topBusData.push(0);
      }
    }

    var datas = [thisBusData, topBusData];
    var labels = ['This Business', 'Top Business'];

    this.state.data.datasets.forEach((set, i) => {
      set.data = datas[i];
      set.label = labels[i];
    });
  };

  setGradientColor = (canvas, color) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 350);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.9, 'rgba(207, 211, 212, 0.8)');
    return gradient;
  };

  getChartData = canvas => {
    const data = this.state.data;
    if (data.datasets) {
      let colors = ['rgba(29, 224, 49, 0.8)', 'rgba(10, 190, 242, 0.8)'];
      let borderColor = ['rgba(29, 224, 49, 0.7)', 'rgba(10, 190, 242, 0.7)'];
      data.datasets.forEach((set, i) => {
        set.backgroundColor = this.setGradientColor(canvas, colors[i]);
        set.borderColor = borderColor[i];
        set.borderWidth = 2;
      });
    }
    this.setBusinessData();
    return data;
  };

  componentDidMount() {
    //fetch data

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
      <div style={{ position: 'relative', width: 600, height: 500 }}>

        <Row gutter={[16, 16]}>
          <Col span={12}>
                <h3> Comparing to Top Business within One Mile Radius</h3>
                <h5>
                  Top business is the business that is rated 4 stars or higher with largest number of review
            </h5>{' '}
                <Line
                  options={{
                    responsive: true,
                  }}
                  data={this.getChartData}
                />
          </Col>

          <Col span={12}>

            {(this.state.scatterPlotData[0]) ?
            <ScatterPlotWrapper data={this.state.scatterPlotData} updateName={this.updateName}/>
            : <h3>Pending</h3>
          }
          </Col>

        </Row>
        <Row gutter={[16, 16]}>
        <Col span={12}>
          <h3>Month of January</h3>
          <img
            src="http://localhost:8000/media/images/image.png"
            alt="new"
            />
        </Col>
        <Col span={12}>
          {(this.state.scatterPlotData[0]) ?

              <BarChartWrapper data={this.state.barChartData} />

            : <h3>Pending</h3>
          }
        </Col>

        </Row>
      </div>
    );
  }
}
