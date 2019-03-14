//@ts-check
import dc from "dc";
import * as d3 from "d3";

export default class customBoroughChart {
  /**
   * @typedef {object} params
   * @property {string} selector the selector for the root of the chart
   * @property {import("../util/typedefs").CFDimension} dimension the cross filter dimension
   * @property {import("../util/typedefs").CFGroup} group the cross filter group
   * @property {any} boroughJson
   */

  /**
   * Create a new instance of the race chart
   * @param {params} params the params to the race chart
   */
  constructor(params) {
    this.params = params;
    this.chart = dc.geoChoroplethChart(this.params.selector);
    let boroughJson = this.params.boroughJson;
    // create the chart
    this.chart
      .width(768)
      .height(450)
      .dimension(params.dimension)
      .group(params.group)
      .colors(d3.scaleSequential(d3.interpolateYlOrBr))
      .colorCalculator(d => (d ? this.chart.colors()(d) : "#ccc"))
      .projection(this._generateProjection())
      .valueAccessor(function(kv) {
        return kv.value;
      })
      .overlayGeoJson(boroughJson.features, "borough", d => {
        return d.properties.boro_name;
      });

    // reference to the chart for anonymous function
    let chart = this.chart;

    // add a legend
    chart.legendables = function() {
      return chart.data().map(function(d, i) {
        return {
          name: `${d.key} - ${d.value}`,
          chart: chart,
          color: chart.colorCalculator()(d.value)
        };
      });
    };

    // set the legend
    this.chart.legend(
      dc
        .legend()
        .x(5)
        .y(5)
        .itemHeight(10)
        .autoItemWidth(true)
        .gap(5)
        .horizontal(true)
    );

    // set dynamic color domain
    this.chart.on("preRender", function(chart) {
      chart.colorDomain(d3.extent(chart.data(), chart.valueAccessor()));
    });
    this.chart.on("preRedraw", function(chart) {
      chart.colorDomain(d3.extent(chart.data(), chart.valueAccessor()));
    });
  }

  _generateProjection() {
    return d3
      .geoMercator()
      .center([-73.94, 40.7])
      .scale(40000)
      .translate([this.chart.width() / 2, this.chart.height() / 2]);
  }

  resize() {
    /**
     * @type {HTMLDivElement}
     */
    let div = d3.select(this.params.selector).node();
    let rect = div.getBoundingClientRect();
    this.chart.width(rect.width);
    this.chart.projection(this._generateProjection());
  }

  render() {
    this.chart.render();
  }
}
