const { queryName, RandomDayQuery } = require('./placeSearch');

export interface Metric {
    getDisplayValue: () => string;
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
    averageHeuristic: number;
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

function calculateHeuristic(rainfall_mm: number, cloud_cover_percent: number, temperature_celsius: number): number {
    const rain_c = 10.0;
    const cloud_c = 10.0;
    const temp_c = 1.0;
    return rain_c * Math.pow(rainfall_mm, 2) +
        cloud_c * Math.pow(cloud_cover_percent, 3) +
        temp_c * Math.pow(temperature_celsius, 0.5);
}

function computeAverageHeuristic(hourResults: HourResult[]): number {
    if (hourResults.length === 0) return 0;
    const totalHeuristic = hourResults.reduce((sum, hour) => sum + (hour.averageHeuristic || 0), 0);
    return totalHeuristic / hourResults.length;
}

export class WeatherAPI {
    static queryWeatherThroughoutWeek(location: Location, day: number): DayResult[] {
        const weekData: DayResult[] = [];
        for (let i = 0; i < 7; i++) {
            const currentDay = day + i;
            const dayData: DayResult = new RandomDayQuery().queryDay(location.easting, location.northing, currentDay);

            // Calculate heuristic for each hour
            dayData.hourQueryResults.forEach(hour => {
                const rainfall_mm = parseFloat(hour.precipitationMetric.getDisplayValue()) || 0;
                const cloud_cover_percent = parseFloat(hour.cloudCoverMetric.getDisplayValue()) || 0;
                const temperature_celsius = parseFloat(hour.temperatureMetric.getDisplayValue()) || 0;
                hour.averageHeuristic = calculateHeuristic(rainfall_mm, cloud_cover_percent, temperature_celsius);
            });

            // Calculate average heuristic for the day
            dayData.averageHeuristic = computeAverageHeuristic(dayData.hourQueryResults);

            weekData.push(dayData);
        }

        return weekData;
    }

    static computeWeekAverageHeuristic(weekData: DayResult[]): number {
        if (weekData.length === 0) return 0;
        const totalHeuristic = weekData.reduce((sum, day) => sum + (day.averageHeuristic || 0), 0);
        return totalHeuristic / weekData.length;
    }
}
