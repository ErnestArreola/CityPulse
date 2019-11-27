import React, { Component } from 'react';
import { Card, Typography, Alert } from 'antd';
import EsriMap from '../../components/PulseMap/PulseMap';




export default class Map extends React.Component {

render() {
return(


    <div>
        <Card>
            <EsriMap/>
        </Card>
    </div>
);


}



}



