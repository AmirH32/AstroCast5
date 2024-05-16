const fetch = require('node-fetch');

const API_KEY = 'dhhN17AOFhqMqag5pEU47NXaurUDBAKF';

async function main() {
    try {
        const response = await queryName('Cambridge', 5);
        response.forEach(r => {
            console.log(`Name: ${r.name} Northing: ${r.northing} Easting: ${r.easting}`);
        });
    } catch (e) {
        console.error(e);
    }
}

async function queryName(name, numResponses) {
    const jsonResponse = await getJsonObject(name, numResponses + 5);
    return topResults(jsonResponse, numResponses);
}

async function getJsonObject(search, maxResults) {
    const url = `https://api.os.uk/search/names/v1/find?query=${search}&key=${API_KEY}&maxresults=${maxResults}`;
    const response = await fetch(url, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    console.log(`Response Code: ${response.status}`);
    return jsonResponse;
}

/**
 * @param {Object} jsonResponse - The JSON response from the API.
 * @param {number} n - The max number of entries returned (might be less).
 * @returns {Array} - Array of SearchResponse objects.
 */
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

/**
 * @class
 * @classdesc Represents a search response.
 */
class SearchResponse {
    /**
     * @param {string} name - The name of the place.
     * @param {number} northing - The northing coordinate.
     * @param {number} easting - The easting coordinate.
     */
    constructor(name, northing, easting) {
        this.name = name;
        this.northing = northing;
        this.easting = easting;
    }
}

// Run the main function
main();
