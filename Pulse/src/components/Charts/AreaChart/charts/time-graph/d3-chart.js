import * as d3 from 'd3';
import {
  select,
  csv,
  scaleLinear,
  scaleTime,
  extent,
  axisLeft,
  axisBottom,
  line,
  curveBasis
} from 'd3';

const MARGIN = { TOP: 50, BOTTOM: 160, LEFT: 150, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Chart {
  constructor(element, data0) {
    const vis = this;
    vis.data = data0
    //console.log(d3.max(vis.data.rating))
    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    vis.xLabel = vis.svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 49)
      .attr('text-anchor', 'middle');

    vis.svg
      .append('text')
      .attr('x', -(HEIGHT / 2))
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .text('Ratings')
      .attr('tranform', 'rotate(-90)');

    vis.xAxisGroup = vis.svg.append('g')
    .attr("class", "x-axis")
    .attr('transform', `translate(0, ${HEIGHT})`);

    vis.yAxisGroup = vis.svg.append('g').attr("class", "y-axis");

    vis.update('');
  }

  update(bus) {
    const vis = this;
    bus = "current"
    const yValue = d => d.rating;
    const xValue = d => d.date;

    vis.xLabel.text(`Business ${bus}`);

    vis.y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(vis.data, d => d.rating)])
      .range([HEIGHT, 0]);

    vis.x = d3
      .scaleLinear()
      .domain(d3.extent(vis.data, d => d.date))
      .range([0, WIDTH]);

      const lineGenerator = d3.line().defined(d => !isNaN(d.date))
        .x(d => vis.x(d.date))
        .y(d => vis.y(d.rating))
        .curve(curveBasis);


       const pathString = lineGenerator(vis.data);
    const xAxisCall = d3.axisBottom(vis.x);
    vis.xAxisGroup
      .transition()
      .duration(500)
      .call(xAxisCall);

    const yAxisCall = d3.axisLeft(vis.y);
    vis.yAxisGroup
      .transition()
      .duration(500)
      .call(yAxisCall);




    // Data join happens
  //  const lines = vis.svg.selectAll('path').data(vis.data);




    //Enter happens
    vis.svg.append('path')
    .attr("class", "line")
    .attr("fill", "none")
    .attr('stroke', 'black')
      .attr('d', lineGenerator(vis.data));
  }
}
/* */
