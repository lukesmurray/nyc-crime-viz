//@ts-check
import dc from "dc";
import { scaleTime } from "d3-scale";
import { timeMonth, timeMonths } from "d3-time";
import { select } from "d3-selection";

export default class customTimeChart {
  /**
   * @typedef {object} params
   * @property {string} selector the selector for the root of the chart
   * @property {string} xAxisLabel the x axis label
   * @property {string} yAxisLabel the y axis label
   * @property {import("../util/typedefs").CFDimension} dimension the cross filter dimension
   * @property {import("../util/typedefs").CFGroup} group the cross filter group
   */

  /**
   * Create a new instance of the race chart
   * @param {params} params the params to the race chart
   */
  constructor(params) {
    this.params = params;
    this.chart = dc.barChart(this.params.selector);
    this.chart
      .width(768)
      .height(150)
      .x(scaleTime().domain([new Date(2006, 1, 1), new Date(2017, 12, 31)]))
      .round(timeMonth.round)
      .xUnits(timeMonths)
      .xAxisLabel(this.params.xAxisLabel)
      .elasticY(true)
      .dimension(params.dimension)
      .group(params.group)
      .gap(1)
      .centerBar(true)
      .alwaysUseRounding(true)
      .margins({
        left: 40,
        top: 0,
        right: 50,
        bottom: 45
      })
      .yAxisLabel(params.yAxisLabel)
      .yAxis()
      .ticks(0);
  }

  /**
   * @param {boolean} value
   */
  setElasticY(value) {
    this.chart.elasticY(value);
  }

  resize() {
    /**
     * @type {HTMLDivElement}
     */
    let div = select(this.params.selector).node();
    let rect = div.getBoundingClientRect();
    this.chart.width(rect.width);
  }

  render() {
    this.chart.render();
  }
}
