import React, {Component} from 'react';

export default class WordCloud extends Component {
  constructor(props) {
    super(props);
    this.addi = `http://localhost:8000/media/images/image${this.props.index}.png`

  }
  render() {
    console.log("WOOOOOOOOOO")
    console.log(this.addi)
    return (
      <img
        src={this.addi}
        alt="new"
        />

    )
  }
}
