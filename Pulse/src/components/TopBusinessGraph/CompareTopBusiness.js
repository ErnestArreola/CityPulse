import React, { Component, Fragment } from 'react';

import { Line } from 'react-chartjs-2';

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
    options: {
        scales: {
            xAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'Months'
                    }
                }
            ],
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'Review Count'
                    }
                }
            ],
        }
    },

    apiFinished: false

  };


  bus = [];
  topBus = [];


  componentDidMount() {
    this.retrieveInfo("Sb0OMCB8_qn1EJ57Ra3jQQ");
    // this.retrieveInfo("IZG-gNsnhTTk_Npgh9OFxQ");
  }


  retrieveInfo(businessID) {
    let yelpID = businessID;

    let topBusAPI = "http://localhost:8000/api/topbusinessinonemileradius/?yelpid=" + yelpID;
    let thisBusReviewAPI = "http://localhost:8000/api/yelpmonthlyreviewsummary/?yelpid=" + yelpID;

    jQuery
    .get(thisBusReviewAPI)
    .then(response => {
      // handle success
      this.bus = response;
      console.log(">>>>>> this biz" + response);
      
      //get top business info
      jQuery
      .get(topBusAPI)
      .then(response => {
        // handle success
        if(response[0].businessID != yelpID){  //this business itself is the top within one mile radius
          let topBusReviewAPI = "http://localhost:8000/api/yelpmonthlyreviewsummary/?yelpid=" + response[0].businessID;
          console.log(">>>>>> res " + response);
          console.log(">>>>>>>>>> " + topBusReviewAPI);
          jQuery
            .get(topBusReviewAPI)
            .then(response => {
              // handle success
              this.topBus = response;
              console.log(">>>>>>topBus review res " + response);
              console.log("##### this topBus " + this.topBus);
              this.setBusinessData();
            })
            .then( () => {
              // always executed
            })
            .catch(function(error) {
              // handle error
              console.log("Error Top Business Review Summary API");
              console.log(error);
            });
        }
        else{
          this.setBusinessData();
        }
      })
      .catch(function(error) {
        // handle error
        console.log("Error Top Business in One Mile Radius API");
        console.log(error);
      })
      .then(() => {
        // always executed
      });  
    })
    .then(() => {
      // always executed
      
    })
    .catch(function(error) {
      // handle error
      console.log("Error This Business Review Summary API");
      console.log(error);
    });
   
  }

    
  setBusinessData = () => {
    console.log("hello");
    console.log(this.bus);
    console.log(this.topBus);
    var thisBusData = [];
    var topBusData = [];

    var cur = 0;
    for (var i = 0; i < 10; i++) {
      if (this.bus[cur]) {
        if(this.bus[cur].month != i+1){
          thisBusData.push(0);
        }
        else{
          thisBusData.push(this.bus[cur].reviewCount); 
          cur++;
        }
      } else {
        thisBusData.push(0);
      }
    }

    cur = 0;
    for (var i = 0; i < 10; i++) {
      if (this.topBus[cur]) {
        if(this.topBus[cur].month != i+1){
          topBusData.push(0);
        }
        else{
          topBusData.push(this.topBus[cur].reviewCount); 
          cur++;
        }
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

    this.setState({
      apiFinished: true
    })
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
    console.log("@@@@@ in getChartData: " + JSON.stringify(data));
    return data;
  };



  render() {
    if(!this.state.apiFinished){
      return <div></div>
    }
    return (
      <div style={{ position: 'relative', width: 600, height: 500 }}>
        <Line
          data = {this.getChartData}
          options = {this.state.options}
        />
      </div>
    );
  }
}