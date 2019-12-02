import React, { Component } from 'react';
import { Card, Typography, Alert } from 'antd';
import EsriMap from '../../components/PulseMap/PulseMap';
import App from '@/components/PulseMap/app';



export default class Map extends React.Component {

render() {
return(


    <div>
        <Card>
            <App/>
        </Card>
    </div>
);


}



}



