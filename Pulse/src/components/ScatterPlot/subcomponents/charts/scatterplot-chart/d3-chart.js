import * as d3 from 'd3';

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10}
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default class D3Chart {

    constructor(element, data, updateName) {
        const vis = this

        vis.updateName = updateName

         vis.g = d3.select(element)
             .append("svg")
             .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
             .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
             .append("g")
             .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

        vis.x = d3.scaleLinear()
            .range([0, WIDTH])

        vis.y = d3.scaleLinear()
            .range([HEIGHT, 0])

        vis.tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', 'white')
        .style('opacity', 0)

        vis.xAxisGroup = vis.g.append("g").attr("transform", `translate(0, ${HEIGHT})`)
        vis.yAxisGroup = vis.g.append("g")

        vis.g.append("text")
            .attr("x", WIDTH / 2)
            .attr("y", HEIGHT + 40)
            .attr("font-size", 20)
            .attr("text-anchor", "middle")
            .text("Month of Year")

        vis.g.append("text")
            .attr("x", -(HEIGHT / 2))
            .attr("y", -50)
            .attr("transform", "rotate(-90)")
            .attr("font-size", 20)
            .attr("text-anchor", "middle")
            .text("Avg Rating Per Month")

        vis.update(data)
    }

    update(data) {
        const vis = this
        vis.data = data

        vis.x.domain([0, d3.max(vis.data.months)])
        vis.y.domain([0, d3.max(vis.data.data)])

        const xAxisCall = d3.axisBottom(vis.x)
        const yAxisCall = d3.axisLeft(vis.y)

        vis.xAxisGroup.transition(1000).call(xAxisCall)
        vis.yAxisGroup.transition(1000).call(yAxisCall)

        //JOIN
        const circles = vis.g.selectAll("circle")
            .data(vis.data.data, (d, i) => vis.data.months[i])

        //EXIT
        circles.exit().transition(1000).attr("cy", vis.y(0)).remove()

          //UPDATE
         circles.transition(1000)
             .attr("cx", (d, i) => vis.x(vis.data.months[i]))
             .attr("cy", d => vis.y(d))

        //     console.log("ALERT")
          //   console.log()
          //ENTER
          circles.enter()
              .append("circle")
              .attr("cy", vis.y(0))
              .attr("cx", (d, i) => vis.x(vis.data.months[i]))
              .attr("r", 5).attr("fill", "lightblue")
              .on("click", (d, i) => vis.updateName(vis.data.months[i]))
              .transition(1000)
              .attr("cy", d => vis.y(d))

              circles.on("mouseover", d => {
                vis.tooltip.transition().duration(200).style('opacity', .6)

                vis.tooltip.html(d)
                .style('left', (d3.event.pageX - 35) + 'px')
                .style('top', (d3.event.pageY - 30) + 'px')

              })


     }
}
/* */
