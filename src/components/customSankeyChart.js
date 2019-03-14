import * as d3 from "d3";
import * as d3sankey from "d3-sankey";
import uid from "../util/uid";

/**
 * TODO
 * - tooltip
 * - speed it up
 * - allow users to drag dimensions
 */

export default class customSankeyChart {
  /**
   * Create a new chart with the selector
   * @param {string} selector the unique selector to use for the chart
   */
  constructor(selector) {
    /**
     * @type {string}
     */
    this._selector = selector;

    this._svg = d3.select(this._selector).append("svg");

    /**
     * @type {import("../util/typedefs").CFIndex}
     */
    this._ndx = null;
    /**
     * @type {import("../util/typedefs").CFDimension[]}
     */
    this._dimensions = null;
    /**
     * @type {import("../util/typedefs").CFDimension}
     */
    this._customDimension = null;
    /**
     * @type {import("../util/typedefs").CFGroup}
     */
    this._customGroup = null;

    /**
     * @type {{nodes: any[], links: any[]}}
     */
    this._graph = null;

    /**
     * @type {number}
     */
    this._width = null;

    /**
     * @type {number}
     */
    this._height = null;

    // color generating function
    this._color = (function() {
      const color = d3.scaleOrdinal(d3.schemeCategory10);
      return name => color(name);
    })();

    this._svgLinks = null;

    this._svgNodes = null;

    this._clickedNodeIds = new Set();

    this._ndxOnChangeDispose = null;

    this._sankey = null;

    this._linkLayer = null;

    this._nodeLayer = null;

    this._textLayer = null;
  }

  /**
   * Set the width and height of the graph
   * @param {[number, number]} size the width and height of the graph
   */
  size(size) {
    [this._width, this._height] = size;
    this._svg.style("width", this._width).style("height", this._height);
    return this;
  }

  resize() {
    /**
     * @type {HTMLDivElement}
     */
    let div = d3.select(this._selector).node();
    let rect = div.getBoundingClientRect();
    this.size([rect.width, rect.height]);
    this.render();
  }

  /**
   * Set the data on the sankey chart
   * @param  {import("../util/typedefs").CFIndex} ndx
   * @param  {...import("../util/typedefs").CFDimension} dimensions
   */
  data(ndx, ...dimensions) {
    this._ndx = ndx;
    this._dimensions = dimensions;
    if (this._customDimension !== null) {
      this._customDimension.dispose();
    }
    this._customDimension = ndx.dimension(row => {
      return this._dimensions.map(dim => dim.accessor(row));
    });
    if (this._customGroup !== null) {
      this._customGroup.dispose();
    }
    this._customGroup = this._customDimension.group();

    if (this._ndxOnChangeDispose !== null) {
      this._ndxOnChangeDispose();
    }
    this._ndxOnChangeDispose = ndx.onChange(eventType =>
      this._onCrossFilterChange(eventType)
    );

    // generate the graph
    this._generateSankeyData();
    return this;
  }

  /**
   *
   * @param {import("crossfilter2").EventType} eventType
   */
  _onCrossFilterChange(eventType) {
    this._generateSankeyData();
    this.render();
  }

  /**
   * Convert the dimensions passed in as data into data for a sankey graph
   */
  _generateSankeyData() {
    let graph = { nodes: [], links: [] };
    let nodeMap = new Map();
    if (this._customGroup === null) {
      throw "data has not been set";
    }

    let customGroupAll = this._customGroup.all();
    customGroupAll = customGroupAll.filter(x => x.value !== 0);

    // for each element in customGroupAll
    // we break up the array of keys and value into
    // nodes and links
    customGroupAll.map(cg => {
      // convert the keys into nodes
      let nodeObjects = cg.key.map((cgKey, cgKeyI) => {
        return { id: this._generateId(cgKey, cgKeyI), name: "" + cgKey };
      });

      // make sure nodes are only added once to the graph
      for (var node of nodeObjects) {
        if (!nodeMap.has(node.id)) {
          nodeMap.set(node.id, node);
          graph.nodes.push(node);
        }
      }

      // get flows for the links
      let flows = cg.key.map((cgKey, cgKeyI) =>
        this._generateId(cgKey, cgKeyI)
      );

      // convert the keys into links
      cg.key.map((cgKey, cgKeyI, cgKeyArray) => {
        if (cgKeyI !== cgKeyArray.length - 1) {
          const sourceId = this._generateId(cgKey, cgKeyI);
          const targetId = this._generateId(cgKeyArray[cgKeyI + 1], cgKeyI + 1);
          graph.links.push({
            source: sourceId,
            target: targetId,
            id: flows.join("") + cgKeyI,
            flow: flows,
            value: cg.value
          });
        }
      });
    });

    this._graph = graph;
  }

  /**
   * convert a key and an index into an id
   * @param {any} key
   * @param {number} index
   */
  _generateId(key, index) {
    return ("a" + key + index).replace(/[\s-+]/g, "");
  }

