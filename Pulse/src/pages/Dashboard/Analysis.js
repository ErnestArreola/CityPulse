import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown, Card, Drawer, Button } from "antd";
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import PriorirtDrawer from '@/components/PriorityDrawer/index'
import Map from '@/components/Map/Map'
import CardDrawer from '@/components/Drawer/CardDrawer'

/**
 *  Simple Page that renders our Map Component.
 *  Functionality of Map is implemented in the components section.
 *
 * **/



class Analysis extends Component {

  render() {
    return (
     <Map/>
    );
  }




}

export default Analysis;