import React, { Component, Suspense } from 'react';
import { Col, Row, Button, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CompareTopBusiness from '../../components/TopBusinessGraph/CompareTopBusiness';
import SentimentAnalysis from '@/components/SentimentAnalysis/SentimentAnalysis';

import styles from '../DashboardAnalysis/style.less';
import BusinessMap from '@/components/BusinessMap/BusinessMap';
import { Link } from "react-router-dom";






export default class App extends Component {

  constructor(props){
    super(props)
    this.routeChange = this.routeChange.bind(this);
  }
  
  state = {
    thisBusID: " ",
    thisBus: {},
    topBus: {},
    apiFinished: false
  }

  topBusID = '';

  componentDidMount() {
    // const {match: {params} } = this.props;
    // alert(this.props.match.params.busID);
    
    // this.retrieveInfo(this.state.thisBusID);
    // this.retrieveInfo(this.props.match.params.busID);
        this.retrieveInfo(this.props.match.params.busID);
        // this.setState({
        //   thisBusID: this.props.match.params.busID
        // })
  }

  routeChange() {
    // console.log("Hi");
    // let path = "/Graphs/pGl2qwKtn7RdTI1CaLjsrA";
    // this.props.history.push(path);

  }



  
  retrieveInfo(businessID){

    let yelpID = businessID;
    let topBusAPI = "http://localhost:8000/api/topbusinessinonemileradius/?yelpid=" + yelpID;
    let busDetailAPI = "http://localhost:8000/api/business/" + yelpID;

    let temp = {};

    jQuery
    .get(busDetailAPI)
    .then(response => {
      temp = response;


      jQuery
      .get(topBusAPI)
      .then(response => {
        
        this.topBusID = response[0].businessID;
        this.setState({
          thisBusID: businessID,
          thisBus: temp,
          topBus: response[0],
          apiFinished: true
        })
      })
      .then(() => {
        // always executed
        
      })
      .catch(function(error) {
        // handle error
        console.log("Error in Top Business API");
        console.log(error);
      });
    })
    .then(() => {
      // always executed
      
    })
    .catch(function(error) {
      // handle error
      console.log("Error in Business Detail API");
      console.log(error);
    });

  }


  goToTopBus = () => {
    // alert(this.topBusID);
    // this.setState({
    //   thisBusID: this.topBusID
    // });
    // alert("Hello!");
  }
  
  

  render() {
    
    if(!this.state.apiFinished){
      return <div></div>
    }
    
    return (
      <PageHeaderWrapper>  
        <Row>
          <Card
            bodyStyle={{ paddingTop: '2%', paddingBottom: '2%', paddingRight:0, paddingLeft:60}}
            bordered={false}
          >
            <h1 style={{fontSize:35, fontWeight:'bold', color:'#187ff5', paddingBottom:0, textAlign: 'left'}}>
              {this.state.thisBus.businessName}
            </h1>
            <h2 style={{fontSize:25}}> 
              Address: {this.state.thisBus.address}
            </h2>
            <h2 style={{fontSize:25}}>
              Category: {this.state.thisBus.category}
            </h2>
            <a href={this.state.thisBus.businessURL} style={{fontSize:25}}> 
              Go to Yelp Webpage
            </a>
          </Card>
        </Row>
        
        <Row style={{marginBottom: 0, marginLeft:0, marginRight: 0, paddingLeft:0, paddingTop: 24}}>
          <Card
            bodyStyle={{ paddingTop: '2%', paddingBottom: '3%', paddingRight:'5%', paddingLeft:'5%'}}
            bordered={false}
          >
            {/* <h1 style={{fontSize:35, fontWeight:'bold', color:'#4F5050', paddingBottom:30, textAlign: 'center'}}>
                Comparing to Most Active Business within One Mile Radius
            </h1> */}
            <Col>
              <CompareTopBusiness businessID ={this.state.thisBusID}/>
            </Col>

            <div style={{paddingLeft: '2%'}}>
              {/* <Button 
              type="primary" 
                style={{fontSize: 20, fontWeight:'bold', height: 50}}
                onClick = {this.routeChange}
               
            
            
              >
                Go to Most Active Business
              </Button> */}
            </div>

          </Card>
        </Row>
        

        <Row style={{marginBottom: 24, marginLeft:0, marginRight: 0, paddingLeft:0, paddingTop: 24}}>
          <Card
            bodyStyle={{ paddingTop: 50, paddingBottom: 12, paddingRight:0, paddingLeft:60}}
            bordered={false}
          >
            <Col>
              {/* <Suspense fallback={null}> */}
              {/* <h1>Sentiment Analysis</h1> */}
              <SentimentAnalysis businessID={this.state.thisBusID}/>
              {/* </Suspense> */}
            </Col>
          </Card>
        </Row>






       </PageHeaderWrapper>    

 






        // <Row gutter={24} style={{marginBottom: 24, marginLeft:0, marginRight: 0, paddingLeft:0}}>
        //   <Card bodyStyle={{ paddingTop: 12, paddingBottom: 12, paddingRight:0, paddingLeft:0}}
        //     bordered={false}>

        //     <Col xl={6}> <h1>col1</h1></Col>
        //     <Col xl={16} style={{marginLeft:0, marginRight:0, paddingLeft: 12}}> <h1>col2</h1></Col>

        //   </Card>
        // </Row>




    );
  }
}