  render() {
    if (this._sankey === null) {
      this._sankey = d3sankey
        .sankey()
        .nodeId(d => d.id)
        .nodeWidth(20)
        .nodePadding(10)
        .nodeAlign(d3sankey.sankeyJustify);
    }
    const t = this._svg.transition("my_transition").duration(750);

    this._sankey.size([this._width, this._height]);

    // TODO make transitions
    // this._svg.selectAll("*").remove();

    const { nodes, links } = this._sankey(this._graph);

    if (this._linkLayer === null) {
      this._linkLayer = this._svg
        .append("g")
        .attr("fill", "none")
        .attr("stroke-opacity", 1.0);
    }

    this._svgLinks = this._linkLayer
      .selectAll("g")
      .data(links, d => d.id)
      .join(
        enter => {
          enter = enter.append("g").style("mix-blend-mode", "multiply");
          let gradient = enter
            .append("linearGradient")
            .attr("id", d => (d.uid = uid(d.id)).id)
            .attr("gradientUnits", "userSpaceOnUse");

          gradient.call(gradient =>
            gradient
              // .transition(t)
              .attr("x1", d => d.source.x1)
              .attr("x2", d => d.target.x0)
          );
          gradient
            .append("stop")
            .attr("offset", "0%")
            .attr("stop-color", d => this._color(d.source.id));
          gradient
            .append("stop")
            .attr("offset", "100%")
            .attr("stop-color", d => this._color(d.target.id));
          enter
            .append("path")
            .call(enter =>
              enter
                .transition(t)
                .attr("d", d3sankey.sankeyLinkHorizontal())
                .attr("stroke-width", d => Math.max(1, d.width))
            )
            .attr("stroke", d => d.uid)
            .append("title")
            .text(d => `${d.source.name} → ${d.target.name}\n${d.value}`);
          return enter;
        },
        update => {
          update
            .select("linearGradient")
            .attr("id", d => (d.uid = uid(d.id)).id)
            .call(update =>
              update
                .transition(t)
                .attr("x1", d => d.source.x1)
                .attr("x2", d => d.target.x0)
            );
          update
            .select("path")
            .call(update => {
              update
                .transition(t)
                .attr("d", d3sankey.sankeyLinkHorizontal())
                .attr("stroke", d => d.uid)
                .attr("stroke-width", d => Math.max(1, d.width));
            })
            .select("title")
            .text(d => `${d.source.name} → ${d.target.name}\n${d.value}`);

          return update;
        }
      );

    if (this._nodeLayer === null) {
      this._nodeLayer = this._svg.append("g").classed("nodes", true);
    }

    // generate the nodes
    this._svgNodes = this._nodeLayer
      .selectAll("rect")
      .data(nodes, d => d.id)
      .join(
        enter => {
          enter = enter
            .append("rect")
            .attr("id", d => (d.uid = uid(d.id)).id)
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("height", d => d.y1 - d.y0)
            .attr("width", d => d.x1 - d.x0)
            .attr("fill", d => this._color(d.id))
            .attr("fill-opacity", 1.0)
            .attr("stroke-width", 3)
            .attr("stroke", d => this._color(d.id))
            .on("click", d => this._mouseClickNode(d));
          enter.append("title").text(d => `${d.name}\n${d.value}`);
          return enter;
        },
        update => {
          return update
            .attr("id", d => (d.uid = uid(d.id)).id)
            .call(update =>
              update
                .transition(t)
                .attr("x", d => d.x0)
                .attr("y", d => d.y0)
                .attr("height", d => d.y1 - d.y0)
                .attr("width", d => d.x1 - d.x0)
            );
        },
        exit => {
          exit.each(d => {
            this._clickedNodeIds.delete(d.id);
          });
          exit.remove();
        }
      );

    // add text to the right of all the nodes
    if (this._textLayer === null) {
      this._textLayer = this._svg.append("g").style("font", "10px sans-serif");
    }

    this._textLayer
      .selectAll("text")
      .data(nodes, d => d.id)
      .join("text")
      .call(text => text.transition(t).attr("y", d => (d.y1 + d.y0) / 2))
      .attr("x", d => (d.x0 < this._width / 2 ? d.x1 + 6 : d.x0 - 6))
      .attr("dy", "0.35em")
      .attr("text-anchor", d => (d.x0 < this._width / 2 ? "start" : "end"))
      .text(d => d.name);

    this._highlightClickedNodesAndDescendants();
    return this;
  }

  /**
   *
   * @param {d3sankey.SankeyNodeMinimal<{}, {}>} d
   */
  _mouseClickNode(d) {
    const nodeSelection = d3.select(`#${d.uid.id}`);
    if (nodeSelection.attr("node-clicked") == 1) {
      this._clickedNodeIds.delete(d.uid.id);
      nodeSelection.attr("node-clicked", 0);
    } else {
      this._clickedNodeIds.add(d.uid.id);
      nodeSelection.attr("node-clicked", 1);
    }
    this._highlightClickedNodesAndDescendants();
  }

