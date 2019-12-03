import React, { Component, Suspense } from 'react';
import { Col, Dropdown, Icon, Menu, Row } from 'antd';
import { Slider, Card } from 'antd';
import { Divider } from 'antd';

import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { RadioChangeEvent } from 'antd/es/radio';
import { RangePickerValue } from 'antd/es/date-picker/interface';
import { connect } from 'dva';
import PageLoading from '../DashboardAnalysis/components/PageLoading';
import { getTimeDistance } from '../DashboardAnalysis/utils/utils';
import { AnalysisData } from '../DashboardAnalysis/data.d';
import styles from '../DashboardAnalysis/style.less';


import CompareTopBusiness from '../../components/TopBusinessGraph/CompareTopBusiness';
import SentimentAnalysis from '@/components/SentimentAnalysis/SentimentAnalysis';

// import ScatterPlotWrapper from './subcomponents/charts/scatterplot-chart/chart-wrapper';
import BarChart from '../../components/BarChart/BarChart';


const IntroduceRow = React.lazy(() => import('../DashboardAnalysis/components/IntroduceRow'));
const SalesCard = React.lazy(() => import('../DashboardAnalysis/components/SalesCard'));
const TopSearch = React.lazy(() => import('../DashboardAnalysis/components/TopSearch'));
const ProportionSales = React.lazy(() => import('../DashboardAnalysis/components/ProportionSales'));
const OfflineData = React.lazy(() => import('../DashboardAnalysis/components/OfflineData'));

interface DashboardAnalysisProps {
  dashboardAnalysis: AnalysisData;
  dispatch: Dispatch<any>;
  loading: boolean;
}

interface DashboardAnalysisState {
  salesType: 'all' | 'online' | 'stores';
  currentTabKey: string;
  rangePickerValue: RangePickerValue;
}

@connect(
  ({
    dashboardAnalysis,
    loading,
  }: {
    dashboardAnalysis: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    dashboardAnalysis,
    loading: loading.effects['dashboardAnalysis/fetch'],
  }),
)



export default class App extends Component <



  
  DashboardAnalysisProps,
  DashboardAnalysisState
> {
  
  state: DashboardAnalysisState = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  reqRef: number = 0;

  timeoutId: number = 0;

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'dashboardAnalysis/fetch',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAnalysis/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  handleChangeSalesType = (e: RadioChangeEvent) => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = (key: string) => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = (rangePickerValue: RangePickerValue) => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    dispatch({
      type: 'dashboardAnalysis/fetchSalesData',
    });
  };

  selectDate = (type: 'today' | 'week' | 'month' | 'year') => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    dispatch({
      type: 'dashboardAnalysis/fetchSalesData',
    });
  };

  isActive = (type: 'today' | 'week' | 'month' | 'year') => {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  render() {
    const { rangePickerValue, salesType, currentTabKey } = this.state;
    const { dashboardAnalysis, loading } = this.props;
    const {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = dashboardAnalysis;
    let salesPieData;
    if (salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }
    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);
    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={<PageLoading />}>
            <IntroduceRow loading={loading} visitData={visitData} />
          </Suspense>
          <Suspense fallback={null}>
            {/* <SalesCard
              rangePickerValue={rangePickerValue}
              salesData={salesData}
              isActive={this.isActive}
              handleRangePickerChange={this.handleRangePickerChange}
              loading={loading}
              selectDate={this.selectDate}
            /> */}
          </Suspense>
          <Row
            gutter={24}
            type="flex"
            style={{
              marginTop: 24,
            }}
          >
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              {/* <Suspense fallback={null}> */}
              <SentimentAnalysis/>
              {/* </Suspense> */}
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              {/* <Suspense fallback={null}>
                <ProportionSales
                  dropdownGroup={dropdownGroup}
                  salesType={salesType}
                  loading={loading}
                  salesPieData={salesPieData}
                  handleChangeSalesType={this.handleChangeSalesType}
                />
              </Suspense> */}
            </Col>
          </Row>
          {/* <Suspense fallback={null}>
            <OfflineData
              activeKey={activeKey}
              loading={loading}
              offlineData={offlineData}
              offlineChartData={offlineChartData}
              handleTabChange={this.handleTabChange}
            />
          </Suspense> */}
        <Row gutter={24} style={{marginBottom: 24, marginLeft:0, marginRight: 0, paddingLeft:0, paddingTop: 24}}>
          <Card
            bodyStyle={{ paddingTop: 12, paddingBottom: 12, paddingRight:0, paddingLeft:0}}
            bordered={false}
            // title="Card"
          >
            <Col xl={6} >
              <CompareTopBusiness/>
            </Col>
          </Card>
        </Row>
        </React.Fragment>
      </GridContent>
    );
  }
}
