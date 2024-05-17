const readline = require('readline');
const fetch = require('node-fetch');
const { queryName, RandomDayQuery } = require('./placeSearch');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a city name: ', async (location) => {
    try {
        const response = await queryName(location, 10);
        response.forEach((r, i) => {
            console.log(`${i}:`);
            console.log(`    Name: ${r.name}`);
            console.log(`    Northing: ${r.northing}`);
            console.log(`    Easting: ${r.easting}`);
        });

        rl.question('Choose result: ', async (result) => {
            const easting = response[result].easting;
            const northing = response[result].northing;
            const day = 0;

            const dayQueryResult = new RandomDayQuery().queryDay(easting, northing, day);

            console.log(`\nEasting: ${easting}`);
            console.log(`Northing: ${northing}`);
            console.log(`Day: ${day}`);

            console.log(`\nMoon Phase Metric: ${dayQueryResult.moonPhaseMetric.getDisplayValue()}`);
            console.log(`Suntime Metric: ${dayQueryResult.suntimeMetric.getDisplayValue()}`);

            dayQueryResult.hourQueryResults.forEach((hourResult, i) => {
                console.log(`\nHour ${i}:00`);
                console.log(` - Cloud Cover Metric: ${hourResult.cloudCoverMetric.getDisplayValue()}`);
                console.log(` - Precipitation Metric: ${hourResult.precipitationMetric.getDisplayValue()}`);
                console.log(` - Temperature Metric: ${hourResult.temperatureMetric.getDisplayValue()}`);
            });

            rl.close();
        });
    } catch (e) {
        console.error(e);
        rl.close();
    }
});
