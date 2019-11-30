import React, { Component, Fragment, Suspense } from 'react';
import { Row, Col, Dropdown, Icon, Menu } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Slider, Card } from 'antd';
import { Divider } from 'antd';
import {GridContent} from '@ant-design/pro-layout';
import PageLoading from '@/components/PageLoading';
import styles from '../Graphs/Graphs.less';


import CompareTopBusiness from '../../components/TopBusinessGraph/CompareTopBusiness';
import ScatterPlot from '../../components/ScatterPlot/ScatterPlot';
import BarChart from '../../components/BarChart/BarChart';
import TimeGraph from '../../components/TimeGraph/TimeGraph';
import AreaChart from '../../components/Charts/AreaChart/AreaChart';


export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      businessID: null
      };
  }


  setBusiness(business){
    this.setState({
      businessID: business.business
    })
    console.log(businessID);
  }


  componentDidUpdate(prevProps) {
    if (this.props !== prevProps && this.props.children !== null) {
      this.setBusiness(this.props);
      console.log("HERRRO");
    }
  }



  componentDidMount() {  }

  render() {
    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={<PageLoading/>}>
     </Suspense>

     <Suspense fallback ={null}>
     <Card bordered={false} bodyStyle={{ padding: 14 }}>
     <div className={styles.salesCard}>
          <TimeGraph />
          </div>
     </Card>
     </Suspense>

     <Suspense fallback ={null}>
      <Card 
        bordered={false} 
        bodyStyle={{ padding: 20 } }    
        title={
        <FormattedMessage
          id="Scatter Plot"
          defaultMessage="Reviews Per Month"
        />}>
      <div>
            <ScatterPlot />
            </div>
      </Card>
     </Suspense>

     <Row
            gutter={24}
            type="flex"
            style={{
              marginTop: 24,
            }}
          >
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <Card></Card>

              </Suspense>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <BarChart
                />
              </Suspense>
            </Col>
          </Row>
         </React.Fragment>
         </GridContent>    
         );
  }
}
