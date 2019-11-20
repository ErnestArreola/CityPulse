import React, { Component } from 'react';
import { Card, Typography, Alert } from 'antd';
import EsriMap from '../../components/PulseMap/PulseMap';




export default class App extends Component {






    render() {
        return
        (
            <div>
                <Card>
                    <EsriMap/>
                </Card>
            </div>
        )
    }
}