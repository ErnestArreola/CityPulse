import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Button, Form, Input } from 'antd';
import { Collapse } from 'antd';
import { Icon } from 'antd';
import WordCloud from './WordCloud/word-cloud';
import { Modal } from 'antd';

const { Panel } = Collapse;

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
      console.log("inshowModal")
      console.log(this.state.modalIsOpen)
      this.setState({visible: true});

      console.log(this.state.modalIsOpen)
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
          console.log("d")
          console.log(d)
          console.log("event.target.name")
          console.log(event.target.name)
            if  (d !== parseInt(event.target.name))
            {
                this.state.temp.push(this.props.data.data[i])
                console.log("ADDED")
            }
            return d !== parseInt(event.target.name)
        })

          const rand = { months: newMonths, data: this.state.temp}

          this.setState({temp: []})
          this.props.updateData(rand)
          console.log(this.props.data)
    }

    handleSubmit = () => {
        this.props.updateData([...this.props.data, this.state])
        this.setState({
            name: "",
            rating: "",
            month: "",
            modalIsOpen: false
        })
      //  console.log("in handleSubmit")
      //  console.log(newData)
    }

     callback = (key) =>  {
      console.log(key);
    }


    renderRows() {
      console.log("in table Main")
      console.log(this.state.modalIsOpen)
        return (
            this.props.data.data.map( (d, i) => {
                const background = (this.props.data.months[i] === this.props.activeName) ? "grey" : "white"
                return (
                    <Row gutter={[48, 16]}
                        key={this.props.data.months[i]}
                        style={{ marginTop: "10px", backgroundColor: background }}
                    >
                        <Col span={6} >
                            <Button
                                variant={"danger"}
                                type={"button"}
                                style={{ width: "100%" }}
                                name={this.props.data.months[i]}
                                onClick={this.handleRemove}
                            >
                             Remove
                            </Button>
                        </Col>
                        <Col span={6} >{this.props.data.months[i]} <Icon type="calendar" height={'3em'} width={'3em'}/></Col>
                        <Col span={6} >{d} <Icon type="star" height={'3em'} width={'3em'}/> </Col>
                        <Col xs={14} span={6}>
                        <Collapse accordion>
                           <Panel header="Word Cloud" key="1">
                            <Button type="primary" onClick={this.showModal}>
                             Word Cloud
                             </Button>
                           <Modal
                             title="Basic Modal"
                             visible={this.state.visible}
                             onOk={this.handleOk}
                             onCancel={this.handleCancel}
                           >
                             <p>Some contents...</p>
                             <WordCloud index={this.props.data.months[i]}/>
                           </Modal>
                           </Panel>

                         </Collapse>
                        </Col>
                    </Row>
                )
            })
        )
    }

//data={this.state.graphsData} updateData={this.updateData} activeName={this.state.activeName}
    render() {
      console.log("in table render this.state.ModalIsOpen")
      console.log(this.state.modalIsOpen)
        return (
            <div>
              {this.renderRows()}
            </div>
        )
    }
}
