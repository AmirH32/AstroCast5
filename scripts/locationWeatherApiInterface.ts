const { queryName, SearchResponse, RandomDayQuery } = require('./placeSearch');

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


export interface Metric {
    getDisplayValue: () => string;
    getGoodnessHeuristic: () => number;
}

export interface HourResult {
    cloudCoverMetric: Metric;
    precipitationMetric: Metric;
    temperatureMetric: Metric;
    averageHeuristic: number;
}

export interface DayResult {
    moonPhaseMetric: Metric;
    suntimeMetric: Metric;
    hourQueryResults: HourResult[];
    averagePrecipitationHeuristic: number;
    averageCloudCoverHeuristic: number;
    averageTemperatureHeuristic: number;
    averageHeuristic: number;
    dayName: string;
    dayDate: string;
}

export interface Location {
    easting: number;
    northing: number;
    name: string;
}

export function defaultLocation(): Location {
    const location = new SearchResponse("Null", 0, 0);
    return location;
}

/**
 * @param goodness_heuristic between 0 and 10 please
 */
export function heuristic_colour_hsl(goodness_heuristic: number): string {
    
    return `hsl(${sigmoid(goodness_heuristic / 10, 10) * 120}, 100%, 50%)`;
}

function sigmoid(x: number, s: number): number {
    //https://www.desmos.com/calculator/2f8lh6qrry
    return 1 / (1 + Math.exp(-s * (x - 0.5)));
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

function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export class WeatherAPI {
    

    static queryWeatherThroughoutWeek(northing: number, easting: number, weekNo: number): DayResult[] {
        const weekData: DayResult[] = [];

        const precipitationWeight = 0.3;
        const cloudCoverWeight = 0.4;
        const temperatureWeight = 0.2;

        const today = new Date();
        const offset = ((today.getDay() - 1) % 7 + 7) % 7;
        const weekStart = addDays(today, weekNo * 7 + -offset);

        for (let i = 0; i < 7; i++) {
            const currentDay = weekNo * 7 + i;
            const dayData: DayResult = new RandomDayQuery().queryDay(northing, easting, currentDay);

            let totalPrecipitationHeuristic = 0;
            let totalCloudCoverHeuristic = 0;
            let totalTemperatureHeuristic = 0;
            let totalHourHeuristic = 0;

            // Calculate heuristic for each hour and sum them
            dayData.hourQueryResults.forEach(hour => {
                const precipitationHeuristic = hour.precipitationMetric.getGoodnessHeuristic();
                const cloudCoverHeuristic = hour.cloudCoverMetric.getGoodnessHeuristic();
                const temperatureHeuristic = hour.temperatureMetric.getGoodnessHeuristic();

                hour.averageHeuristic =
                    precipitationWeight * precipitationHeuristic +
                    cloudCoverWeight * cloudCoverHeuristic +
                    temperatureWeight * temperatureHeuristic;

                totalPrecipitationHeuristic += precipitationHeuristic;
                totalCloudCoverHeuristic += cloudCoverHeuristic;
                totalTemperatureHeuristic += temperatureHeuristic;
                totalHourHeuristic += hour.averageHeuristic;
            });

            const numHours = dayData.hourQueryResults.length;

            // Calculate average heuristics for the day
            dayData.averagePrecipitationHeuristic = totalPrecipitationHeuristic / numHours;
            dayData.averageCloudCoverHeuristic = totalCloudCoverHeuristic / numHours;
            dayData.averageTemperatureHeuristic = totalTemperatureHeuristic / numHours;
            dayData.averageHeuristic = sigmoid(totalHourHeuristic * 0.1 / numHours, 5) * 10;
            dayData.dayDate = formatDate(addDays(weekStart, i));

            weekData.push(dayData);
        }

        return weekData;
    }
}
