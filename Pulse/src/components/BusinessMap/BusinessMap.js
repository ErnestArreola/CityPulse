import React, { Component } from "react";
import { render } from "react-dom";
import data from './model/pulse_geo.geojson';

import data_travel from './model/travel_geo.geojson';
import data_food from './model/food_geo.geojson';
import data_medical from './model/medical_geo.geojson';
import data_nightlife from './model/nightlife_geo.geojson';
import data_outdoors from './model/outdoors_geo.geojson';
import data_other from './model/other_geo.geojson';
import data_residence from './model/residence_geo.geojson';
import data_entertainment from './model/entertainment_geo.geojson';
import data_shopping from './model/shopping_geo.geojson';

//import data_food from './model/food_geo.geojson';

import Graphs from  '@/pages/Graphs/Graphs';
import { Link } from "react-router-dom";
import router from 'umi/router';
//trying things
import zip__90802 from "./model/zip_90802.json";
import zip__90803 from "./model/zip_90803.json";
import zip__90804 from "./model/zip_90804.json";
import zip__90805 from "./model/zip_90805.json";
import zip__90806 from "./model/zip_90806.json";
import zip__90807 from "./model/zip_90807.json";
import zip__90808 from "./model/zip_90808.json";
import zip__90810 from "./model/zip_90810.json";
//import zip__90802 from "./model/zip_90802.json";

var ctaLayer = "";
var legend = "";
var infowindow;
var bID;
 


class Map extends Component {
    constructor(props) {
      super(props);

      var self = this;
      this.state = {
          businessID: props.value || '0'
      }
          this.onScriptLoad = this.onScriptLoad.bind(this)
          this.onBusinessClick=this.onBusinessClick.bind(this);
     //     this.makeCheckboxes=this.makeCheckboxes.bind(this);
    }







    onBusinessClick = (bName) => {
      this.props.callbackFrom(bName);
    }


    componentDidUpdate() {
      if(this.state.businessID != '0') {
          console.log(this.state.businessID);
          router.push('/Graphs');

      }

    }

    someFn = (bID) => {
      this.props.callbackFromParent(bID);
    }


