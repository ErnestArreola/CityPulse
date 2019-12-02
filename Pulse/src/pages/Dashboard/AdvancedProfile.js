import React, { Component, Fragment } from "react";
import {queryBusiness} from "@/services/api";
import Debounce from "lodash-decorators/debounce";
import Bind from "lodash-decorators/bind";
import { connect } from "dva";
import {
  Avatar,
  Button,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
  Steps,
  Card,
  Popover,
  Badge,
  Table,
  Tooltip,
  Divider,
  PageHeader
} from "antd";


import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import classNames from "classnames";
import DescriptionList from "@/components/DescriptionList";
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from "./AdvancedProfile.less";
import googleIcon from "@/assets/google.png"
import yelpIcon from "@/assets/yelp.png"
import defaultImage from "@/assets/no_image.png"
import StarRatings from 'react-star-ratings';
import { queryBusinessList, querySocialMediaScore } from "@/services/api";

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () =>
  window.innerWidth || document.documentElement.clientWidth;

  // const getWindowWidth = () => 
  //   $(window).width();


class AdvancedProfile extends Component {


  constructor(props) {
    super(props);
    this.setInfo = this.setInfo.bind(this);
    this.setYelpInfo = this.setYelpInfo.bind(this);
    this.setGoogleInfo = this.setGoogleInfo.bind(this);
    this.setScore = this.setScore.bind(this);
    this.formatPrice = this.formatPrice.bind(this);
    this.formatScore = this.formatScore.bind(this);
    this.getScoreColor = this.getScoreColor.bind(this);
  }



  state = {
    name: "",
    dba: "",
    licenseNum: "",
    address: "",
    vitalityScore: 0,
    employeeNum: 0,
    yelpUrl: "",
    yelpRating: 0,
    yelpReviewCount: 0,
    yelp_id: "",
    yelpImageUrl: "",
    yelpPriceRange: "",
    googleUrl: "",
    googleRating: 0,
    googleReviewCount: 0,
    google_id: "",
    googlePriceRange: ""
  }


  formatPrice = (price) => {
    let dollarSign = "";
    for(let i=0; i < price; i++){
      dollarSign += "$";
    }
    return dollarSign;
  }

  formatScore = (score) => {
    let format_score = ['UNSATISFACTORY', 'ACCEPTABLE', 'SATISFACTORY'];
    return format_score[score];
  }

  setInfo = (res) => {
    let addr = res.address + ", Long Beach, CA " + res.zipcode;

    this.setState({
      name: res.name,
      dba: res.dba_name,
      licenseNum: res.license_num,
      address: addr,
      employeeNum: res.employee_num,
      businessType: res.business_type
    });

    if(res.yelp != null){
      this.setState({
        yelpUrl: res.yelp.url,
        yelpImageUrl: res.yelp.image_url,
        yelp_id: res.yelp.yelp_id
      });
    }

    if(res.google != null){
      this.setState({
        google_id: res.google.google_id
      });
    }
    return res;
  }

  setYelpInfo = (res) => {
    this.setState({
      yelpRating: res.rating,
      yelpReviewCount: res.review_count,
      yelpPriceRange: res.price
    });
    return res;
  }

  setGoogleInfo = (res) => {
    let price = this.formatPrice(parseInt(res.price))
    this.setState({
      googleRating: res.rating,
      googlePriceRange: price
    });
    return res;
  }

  setScore = (res) => {
    this.setState({
      vitalityScore:  res.score
    });
    return res;
  }

  getScoreColor = (score) => {
    switch(score){
      case 0: return '#ef0a02';
      case 1: return '#f7cc0c';
      default: return '#65e006';
    }
  }
  componentDidMount() {
    const {licenseNum} = this.props.location.state
    this.retrieveInfo(licenseNum);
  }


  // componentDidUpdate(prevProps) {
  //   console.log("Hi");
  //   console.log(this.props);
  //   console.log(this.state.business.licenseNum);
  //   if (this.props !== prevProps && this.props !==null) {
  //     console.log("Hello");
  //     this.retrieveInfo(this.props);
  //   }
  // }

  retrieveInfo(buss) {
    let licenseNum = buss;
    //let licenseNum = "BU20535520";
    // let businessAPI = "http://localhost:8000/api/business/" + licenseNum;
    let scoreAPI = "https://pulse-reroute.herokuapp.com/https://cityvitality.com/api/socialmediascore/" + licenseNum;


      queryBusiness(licenseNum)
      .then(response => {
        // handle success
        this.setInfo(response);

        let yelpHistoryAPI = "https://pulse-reroute.herokuapp.com/https://cityvitality.com/api/yelphistory/" + this.state.yelp_id;
        let googleHistoryAPI = "https://pulse-reroute.herokuapp.com/https://cityvitality.com/api/googlehistory/" + this.state.google_id;

          querySocialMediaScore(buss)
          .then(response => {
            // handle success
            console.log("Score: ")
            console.log(response);
            this.setScore(response);
          });
          // .catch(function(error) {
          //   // handle error
          //   console.log("Error in Score API call");
          //   console.log(error);
          // })
          // .then(function() {
          //   // always executed
          // });

        if(this.state.yelp_id !== ""){
          jQuery
            .get(yelpHistoryAPI)
            .then(response => {
              // handle success
              console.log("Yelp: ")
              console.log(response);
              this.setYelpInfo(response);
            })
            .catch(function(error) {
              // handle error
              console.log("Error in yelp history API call");
              console.log(error);
            })
            .then(function() {
              // always executed
            });
        }

        if(this.state.google_id !== ""){
          jQuery
            .get(googleHistoryAPI)
            .then(response => {
              // handle success
              console.log("Google: ")
              console.log(response);
              this.setGoogleInfo(response);
            })
            .catch(function(error) {
              // handle error
              console.log("Error in google history API call");
              console.log(error);
            })
            .then(function() {
              // always executed
            });
        }

      })
      .catch(function(error) {
        // handle error
        console.log("Error in AdvancedProfile");
        console.log(error);
      })
      .then(function() {
        // always executed
      });

  }




