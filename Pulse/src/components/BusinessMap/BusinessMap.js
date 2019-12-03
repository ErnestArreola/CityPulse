import React, { Component } from "react";
import { render } from "react-dom";
import data from './model/pulse_geo.geojson';
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
              "https://sites.google.com/site/longbeachprojectqwer/kml/City_Of_Long_Beach_City_Boundary.kml",
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

          zip_90802.setMap(map);
          zip_90803.setMap(map);
          zip_90804.setMap(map);
          zip_90805.setMap(map);
          zip_90806.setMap(map);
          zip_90807.setMap(map);
          zip_90808.setMap(map);
          zip_90810.setMap(map);



          
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

        map.data.loadGeoJson(data);


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
        </div>

        </div>
      );
    }
  }
  
  export default Map