    onScriptLoad() {      

      //L.mapbox.accessToken = 'pk.eyJ1IjoiZG9zcyIsImEiOiI1NFItUWs4In0.-9qpbOfE3jC68WDUQA1Akg';
      //var map = L.mapbox.map('map', 'mapbox.light') .setView([45.2671352, 19.8335496], 6);;

      
       const map = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: 33.7971, lng: -118.1637 },
            zoom: 12,
            gestureHandling: "cooperative",
            disableDefualtUI: true,
            mapTypeControl: false,
            // zoomControlOptions: {
            //   position: google.maps.ControlPosition.TOP_CENTER,
            //   style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
            // }
          });
          ctaLayer = new google.maps.KmlLayer({
            url:
              "https://sites.google.com/site/pulsey61432/markers/city_of_long_beach_boundary.kml",
            map: map
          });

          

          let self = this;

          //var lb_boundary = new google.maps.Data();
          var zip_90802 = new google.maps.Data();
          var zip_90803 = new google.maps.Data();
          var zip_90804 = new google.maps.Data();
          var zip_90805 = new google.maps.Data();
          var zip_90806 = new google.maps.Data();
          var zip_90807 = new google.maps.Data();
          var zip_90808 = new google.maps.Data();
          var zip_90810 = new google.maps.Data();
        //  var zip_90802 = new google.maps.Data();
          zip_90802.addGeoJson(zip__90802);
          zip_90802.addGeoJson(zip__90803);
          zip_90802.addGeoJson(zip__90804);
          zip_90802.addGeoJson(zip__90805);
          zip_90802.addGeoJson(zip__90806);
          zip_90802.addGeoJson(zip__90807);
          zip_90802.addGeoJson(zip__90808);
          zip_90802.addGeoJson(zip__90810);

          /*
          zip_90802.setMap(map);
          zip_90803.setMap(map);
          zip_90804.setMap(map);
          zip_90805.setMap(map);
          zip_90806.setMap(map);
          zip_90807.setMap(map);
          zip_90808.setMap(map);
          zip_90810.setMap(map);
          */



          
        // function addDataLayerListeners(data_layer, infoWindowContent) {
        //     data_layer.addListener('click', function(event) {
        //     //   infowindow.setContent(infoWindowContent);
        //     infowindow.setPosition(event.feature.getGeometry().get());
        //     infowindow.setOptions({
        //         pixelOffset: new google.maps.Size(0, -30)
        //     });
        //     infowindow.open(map)
        //     });
        // }

        //  map.data.loadGeoJson(data, null, function() {
        // addDataLayerListeners(map.data, 'businessName');
        // });
 




       // map.featureLayer.setGeoJSON(featureLayerGeoJSONdata);
        map.data.loadGeoJson(data_travel);
        map.data.loadGeoJson(data_food);
        map.data.loadGeoJson(data_nightlife);
        map.data.loadGeoJson(data_medical);
        map.data.loadGeoJson(data_entertainment);
        map.data.loadGeoJson(data_outdoors);
        map.data.loadGeoJson(data_other);
        map.data.loadGeoJson(data_shopping);
        map.data.loadGeoJson(data_food);

        var categoryDict = {
          Food: true,
          Travel: true,
          Other: true,
          Outdoors: true,
          Residence: true,
          Shopping: true,
          Medical: true,
          Entertainment: true,
          Nightlife: true
        };

        map.data.setStyle(function(feature) {
          if (feature.getProperty('category') === 'Food'){
            return {
              icon: 'https://sites.google.com/site/pulsey61432/markers/food_6.png',
              visible: categoryDict.Food
            };
          }
          else if (feature.getProperty('category') === 'Travel & Transport'){
            return {
              icon: 'https://sites.google.com/site/pulsey61432/markers/travel_6.png',
              visible: categoryDict.Travel
            };
          }
          else if (feature.getProperty('category') === 'Other'){
            return {
              icon: 'https://sites.google.com/site/pulsey61432/markers/other_6.png',
              visible: categoryDict.Other
            };
          }
          else if (feature.getProperty('category') === 'Outdoors'){
            return {
              icon: 'https://sites.google.com/site/pulsey61432/markers/outdoors_6.png',
              visible: categoryDict.Outdoors
            };
          }
          else if (feature.getProperty('category') === 'Residence'){
            return {
              icon: 'https://sites.google.com/site/pulsey61432/markers/residential_6.png',
              visible: categoryDict.Residence
            };
          }
          else if (feature.getProperty('category') === 'Shopping'){
            return {
              icon: 'https://sites.google.com/site/pulsey61432/markers/shopping_6.png',
              visible: categoryDict.Shopping
            };
          }
          else if (feature.getProperty('category') === 'Nightlife'){
            return {
              icon: 'https://sites.google.com/site/pulsey61432/markers/nightlife_6.png',
              visible: categoryDict.Nightlife
            };
          }
          else if (feature.getProperty('category') === 'Entertainment & Arts'){
            return {
              icon: 'https://sites.google.com/site/pulsey61432/markers/arts_6.png',
              visible: categoryDict.Entertainment
            };
          }
          else if (feature.getProperty('category') === 'Medical'){
            return {
              icon: 'https://sites.google.com/site/pulsey61432/markers/medical_6.png',
              visible: categoryDict.Medical
            };
          }

    //      return {icon:feature.getProperty('icon')};
        });


        categoryDict.Food = false;

            //heatmap legend initialization
        legend = document.getElementById("legend");

            //creating heatmap legend components
        var div = document.createElement("div");
        var div1 = document.createElement("div");
        var div2 = document.createElement("div");
        var div3 = document.createElement("div");
        var div4 = document.createElement("div");
        var div5 = document.createElement("div");
        var div6 = document.createElement("div");
        var div7 = document.createElement("div");
        var div8 = document.createElement("div");

        div.innerHTML =
          '<img src="' +
          "https://sites.google.com/site/pulsey61432/markers/arts.png" +
          '"> ' +
          "Entertainment & Arts";
        legend.appendChild(div);
        div1.innerHTML =
          '<img src="' +
          "https://sites.google.com/site/pulsey61432/markers/rsz_1asian_food_4.png" +
          '"> ' +
          "Food";
        legend.appendChild(div1);
        div2.innerHTML =
          '<img src="' +
          "https://sites.google.com/site/pulsey61432/markers/medical.png" +
          '"> ' +
          "Medical";
        legend.appendChild(div2);
        div3.innerHTML =
          '<img src="' +
          "https://sites.google.com/site/pulsey61432/markers/nightlife.png" +
          '"> ' +
          "Nightlife";
        legend.appendChild(div3);
        div4.innerHTML =
          '<img src="' +
          "https://sites.google.com/site/pulsey61432/markers/other.png" +
          '"> ' +
          "Other";
        legend.appendChild(div4);
        div5.innerHTML =
          '<img src="' +
          "https://sites.google.com/site/pulsey61432/markers/outdoors.png" +
          '"> ' +
          "Outdoors";
        legend.appendChild(div5);

        div6.innerHTML =
        '<img src="' +
        "https://sites.google.com/site/pulsey61432/markers/residential.png" +
        '"> ' +
        "Residential";
        legend.appendChild(div6);

        div7.innerHTML =
        '<img src="' +
        "https://sites.google.com/site/pulsey61432/markers/shopping.png" +
        '"> ' +
        "Shopping";
        legend.appendChild(div7);

        div8.innerHTML =
        '<img src="' +
        "https://sites.google.com/site/pulsey61432/markers/travel.png" +
        '"> ' +
        "Travel";
        legend.appendChild(div8);

        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
        /*
        var turnInvisible = function(category){
          map.data.setStyle(function(feature) {
            if (feature.getProperty('category') === category){
              return {visible: false}
            }
          });
        };

        var turnVisible = function(category){
          map.data.setStyle(function(feature) {
            if (feature.getProperty('category') === 'Food'){
              return {
                visible: true,
                icon: 'https://sites.google.com/site/pulsey61432/markers/rsz_1asian_food_4.png'

              
              }
            }
          });
        };

        var categoryDict = {
          Food: true,
          Travel: true,
        };
        */


        //turnInvisible('Food');

        /*
        map.data.setStyle({
          icon: 'https://sites.google.com/site/pulsey61432/markers/rsz_1asian_food_4.png',
        //  marker: setVisible(false),
          visible: 'inactive',
        //  fillColor: 'green'
        });
        */

   //     map.data.setStyle(function(feature) {
        //  var color = 'FF0000';
        //  var symbol = '%E2%80%A2';  // dot
      
   //       return /* @type {google.maps.Data.StyleOptions} */ {
          //    visible: feature.getProperty('fuck shit'), // this links visibility to feature property
   //           icon: 'https://sites.google.com/site/pulsey61432/markers/rsz_1asian_food_4.png',
   //           visible: false
   //       };
   //     });

   //     console.log('yay');
        
   //     map.data.setStyle(function(feature) {
   //       var cat = feature.getProperty('category');

   //       if (cat==='Food'){
   //         return /* @type {google.maps.Data.StyleOptions} */ {
              //    visible: feature.getProperty('fuck shit'), // this links visibility to feature property
   //               icon: 'https://sites.google.com/site/pulsey61432/markers/rsz_1asian_food_4.png',
   //               visible: true
   //           };
   //       }

   //      });
         

     //   map.data.forEach(function(feature) {
     //     console.log('nay');

          
            //feature.setProperty('active', feature.getProperty(property) === value);
     //   });
        /*
        var setFilter = function(property, value) {
          map.data.forEach(function(feature) {
            console.log('nay');

            
              //feature.setProperty('active', feature.getProperty(property) === value);
          });
        };
        */
       // setFilter('category', 'Food');

       // map.featureLayer.setGeoJSON(featureLayerGeoJSON);



        infowindow = new google.maps.InfoWindow();


        map.data.addListener('click', function(event) {

            bID = event.feature.getProperty("businessID");
            // self.onBusinessClick(bID);
            var myHTML = event.feature.getProperty("businessName");
            // infowindow.setContent("<div style='width:250px; text-align: center;'>"+ myHTML + '<button onclick="callMeMaybe()">Click me</button>');
            infowindow.setContent('<Link> Take me home </Link>');
            // infowindow.setContent('<br/><button onclick="callMeMaybe()" class="btn btn-success btn-sm">Add to Route</button>');
            infowindow.setPosition(event.feature.getGeometry().get());
            infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
            // onBusinessClick(bID);
            // bID = event.feature.getProperty("businessID");

            self.someFn(bID);
            self.onBusinessClick(event.feature.getProperty("businessName"));

            infowindow.open(map);
        });  

      //  var filters = document.getElementById('filters');

      //  makeCheckboxes();






        // google.maps.event.addDomListener(window, "load", onScriptLoad);



        //  infowwindow = new.google.maps.InfoWindow();



        //   google.maps.event.addListener(map.data,'click',function(event) {       
        //     // console.log(event.feature.getProperty('businessName'))
        //     // infowindow.setContent(event.feature.getProperty('businessName'))
        //     // infowwindow.open(map)
        //     console.log(event.feature.getGeometry().get());
        //  });




        }




  
    componentDidMount() {
      if (!window.google) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = `https://maps.google.com/maps/api/js?key=AIzaSyDy1V6zDkmLEvmufytYxg48G7FoEz3Qago`;
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
        // Below is important. 
        //We cannot access google.maps until it's finished loading
        s.addEventListener('load', e => {
          this.onScriptLoad()
        })
      } else {
        this.onScriptLoad()
      }
    }
  
    render() {

              <Graphs business = {this.state.businessID} />
      return (
          <div>
        <div id="mapContainer">
          <div style={{ width: "100%", height: "70vh" }} id="map" />
          <div
            style={{
              background: "#fff",
              padding: "10px",
              margin: "10px",
              border: "3px solid #000"
            }}
            id="legend"
          >
            <h3>BUSINESSES LEGEND</h3>
          </div>
        </div>

        </div>
      );
    }
  }
  
  export default Map