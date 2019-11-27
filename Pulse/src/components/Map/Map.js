import React, { Component } from "react";
import { render } from "react-dom";
import "./Map.css";
import zip__90802 from "./model/zip_90802.json";
import zip__90803 from "./model/zip_90803.json";
import zip__90804 from "./model/zip_90804.json";
import zip__90805 from "./model/zip_90805.json";
import zip__90806 from "./model/zip_90806.json";
import zip__90807 from "./model/zip_90807.json";
import zip__90808 from "./model/zip_90808.json";
import zip__90810 from "./model/zip_90810.json";
import zip__90813 from "./model/zip_90813.json";
import zip__90814 from "./model/zip_90814.json";
import zip__90815 from "./model/zip_90815.json";
import zip__90822 from "./model/zip_90822.json";
import zip__90831 from "./model/zip_90831.json";
import CardDrawer from "@/components/Drawer/CardDrawer";
import Button from "antd/es/button";
import PageHeaderWrapper from "@/pages/Dashboard/AdvancedProfile";
import { queryBusinessList, queryBusinessListMarkers, zipcoderatio } from "@/services/api";

var map = "";
var ctaLayer = "";
var legend = "";
var markers = [];

class Map extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this);
    this.drawer = React.createRef();
    var self = this;
    this.state = {
      zipcode: null
    };
  }

  onZip(zip) {
    this.setState({
      zipcode: zip
    });
    this.drawer.current.showDrawer();
  }

  //adds all of the markers onto the map
  setAllMarkers(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  //creates markers
  addMarker(props) {
    var infowindow = new google.maps.InfoWindow();
    //marker with properties created
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      icon: props.markerImage
    });
    //marker event listener is attached
    marker.addListener("click", function() {
      infowindow.setContent(props.business_name);
      infowindow.setPosition(event.latLng);
      infowindow.open(map, marker);
    });
    //marker added to marker list
    markers.push(marker);
  }

  //this function deretmines marker color
  determine_marker_color(score, count) {
    var marker_color = "";
    //numbered markers
    if (count < 11) {
      marker_color =
        "https://sites.google.com/site/longbeachprojectqwer/kml/num_" +
        count.toString() +
        ".png";
    } else {
      //color-based markers
      if (score == 0) {
        marker_color = "http://maps.google.com/mapfiles/ms/micons/red.png";
      } else if (score == 1) {
        marker_color = "http://maps.google.com/mapfiles/ms/micons/yellow.png";
      } else {
        marker_color = "http://maps.google.com/mapfiles/ms/micons/green.png";
      }
    }

    return marker_color;
  }

  //this function calls API info to create markers
  set_markers(zip) {
    var count = 0;
    var config = {
      headers: { "content-type": "application/x-www-form-urlencoded" }
    };
    //API url
    var url =
      "https://cityvitality.com/api/businesslist/?zipcode=" +
      zip +
      "&startindex=0&endindex=1200";

    //looks for markers with social media
    queryBusinessListMarkers(zip).then(res => {
      res.forEach(results => {
        if (results.business.google !== null) {
          count++;
          this.addMarker({
            coords: {
              lat: parseFloat(results.business.google.latitude),
              lng: parseFloat(results.business.google.longtitude)
            },
            markerImage: this.determine_marker_color(results.score, count),
            business_name: results.business.dba_name
          });
        }
      });
    });
  }

  onScriptLoad() {
    //heatmap legend initialization
    legend = document.getElementById("legend");
    //google map initialization
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 33.7971, lng: -118.1637 },
      zoom: 12,
      gestureHandling: "cooperative",
      disableDefualtUI: true,
      mapTypeControl: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
      }
    });
    //Long Beach City map border, not used in demo
    ctaLayer = new google.maps.KmlLayer({
      url:
        "https://sites.google.com/site/longbeachprojectqwer/kml/City_Of_Long_Beach_City_Boundary.kml",
      map: map
    });
    let self = this;

    //implementing zip code jsons
    var lb_boundary = new google.maps.Data();
    var zip_90802 = new google.maps.Data();
    var zip_90803 = new google.maps.Data();
    var zip_90804 = new google.maps.Data();
    var zip_90805 = new google.maps.Data();
    var zip_90806 = new google.maps.Data();
    var zip_90807 = new google.maps.Data();
    var zip_90808 = new google.maps.Data();
    var zip_90810 = new google.maps.Data();
    var zip_90813 = new google.maps.Data();
    var zip_90814 = new google.maps.Data();
    var zip_90815 = new google.maps.Data();
    var zip_90822 = new google.maps.Data();
    var zip_90831 = new google.maps.Data();

    zip_90802.addGeoJson(zip__90802);
    zip_90803.addGeoJson(zip__90803);
    zip_90804.addGeoJson(zip__90804);
    zip_90805.addGeoJson(zip__90805);
    zip_90806.addGeoJson(zip__90806);
    zip_90807.addGeoJson(zip__90807);
    zip_90808.addGeoJson(zip__90808);
    zip_90810.addGeoJson(zip__90810);
    zip_90813.addGeoJson(zip__90813);
    zip_90814.addGeoJson(zip__90814);
    zip_90815.addGeoJson(zip__90815);
    zip_90822.addGeoJson(zip__90822);
    zip_90831.addGeoJson(zip__90831);

    //adding event listeners to zip code areas
    google.maps.event.addListener(zip_90815, "click", function(event) {
      self.onZip(90815);
      self.set_markers("90815");
      map.setZoom(13);
      map.panTo({ lat: 33.795, lng: -118.118 });
    });
    google.maps.event.addListener(zip_90810, "click", function(event) {
      self.onZip(90810);
      self.set_markers("90810");
      map.setZoom(13);
      map.setCenter({ lat: 33.816, lng: -118.215 });
    });
    google.maps.event.addListener(zip_90813, "click", function(event) {
      self.onZip(90813);
      self.set_markers("90813");
      map.setZoom(13);
      map.panTo({ lat: 33.781, lng: -118.175 });
    });
    google.maps.event.addListener(zip_90814, "click", function(event) {
      self.onZip(90814);
      self.set_markers("90814");
      map.setZoom(13);
      map.panTo({ lat: 33.771, lng: -118.145 });
    });
    google.maps.event.addListener(zip_90808, "click", function(event) {
      self.onZip(90808);
      self.set_markers("90808");
      map.setZoom(13);
      map.panTo({ lat: 33.823, lng: -118.113 });
    });

    google.maps.event.addListener(zip_90807, "click", function(event) {
      self.onZip(90807);
      self.set_markers("90807");
      map.setZoom(13);
      map.panTo({ lat: 33.828, lng: -118.182 });
    });
    google.maps.event.addListener(zip_90822, "click", function(event) {
      self.onZip(90822);
      self.set_markers("90822");
      map.setZoom(13);
      map.panTo({ lat: 33.776, lng: -118.118 });
    });

    google.maps.event.addListener(zip_90831, "click", function(event) {
      self.onZip(90831);
      self.set_markers("90831");
      map.setZoom(13);
      map.panTo({ lat: 33.768, lng: -118.199 });
    });

    google.maps.event.addListener(zip_90802, "click", function(event) {
      self.onZip(90802);
      self.set_markers("90802");
      map.setZoom(13);
      map.panTo({ lat: 33.769, lng: -118.192 });
    });
    google.maps.event.addListener(zip_90803, "click", function(event) {
      self.onZip(90803);
      self.set_markers("90803");
      map.setZoom(13);
      map.panTo({ lat: 33.761, lng: -118.13 });
      //.setCenter
    });
    google.maps.event.addListener(zip_90804, "click", function(event) {
      self.onZip(90804);
      self.set_markers("90804");
      map.setZoom(13);
      map.panTo({ lat: 33.783, lng: -118.152 });
    });
    google.maps.event.addListener(zip_90805, "click", function(event) {
      self.onZip(90805);
      self.set_markers("90805");
      map.setZoom(13);
      map.panTo({ lat: 33.866, lng: -118.184 });
    });
    google.maps.event.addListener(zip_90806, "click", function(event) {
      self.onZip(90806);
      self.set_markers("90806");
      map.setZoom(13);
      map.panTo({ lat: 33.802, lng: -118.186 });
    });

    var zip_codes = [
      90802,
      90803,
      90804,
      90805,
      90806,
      90807,
      90808,
      90810,
      90813,
      90814,
      90815,
      90822,
      90831
    ];

    var zip_colors = new Array();

    var config = {
      headers: { "content-type": "application/x-www-form-urlencoded" }
    };

    // extracting API delinquent/active zip business list for heatmap colors
    zipcoderatio()
    .then(res => {
      console.log(res);
      for (var i = 0; i < zip_codes.length; i++) {
        let data = [];
        if (this.check_zipcode(zip_codes[i], res) == false) {
          zip_colors.push({
            zipcode: zip_codes[i],
            color: "#f1f3d6"
          });
        } else {
          data = this.get_license_status(zip_codes[i], res);
          let color = this.set_color(data[1], data[0]);
          zip_colors.push({
            zipcode: zip_codes[i],
            color: color
          });
        }
      }

      //determining heatmap colors
      for (var i = 0; i < zip_colors.length; i++) {
        if (zip_colors[i].zipcode == 90802) {
          zip_90802.setStyle({
            strokeColor: "black",
            strokeWeight: 2,
            fillColor: zip_colors[i].color
          });
        } else if (zip_colors[i].zipcode == 90803) {
          zip_90803.setStyle({
            strokeColor: "black",
            strokeWeight: 2,
            fillColor: zip_colors[i].color
          });
        } else if (zip_colors[i].zipcode == 90804) {
          zip_90804.setStyle({
            strokeColor: "black",
            strokeWeight: 2,
            fillColor: zip_colors[i].color
          });
        } else if (zip_colors[i].zipcode == 90805) {
          zip_90805.setStyle({
            strokeColor: "black",
            strokeWeight: 2,
            fillColor: zip_colors[i].color
          });
        } else if (zip_colors[i].zipcode == 90806) {
          zip_90806.setStyle({
            strokeColor: "black",
            strokeWeight: 2,
            fillColor: zip_colors[i].color
          });
        } else if (zip_colors[i].zipcode == 90807) {
          zip_90807.setStyle({
            strokeColor: "black",
            strokeWeight: 2,
            fillColor: zip_colors[i].color
          });
        } else if (zip_colors[i].zipcode == 90808) {
          zip_90808.setStyle({
            strokeColor: "black",
            strokeWeight: 2,
            fillColor: zip_colors[i].color
          });
        } else if (zip_colors[i].zipcode == 90809) {
          zip_90809.setStyle({
            strokeColor: "black",
            strokeWeight: 2,
            fillColor: zip_colors[i].color
          });
        } else if (zip_colors[i].zipcode == 90810) {
          zip_90810.setStyle({
            strokeColor: "black",
            strokeWeight: 2,
            fillColor: zip_colors[i].color
          });
        } else if (zip_colors[i].zipcode == 90813) {
          zip_90813.setStyle({
            strokeColor: "black",
            strokeWeight: 2,
            fillColor: zip_colors[i].color
          });
        } else if (zip_colors[i].zipcode == 90814) {
          zip_90814.setStyle({
            strokeColor: "black",
            strokeWeight: 2,
            fillColor: zip_colors[i].color
          });
        } else if (zip_colors[i].zipcode == 90815) {
          zip_90815.setStyle({
            strokeColor: "black",
            strokeWeight: 2,
            fillColor: zip_colors[i].color
          });
        } else if (zip_colors[i].zipcode == 90822) {
          zip_90822.setStyle({
            strokeColor: "black",
            strokeWeight: 2,
            fillColor: zip_colors[i].color
          });
        } else if (zip_colors[i].zipcode == 90831) {
          zip_90831.setStyle({
            strokeColor: "black",
            strokeWeight: 2,
            fillColor: zip_colors[i].color
          });
        }
      }
    })
    .catch(error => {
      console.log("error", error);
    });


    // jQuery
    //   .get("https://cityvitality.com/api/zipcoderatio/", config)
    //   .then(res => {
    //     for (var i = 0; i < zip_codes.length; i++) {
    //       let data = [];
    //       if (this.check_zipcode(zip_codes[i], res) == false) {
    //         zip_colors.push({
    //           zipcode: zip_codes[i],
    //           color: "#f1f3d6"
    //         });
    //       } else {
    //         data = this.get_license_status(zip_codes[i], res);
    //         let color = this.set_color(data[1], data[0]);
    //         zip_colors.push({
    //           zipcode: zip_codes[i],
    //           color: color
    //         });
    //       }
    //     }

    //     //determining heatmap colors
    //     for (var i = 0; i < zip_colors.length; i++) {
    //       if (zip_colors[i].zipcode == 90802) {
    //         zip_90802.setStyle({
    //           strokeColor: "black",
    //           strokeWeight: 2,
    //           fillColor: zip_colors[i].color
    //         });
    //       } else if (zip_colors[i].zipcode == 90803) {
    //         zip_90803.setStyle({
    //           strokeColor: "black",
    //           strokeWeight: 2,
    //           fillColor: zip_colors[i].color
    //         });
    //       } else if (zip_colors[i].zipcode == 90804) {
    //         zip_90804.setStyle({
    //           strokeColor: "black",
    //           strokeWeight: 2,
    //           fillColor: zip_colors[i].color
    //         });
    //       } else if (zip_colors[i].zipcode == 90805) {
    //         zip_90805.setStyle({
    //           strokeColor: "black",
    //           strokeWeight: 2,
    //           fillColor: zip_colors[i].color
    //         });
    //       } else if (zip_colors[i].zipcode == 90806) {
    //         zip_90806.setStyle({
    //           strokeColor: "black",
    //           strokeWeight: 2,
    //           fillColor: zip_colors[i].color
    //         });
    //       } else if (zip_colors[i].zipcode == 90807) {
    //         zip_90807.setStyle({
    //           strokeColor: "black",
    //           strokeWeight: 2,
    //           fillColor: zip_colors[i].color
    //         });
    //       } else if (zip_colors[i].zipcode == 90808) {
    //         zip_90808.setStyle({
    //           strokeColor: "black",
    //           strokeWeight: 2,
    //           fillColor: zip_colors[i].color
    //         });
    //       } else if (zip_colors[i].zipcode == 90809) {
    //         zip_90809.setStyle({
    //           strokeColor: "black",
    //           strokeWeight: 2,
    //           fillColor: zip_colors[i].color
    //         });
    //       } else if (zip_colors[i].zipcode == 90810) {
    //         zip_90810.setStyle({
    //           strokeColor: "black",
    //           strokeWeight: 2,
    //           fillColor: zip_colors[i].color
    //         });
    //       } else if (zip_colors[i].zipcode == 90813) {
    //         zip_90813.setStyle({
    //           strokeColor: "black",
    //           strokeWeight: 2,
    //           fillColor: zip_colors[i].color
    //         });
    //       } else if (zip_colors[i].zipcode == 90814) {
    //         zip_90814.setStyle({
    //           strokeColor: "black",
    //           strokeWeight: 2,
    //           fillColor: zip_colors[i].color
    //         });
    //       } else if (zip_colors[i].zipcode == 90815) {
    //         zip_90815.setStyle({
    //           strokeColor: "black",
    //           strokeWeight: 2,
    //           fillColor: zip_colors[i].color
    //         });
    //       } else if (zip_colors[i].zipcode == 90822) {
    //         zip_90822.setStyle({
    //           strokeColor: "black",
    //           strokeWeight: 2,
    //           fillColor: zip_colors[i].color
    //         });
    //       } else if (zip_colors[i].zipcode == 90831) {
    //         zip_90831.setStyle({
    //           strokeColor: "black",
    //           strokeWeight: 2,
    //           fillColor: zip_colors[i].color
    //         });
    //       }
    //     }
    //   })
    //   .catch(error => {
    //     console.log("error", error);
    //   });

    zip_90802.setMap(map);
    zip_90803.setMap(map);
    zip_90804.setMap(map);
    zip_90805.setMap(map);
    zip_90806.setMap(map);
    zip_90807.setMap(map);
    zip_90808.setMap(map);
    zip_90810.setMap(map);
    zip_90813.setMap(map);
    zip_90814.setMap(map);
    zip_90815.setMap(map);
    zip_90822.setMap(map);
    zip_90831.setMap(map);

    /*
    var icons = [
      {
        name: "ratio",
        url: "https://sites.google.com/site/longbeachprojectqwer/kml/red.png"
      },
      {
        name: "ratio",
        icon:
          "https://sites.google.com/site/longbeachprojectqwer/kml/orange.png"
      },
      {
        name: "ratio",
        icon:
          "https://sites.google.com/site/longbeachprojectqwer/kml/dark_yellow.png"
      },
      {
        name: "ratio",
        icon:
          "https://sites.google.com/site/longbeachprojectqwer/kml/yellow.png"
      },
      {
        name: "ratio",
        icon:
          "https://sites.google.com/site/longbeachprojectqwer/kml/light_green.png"
      },
      {
        name: "ratio",
        icon:
          "https://sites.google.com/site/longbeachprojectqwer/kml/dark_green.png"
      }
    ];
    */

    //creating heatmap legend components
    var div = document.createElement("div");
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var div3 = document.createElement("div");
    var div4 = document.createElement("div");
    var div5 = document.createElement("div");
    div.innerHTML =
      '<img src="' +
      "https://sites.google.com/site/longbeachprojectqwer/kml/red.png" +
      '"> ' +
      "0.3 < ratio";
    legend.appendChild(div);
    div1.innerHTML =
      '<img src="' +
      "https://sites.google.com/site/longbeachprojectqwer/kml/orange.png" +
      '"> ' +
      "0.2 < ratio < 0.3";
    legend.appendChild(div1);
    div2.innerHTML =
      '<img src="' +
      "https://sites.google.com/site/longbeachprojectqwer/kml/dark_yellow.png" +
      '"> ' +
      "0.15 < ratio < 0.2";
    legend.appendChild(div2);
    div3.innerHTML =
      '<img src="' +
      "https://sites.google.com/site/longbeachprojectqwer/kml/yellow.png" +
      '"> ' +
      "0.1 < ratio < 0.15";
    legend.appendChild(div3);
    div4.innerHTML =
      '<img src="' +
      "https://sites.google.com/site/longbeachprojectqwer/kml/light_green.png" +
      '"> ' +
      "0.05 < ratio < 0.1";
    legend.appendChild(div4);
    div5.innerHTML =
      '<img src="' +
      "https://sites.google.com/site/longbeachprojectqwer/kml/dark_green.png" +
      '"> ' +
      "ratio < 0.05";
    legend.appendChild(div5);

    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);

    var centerControlDiv = document.createElement("div");
    var centerControl = new this.CenterControl(centerControlDiv, map);

    map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv);
    var markerControlDiv = document.createElement("div");
    var markerControl = new this.MarkerControl(markerControlDiv, map);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(markerControlDiv);
  }

  //this function creates the "Original" button that return map to its original view
  CenterControl(controlDiv, map) {
    var controlUI = document.createElement("div");
    controlUI.style.backgroundColor = "#fff";
    controlUI.style.border = "2px solid #000";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginTop = "10px";
    controlUI.style.marginLeft = "10px";
    controlUI.style.marginBottom = "5px";
    controlUI.style.textAlign = "center";
    controlUI.title = "Click to recenter the map";
    controlDiv.appendChild(controlUI);

    var controlText = document.createElement("div");
    controlText.style.color = "rgb(25,25,25)";
    controlText.style.fontFamily = "Roboto,Arial,sans-serif";
    controlText.style.fontSize = "16px";
    controlText.style.lineHeight = "38px";
    controlText.style.paddingLeft = "5px";
    controlText.style.paddingRight = "5px";
    controlText.innerHTML = "ORIGINAL VIEW";
    controlUI.appendChild(controlText);

    controlUI.addEventListener("click", function() {
      map.setCenter({ lat: 33.7971, lng: -118.1637 });
      map.setZoom(12);
    });
  }

  // This function creates the "Clear Markers" button that clears markers pn the map
  MarkerControl(controlDiv, map) {
    var controlUI = document.createElement("div");
    controlUI.style.backgroundColor = "#fff";
    controlUI.style.border = "2px solid #000";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginLeft = "10px";
    controlUI.style.marginBottom = "5px";
    controlUI.style.textAlign = "center";
    controlDiv.appendChild(controlUI);

    var controlText = document.createElement("div");
    controlText.style.color = "rgb(25,25,25)";
    controlText.style.fontFamily = "Roboto,Arial,sans-serif";
    controlText.style.fontSize = "16px";
    controlText.style.lineHeight = "38px";
    controlText.style.paddingLeft = "5px";
    controlText.style.paddingRight = "5px";
    controlText.innerHTML = "CLEAR MARKERS";
    controlUI.appendChild(controlText);

    controlUI.addEventListener("click", function() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    });
  }

  //this function determines the zip colors on the map
  set_color(active, delinquent) {
    var ratio = delinquent / active;

    var color = "#000000";
    if (ratio > 0.3) {
      color = "#d60000";
    } else if (ratio > 0.2) {
      color = "#ff9900";
    } else if (ratio > 0.15) {
      color = "#ffd966";
    } else if (ratio > 0.1) {
      color = "#f7f700";
    } else if (ratio > 0.05) {
      color = "#c9f772";
    } else {
      color = "#6b915b";
    }
    return color;
  }

  //this function checks if API returns data a zip code
  check_zipcode(zip, zip_list) {
    var present = false;
    for (var k = 0; k < zip_list.length; k++) {
      if (zip == zip_list[k].zipcode) {
        present = true;
        break;
      }
    }
    return present;
  }

  //this function identifies delinquent and active business count for zip
  //from the data returned by API
  get_license_status(zip, api) {
    var licenses = [];
    var index = 0;
    for (var m = 0; m < api.length; m++) {
      if (zip == api[m].zipcode) {
        licenses[0] = api[m].delinquent_count;
        licenses[1] = api[m].active_count;
        index = m;
        break;
      }
    }
    return licenses;
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyCys__gg8EEH6Mor2NnnVYL8Y5qukV_mI4`;
      var x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
      // Below is important.
      //We cannot access google.maps until it's finished loading
      s.addEventListener("load", e => {
        this.onScriptLoad();
      });
    } else {
      this.onScriptLoad();
    }
  }

  render() {
    return (
      <div style={{ margin: "-24px -24px 0" }}>
        <div id="mapContainer">
          <div style={{ width: "100%", height: "92vh" }} id="map" />
          <div
            style={{
              background: "#fff",
              padding: "10px",
              margin: "10px",
              border: "3px solid #000"
            }}
            id="legend"
          >
            <h3>HEATMAP LEGEND</h3>
            <h4>Ratio = delinquent / active</h4>
          </div>
        </div>
        <CardDrawer ref={this.drawer} zipcode={this.state.zipcode} />
      </div>
    );
  }
}

export default Map;
