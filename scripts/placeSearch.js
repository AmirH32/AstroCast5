const fetch = require('node-fetch');
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function sigmoid(x) {
    return 1 / (1 + Math.pow(Math.E, -x))
}
  
// this makes a lot of sense, but in the API implementation i have, the metrics are simply mapped to heuristic: 
// see below... getGoodnessHeuristic() methods.
export function heuristic (rainfall_mm, cloud_cover_percent, temperature_celsius) {
      const rain_c = 10.0;
      const cloud_c = 10.0;
      const temp_c = 1.0;
      return 1 - (sigmoid(rain_c * Math.pow(rainfall_mm, 2) +
      cloud_c * Math.pow(cloud_cover_percent, 3) +
      temp_c * Math.abs(15 - temperature_celsius)))
  }
  
  export function get_colour_rgb (rainfall_mm, cloud_cover_percent, temperature_celsius) {
      const t = heuristic(rainfall_mm, cloud_cover_percent, temperature_celsius);
      return [(1-t) * 255, t * 255, 0];
  }

  export function get_colour_hsv (rainfall_mm, cloud_cover_percent, temperature_celsius) {
    const t = heuristic(rainfall_mm, cloud_cover_percent, temperature_celsius);
    return [t * 150, 1, 1];
}


export function get_colour(rainfall, cloud_cover_percent, temperature_celsius) {
    const t = h(r, c, te);
    const sr = Math.round((1-t) * 255).toString(16);
    const sg =  Math.round(t*255).toString(16);
    return sr + "00" + sg;
}

// Define the RandomDayQuery class and supporting functions/classes
class RandomDayQuery {
    queryDay(easting, northing, daysAfterToday) {
        const hourQueryResults = Array.from({ length: 24 }, (_, x) => new RandomHourQuery().queryHour(easting, northing, x, daysAfterToday));
        return new DayQueryResult(hourQueryResults, new FixedMoonPhaseMetric(daysAfterToday), new FixedSuntimeMetric(daysAfterToday), daysOfWeek[daysAfterToday % 7]);
    }
}

class RandomHourQuery {
    queryHour(easting, northing, hoursAfterMidnight, day) {
        const noise = this.noise(hoursAfterMidnight / 8 + day * 3, easting + northing);
        const noise2 = this.noise(hoursAfterMidnight + day * 24, easting + northing) - 0.5;
        const seed = Math.round(1 + 9 * noise);
        return new HourQueryResult(
            new RandomCloudCoverMetric(seed),
            new RandomPrecipitationMetric(seed),
            new RandomTemperatureMetric(Math.max(1, Math.round(10 * Math.pow(Math.sin(hoursAfterMidnight / 8 + 0.5 * noise2), 2)))),
            new RandomMoonAltitudeMetric(11 - seed)
        );
    }

    fract(x) {
        return x - Math.floor(x);
    }

    rand(x, seed) {
        return this.fract(999 * Math.sin(x + seed));
    }

    randStep(x, seed) {
        return this.rand(Math.floor(x), seed);
    }

    smoothstep(x) {
        return x * x * (1 - 2 * (x - 1));
    }

    smoothsaw(x) {
        return this.smoothstep(this.fract(x));
    }

    noise(x, seed) {
        return this.randStep(x, seed) * this.smoothsaw(x) + this.randStep(x - 1, seed) * (1 - this.smoothsaw(x - 1));
    }
}

// Define SearchResponse and other metric classes
export class SearchResponse {
    constructor(name, northing, easting) {
        this.name = name;
        this.northing = northing;
        this.easting = easting;
    }
}

class DayQueryResult {
    constructor(hourQueryResults, moonPhaseMetric, suntimeMetric, dayName) {
        this.hourQueryResults = hourQueryResults;
        this.moonPhaseMetric = moonPhaseMetric;
        this.suntimeMetric = suntimeMetric;
        this.dayName = dayName;
    }
}

class HourQueryResult {
    constructor(cloudCoverMetric, precipitationMetric, temperatureMetric, moonAltitudeMetric) {
        this.cloudCoverMetric = cloudCoverMetric;
        this.precipitationMetric = precipitationMetric;
        this.temperatureMetric = temperatureMetric;
        this.moonAltitudeMetric = moonAltitudeMetric;
    }
}

class FixedMoonPhaseMetric {
    constructor(day) {
        this.day = day;
    }

    getGoodnessHeuristic() {
        return Math.max(1, Math.min(Math.round(10 * Math.sin(0.1 * this.day)), 10));
    }

