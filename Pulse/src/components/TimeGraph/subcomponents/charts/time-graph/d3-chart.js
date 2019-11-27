import * as d3 from 'd3';

const MARGIN = { TOP: 50, BOTTOM: 19, LEFT: 42, RIGHT: 30 };
const WIDTH = 680 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 580 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Chart {
  constructor(element, data0, brushed, brushMinMax) {
    const vis = this

    vis.brushed = brushed
    vis.brushMinMax = brushMinMax
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
      .attr('x', -20)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .text('Ratings')
      .attr('tranform', 'rotate(-90)');

    vis.xAxisGroup = vis.svg.append('g')
    .attr('transform', `translate(0, ${HEIGHT})`);

    vis.yAxisGroup = vis.svg.append('g');

    vis.update(data0);
  }

  update(data0) {
    const vis = this;
    vis.data = data0

    const yValue = d => d.rating;
    const xValue = d => d.date;

    vis.y = d3
      .scaleLinear()
      .domain(d3.extent(vis.data, d => d.rating))
      .range([HEIGHT, 0]);

    vis.x = d3
      .scaleTime()
      .domain(d3.extent(vis.data, d => d.date))
      .range([0, WIDTH]);

    const area = d3.area()
    .x(d => vis.x(d.date))
    .y0(HEIGHT)
    .y1(d => vis.y(d.rating));

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

    vis.svg.selectAll("path").remove();

    vis.svg.append('path').datum(vis.data)
    .attr("fill", "lightblue")
    .attr('stroke', 'black')
    .attr('d', area);
  }
}
/* */
