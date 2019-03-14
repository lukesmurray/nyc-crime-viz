import moment from "moment";
import crossfilter from "crossfilter2";

/**
 * @typedef {object} CustomPerson
 * @property {string} ageGroup
 * @property {string} race
 * @property {string} sex
 */

/**
 * @typedef {object} CustomRow
 * @property {number} id
 * @property {moment.Moment} from
 * @property {Date} month
 * @property {moment.Moment} to
 * @property {number} precinct
 * @property {number} keyCode
 * @property {number} policeCode
 * @property {string} policeCodeDescription
 * @property {string} crimeCompleted
 * @property {string} crimeCategory
 * @property {string} boro
 * @property {number} latitude
 * @property {number} longitude
 * @property {CustomPerson} suspect
 * @property {CustomPerson} victim
 *
 */

/**
 * @typedef {d3.DSVParsedArray<CustomRow>} D3CustomRow
 */

/**
 * @typedef {crossfilter.Dimension<CustomRow, any>} CFDimension
 */

/**
 * @typedef {crossfilter.Group<CustomRow, any, any>} CFGroup
 */

/**
 * @typedef {crossfilter.Crossfilter<CustomRow>} CFIndex
 */
