import * as d3 from 'd3';

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10}
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default class D3Chart {

    constructor(element, data, updateName) {
        const vis = this

        vis.updateName = updateName
        console.log("all Data")

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

        console.log("Number function")
        console.log(d3.max(vis.data.months))
        vis.x.domain([0, d3.max(vis.data.months)])
        vis.y.domain([0, 5])

        const xAxisCall = d3.axisBottom(vis.x)
        const yAxisCall = d3.axisLeft(vis.y)

        vis.xAxisGroup.transition(1000).call(xAxisCall)
        vis.yAxisGroup.transition(1000).call(yAxisCall)

        //JOIN
        const circles = vis.g.selectAll("circle")
            .data(vis.data.data)

        //EXIT
        circles.exit().transition(1000).attr("cy", vis.y(0)).remove()

        var i;
        for (i = 0; i < vis.data.data.length; i++) {
          //UPDATE
         circles.transition(1000)
             .attr("cx", vis.x(vis.data.months[i]))
             .attr("cy", vis.y(vis.data.data[i]))
        }

        var i;
        for (i = 0; i < vis.data.data.length; i++) {
          //ENTER
          circles.enter()
              .append("circle")
              .attr("cy", vis.y(0))
              .attr("cx", vis.x(vis.data.months[i]))
              .attr("r", 5).attr("fill", "grey").on("click", vis.updateName(vis.data.months[i]))
              .transition(1000)
              .attr("cy", vis.y(vis.data.data[i]))
        }

     }
}
/* */
