//@ts-check
import dc from "dc";
import { scaleOrdinal } from "d3-scale";
import { schemeYlOrBr } from "d3-scale-chromatic";
import { select } from "d3-selection";

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
      .colors(scaleOrdinal(schemeYlOrBr[9].slice(3, 7).reverse()))
      .dimension(this.params.dimension)
      .group(this.params.group);
  }

  resize() {
    /**
     * @type {HTMLDivElement}
     */
    let div = select(this.params.selector).node();
    let rect = div.getBoundingClientRect();
    this.chart.innerRadius(40);
    this.chart.width(rect.width);
  }

  render() {
    this.chart.render();
  }
}
