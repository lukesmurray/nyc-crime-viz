//@ts-check
import { cleanRow } from "./util/dataCleaner";
import crossfilter from "crossfilter2";
import customBarChart from "./components/customBarChart";
import customBoroughChart from "./components/customBoroughChart";
import customTimeChart from "./components/customTimeLineChart";
import customSankeyChart from "./components/customSankeyChart";
import "./main.scss";
import M from "materialize-css";
import customPieChart from "./components/customPieChart";
import dc from "dc";
import dimensionRows from "./components/dimensionRows";
import { csv, json } from "d3-fetch";
import { select } from "d3-selection";
import { debounce } from "lodash";

M.Modal.init(document.querySelector("#progressModal"), {});
let progressModal = M.Modal.getInstance(
  document.querySelector("#progressModal")
);
progressModal.open();

/**
 * This is set after we load the data in, before that it is null
 * @type {import("./util/typedefs").CustomRow[]}
 */
export let dataset = null;
Promise.all([
  csv("/data/nypd_data_sample.csv", cleanRow),
  json("/data/boroughs.geojson")
]).then(function(values) {
  let data = values[0];
  let boroughJson = values[1];

  progressModal.close();

  // filter out nulls
  dataset = data.filter(
    d =>
      d.suspect.ageGroup &&
      d.suspect.race &&
      d.victim.ageGroup &&
      d.victim.race &&
      d.boro &&
      d.victim.sex &&
      d.suspect.sex &&
      d.from
  );

  /**
   * @type {HTMLInputElement}
   */
  let filterUnknownCheckbox = document.querySelector("#filterUnknownCheckbox");
  filterUnknownCheckbox.addEventListener("change", function() {
    ndx.remove(() => true);
    if (this.checked) {
      ndx.add(dataset);
    } else {
      ndx.add(data);
    }
  });

  /**
   * @type {HTMLInputElement}
   */
  let setElasticYCheckbox = document.querySelector("#setElasticY");
  setElasticYCheckbox.addEventListener("change", function() {
    let barCharts = [
      victimAgeChart,
      victimRaceChart,
      victimSexChart,
      suspectAgeChart,
      suspectRaceChart,
      suspectSexChart,
      crimeTimelineChart
    ];
    barCharts.forEach(chart => chart.setElasticY(this.checked));
    dc.redrawAll();
  });

  // get all our cross filter stuff
  let ndx = crossfilter(data);

  ndx.onChange(event => {
    if (event == "dataAdded") {
      dc.redrawAll();
    }
  });

  let suspectRaceDimension = ndx.dimension(d => d.suspect.race || "Unknown");
  let suspectRaceGroup = suspectRaceDimension.group().reduceCount();

  let victimRaceDimension = ndx.dimension(d => d.victim.race || "Unknown");
  let victimRaceGroup = victimRaceDimension.group().reduceCount();

  let suspectAgeDimension = ndx.dimension(d => d.suspect.ageGroup || "Unknown");
  let suspectAgeGroup = suspectAgeDimension.group().reduceCount();

  let victimAgeDimension = ndx.dimension(d => d.victim.ageGroup || "Unknown");
  let victimAgeGroup = victimAgeDimension.group().reduceCount();

  let suspectSexDimension = ndx.dimension(d => d.suspect.sex || "Unknown");
  let suspectSexGroup = suspectSexDimension.group().reduceCount();

  let victimSexDimension = ndx.dimension(d => d.victim.sex || "Unknown");
  let victimSexGroup = victimSexDimension.group().reduceCount();

  let boroughDimension = ndx.dimension(d => d.boro || "Unknown");
  let boroughGroup = boroughDimension.group().reduceCount();

  let crimeCategoryDimension = ndx.dimension(d => d.crimeCategory || "Unknown");
  let crimeCategoryGroup = crimeCategoryDimension.group().reduceCount();

  let crimeCompletedDimension = ndx.dimension(
    d => d.crimeCompleted || "Unknown"
  );
  let crimeCompletedGroup = crimeCompletedDimension.group().reduceCount();

  let crimeByMonthDimension = ndx.dimension(d => d.month || "Unknown");
  let crimeByMonthGroup = crimeByMonthDimension.group().reduceCount();

  // create the suspect race chart
  let suspectRaceChart = new customBarChart({
    dimension: suspectRaceDimension,
    group: suspectRaceGroup,
    selector: "#suspectRace",
    xAxisLabel: "Suspect Race",
    yAxisLabel: "Number of Incidents"
  });
  suspectRaceChart.resize();

  // create the victim race chart
  let victimRaceChart = new customBarChart({
    dimension: victimRaceDimension,
    group: victimRaceGroup,
    selector: "#victimRace",
    xAxisLabel: "Victim Race",
    yAxisLabel: "Number of Incidents"
  });
  victimRaceChart.resize();

  // create the suspect age chart
  let suspectAgeChart = new customBarChart({
    dimension: suspectAgeDimension,
    group: suspectAgeGroup,
    selector: "#suspectAge",
    xAxisLabel: "Suspect Age",
    yAxisLabel: "Number of Incidents"
  });
  suspectAgeChart.resize();

  // create the victim age chart
  let victimAgeChart = new customBarChart({
    dimension: victimAgeDimension,
    group: victimAgeGroup,
    selector: "#victimAge",
    xAxisLabel: "Victim Age",
    yAxisLabel: "Number of Incidents"
  });
  victimAgeChart.resize();

  // create the suspect sex chart
  let suspectSexChart = new customBarChart({
    dimension: suspectSexDimension,
    group: suspectSexGroup,
    selector: "#suspectSex",
    xAxisLabel: "Suspect Sex",
    yAxisLabel: "Number of Incidents"
  });
  suspectSexChart.resize();

  // create the victim sex chart
  let victimSexChart = new customBarChart({
    dimension: victimSexDimension,
    group: victimSexGroup,
    selector: "#victimSex",
    xAxisLabel: "Victim Sex",
    yAxisLabel: "Number of Incidents"
  });
  victimSexChart.resize();

  // create the suspect sex chart
  let crimeCategoryChart = new customPieChart({
    dimension: crimeCategoryDimension,
    group: crimeCategoryGroup,
    selector: "#crimeCategory",
    xAxisLabel: "Crime Category",
    yAxisLabel: "Number of Incidents"
  });
  crimeCategoryChart.resize();

  // create the victim sex chart
  let crimeCompletedChart = new customPieChart({
    dimension: crimeCompletedDimension,
    group: crimeCompletedGroup,
    selector: "#crimeCompleted",
    xAxisLabel: "Crime Completed Status",
    yAxisLabel: "Number of Incidents"
  });
  crimeCompletedChart.resize();

  // create the timeline chart
  let crimeTimelineChart = new customTimeChart({
    dimension: crimeByMonthDimension,
    group: crimeByMonthGroup,
    selector: "#crimeTimeline",
    xAxisLabel: "Crimes By Month",
    yAxisLabel: "# of Incidents"
  });
  crimeTimelineChart.resize();

  // create the borough map
  let boroughMap = new customBoroughChart({
    dimension: boroughDimension,
    group: boroughGroup,
    selector: "#boroughMap",
    boroughJson: boroughJson
  });
  boroughMap.resize();

  function rowCallback(dimensions) {
    sankeyChart.data(ndx, ...dimensions);
    sankeyChart.render();
  }

  new dimensionRows({
    data: [
      { dimension: suspectAgeDimension, name: "Suspect Age", active: true },
      { dimension: suspectRaceDimension, name: "Suspect Race", active: false },
      { dimension: suspectSexDimension, name: "Suspect Sex", active: false },
      { dimension: victimAgeDimension, name: "Victim Age", active: true },
      { dimension: victimRaceDimension, name: "Victim Race", active: false },
      { dimension: victimSexDimension, name: "Victim Sex", active: false },
      {
        dimension: crimeCompletedDimension,
        name: "Crime Completed",
        active: false
      },
      {
        dimension: crimeCategoryDimension,
        name: "Crime Category",
        active: false
      },
      { dimension: boroughDimension, name: "Borough", active: false }
    ],
    callback: rowCallback
  });

  // create the sankey chart
  let sankeyChart = new customSankeyChart("#customSankeyChart")
    .size([900, 500])
    .data(ndx, suspectAgeDimension, victimAgeDimension);
  sankeyChart.resize();

  dc.renderAll();

  // resize the charts when the window resizes
  select(window).on(
    "resize",
    debounce(() => {
      suspectRaceChart.resize();
      victimRaceChart.resize();
      suspectAgeChart.resize();
      victimAgeChart.resize();
      suspectSexChart.resize();
      victimSexChart.resize();
      crimeCategoryChart.resize();
      crimeCompletedChart.resize();
      crimeTimelineChart.resize();
      boroughMap.resize();
      sankeyChart.resize();
      dc.renderAll();
    }, 500)
  );
});
