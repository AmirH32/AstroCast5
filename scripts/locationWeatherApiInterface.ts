const { queryName, RandomDayQuery } = require('./placeSearch');

export interface Metric {
    getDisplayValue: () => string;
}

export interface HourResult {
    cloudCoverMetric: Metric;
    precipitationMetric: Metric;
    temperatureMetric: Metric;
}

export interface DayResult {
    moonPhaseMetric: Metric;
    suntimeMetric: Metric;
    hourQueryResults: HourResult[];
}

export interface Location {
    easting: number;
    northing: number;
    name: string;
}

export class LocationAPI {
    static async queryLocation(location: string, numResponses = 5): Promise<Location[]> {
        const results = await queryName(location, numResponses);
        if (results.length === 0) {
            throw new Error("No locations found");
        }
        return results;
    }
}

export class WeatherAPI {
    /** Gets the weather at each hour of the day. Also returns the suntime and moon phase "data".
     * @param location Location returned from LocationAPI.queryLocation
     * @param day day the "week" starts on
     * @returns Array of data on individual days, each containing data on individual hours [0 to 23].
     */
    static queryWeatherThroughoutWeek(location: Location, day: number): DayResult[] {
        const weekData: DayResult[] = [];
        for (let i = 0; i < 7; i++) {
            const currentDay = day + i;
            const dayData = new RandomDayQuery().queryDay(location.easting, location.northing, currentDay);
            weekData.push(dayData);
        }
        return weekData;
    }

    /** Gets the weather at each hour of the day. Also returns the suntime and moon phase "data".
     * @param location Location returned from LocationAPI.queryLocation
     * @param day between 0 and 21 for now
     * @returns Array of data on individual hours [0 to 23].
     */
    static queryWeatherThroughoutDay(location: Location, day: number): DayResult {
        return new RandomDayQuery().queryDay(location.easting, location.northing, day);
    }

    /** Gets the weather at each hour of the day. Run queryWeatherThroughoutDay to get suntime and moon phase "data".
     * @param location Location returned from LocationAPI.queryLocation
     * @param day between 0 and 21 for now
     * @param hour between 0 and 24
     * @returns weather metrics for the hour specified.
     */
    static queryWeatherOnHour(location: Location, day: number, hour: number): HourResult {
        const dayData = new RandomDayQuery().queryDay(location.easting, location.northing, day);
        return dayData.hourQueryResults[hour];
    }
}

async function main() {
    try {
        const locations = await LocationAPI.queryLocation("Cambridge");
        if (locations.length === 0) {
            throw new Error("No locations found for the specified query.");
        }

        const location = locations[0];
        console.log("Location fetched:", location.name);
        console.log();

        const weatherOnWeek = WeatherAPI.queryWeatherThroughoutWeek(location, 0);

        console.log("Day 1: moonPhaseMetric:", weatherOnWeek[1].moonPhaseMetric.getDisplayValue());
        console.log("Day 1: suntimeMetric:", weatherOnWeek[1].suntimeMetric.getDisplayValue());
        console.log();

        console.log("Hour 09: cloudCoverMetric:", weatherOnWeek[0].hourQueryResults[9].cloudCoverMetric.getDisplayValue());
        console.log("Hour 09: precipitationMetric:", weatherOnWeek[0].hourQueryResults[9].precipitationMetric.getDisplayValue());
        console.log("Hour 09: temperatureMetric:", weatherOnWeek[0].hourQueryResults[9].temperatureMetric.getDisplayValue());
        console.log();

        const weatherOnDay = WeatherAPI.queryWeatherThroughoutDay(location, 0);

        console.log("Day 0: moonPhaseMetric:", weatherOnDay.moonPhaseMetric.getDisplayValue());
        console.log("Day 0: suntimeMetric:", weatherOnDay.suntimeMetric.getDisplayValue());
        console.log();

        console.log("Hour 10: cloudCoverMetric:", weatherOnDay.hourQueryResults[10].cloudCoverMetric.getDisplayValue());
        console.log("Hour 10: precipitationMetric:", weatherOnDay.hourQueryResults[10].precipitationMetric.getDisplayValue());
        console.log("Hour 10: temperatureMetric:", weatherOnDay.hourQueryResults[10].temperatureMetric.getDisplayValue());
        console.log();

        const weatherOnHour = WeatherAPI.queryWeatherOnHour(location, 0, 11);

        console.log("Hour 11: cloudCoverMetric:", weatherOnHour.cloudCoverMetric.getDisplayValue());
        console.log("Hour 11: precipitationMetric:", weatherOnHour.precipitationMetric.getDisplayValue());
        console.log("Hour 11: temperatureMetric:", weatherOnHour.temperatureMetric.getDisplayValue());
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
}

main();