  render() {

    let busName = this.state.name;
    let busImage = this.state.yelpImageUrl === ""? defaultImage : this.state.yelpImageUrl ;

    if(this.state.dba !== ""){
      busName = this.state.dba;
    }
    let scoreColor = this.getScoreColor(this.state.vitalityScore);




    return(
      <PageHeaderWrapper>

        <Row gutter={24} style={{marginBottom: 24, marginLeft:0, marginRight: 0, paddingLeft:0}}>
          <Card
            bodyStyle={{ paddingTop: 12, paddingBottom: 12, paddingRight:0, paddingLeft:0}}
            bordered={false}
            // title="Card"
          >
            <Col xl={6} >
              <Card bordered ={false}
                    cover = {<img src = {busImage} height="250" width="250"/>}>
              </Card>
            </Col>
            <Col xl={16} style={{marginLeft:0, marginRight:0, paddingLeft: 12}}>
              <h1 style={{fontSize:24,fontWeight:'bold',color:'#397CE1'}}>{busName}</h1>
              <h2 style={{fontSize:20,fontWeight:'bold',color:'#397CE1'}}>
                Social Media Score: <Badge count={this.formatScore(this.state.vitalityScore)}
                style={{ fontSize:24, fontWeight:'bold', backgroundColor: scoreColor, width: '105%', marginBottom:'4%', marginLeft:'5%'}} />
              </h2>

              <h2 style={{fontSize: 18, fontWeight:'bold', color:'#545451'}}>Employee Number: {this.state.employeeNum}</h2>
              <h4 style={{fontSize: 15, color:'#545451'}}>License:  {this.state.licenseNum}</h4>
              <h4 style={{fontSize: 15, color:'#545451'}}>Business Type:  {this.state.businessType}</h4>
              <h4 style={{fontSize: 15, color:'#545451'}}>Address:  {this.state.address}</h4>

            </Col>
          </Card>
        </Row>


        <GridContent>
          <Row gutter={24} >

            <Col xl={8} lg={12} md={12} sm={12} xs={12} style={{ marginBottom: 24 }}>
              <Card
                bodyStyle={{ height:200,  paddingTop: 12, paddingBottom: 12, paddingRight:12, paddingLeft:12 }}
                bordered={false}
                // title="Card"
              >
                <a href={this.state.yelpUrl} target="_blank">
                  <img src={yelpIcon} height="60" width="100"/><br/><br/>
                </a>
                <StarRatings
                  rating={this.state.yelpRating}
                  starRatedColor="#f2de30"
                  starDimension="20px"
                  starSpacing="4px"
                  numberOfStars={5}
                  name='yelpRating'
                />
                <h4 style={{fontSize:16, color:'#545451'}}>Reviews: {this.state.yelpReviewCount}</h4>
                <h2 style={{fontSize:20, color:'#545451'}}>Price Range: {this.state.yelpPriceRange}</h2>

              </Card>
            </Col>

            <Col xl={8} lg={12} md={12} sm={12} xs={12} style={{ marginBottom: 24 }}>
              <Card
                bodyStyle={{ height:200, paddingTop: 12, paddingBottom: 12, paddingRight:12, paddingLeft:12 }}
                bordered={false}
                // title="Card"
              >
                <a href={this.state.googleUrl} target="_blank">
                  <img src={googleIcon} height="60" width="60"/><br/><br/>
                </a>
                <StarRatings
                  rating={this.state.googleRating}
                  starRatedColor="#f2de30"
                  starDimension="20px"
                  starSpacing="4px"
                  numberOfStars={5}
                  name='googleRating'
                />
                <h2 style={{fontSize:20, color:'#545451'}}>Price Range: {this.state.googlePriceRange}</h2>

              </Card>
            </Col>

            <Col xl={8} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              {/*<Card title="Chart" style={{ height:200, marginBottom: 24 }} bordered={true}>*/}
                {/*<DescriptionList >*/}
                  {/*<Description term="??">To the rivers</Description>*/}
                  {/*<Description term="??">and the lakes</Description>*/}
                  {/*<Description term="??">you're use to</Description>*/}
                  {/*<Description term="??">??????</Description>*/}
                  {/*<Description term="??">??</Description>*/}
                {/*</DescriptionList>*/}
              {/*</Card>*/}
            </Col>

          </Row>
        </GridContent>
    </PageHeaderWrapper>
    ) ;
  }
}
export default AdvancedProfile;
