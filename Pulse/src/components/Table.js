import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Button, Form, Input } from 'antd';
import { Collapse } from 'antd';
import { Icon } from 'antd';
import { Modal } from 'antd';
import { Card } from 'antd';

import WordCloud from './WordCloud/word-cloud';
const monthNames = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "November", "October", "December"]
const gridStyle = {
width: '100%',
textAlign: 'center'
};

export default class Table extends Component {
    state = {
        name: "",
        rating: "",
        month: "",
        temp: [],
        visible: false
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: this.props.data.data[parseInt(event.target.name)] })
    }

    showModal = () => {
      this.setState({visible: true});
    };

    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };

    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };

    handleRemove = (event) => {
        const newMonths = this.props.data.months.filter( (d, i) => {

            if  (d !== parseInt(event.target.name))
            {
                this.state.temp.push(this.props.data.data[i])
            }
            return d !== parseInt(event.target.name)
        })

          const rand = { months: newMonths, data: this.state.temp}

          this.setState({temp: []})
          this.props.updateData(rand)
    }

    handleSubmit = () => {
        this.props.updateData([...this.props.data, this.state])
        this.setState({
            name: "",
            rating: "",
            month: "",
            modalIsOpen: false
        })
    }

     callback = (key) =>  {
      console.log(key);
    }

    renderRows() {
        return (
            this.props.data.data.map( (d, i) => {
                const background = (this.props.data.months[i] === this.props.activeName) ? "grey" : "white"
                return (


                  <Row style={{background: background}}>
                  <Col span={12}>
                      <p> <Icon type="calendar" style={{ marginRight: "4px", marginLeft: "4px"}} height={'20em'} width={'20em'}/>
                        {monthNames[this.props.data.months[i]-1]}
                        <Icon type="star" style={{marginRight: "4px", marginLeft: "8px"}} height={'20em'} width={'20em'}/>
                        {d} Avg Rating
                      </p>
                  </Col>
                  <Col span={12} >
                                  <Button
                                      variant={"danger"}
                                      type={"dashed"}
                                      style={{ backgroundColor: "red", color: "white" }}
                                      name={this.props.data.months[i]}
                                      onClick={this.handleRemove}
                                  >
                                   Remove
                                  </Button>
                                  <Button type="primary" onClick={this.showModal}
                                  style={{ marginLeft: "10px", backgroundColor: "lightblue", color: "white" }}>
                                    Word Cloud
                                   </Button>
                                  <Modal
                                     title="Basic Modal"
                                     visible={this.state.visible}
                                     onOk={this.handleOk}
                                     onCancel={this.handleCancel}
                                  >
                                  <p>Some contents...</p>
                                  <WordCloud index={this.props.data.months[i-1]}/>
                                 </Modal>
                      </Col>
            </Row>

                )
            })
        )
    }

    render() {
          return (
              <div>
              <Card title="Monthly Reviews">
                    {this.renderRows()}
              </Card>
              </div>
          )
        }
    }
