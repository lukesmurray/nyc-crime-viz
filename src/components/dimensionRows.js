import Sortable from "sortablejs";
import { select } from "d3-selection";

export default class DimensionRows {
  /**
   * @typedef {object} displayDimension
   * @property {import("../util/typedefs").CFDimension} dimension the cross filter dimension
   * @property {string} name the name of the dimension
   * @property {bool} active whether the dimension is active
   */

  /**
   *
   * @callback rowCallback
   * @param {import("../util/typedefs").CFDimension[]} data
   */

  /**
   * @typedef {object} params
   * @property {displayDimension[]} data
   * @property {rowCallback} callback
   */

  /**
   *
   * @param {params} params the params for dimension rows
   */
  constructor(params) {
    this.callback = params.callback;

    /**
     * @type {Map<import("../util/typedefs").CFDimension, string>}
     */
    this.dataMap = new Map(params.data.map(d => [d.name, d.dimension]));

    params.data.forEach(d => {
      select(d.active ? "#activeDimensions" : "#inactiveDimensions")
        .append("a")
        .attr("class", "btn")
        .attr("data-id", d.name)
        .text(d.name);
    });

    this.inactiveRow = document.getElementById("inactiveDimensions");
    this.activeRow = document.getElementById("activeDimensions");

    this.inactiveSortable = new Sortable(this.inactiveRow, {
      group: {
        name: "shared"
      },
      animation: 150,
      onEnd: function(evt) {
        if (evt.from === evt.to) {
          console.log("no update");
          return;
        }
        console.log("new active", evt.item.innerHTML);
        self.updateData();
      }
    });

    let self = this;

    this.activeSortable = new Sortable(this.activeRow, {
      group: {
        name: "shared",
        pull: function(to, from) {
          console.log("from", from);
          console.log("from", from.el.children.length);
          return from.el.children.length > 2;
        },
        put: function(to) {
          console.log("to", to);
          console.log("to", to.el.children.length);
          return to.el.children.length < 4;
        }
      },
      animation: 150,
      onEnd: function(evt) {
        if (evt.from === evt.to) {
          if (evt.oldIndex === evt.newIndex) {
            console.log("no update");
          } else {
            console.log("reorder active", evt.item.innerHTML);
            self.updateData();
          }
        } else {
          console.log("new inactive", evt.item.innerHTML);
          self.updateData();
        }
      }
    });
  }

  updateData() {
    const activeNames = this.activeSortable.toArray();
    const activeDimensions = activeNames.map(n => this.dataMap.get(n));

    this.callback(activeDimensions);
  }
}
