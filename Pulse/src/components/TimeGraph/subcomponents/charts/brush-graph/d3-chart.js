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

const MARGIN = { TOP: 0, BOTTOM: 150, LEFT: 10, RIGHT: 10 };
const WIDTH = 700 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 200 - MARGIN.TOP - MARGIN.BOTTOM;

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

    vis.xLabel = vis.svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 49)
      .attr('text-anchor', 'middle');



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

    vis.y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(vis.data, d => d.rating)+1])
      .range([HEIGHT, 0]);

    vis.x = d3
      .scaleTime()
      .domain(d3.extent(vis.data, d => d.date))
      .range([0, WIDTH]);

    const area = d3.area()
    .x(d => vis.x(d.date))
    .y0(HEIGHT)
    .y1(d => vis.y(d.rating));

      // const pathString = lineGenerator(vis.data);
    const xAxisCall = d3.axisBottom(vis.x);
    vis.xAxisGroup
      .transition()
      .duration(500)
      .call(xAxisCall);



    vis.svg.append('path').datum(vis.data)
    .attr("fill", "#ccc")
    .attr('stroke', 'black')
      .attr('d', area);

      vis.brush = d3
      .brushX()
      .handleSize(10)
      .extent([[0,0], [WIDTH, HEIGHT]]);

      vis.brushComp = vis.svg.append("g").attr("class", "brush").call(vis.brush);
      vis.brush.on("brush", d => {console.log(d3.event)});
  }
}
/* */
