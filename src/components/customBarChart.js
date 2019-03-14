//@ts-check
import dc from "dc";
import * as d3 from "d3";

export default class customBarChart {
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
      .height(300)
      .x(d3.scaleBand())
      .xUnits(dc.units.ordinal)
      .brushOn(false)
      .xAxisLabel(this.params.xAxisLabel)
      .yAxisLabel(this.params.yAxisLabel)
      .dimension(this.params.dimension)
      .barPadding(0.1)
      .outerPadding(0.05)
      .group(this.params.group)
      .elasticY(true)
      .margins({
        left: 60,
        top: 25,
        right: 25,
        bottom: 45
      })
      .renderHorizontalGridLines(true);

    // order the chart by x axis names
    this.chart.ordering(data => {
      return data.key;
    });
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
    let div = d3.select(this.params.selector).node();
    let rect = div.getBoundingClientRect();
    this.chart.width(rect.width);
  }

  render() {
    this.chart.render();
  }
}
