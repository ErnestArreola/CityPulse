import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Button, Form, Input } from 'antd';

export default class Table extends Component {
  state = {
      name: "",
      rating: "",
      month: "",
      temp: []
  }

  handleChange = (event) => {
        this.setState({ [event.target.name]: this.props.data.data[parseInt(event.target.name)] })

    }

    handleRemove = (event) => {
      console.log("lookLOOKLOOK")
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
            month: ""
        })
      //  console.log("in handleSubmit")
      //  console.log(newData)
    }

    renderRows() {
        return (
            this.props.data.data.map( (d, i) => {
                const background = (this.props.data.months[i] === this.props.activeName) ? "grey" : "white"
                return (
                    <Row
                        key={this.props.data.months[i]}
                        style={{ marginTop: "10px", backgroundColor: background }}
                    >
                        <Col xs={3}>{this.props.data.months[i]}</Col>
                        <Col xs={3}>{d}</Col>
                        <Col xs={3}>{d}</Col>
                        <Col xs={3}>
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
                    </Row>
                )
            })
        )
    }

//data={this.state.graphsData} updateData={this.updateData} activeName={this.state.activeName}
    render() {
        return (
            <div>
              {this.renderRows()}
            </div>
        )
    }
}