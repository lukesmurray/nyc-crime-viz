//@ts-check
import dc from "dc";
import * as d3 from "d3";

export default class customPieChart {
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
    this.chart = dc.pieChart(this.params.selector);
    this.chart
      .width(768)
      .height(300)
      .colors(d3.scaleOrdinal(d3.schemeYlOrBr[9].slice(3, 7).reverse()))
      .dimension(this.params.dimension)
      .group(this.params.group);
  }

  resize() {
    /**
     * @type {HTMLDivElement}
     */
    let div = d3.select(this.params.selector).node();
    let rect = div.getBoundingClientRect();
    this.chart.innerRadius(40);
    this.chart.width(rect.width);
  }

  render() {
    this.chart.render();
  }
}
