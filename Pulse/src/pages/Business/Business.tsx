import React, { Component } from 'react';
import { Card, Typography, Alert } from 'antd';
import { Col, Row, Statistic, Tooltip } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { GridContent } from '@ant-design/pro-layout';
import styles from './Business.less';

import BusinessMap from '../../components/BusinessMap/BusinessMap';

const styless =  {
    container: {
      height: '55vh',
    },
}


export default class Map extends React.Component {

render() {
return(

<GridContent>
        <React.Fragment>
          <Row gutter={24}>
            <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card 
                title={
                  <FormattedMessage
                    id="dashboardmonitor.monitor.trading-activity"
                    defaultMessage="Real-Time Trading Activity"
                  />
                }
                bordered={false}
              >
                <Row>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      title={
                        <FormattedMessage
                          id="dashboardmonitor.monitor.total-transactions"
                          defaultMessage="Total transactions today"
                        />
                      }
                    />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      title={
                        <FormattedMessage
                          id="dashboardmonitor.monitor.sales-target"
                          defaultMessage="Sales target completion rate"
                        />
                      }
                      value="92%"
                    />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      title={
                        <FormattedMessage
                          id="dashboardmonitor.monitor.remaining-time"
                          defaultMessage="Remaining time of activity"
                        />
                      }
                    >
                    </Statistic>
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      title={
                        <FormattedMessage
                          id="dashboardmonitor.monitor.total-transactions-per-second"
                          defaultMessage="Total transactions per second"
                        />
                      }
                    />
                  </Col>
                </Row>
                <div className={styles.mapChart}>
                  <Tooltip
                    title={
                      <FormattedMessage
                        id="dashboardmonitor.monitor.waiting-for-implementation"
                        defaultMessage="Waiting for implementation"
                      />
                    }
                  >
                      <BusinessMap/>
                  </Tooltip>
                </div>
              </Card>
            </Col>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <Card
                title={
                  <FormattedMessage
                    id="dashboardmonitor.monitor.activity-forecast"
                    defaultMessage="Activity forecast"
                  />
                }
                style={{ marginBottom: 24 }}
                bordered={false}
              >
                {/* <ActiveChart /> */}
              </Card>
              <Card
                title={
                  <FormattedMessage
                    id="dashboardmonitor.monitor.efficiency"
                    defaultMessage="Efficiency"
                  />
                }
                style={{ marginBottom: 24 }}
                bodyStyle={{ textAlign: 'center' }}
                bordered={false}
              >
              </Card>
            </Col>
          </Row>
          {/* <Row gutter={24}>
            <Col xl={12} lg={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card
                title={
                  <FormattedMessage
                    id="dashboardmonitor.monitor.proportion-per-category"
                    defaultMessage="Proportion Per Category"
                  />
                }
                bordered={false}
                className={styles.pieCard}
              >
                <Row style={{ padding: '16px 0' }}>
                  <Col span={8}>

                  </Col>
                  <Col span={8}>
                    
                  </Col>
                  <Col span={8}>
                   
                  </Col>
                </Row>
              </Card>
            </Col> */}
            {/* <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card
                title={
                  <FormattedMessage
                    id="dashboardmonitor.monitor.popular-searches"
                    defaultMessage="Popular Searches"
                  />
                }
                // loading={loading}
                bordered={false}
                bodyStyle={{ overflow: 'hidden' }}
              > */}
                {/* <TagCloud data={tags || []} height={161} /> */}
              {/* </Card>
            </Col> */}
            {/* <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card
                title={
                  <FormattedMessage
                    id="dashboardmonitor.monitor.resource-surplus"
                    defaultMessage="Resource Surplus"
                  />
                }
                bodyStyle={{ textAlign: 'center', fontSize: 0 }}
                bordered={false}
              > */}
                {/* <WaterWave
                  height={161}
                  title={
                    <FormattedMessage
                      id="dashboardmonitor.monitor.fund-surplus"
                      defaultMessage="Fund Surplus"
                    />
                  }
                  percent={34}
                /> */}
              {/* </Card>
            </Col>
          </Row> */}
        </React.Fragment>
      </GridContent>
);


}



}



