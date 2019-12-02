import React, { Component } from 'react';
import D3Chart from './d3-chart';

export default class ChartWrapper extends Component {

  getDayofYear = (today) =>
  {
    var now = new Date(today);
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    //console.log("YEARYEAR")
  //  console.log()
    return (now.getYear()-100)  + day;

  }

  componentDidMount() {

    console.log("HEREEEE")
    console.log(this.props.data)
        this.props.data.sort((a, b) => {
          var ay = new Date(a.date)
          var be = new Date(b.date)
          var ayear = ay.getYear()
          var amonth = ay.getMonth()
          var aday = ay.getDay()
          var byear = be.getYear()
        var  bmonth = be.getMonth()
          var bday = be.getDay()
          let flag = true
          //a is lower than b
              if (ayear > byear)
                {flag = false}
              else if (ayear === byear)
                {
                      if (amonth > bmonth)
                      {
                        flag = false
                        console.log("HEREEEEsort")
                        console.log(ayear + ", " + amonth + " " + byear + ", " + bmonth)
                      }
                      else if( amonth === bmonth)
                      {
                            if(aday > bday){flag = false}
                      }
                }
                console.log("Flag" + flag)
                return flag
        })
        console.log("HEREEEEsort")
        console.log(this.props.data)
        this.props.data.forEach(d => {
          d.date = this.getDayofYear(d.date)
          d.rating = d.rating
        })
    this.setState({
      chart: new D3Chart(this.refs.chart, this.props.data),
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div ref="chart"></div>;
  }
}
