import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Button, Form, Input } from 'antd';

export default class Table extends Component {
  state = {
      name: "",
      rating: "",
      month: "",
      newSet: {
        months: [],
        data: []
      }
  }

  handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })

    }

    handleRemove = (event) => {
      console.log("b4 handleRemove")
      console.log(this.props.data)
        const newMonths = this.props.data.months.filter( d => {
            return d !== parseInt(event.target.name)
        })
        console.log("after getting new months")
        console.log(newMonths)
          console.log(this.props.data)
        const newData = this.props.data.data.filter( d => {

          console.log("d")
          console.log(d)
          console.log("target.value")
          console.log(this.props.data.data.data)
            return d !== this.props.data.data.data[parseInt(event.target.name)]
        })
        console.log("after getting new newData")
        console.log(newData)
          this.setState(newSet: {
            data: newData,
            months: newMonths
          })
          this.props.updateData(this.state.newSet)
          console.log("after handleRemove")
          console.log(this.props.data)
    }

    handleSubmit = () => {
        this.props.updateData([...this.props.data, this.state])
        this.setState({
            name: "",
            rating: "",
            month: ""
        })
        console.log("in handleSubmit")
        console.log(newData)
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
