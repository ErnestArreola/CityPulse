import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';
import { Slider, Card } from 'antd';
import { Divider } from 'antd';

import CompareTopBusiness from '../../components/TopBusinessGraph/CompareTopBusiness';
import ScatterPlot from '../../components/ScatterPlot/ScatterPlot';
import BarChart from '../../components/BarChart/BarChart';
import TimeGraph from '../../components/TimeGraph/TimeGraph';
import AreaChart from '../../components/Charts/AreaChart/AreaChart';


export default class App extends Component {

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {  };
  }

  componentDidMount() {  }

  render() {
    return (
      <div>
      <Card>
          <TimeGraph/>
     </Card>

         <Card>
             <ScatterPlot/>
         </Card>
         <Card>
             <BarChart/>
        </Card>
         <Card>
             <CompareTopBusiness/>
         </Card>
      </div>
    );
  }
}
