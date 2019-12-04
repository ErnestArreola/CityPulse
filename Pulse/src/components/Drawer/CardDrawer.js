import { Drawer, Button, Radio } from 'antd';
import React from 'react'
import BusinessList from '@/components/BusinessList/BusinessList'
import { queryBusiness, queryBusinessList, zipcoderatio } from "@/services/api";


const RadioGroup = Radio.Group;
var list = [];

class CardDrawer extends React.Component {

  constructor(props){
    super(props);
  }

  //I

  state = {
    visible: false,
    placement: 'left',
    businesses: []
  };

  fetchBusinesses = (zip) => {
    queryBusinessList(zip.zipcode).then(res => {
      this.setState({
        businesses: res
      })
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps && this.props.zipcode !== null) {
      this.fetchBusinesses(this.props);
    }
  }


  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = (e) => {
    this.setState({
      placement: e.target.value,
    });
  }

  render() {
    return (
      <div id='CardContainer'>
        <Drawer
          title="Businesses"
          placement={this.state.placement}
          onClose={this.onClose}
          visible={this.state.visible}
          mask = {false}
          closable={true}
          placement={'right'}
          width = {320}
        >
          <div>
            <BusinessList
              data={this.state.businesses}
              loading = {true}
            /> <br/>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default CardDrawer;