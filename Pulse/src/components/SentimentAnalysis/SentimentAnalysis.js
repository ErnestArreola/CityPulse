import React, { Component } from "react";
import { Bar } from 'react-chartjs-2';
import ReactWordcloud from 'react-wordcloud';
import {Card, Col, Row} from 'antd';
import PageHeaderWrapper from "@/components/PageHeaderWrapper";


const resizeStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
};

export default class SentimentAnalysis extends Component {

  constructor(props){
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
        }
      ],
    },
    options: {
        scales: {
            xAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'Months',
                        fontSize: 26,
                        fontStyle: 'bold'
                    },
                    ticks: {
                      fontSize: 20
                    }
                }
            ],
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'Sentiment Analysis Score',
                        fontSize: 26,
                        fontStyle: 'bold'
                    },
                    ticks: {
                      fontSize: 20
                    }
                }
            ],
        },
        legend: {
            display: false
        },
        tooltips: {
          titleFontSize: 20,
          bodyFontSize: 20
        }
    },
    reviewArray: [],
    reviewString: '',
    apiFinished: false,
    wordObjArr: [
        {
        text: 'thought',
        value: 16,
        },
        {
        text: 'bad',
        value: 17,
        },
        {
        text: 'correct',
        value: 10,
        }
    ]
  };


  componentDidMount(){
    // this.retrieveInfo("3_Em74Ug0q-lpIFFnime5g");
    // this.retrieveInfo("qXfYflEmDKlYQGaPbVxqDA");
    // this.retrieveInfo("TS4ApwnNRVmKPbgOudNxAw");
    // alert(this.props.businessID);

    this.retrieveInfo(this.props.businessID);
  }


  retrieveInfo(businessID){
    let yelpID = businessID;
    let busReviewAPI = "http://localhost:8000/api/yelpreview/?yelpid=" + yelpID;

    jQuery
    .get(busReviewAPI)
    .then(response => {
      // handle success
        
      var reviewStrArr = [[],[],[],[],[],[],[],[],[],[]];
      var date;
        
      for (var i = 0; i < response.length; i++) {
          date = new Date(response[i].date);
        //   console.log('$$$$$$$$$ temp date: ' + this.temp[i].date);
        //   console.log('$$$$$$$$$ month: ' + date.getMonth());
          // reviewStrArr[date.getMonth()].concat(this.temp[i].review);
          if(reviewStrArr[date.getMonth()]) {
          reviewStrArr[date.getMonth()].push(response[i].review);
          }
      }
        // console.log(">>>>>>Sentiment review string array month 0:   " + reviewStrArr[0]);
        // console.log(">>>>>>Sentiment review string array month 1:   " + reviewStrArr[1]);
        // console.log(">>>>>>Sentiment review string array month 2:   " + reviewStrArr[2]);
        // console.log(">>>>>>Sentiment review string array month 3:   " + reviewStrArr[3]);
        // console.log(">>>>>>Sentiment review string array month 4:   " + reviewStrArr[4]);
        // console.log(">>>>>>Sentiment review string array month 5:   " + reviewStrArr[5]);
        // console.log(">>>>>>Sentiment review string array month 6:   " + reviewStrArr[6]);
        // console.log(">>>>>>Sentiment review string array month 7:   " + reviewStrArr[7]);
        // console.log(">>>>>>Sentiment review string array month 8:   " + reviewStrArr[8]);
        // console.log(">>>>>>Sentiment review string array month 9:   " + reviewStrArr[9]);
        
        var totalReview = reviewStrArr.join();
        var words = this.getWords(totalReview);
        this.revStrArr = reviewStrArr;
        this.setState({
            reviewArray: reviewStrArr,
            reviewString: totalReview,
            wordObjArr: words,
            apiFinished: true
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


  setScoreData = (scoreData) => {
    this.state.data.datasets[0].data = scoreData;
    this.state.data.datasets[0].label = "Sentiment Analysis Score";
  }


  setGradientColor = (canvas, color) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 420);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.9, 'rgba(207, 211, 212, 0.8)');
    return gradient;
  };


  getChartData = canvas => {
    const data = this.state.data;

    if (data.datasets) {
        data.datasets[0].borderWidth = 0.5;
    
        data.datasets[0].borderColor = [
            this.getBarColor(data.datasets[0].data[0]),
            this.getBarColor(data.datasets[0].data[1]),
            this.getBarColor(data.datasets[0].data[2]),
            this.getBarColor(data.datasets[0].data[3]),
            this.getBarColor(data.datasets[0].data[4]),
            this.getBarColor(data.datasets[0].data[5]),
            this.getBarColor(data.datasets[0].data[6]),
            this.getBarColor(data.datasets[0].data[7]),
            this.getBarColor(data.datasets[0].data[8]),
            this.getBarColor(data.datasets[0].data[9])
        ];
        data.datasets[0].backgroundColor = [
            this.setGradientColor(canvas, this.getBarColor(data.datasets[0].data[0])),
            this.setGradientColor(canvas, this.getBarColor(data.datasets[0].data[1])),
            this.setGradientColor(canvas, this.getBarColor(data.datasets[0].data[2])),
            this.setGradientColor(canvas, this.getBarColor(data.datasets[0].data[3])),
            this.setGradientColor(canvas, this.getBarColor(data.datasets[0].data[4])),
            this.setGradientColor(canvas, this.getBarColor(data.datasets[0].data[5])),
            this.setGradientColor(canvas, this.getBarColor(data.datasets[0].data[6])),
            this.setGradientColor(canvas, this.getBarColor(data.datasets[0].data[7])),
            this.setGradientColor(canvas, this.getBarColor(data.datasets[0].data[8])),
            this.setGradientColor(canvas, this.getBarColor(data.datasets[0].data[9]))  
        ];
    }
    // console.log("@@@@@ in getChartData: " + JSON.stringify(data));
    return data;
  };

  
  getBarColor = (score) =>{
    if (score < 0){
        return 'rgba(240, 0, 56, 0.9)';
    } 
    return 'rgba(52, 231, 199, 0.9';
  } 


  getWords = (reviewStr) => {

    //clean string before tokenize
    var str = reviewStr.replace(/[^a-zA-Z ]/g, "")
    str = str.toLowerCase();
    
    var flags = ['as', 'be','it','the','they','im','for','i','a','an','am','and','you',
    'dont','there','when','where','which','we','some','so','its','have','has','no',
    'but','was','were','is','are','of','my','not','if','to','just','very','or','with',
    'in','that','ive','really','me','at','on','all', 'n','this','that','these','those',
    'she','her','because','will','your'];
   
    var wordArr = str.split(" ")
    
    for(var i = 0; i < flags.length; i++){
        wordArr = wordArr.filter(e => e !== flags[i]);
    }
    // console.log('>>>>>>>>>> WORD ARR: ' + wordArr);


    //tokenize string and push count of each token to a dictionary
    var wordDict = {};
    for(var i = 0; i < wordArr.length; i++){
        if(!(wordArr[i] in wordDict)){
           wordDict[wordArr[i]] = 1;
        }
        else{
            wordDict[wordArr[i]] = wordDict[wordArr[i]] + 1;
        }
    }
    // console.log('>>>>>>>>>> WORD COUNT: ' +  JSON.stringify(wordDict));


    //create object for each token
    var words = [];
    var keys = Object.keys(wordDict);
    var values = Object.values(wordDict);
    for(var j = 0; j < keys.length; j++){
        if(values[j] > keys.length/150){
            words.push({
                text: keys[j],
                value: values[j]
            });
        }
    }
    console.log('>>>>>>>>>>JSON WORD COUNT: ' +  JSON.stringify(words));
    return words
  }


  setWords = (words) =>{
      this.setState({
        wordObjArr: words
    });
  }







  render(){
    
    if(!this.state.apiFinished) {
        return <div></div>
    }

    var Sentiment = require('sentiment');
    var sentiment = new Sentiment();

    var result;
    var scoreArr = [];
    for (var i = 0; i < this.state.reviewArray.length; i++){
    result = sentiment.analyze((this.state.reviewArray[i]).toString());
        scoreArr.push(result.score);
        // console.log('>>>>> Result ' + i + ': ' + JSON.stringify(result)); 
    }

    // scoreArr = [-100,-150,200,450,-50,25,40,350,120,-20];
    this.setScoreData(scoreArr);
   
    var words = this.getWords(this.state.reviewString);
    // this.setWords(words);
    
    const wordCloudOptions = {
        colors: ['#0AF7CC', '#0FEEE7','#0FC5EE','#81C3DA','#3294E6'],
        enableTooltip: true,
        deterministic: false,
        fontFamily: 'impact',
        fontSizes: [15, 70],
        fontWeight: 'normal',
        padding: 2,
        rotations: 0,
        // rotationAngles: [0,45],
        // spiral: 'archimedean',
    }

    
    return(
        
        <Row gutter={24} style={{marginBottom: 24, marginLeft:0, marginRight: 0, paddingLeft:0}}>
            <Card bodyStyle={{ paddingTop: 12, paddingBottom: 12, paddingRight:0, paddingLeft:0}}
            bordered={false}>
              <h1 style={{fontSize:40, fontWeight:'bold', color:'#4F5050', paddingBottom:50, textAlign: 'center'}}>
                Sentiment Analysis
              </h1>
              <Col xl={14} style={{height: 600, width: 900}}>
              <h1 style={{fontSize:30, fontWeight:'bold', color:'#4F5050', paddingBottom:20, textAlign: 'center'}}>
                Polarity of Business Reviews by Month
              </h1>
                <Bar
                  data = {this.getChartData}
                  options = {this.state.options}
                  onElementsClick={elems => {
                      if(elems[0] && (this.state.reviewArray[elems[0]._index])[0]){
                          var newWords = this.getWords((this.state.reviewArray[elems[0]._index])[0]);
                          this.setState({
                              wordObjArr: newWords
                          })
                      }
                  }}
                />
                {/* <h2>col1</h2> */}
              </Col>
            
              <Col xl={16} lg={12} md={12} sm={12} xs={12} style={{height: '100%', width: '40%', paddingLeft:100, paddingTop:0, maginTop:0}}>
              <h1 style={{fontSize:30, fontWeight:'bold', color:'#4F5050', paddingBottom:20, textAlign: 'center'}}>
                Word Cloud of Business Reviews
              </h1>
                <ReactWordcloud words={this.state.wordObjArr} 
                    options = {wordCloudOptions}

                />
                {/* <h2>col2</h2> */}
              </Col>
            
          </Card>      
        </Row>
      
    )
  }

}


 