  _highlightClickedNodesAndDescendants() {
    // for each node
    // get all descendant and ancestor links and nodes
    // calculate union for each column
    // highlight intersection of all columns

    if (!this._clickedNodeIds.size) {
      this._svgLinks.each(link => {
        this._highlightLink(link.uid.id, 1.0);
      });
      this._svgNodes.each(node => {
        this._highlightNode(node.uid.id, 1.0);
      });
      return;
    }

    let numColumns = -Infinity;
    this._clickedNodeIds.forEach(id => {
      let columnNum = +id.match(/\d+/)[0];
      if (numColumns < columnNum) {
        numColumns = columnNum;
      }
    });

    let columnData = [];
    for (var i = 0; i < numColumns + 1; i++) {
      columnData.push({
        nodeIds: null,
        linkIds: null
      });
    }

    this._clickedNodeIds.forEach(id => {
      let colIndex = +id.match(/\d$/)[0];
      let {
        linkIdSet: linkIdSet,
        nodeIdSet: nodeIdSet
      } = this._getRelativesOfNodeId(id);

      // take the union per column
      if (columnData[colIndex].nodeIds !== null) {
        columnData[colIndex].nodeIds = new Set([
          ...columnData[colIndex].nodeIds,
          ...nodeIdSet
        ]);
        columnData[colIndex].linkIds = new Set([
          ...columnData[colIndex].linkIds,
          ...linkIdSet
        ]);
      } else {
        columnData[colIndex].nodeIds = nodeIdSet;
        columnData[colIndex].linkIds = linkIdSet;
      }
    });

    let allNodeIds = null;
    let allLinkIds = null;

    columnData.forEach(data => {
      if (data.nodeIds === null) {
        return;
      }
      if (allNodeIds === null) {
        allNodeIds = data.nodeIds;
        allLinkIds = data.linkIds;
      } else {
        allNodeIds = new Set([...allNodeIds].filter(x => data.nodeIds.has(x)));
        allLinkIds = new Set([...allLinkIds].filter(x => data.linkIds.has(x)));
      }
    });

    // apply highlighting to the svglinks not in the array
    this._svgLinks.each(link => {
      if (!allLinkIds.has(link.uid.id)) {
        this._highlightLink(link.uid.id, 0.2);
      } else {
        this._highlightLink(link.uid.id, 1.0);
      }
    });

    // apply highlighting to the svgnodes not in the array
    this._svgNodes.each(node => {
      if (this._clickedNodeIds.has(node.uid.id)) {
        this._indicateNodeSelection(node.uid.id);
      } else if (!allNodeIds.has(node.uid.id)) {
        this._highlightNode(node.uid.id, 0.2);
      } else {
        this._highlightNode(node.uid.id, 1.0);
      }
    });
  }

  /**
   *
   * @param {string} nodeId the unique id of a node
   */
  _indicateNodeSelection(nodeId) {
    const nodeSelection = d3.select(`#${nodeId}`);
    nodeSelection.attr("fill-opacity", 0.2);
    nodeSelection.attr("stroke-opacity", 1.0);
  }

  /**
   *
   * @param {string} nodeId the unique id of a node
   * @param {number} opacity the opacity to highlight the node with
   */
  _highlightNode(nodeId, opacity) {
    const nodeSelection = d3.select(`#${nodeId}`);
    nodeSelection.attr("fill-opacity", opacity);
    nodeSelection.attr("stroke-opacity", opacity);
  }

  /**
   *
   * @param {string} linkId the unique id of a link
   * @param {number} opacity the opacity to highlight the link with
   */
  _highlightLink(linkId, opacity) {
    const pathElement = d3.select(`#${linkId}`).node().nextSibling;
    pathElement.setAttribute("stroke-opacity", "" + opacity);
  }

  /**
   *
   * @param {string} id
   */
  _getRelativesOfNodeId(id) {
    // get a reference to the node
    let d = null;
    d3.select(`#${id}`).each(dd => (d = dd));
    let idToHighlight = d.id;

    let traverse = [
      {
        linkType: "sourceLinks",
        nodeType: "target"
      },
      {
        linkType: "targetLinks",
        nodeType: "source"
      }
    ];

    // array of links and nodes to highlight
    let linkIdToHighlight = [];
    let nodeIdToHighlight = [];

    traverse.forEach(step => {
      let remainingNodes = [d];
      let nextNodes = [];
      while (remainingNodes.length) {
        nextNodes = [];
        remainingNodes.forEach(node => {
          node[step.linkType].forEach(link => {
            if (link.flow.includes(idToHighlight)) {
              nextNodes.push(link[step.nodeType]);
              linkIdToHighlight.push(link.uid.id);
            }
          });
          nodeIdToHighlight.push(node.uid.id);
        });
        remainingNodes = Array.from(new Set(nextNodes));
      }
    });

    return {
      linkIdSet: new Set(linkIdToHighlight),
      nodeIdSet: new Set(nodeIdToHighlight)
    };
  }
}
