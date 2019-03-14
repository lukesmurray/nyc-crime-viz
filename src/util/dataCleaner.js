import moment from "moment";
import * as d3 from "d3";

/**
 * parse date and time strings to moments
 * @param {string} date date string with form MM/DD/YYYY
 * @param {string} time time string with form HH:mm:ss
 * @return {moment.Moment | null } Valid moment if there is one else null
 */
function parseDateTime(date, time) {
  const parsedMoment = moment(`${date} ${time}`, "MM/DD/YYYY HH:mm:ss");
  return parsedMoment.isValid() ? parsedMoment : null;
}

/**
 * parse crime completed from the dataset
 * @param {string} crimeCompleted string saying whether a crime is attempted or completed
 */
function parseCrimeCompleted(crimeCompleted) {
  return crimeCompleted === "COMPLETED"
    ? "Completed"
    : crimeCompleted === "ATTEMPTED"
    ? "Attempted"
    : null;
}

/**
 * parse the borough from the dataset
 * @param {string} borough string representing the borough
 */
function parseBorough(borough) {
  return borough === "BROOKLYN"
    ? "Brooklyn"
    : borough === "MANHATTAN"
    ? "Manhattan"
    : borough === "BRONX"
    ? "Bronx"
    : borough === "QUEENS"
    ? "Queens"
    : borough === "STATEN ISLAND"
    ? "Staten Island"
    : null;
}

/**
 * parse crime category into misdemeanor, felony, or violation
 * @param {string} crimeCategory the crime category
 */
function parseCrimeCategory(crimeCategory) {
  return crimeCategory === "MISDEMEANOR"
    ? "Misdemeanor"
    : crimeCategory === "FELONY"
    ? "Felony"
    : "Violation";
}

/**
 * parse the sex string's into cleaner categories
 * @param {string} sex the sex field in the dataset
 */
function parseSex(sex) {
  return sex === "F"
    ? "Female"
    : sex === "M"
    ? "Male"
    : sex === "E"
    ? "NY State"
    : sex === "D"
    ? "Business"
    : null;
}

/**
 * parse age group into cleaner categories
 * @param {string} ageGroup the age group from the dataset
 */
function parseAgeGroup(ageGroup) {
  return ageGroup === "<18"
    ? "0-18"
    : ageGroup === "18-24"
    ? "18-24"
    : ageGroup === "25-44"
    ? "25-44"
    : ageGroup === "45-64"
    ? "45-64"
    : ageGroup === "65+"
    ? "65+"
    : null;
}

/**
 * parse the race into cleaner categories
 * @param {string} race the race from the dataset
 */
function parseRace(race) {
  return race === "BLACK"
    ? "Black"
    : race === "WHITE HISPANIC"
    ? "White Hispanic"
    : race === "WHITE"
    ? "White"
    : race === "BLACK HISPANIC"
    ? "Black Hispanic"
    : race === "ASIAN / PACIFIC ISLANDER"
    ? // "Asian / Pacific Islander"
      "Asian"
    : race === "AMERICAN INDIAN/ALASKAN NATIVE"
    ? // "American Indian / Alaskan Native"
      "Native"
    : null;
}

/**
 * parse the rows in the csv into a cleaner form
 * @param {d3.DSVRowAny} row one row from the dataset
 */
export function cleanRow(row) {
  const from_moment = parseDateTime(row.CMPLNT_FR_DT, row.CMPLNT_FR_TM);
  const to_moment = parseDateTime(row.CMPLNT_TO_DT, row.CMPLNT_TO_TM);
  const crimeCompleted = parseCrimeCompleted(row.CRM_ATPT_CPTD_CD);
  const crimeCategory = parseCrimeCategory(row.LAW_CAT_CD);
  const borough = parseBorough(row.BORO_NM);
  const month = from_moment ? d3.timeMonth(from_moment.toDate()) : null;
  return {
    // no nulls and unique
    id: +row.CMPLNT_NUM,
    // around 700 nulls
    from: from_moment,
    // around 700 nulls
    month: month,
    // around 1.5M nulls
    to: to_moment,
    // around 200 nulls
    precinct: row.ADDR_PCT_CD ? +row.ADDR_PCT_CD : null,
    // no nulls
    keyCode: +row.KY_CD,
    // around 5000 nulls
    policeCode: row.PD_CD ? +row.PD_CD : null,
    // around 5000 nulls same as policeCode
    policeCodeDescription: row.PD_DESC ? row.PD_DESC : null,
    // 7 nulls
    crimeCompleted: crimeCompleted,
    // no nulls
    crimeCategory: crimeCategory,
    // 10000 nulls
    boro: borough,
    // around 17k nulls
    latitude: row.Latitude ? +row.Latitude : null,
    // around 17k nulls
    longitude: row.Longitude ? +row.Longitude : null,
    suspect: {
      // around 4,472,282 nulls
      ageGroup: parseAgeGroup(row.SUSP_AGE_GROUP),
      // around 3,103,741 nulls
      race: parseRace(row.SUSP_RACE),
      // around 3,237,055
      sex: parseSex(row.SUSP_SEX)
    },
    victim: {
      // around 1,638,441 nulls
      ageGroup: parseAgeGroup(row.VIC_AGE_GROUP),
      // around 300 nulls
      race: parseRace(row.VIC_RACE),
      // around 300 nulls
      sex: parseSex(row.VIC_SEX)
    }
  };
}