    getDisplayValue() {
        const moonPhases = [
            "Full Moon", "Full Moon", "Waning Gibbous", "Waning Gibbous", "Waning Gibbous",
            "Waning Gibbous", "Waning Gibbous", "Waning Gibbous", "Third Quarter", "Third Quarter",
            "Waning Crescent", "Waning Crescent", "Waning Crescent", "Waning Crescent", "Waning Crescent",
            "New Moon", "Waxing Crescent", "Waxing Crescent", "Waxing Crescent", "Waxing Crescent",
            "Waxing Crescent"
        ];
        return this.day >= 0 && this.day < moonPhases.length ? moonPhases[this.day] : "Error: date out of range";
    }
}

class FixedSuntimeMetric {
    constructor(day) {
        this.day = day;
    }

    getGoodnessHeuristic() {
        return Math.max(6 - this.day / 6, 0);
    }

    getDisplayValue() {
        const suntimePhases = [
            "04:50-21:01", "04:49-21:02", "04:48-21:03", "04:47-21:04", "04:46-21:05",
            "04:45-21:06", "04:44-21:07", "04:43-21:08", "04:42-21:09", "04:41-21:10",
            "04:41-21:10", "04:40-21:11", "04:39-21:11", "04:39-21:12", "04:38-21:12",
            "04:38-21:13", "04:37-21:13", "04:37-21:14", "04:36-21:14", "04:36-21:15",
            "04:35-21:15"
        ];
        return this.day >= 0 && this.day < suntimePhases.length ? suntimePhases[this.day] : "Error: date out of range";
    }
}

class RandomCloudCoverMetric {
    constructor(goodness) {
        this.goodness = goodness;
    }

    getGoodnessHeuristic() {
        return this.goodness;
    }

    getDisplayValue() {
        const cloudCoverPhases = [
            "Overcast", "Overcast", "Mostly Cloudy", "Mostly Cloudy", "Partly Cloudy",
            "Partly Cloudy", "Mostly Clear", "Mostly Clear", "Clear Sky", "Clear Sky"
        ];
        return this.goodness >= 1 && this.goodness <= 10 ? cloudCoverPhases[this.goodness - 1] : "Error: goodness out of range";
    }
}

class RandomPrecipitationMetric {
    constructor(goodness) {
        this.goodness = goodness;
    }

    getGoodnessHeuristic() {
        return this.goodness;
    }

    getDisplayValue() {
        const precipitationPhases = [
            "5.0mm", "2.0mm", "1.0mm", "0.5mm", "0.2mm",
            "0.1mm", "Trace", "Trace", "Trace", "Trace"
        ];
        return this.goodness >= 1 && this.goodness <= 10 ? precipitationPhases[this.goodness - 1] : "Error: goodness out of range";
    }
}

class RandomTemperatureMetric {
    constructor(goodness) {
        this.goodness = goodness;
    }

    getGoodnessHeuristic() {
        return this.goodness;
    }

    getDisplayValue() {
        const temperaturePhases = [
            "10°C", "11°C", "12°C", "13°C", "14°C",
            "15°C", "16°C", "17°C", "18°C", "19°C"
        ];
        return this.goodness >= 1 && this.goodness <= 10 ? temperaturePhases[this.goodness - 1] : "Error: goodness out of range";
    }
}

class RandomMoonAltitudeMetric {
    constructor(height) {
        this.height = height;
    }

    getGoodnessHeuristic() {
        return this.height;
    }

    getDisplayValue() {
        const moonAltitudes = [
            "90°", "80°", "60°", "40°", "30°",
            "20°", "10°", "-10°", "-30°", "-50°"
        ];
        return this.height >= 1 && this.height <= 10 ? moonAltitudes[this.height - 1] : "Error: goodness out of range";
    }
}

// Export necessary functions and classes
module.exports = {
    queryName,
    RandomDayQuery,
    SearchResponse
};
const API_KEY = 'dhhN17AOFhqMqag5pEU47NXaurUDBAKF';

// Function to fetch place search results
async function queryName(name, numResponses) {
    const url = `https://api.os.uk/search/names/v1/find?query=${name}&key=${API_KEY}&maxresults=${numResponses + 5}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return topResults(data, numResponses);
}

function topResults(jsonResponse, n) {
    const entries = jsonResponse.results;
    const names = new Set();

    n = Math.min(n, entries.length);

    const searchResponses = [];

    for (let i = 0; i < n; i++) {
        const entry = entries[i].GAZETTEER_ENTRY;

        const geometryX = entry.GEOMETRY_X;
        const geometryY = entry.GEOMETRY_Y;
        const name1 = `${entry.NAME1} - ${entry.LOCAL_TYPE} - ${entry.COUNTY_UNITARY}`;

        if (names.has(name1)) {
            continue;
        }
        names.add(name1);

        searchResponses.push(new SearchResponse(name1, geometryY, geometryX));
    }
    return searchResponses;
}
