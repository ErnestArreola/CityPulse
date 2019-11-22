import React, {Component} from 'react';
import './word-cloud.css';


export default class WordCloud extends Component {
  constructor(props) {
    super(props);
    this.addi = `http://localhost:8000/media/images/image${this.props.index}.png`

  }
  render() {
    console.log("WOOOOOOOOOO")
    console.log(this.addi)
    const cssClasses = ['WordCloud', this.props.show ? 'WordCloudOpen' : 'WordCloudClosed'];

    return (
      <div className={cssClasses.join(' ')}>
      <img
        src={this.addi}
        alt="new"
        />
      </div>


    )
  }
}
