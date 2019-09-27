import React, {Component, Fragment} from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import {MapView} from 'expo';
import {Polygon} from 'react-native-maps';
import Geojson from "react-native-geojson";
import MapPolygon from "react-native-maps/lib/components/MapPolygon";
import {MapPolygonProps as polygon} from "react-native-maps";
import longBeach from './model/longBeach'
import Modal from 'react-native-modalbox';
import SlidingPanel from "../SlidingPanel/SlidingPanel";


var zip_codes = [
    90802, 90803, 90804, 90805, 90806, 90807, 90808, 90810, 90813, 90814, 90815, 90822, 90831
];

const {width, height} = Dimensions.get('window');
var zip_colors = new Array();
var config = {
    headers: { "content-type": "application/x-www-form-urlencoded" }
};


export default class Map extends React.Component {

    constructor() {
        super();
        this.state = {
            isOpen: true,
            isDisabled: false,
            swipeToClose: true,
            sliderValue: 0.3,
            loading: true,
            zipcode: null,
            region: {
                latitude: 33.7971,
                longitude: -118.1637,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5 * (width / height),
            },
            slideUpPanelvisible: false
        }
    }

    set_color(active, delinquent) {
        var ratio = delinquent / active;

        var color = "#000000";
        if (ratio > 0.3) {
            color = "rgba(214,0,0,0.5)";
        } else if (ratio > 0.2) {
            color = "rgba(255, 153, 0, 0.5)";
        } else if (ratio > 0.15) {
            color = "rgba(255, 217, 102, 0.5)";
        } else if (ratio > 0.1) {
            color = "rgba(247, 247, 0, 0.5)";
        } else if (ratio > 0.05) {
            color = "rgba(201, 247, 114, 0.5)";
        } else {
            color = "rgba(107, 145, 91, 0.5)";
        }
        return color;
    }

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
        fetch("http://192.168.0.175:8000/api/zipcoderatio/")
            .then(response => response.json())
            .then((responseJson) => {
                for (var i = 0; i < zip_codes.length; i++) {
                    let data = [];
                    if (this.check_zipcode(zip_codes[i], responseJson) == false) {
                        zip_colors.push({
                            zipcode: zip_codes[i],
                            color: "#f1f3d6"
                        });
                    } else {
                        data = this.get_license_status(zip_codes[i], responseJson);
                        let color = this.set_color(data[1], data[0]);
                        zip_colors.push({
                            zipcode: zip_codes[i],
                            color: color
                        });
                    }
                }

            }).then(response => {this.setState({loading: false})})
            .catch(error=>console.log(error)); //to catch the errors if any
    }

    // After they click on a zip Code: Action Here

    handleOnPress(polygon) {

    }


    render() {
        const window = Dimensions.get('window');
        //Delay the rendering, until API request finishes (componentDidMount)
        if(this.state.loading) {
            return <View stle={styler.loader}>
                <ActivityIndicator size = "large" color = "#0c9"/>
            </View>
        }
        return (

            <View style = {styles.container}>
                <MapView
                    style={styles.map}
                    provider = "google"
                    initialRegion={this.state.region}
                >
                    {longBeach.polygons.map((polygon, index) => (
                        <View key = {index}>
                            <Polygon
                                coordinates={polygon.coordinates}
                                tappable={true}
                                onPress={() => this.setState({ slideUpPanelvisible: true })}
                                strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                                strokeColors={"black"}
                                strokeWidth={2}
                                fillColor={zip_colors[zip_colors.findIndex(x => x.zipcode === polygon.zip)].color}
                            />
                        </View>
                    ))}
                </MapView>
                {/*<Fragment>*/}
                    {/*<SlidingPanel*/}
                        {/*visible={this.state.slideUpPanelvisible}*/}
                        {/*draggableRange={{ top: window.height * 0.4, bottom: 0 }}*/}
                        {/*startCollapsed={true}*/}
                    {/*/>*/}
                {/*</Fragment>*/}
            </View>
        );
    }
}


const styles = {
    container: {
        alignItems: 'stretch',
        flex: 1,
    },
    map: {
        flex: 1,
    },
};

const styler = StyleSheet.create({
    loader:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});





