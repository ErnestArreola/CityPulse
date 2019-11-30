import React, { Component } from "react";
import { render } from "react-dom";
import data from './model/pulse_geo.geojson';
import Graphs from  '@/pages/Graphs/Graphs';
import { Link } from "react-router-dom";



var infowindow;
var bID;
 


class Map extends Component {
    constructor(props) {
      super(props);
      this.onScriptLoad = this.onScriptLoad.bind(this)
      var self = this;

      this.state = {
          businessID: null
      }
    }


    onBusinessClick(bID){

        this.setState({
            businessID: bID
        })
        console.log(this.state.businessID);
        <Link to = {{pathname: '/dashboard/analysis'}}></Link>
    }

    callMeMaybe(){}

    
  
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

          let self = this;


          
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
            self.onBusinessClick(bID);
            var myHTML = event.feature.getProperty("businessName");
            infowindow.setContent("<div style='width:250px; text-align: center;'>"+ myHTML +"</div>" +'<Link to = '  + "/" + ' > Home </Link>'+      '<button onclick="callMeMaybe()">Click me</button>');
            infowindow.setPosition(event.feature.getGeometry().get());
            infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
            // bID = event.feature.getProperty("businessID");

            infowindow.open(map);

        });  


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
        s.src = `https://maps.google.com/maps/api/js?key=Candy`;
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
        <Graphs
            business = {this.state.businessID} />
      return (
          <div>
        <div id="mapContainer">
          <div style={{ width: "100%", height: "65vh" }} id="map" />
        </div>

        </div>
      );
    }
  }
  
  export default Map