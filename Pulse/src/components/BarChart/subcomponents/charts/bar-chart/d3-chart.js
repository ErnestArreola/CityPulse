import * as d3 from 'd3';

const MARGIN = { TOP: 50, BOTTOM: 260, LEFT: 150, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

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

    vis.svg
      .append('text')
      .attr('x', -(HEIGHT / 2))
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .text('Ratings')
      .attr('tranform', 'rotate(-90)');

    vis.xAxisGroup = vis.svg.append('g').attr('transform', `translate(0, ${HEIGHT})`);

    vis.yAxisGroup = vis.svg.append('g');

    vis.update('');
  }

  update(bus) {
    const vis = this;
    bus = "current"
    
    vis.xLabel.text(`Business ${bus}`);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(vis.data, d => d.rating) * 0.95,
        d3.max(vis.data, d => d.rating)])
          .range([HEIGHT, 0]);

    const x = d3
      .scaleBand()
      .domain(vis.data.map(d => d.date))
      .range([0, WIDTH])
      .padding(0.5);

    const xAxisCall = d3.axisBottom(x);
    vis.xAxisGroup
      .transition()
      .duration(500)
      .call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    vis.yAxisGroup
      .transition()
      .duration(500)
      .call(yAxisCall);

    // Data join happens
    const rectangles = vis.svg.selectAll('rect').data(vis.data);

    //Exit
    rectangles
      .exit()
      .attr('height', 0)
      .attr('y', HEIGHT)
      .transition()
      .remove();

    //Update
    rectangles
      .transition()
      .duration(500)
      .attr('x', d => x(d.date))
      .attr('y', d => y(d.rate))
      .attr('width', x.bandwidth)
      .attr('height', d => HEIGHT - y(d.rating));

    //Enter happens
    rectangles
      .enter()
      .append('rect')
      .attr('x', d => x(d.date))
      .attr('width', x.bandwidth)
      .attr('fill', 'green')
      .attr('y', HEIGHT)
      .transition()
      .duration(500)
      .attr('height', d => HEIGHT - y(d.rating))
      .attr('y', d => y(d.rate));
  }
}
/* */
