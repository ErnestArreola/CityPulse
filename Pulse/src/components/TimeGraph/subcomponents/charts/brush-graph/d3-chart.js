import * as d3 from 'd3';

const MARGIN = { TOP: 0, BOTTOM: 150, LEFT: 10, RIGHT: 10 };
const WIDTH = 700 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 250 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Chart {
  constructor(element, data0, updateBrushed) {
    const vis = this;
    vis.data = data0
    vis.updateBrushed = updateBrushed
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

    vis.y = d3
    .scaleLinear()
    .range([HEIGHT, 0]);

    vis.x = d3
    .scaleTime()
    .range([0, WIDTH]);
    vis.update('');

    vis.handleRemove = (minMax) => {
        let tempData = []

        tempData = vis.data.filter( (d, i) => {

        d.date = new Date(d.date)

        if(!((d.date).getTime() < (minMax[0]).getTime() || (d.date).getTime() > (minMax[1]).getTime()) ) {
            tempData.push(vis.data[i])
            return vis.data[i]
        }})

        vis.updateBrushed(tempData)
    }

    vis.brushed = () => {
        const selection = d3.event.selection || vis.x.range();
        const newVal = selection.map(vis.x.invert)
        vis.handleRemove(newVal)
    }
  }



  update(bus) {
    const vis = this;
    bus = "current"
    const yValue = d => d.rating;
    const xValue = d => d.date;

    vis.y.domain(d3.extent(vis.data, d => d.rating));

    vis.x.domain(d3.extent(vis.data, d => d.date));

    const area = d3.area()
    .x(d => vis.x(d.date))
    .y0(HEIGHT)
    .y1(d => vis.y(d.rating));

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
      vis.brush.on("end", d => {

        this.brushed()
      });
  }
}
/* */
