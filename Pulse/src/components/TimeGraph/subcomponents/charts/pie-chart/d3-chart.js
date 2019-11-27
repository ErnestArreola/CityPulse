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

const MARGIN = { TOP: 40, BOTTOM: 0, LEFT: 0, RIGHT: 0 };
const WIDTH = 250 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 250 - MARGIN.TOP - MARGIN.BOTTOM;
const RADIUS = Math.min(WIDTH, HEIGHT) / 2;

export default class D3Chart {
  constructor(element, data0) {
    const vis = this;
    vis.data = data0

    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

      vis.pie = d3.pie()
		.padAngle(0.03)
		.value(d => { return d.rating; })
		.sort(null);

      vis.arc = d3.arc()
		.innerRadius(RADIUS - 60)
		.outerRadius(RADIUS - 30);


    vis.xLabel = vis.svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 49)
      .attr('text-anchor', 'middle');

    vis.svg
      .append('text')
      .attr('x', -20)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .text('Ratings')
      .attr('tranform', 'rotate(-90)');

    vis.xAxisGroup = vis.svg.append('g')
    .attr('transform', `translate(0, ${HEIGHT})`);

    vis.yAxisGroup = vis.svg.append('g');



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
      .domain(d3.max(d3.extent(vis.data, d => d.rating)))
      .range([HEIGHT, 0]);

    vis.x = d3
      .scaleTime()
      .domain(d3.extent(vis.data, d => d.date))
      .range([0, WIDTH]);

    const line = d3.line()
    .x(d => vis.x(d.date))
    .y(d => vis.y(d.rating));

      // const pathString = lineGenerator(vis.data);
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

    vis.svg.append('path')
    .attr("fill", "none")
    .attr('stroke', 'black')
      .attr('d', line(vis.data));

  }
}
/* */
